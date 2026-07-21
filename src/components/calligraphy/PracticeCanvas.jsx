import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Eraser, Undo2, Redo2, Trash2, Check, Minus, Plus } from 'lucide-react';

// ─── Brush definitions ───────────────────────────────────────────────────────
// Each brush has: id, name, nameAr, description
// and a getWidth(strokeAngle, size) → number function.
// Rendering is handled centrally via smooth Catmull-Rom splines.

const BRUSHES = [
  {
    id: 'qalam',
    name: 'Qalam',
    nameAr: 'قلم الثلث',
    description: '45° reed nib — classic Thuluth thick/thin',
    getWidth: (strokeAngle, size) => {
      const nib = Math.PI * 0.25;
      const factor = Math.abs(Math.sin(strokeAngle - nib));
      return size * Math.max(0.06, factor);
    },
    shadow: false,
  },
];

// Smallest signed difference between two angles
function _angleDiff(a, b) {
  let d = a - b;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return d;
}

// ─── Smooth stroke renderer ───────────────────────────────────────────────────
// Renders a list of {x, y, w} points as a smooth variable-width ribbon
// using quadratic bezier mid-point chaining (Procreate-style smoothing).
function renderStroke(ctx, pts, opacity, color, shadow) {
  if (pts.length < 2) return;

  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  if (shadow) {
    // Draw halo pass first
    ctx.globalAlpha = opacity * 0.12;
    ctx.lineWidth = (pts[0].w + pts[pts.length - 1].w) * 1.8;
    ctx.fillStyle = '#555';
    ctx.strokeStyle = '#555';
    _drawRibbon(ctx, pts, 1.8);
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.globalAlpha = opacity;
  }

  _drawRibbon(ctx, pts, 1.0);
  ctx.restore();
}

function _drawRibbon(ctx, pts, widthScale) {
  if (pts.length < 2) return;

  // Smooth widths with a simple moving average to eliminate jagged edges
  const smoothed = pts.map((p, i) => {
    const lo = Math.max(0, i - 2), hi = Math.min(pts.length - 1, i + 2);
    let wSum = 0, aSum = 0, count = 0;
    for (let j = lo; j <= hi; j++) {
      wSum += pts[j].w;
      aSum += pts[j].angle;
      count++;
    }
    return { ...p, w: wSum / count, angle: aSum / count };
  });

  // Build top and bottom edge arrays using mid-point smoothing
  const top = [], bot = [];

  for (let i = 0; i < smoothed.length; i++) {
    const { x, y, angle } = smoothed[i];
    const w = smoothed[i].w * widthScale * 0.5;
    // perpendicular to stroke direction
    const px = -Math.sin(angle);
    const py = Math.cos(angle);
    top.push({ x: x + px * w, y: y + py * w });
    bot.push({ x: x - px * w, y: y - py * w });
  }

  // Draw smooth filled ribbon
  ctx.beginPath();
  // Top edge (forward)
  _smoothPath(ctx, top, true);
  // Bottom edge (backward)
  _smoothPath(ctx, bot.reverse(), false);
  ctx.closePath();
  ctx.fill();
}

function _smoothPath(ctx, pts, moveTo) {
  if (pts.length === 0) return;
  if (pts.length === 1) {
    if (moveTo) ctx.moveTo(pts[0].x, pts[0].y);
    else ctx.lineTo(pts[0].x, pts[0].y);
    return;
  }
  if (moveTo) ctx.moveTo(pts[0].x, pts[0].y);
  else ctx.lineTo(pts[0].x, pts[0].y);

  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i].x + pts[i + 1].x) / 2;
    const my = (pts[i].y + pts[i + 1].y) / 2;
    ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
  }
  const last = pts[pts.length - 1];
  ctx.lineTo(last.x, last.y);
}

// ─── Guide lines ─────────────────────────────────────────────────────────────
function drawGuideLines(ctx, letter, w, h) {
  ctx.save();
  const cx = w / 2;
  const cy = h * 0.6;

  // Baseline
  ctx.strokeStyle = 'rgba(0,0,0,0.09)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([]);
  ctx.beginPath(); ctx.moveTo(w * 0.05, cy); ctx.lineTo(w * 0.95, cy); ctx.stroke();

  // Cap height
  ctx.setLineDash([3, 5]);
  ctx.strokeStyle = 'rgba(0,0,0,0.05)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(w * 0.05, h * 0.25); ctx.lineTo(w * 0.95, h * 0.25); ctx.stroke();

  // Descender
  ctx.beginPath(); ctx.moveTo(w * 0.05, h * 0.82); ctx.lineTo(w * 0.95, h * 0.82); ctx.stroke();
  ctx.setLineDash([]);

  // Letter guide path
  ctx.strokeStyle = 'rgba(255, 85, 0, 0.16)';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';

  const g = {
    alif:     () => { ctx.beginPath(); ctx.moveTo(cx, h*0.2); ctx.lineTo(cx, cy); ctx.stroke(); },
    ba:       () => { ctx.beginPath(); ctx.moveTo(cx+w*0.25,cy-h*0.04); ctx.quadraticCurveTo(cx,cy+h*0.16,cx-w*0.25,cy-h*0.02); ctx.stroke(); },
    ta:       () => { ctx.beginPath(); ctx.moveTo(cx+w*0.25,cy-h*0.04); ctx.quadraticCurveTo(cx,cy+h*0.16,cx-w*0.25,cy-h*0.02); ctx.stroke(); },
    tha:      () => { ctx.beginPath(); ctx.moveTo(cx+w*0.25,cy-h*0.04); ctx.quadraticCurveTo(cx,cy+h*0.16,cx-w*0.25,cy-h*0.02); ctx.stroke(); },
    jim:      () => { ctx.beginPath(); ctx.moveTo(cx-w*0.1,h*0.3); ctx.quadraticCurveTo(cx+w*0.15,h*0.3,cx+w*0.1,cy); ctx.quadraticCurveTo(cx,cy+h*0.2,cx-w*0.15,cy+h*0.18); ctx.stroke(); },
    ha_small: () => { ctx.beginPath(); ctx.moveTo(cx-w*0.1,h*0.3); ctx.quadraticCurveTo(cx+w*0.15,h*0.3,cx+w*0.1,cy); ctx.quadraticCurveTo(cx,cy+h*0.2,cx-w*0.15,cy+h*0.18); ctx.stroke(); },
    kha:      () => { ctx.beginPath(); ctx.moveTo(cx-w*0.1,h*0.3); ctx.quadraticCurveTo(cx+w*0.15,h*0.3,cx+w*0.1,cy); ctx.quadraticCurveTo(cx,cy+h*0.2,cx-w*0.15,cy+h*0.18); ctx.stroke(); },
    dal:      () => { ctx.beginPath(); ctx.moveTo(cx+w*0.1,h*0.35); ctx.lineTo(cx+w*0.05,cy); ctx.quadraticCurveTo(cx,cy+h*0.05,cx-w*0.12,cy); ctx.stroke(); },
    dhal:     () => { ctx.beginPath(); ctx.moveTo(cx+w*0.1,h*0.35); ctx.lineTo(cx+w*0.05,cy); ctx.quadraticCurveTo(cx,cy+h*0.05,cx-w*0.12,cy); ctx.stroke(); },
    ra:       () => { ctx.beginPath(); ctx.moveTo(cx,cy); ctx.quadraticCurveTo(cx+w*0.05,cy+h*0.18,cx+w*0.1,cy+h*0.15); ctx.stroke(); },
    zay:      () => { ctx.beginPath(); ctx.moveTo(cx,cy); ctx.quadraticCurveTo(cx+w*0.05,cy+h*0.18,cx+w*0.1,cy+h*0.15); ctx.stroke(); },
    sin:      () => { [0,1,2].forEach(i=>{ ctx.beginPath(); ctx.moveTo(cx+w*(0.2-i*0.15),cy); ctx.lineTo(cx+w*(0.2-i*0.15),cy-h*0.1); ctx.stroke(); }); ctx.beginPath(); ctx.moveTo(cx-w*0.1,cy); ctx.quadraticCurveTo(cx-w*0.2,cy+h*0.18,cx-w*0.3,cy+h*0.08); ctx.stroke(); },
    shin:     () => { [0,1,2].forEach(i=>{ ctx.beginPath(); ctx.moveTo(cx+w*(0.2-i*0.15),cy); ctx.lineTo(cx+w*(0.2-i*0.15),cy-h*0.1); ctx.stroke(); }); ctx.beginPath(); ctx.moveTo(cx-w*0.1,cy); ctx.quadraticCurveTo(cx-w*0.2,cy+h*0.18,cx-w*0.3,cy+h*0.08); ctx.stroke(); },
    sad:      () => { ctx.beginPath(); ctx.ellipse(cx+w*0.05,cy-h*0.05,w*0.12,h*0.08,0,0,Math.PI*2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx-w*0.07,cy); ctx.quadraticCurveTo(cx-w*0.2,cy+h*0.18,cx-w*0.28,cy+h*0.1); ctx.stroke(); },
    dad:      () => { ctx.beginPath(); ctx.ellipse(cx+w*0.05,cy-h*0.05,w*0.12,h*0.08,0,0,Math.PI*2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx-w*0.07,cy); ctx.quadraticCurveTo(cx-w*0.2,cy+h*0.18,cx-w*0.28,cy+h*0.1); ctx.stroke(); },
    tah:      () => { ctx.beginPath(); ctx.ellipse(cx,cy-h*0.04,w*0.1,h*0.06,0,0,Math.PI*2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx+w*0.1,cy-h*0.04); ctx.lineTo(cx+w*0.1,h*0.2); ctx.stroke(); },
    dhah:     () => { ctx.beginPath(); ctx.ellipse(cx,cy-h*0.04,w*0.1,h*0.06,0,0,Math.PI*2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx+w*0.1,cy-h*0.04); ctx.lineTo(cx+w*0.1,h*0.2); ctx.stroke(); },
    ain:      () => { ctx.beginPath(); ctx.arc(cx+w*0.1,h*0.4,h*0.1,Math.PI*0.5,Math.PI*1.5); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx+w*0.05,cy); ctx.quadraticCurveTo(cx,cy+h*0.2,cx-w*0.2,cy+h*0.15); ctx.stroke(); },
    ghain:    () => { ctx.beginPath(); ctx.arc(cx+w*0.1,h*0.4,h*0.1,Math.PI*0.5,Math.PI*1.5); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx+w*0.05,cy); ctx.quadraticCurveTo(cx,cy+h*0.2,cx-w*0.2,cy+h*0.15); ctx.stroke(); },
    fa:       () => { ctx.beginPath(); ctx.arc(cx+w*0.1,cy-h*0.06,h*0.07,0,Math.PI*2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx+w*0.03,cy-h*0.06); ctx.quadraticCurveTo(cx-w*0.15,cy,cx-w*0.2,cy+h*0.12); ctx.stroke(); },
    qaf:      () => { ctx.beginPath(); ctx.arc(cx+w*0.08,cy-h*0.04,h*0.09,0,Math.PI*2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx-w*0.01,cy); ctx.quadraticCurveTo(cx-w*0.15,cy+h*0.1,cx-w*0.18,cy+h*0.2); ctx.stroke(); },
    kaf:      () => { ctx.beginPath(); ctx.moveTo(cx-w*0.2,cy); ctx.lineTo(cx+w*0.12,cy); ctx.lineTo(cx+w*0.12,h*0.2); ctx.stroke(); },
    lam:      () => { ctx.beginPath(); ctx.moveTo(cx,h*0.2); ctx.lineTo(cx,cy); ctx.quadraticCurveTo(cx-w*0.05,cy+h*0.05,cx-w*0.12,cy); ctx.stroke(); },
    mim:      () => { ctx.beginPath(); ctx.arc(cx,cy-h*0.05,h*0.08,0,Math.PI*2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx,cy+h*0.03); ctx.lineTo(cx,cy+h*0.14); ctx.stroke(); },
    nun:      () => { ctx.beginPath(); ctx.moveTo(cx+w*0.2,cy-h*0.03); ctx.quadraticCurveTo(cx,cy+h*0.1,cx-w*0.2,cy-h*0.02); ctx.stroke(); },
    ha_big:   () => { ctx.beginPath(); ctx.ellipse(cx,cy-h*0.05,w*0.1,h*0.1,0,0,Math.PI*2); ctx.stroke(); },
    waw:      () => { ctx.beginPath(); ctx.arc(cx,cy-h*0.1,h*0.07,0,Math.PI*2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx,cy-h*0.03); ctx.quadraticCurveTo(cx+w*0.08,cy+h*0.1,cx+w*0.12,cy+h*0.15); ctx.stroke(); },
    ya:       () => { ctx.beginPath(); ctx.moveTo(cx+w*0.2,cy-h*0.02); ctx.quadraticCurveTo(cx,cy+h*0.06,cx-w*0.05,cy+h*0.04); ctx.quadraticCurveTo(cx-w*0.18,cy+h*0.02,cx-w*0.22,cy+h*0.12); ctx.stroke(); },
  };
  const fn = g[letter?.id];
  if (fn) fn();
  ctx.restore();
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function PracticeCanvas({ letter, onComplete }) {
  const canvasRef = useRef(null);
  const offscreenRef = useRef(null); // stable drawn content
  const [drawing, setDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [tool, setTool] = useState('draw');

  const [brushSize, setBrushSize] = useState(20);
  const [opacity, setOpacity] = useState(1);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  // Current stroke point buffer: [{x, y, w, angle}]
  const strokePts = useRef([]);
  const lastPos = useRef(null);
  const dpr = useRef(window.devicePixelRatio || 1).current;

  const getCanvas = () => canvasRef.current;
  const getCtx = () => getCanvas()?.getContext('2d');

  // ── Background ──
  const drawBackground = useCallback((ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#F9F7F4';
    ctx.fillRect(0, 0, w, h);
    // subtle grid
    ctx.strokeStyle = 'rgba(0,0,0,0.035)';
    ctx.lineWidth = 1;
    const step = 22;
    for (let gx = 0; gx < w; gx += step) { ctx.beginPath(); ctx.moveTo(gx,0); ctx.lineTo(gx,h); ctx.stroke(); }
    for (let gy = 0; gy < h; gy += step) { ctx.beginPath(); ctx.moveTo(0,gy); ctx.lineTo(w,gy); ctx.stroke(); }
    // ghost letter
    if (letter) {
      ctx.font = `${h * 0.55}px 'Noto Naskh Arabic', serif`;
      ctx.fillStyle = 'rgba(0,0,0,0.04)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.direction = 'rtl';
      ctx.fillText(letter.letter, w / 2, h * 0.52);
    }
    drawGuideLines(ctx, letter, w, h);
  }, [letter]);

  // ── Composite: bg + offscreen content ──
  const composite = useCallback(() => {
    const canvas = getCanvas();
    if (!canvas) return;
    const ctx = getCtx();
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    drawBackground(ctx, w, h);
    if (offscreenRef.current) ctx.drawImage(offscreenRef.current, 0, 0, w, h);
  }, [drawBackground]);

  // ── Init ──
  useEffect(() => {
    const canvas = getCanvas();
    if (!canvas) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    const w = Math.floor(rect.width || 500);
    const h = 280;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    const ctx = getCtx();
    ctx.scale(dpr, dpr);

    // Create offscreen canvas for stable ink
    const off = document.createElement('canvas');
    off.width = w;
    off.height = h;
    offscreenRef.current = off;

    drawBackground(ctx, w, h);
    setHistory([]);
    setRedoStack([]);
    setHasDrawn(false);
    strokePts.current = [];
  }, [letter]);

  // ── Pointer helpers ──
  const getPos = (e) => {
    const canvas = getCanvas();
    const rect = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return { x: src.clientX - rect.left, y: src.clientY - rect.top };
  };

  // ── Snapshot for undo ──
  const saveSnapshot = useCallback(() => {
    const off = offscreenRef.current;
    if (!off) return;
    setHistory(h => [...h.slice(-20), off.toDataURL()]);
    setRedoStack([]);
  }, []);

  // ── Start stroke ──
  const startDraw = (e) => {
    e.preventDefault();
    saveSnapshot();
    const pos = getPos(e);
    lastPos.current = pos;
    strokePts.current = [{ x: pos.x, y: pos.y, w: 0, angle: 0 }];
    setDrawing(true);
  };

  // ── Draw ──
  const draw = useCallback((e) => {
    e.preventDefault();
    if (!drawing) return;
    const pos = getPos(e);
    const prev = lastPos.current;
    if (!prev) return;

    const dx = pos.x - prev.x;
    const dy = pos.y - prev.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 1) return;

    const angle = Math.atan2(dy, dx);

    // Smooth angle using exponential weighted average with previous point
    const prevPt = strokePts.current[strokePts.current.length - 1];
    const smoothAngle = prevPt
      ? prevPt.angle + _angleDiff(angle, prevPt.angle) * 0.35
      : angle;

    if (tool === 'erase') {
      // Erase directly on offscreen
      const off = offscreenRef.current;
      const octx = off.getContext('2d');
      octx.globalCompositeOperation = 'destination-out';
      octx.globalAlpha = 1;
      octx.beginPath();
      octx.arc(pos.x, pos.y, brushSize * 1.8, 0, Math.PI * 2);
      octx.fill();
      octx.globalCompositeOperation = 'source-over';
      composite();
    } else {
      const brush = BRUSHES[0];
      const rawW = brush.getWidth(smoothAngle, brushSize, dist);
      // Exponentially smooth width too so it eases between thick/thin
      const prevW = prevPt ? prevPt.w : rawW;
      const w = prevW + (rawW - prevW) * 0.25;
      strokePts.current.push({ x: pos.x, y: pos.y, w, angle: smoothAngle });

      // Re-composite bg + stable ink + live stroke preview
      const canvas = getCanvas();
      const ctx = getCtx();
      const cw = canvas.width / dpr;
      const ch = canvas.height / dpr;
      drawBackground(ctx, cw, ch);
      if (offscreenRef.current) ctx.drawImage(offscreenRef.current, 0, 0, cw, ch);
      renderStroke(ctx, strokePts.current, opacity, '#0D0D0D', brush.shadow);
    }

    lastPos.current = pos;
    setHasDrawn(true);
  }, [drawing, tool, brushSize, opacity, composite, drawBackground]);

  // ── End stroke — commit to offscreen ──
  const endDraw = useCallback((e) => {
    e.preventDefault();
    if (!drawing) return;
    setDrawing(false);

    if (tool !== 'erase' && strokePts.current.length > 1) {
      const off = offscreenRef.current;
      if (off) {
        const octx = off.getContext('2d');
        const brush = BRUSHES[0];
        renderStroke(octx, strokePts.current, opacity, '#0D0D0D', brush.shadow);
      }
    }
    strokePts.current = [];
    lastPos.current = null;
    composite();
  }, [drawing, tool, opacity, composite]);

  // ── Undo ──
  const undo = () => {
    if (history.length === 0) return;
    const off = offscreenRef.current;
    const canvas = getCanvas();
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    setRedoStack(r => [...r, off.toDataURL()]);
    const prev = history[history.length - 1];
    setHistory(hh => hh.slice(0, -1));
    const img = new Image();
    img.onload = () => {
      const octx = off.getContext('2d');
      octx.clearRect(0, 0, w, h);
      octx.drawImage(img, 0, 0, w, h);
      composite();
    };
    img.src = prev;
  };

  // ── Redo ──
  const redo = () => {
    if (redoStack.length === 0) return;
    const off = offscreenRef.current;
    const canvas = getCanvas();
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    setHistory(hh => [...hh, off.toDataURL()]);
    const next = redoStack[redoStack.length - 1];
    setRedoStack(r => r.slice(0, -1));
    const img = new Image();
    img.onload = () => {
      const octx = off.getContext('2d');
      octx.clearRect(0, 0, w, h);
      octx.drawImage(img, 0, 0, w, h);
      composite();
    };
    img.src = next;
  };

  // ── Clear ──
  const clearCanvas = () => {
    saveSnapshot();
    const off = offscreenRef.current;
    if (off) {
      const octx = off.getContext('2d');
      octx.clearRect(0, 0, off.width, off.height);
    }
    composite();
    setHasDrawn(false);
  };

  return (
    <div className="sys-window overflow-hidden">
      <div className="sys-titlebar">
        <span className="sys-titlebar-dot" />
        <span>Practice Canvas</span>
        <span className="ml-auto label-mono" style={{ color: 'var(--ink-faint)' }}>
          {BRUSHES[0].nameAr}
        </span>
      </div>

      {/* Toolbar */}
      <div className="border-b" style={{ borderColor: 'var(--rule)', background: 'var(--paper-dark)' }}>
        {/* Controls */}
        <div className="flex items-center gap-4 px-3 py-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span style={{ fontFamily: 'Space Mono', fontSize: 9, color: 'var(--ink-faint)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Size</span>
            <button onClick={() => setBrushSize(s => Math.max(4, s - 4))}
              className="w-5 h-5 flex items-center justify-center border"
              style={{ borderColor: 'var(--rule)', color: 'var(--ink)' }}>
              <Minus className="w-3 h-3" />
            </button>
            <span style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--ink)', minWidth: 20, textAlign: 'center' }}>{brushSize}</span>
            <button onClick={() => setBrushSize(s => Math.min(60, s + 4))}
              className="w-5 h-5 flex items-center justify-center border"
              style={{ borderColor: 'var(--rule)', color: 'var(--ink)' }}>
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <span style={{ fontFamily: 'Space Mono', fontSize: 9, color: 'var(--ink-faint)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Opacity</span>
            <input
              type="range" min="0.1" max="1" step="0.05"
              value={opacity}
              onChange={e => setOpacity(parseFloat(e.target.value))}
              style={{ width: 64, accentColor: 'var(--zzz-yellow)' }}
            />
            <span style={{ fontFamily: 'Space Mono', fontSize: 9, color: 'var(--ink-mid)', minWidth: 28 }}>{Math.round(opacity * 100)}%</span>
          </div>

          <button
            onClick={() => setTool(t => t === 'erase' ? 'draw' : 'erase')}
            className="px-2 py-1 flex items-center gap-1 transition-all"
            style={{
              fontFamily: 'Space Mono', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase',
              background: tool === 'erase' ? 'var(--zzz-yellow)' : 'transparent',
              color: tool === 'erase' ? 'var(--ink)' : 'var(--ink-mid)',
              border: '1px solid',
              borderColor: tool === 'erase' ? 'var(--zzz-yellow)' : 'var(--rule)',
            }}
          >
            <Eraser className="w-3 h-3" /> Erase
          </button>

          <div className="flex items-center gap-1 ml-auto">
            <button onClick={undo} disabled={history.length === 0}
              className="w-7 h-7 flex items-center justify-center border transition-colors"
              style={{ borderColor: 'var(--rule)', opacity: history.length === 0 ? 0.3 : 1 }} title="Undo">
              <Undo2 className="w-3.5 h-3.5" style={{ color: 'var(--ink)' }} />
            </button>
            <button onClick={redo} disabled={redoStack.length === 0}
              className="w-7 h-7 flex items-center justify-center border transition-colors"
              style={{ borderColor: 'var(--rule)', opacity: redoStack.length === 0 ? 0.3 : 1 }} title="Redo">
              <Redo2 className="w-3.5 h-3.5" style={{ color: 'var(--ink)' }} />
            </button>
            <button onClick={clearCanvas}
              className="w-7 h-7 flex items-center justify-center border transition-colors"
              style={{ borderColor: 'var(--rule)' }} title="Clear">
              <Trash2 className="w-3.5 h-3.5" style={{ color: 'var(--destructive)' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div style={{ position: 'relative', width: '100%', cursor: tool === 'erase' ? 'cell' : 'crosshair' }}>
        <canvas
          ref={canvasRef}
          style={{ display: 'block', width: '100%', touchAction: 'none' }}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
        />
      </div>

      {/* Complete button */}
      <div className="border-t flex" style={{ borderColor: 'var(--rule)' }}>
        <button
          onClick={onComplete}
          disabled={!hasDrawn}
          className="flex-1 flex items-center justify-center gap-2 py-3 transition-colors"
          style={{
            fontFamily: 'Space Mono', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
            background: hasDrawn ? 'var(--ink)' : 'transparent',
            color: hasDrawn ? 'var(--paper)' : 'var(--ink-faint)',
            cursor: hasDrawn ? 'pointer' : 'not-allowed',
          }}
        >
          <Check className="w-3.5 h-3.5" /> Complete Practice
        </button>
      </div>
    </div>
  );
}