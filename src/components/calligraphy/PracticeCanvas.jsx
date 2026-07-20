import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Eraser, Undo2, Redo2, Trash2, Check, Minus, Plus } from 'lucide-react';

// Helper: draw a filled quadrilateral nib segment between two points
// nibAngle: the fixed cut angle of the nib (radians), nibWidth: full nib width
function drawNibSegment(ctx, x1, y1, x2, y2, nibAngle, nibWidth, opacity, color) {
  const dx = x2 - x1, dy = y2 - y1;
  if (Math.sqrt(dx * dx + dy * dy) < 0.3) return;
  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  // The nib edge direction (perpendicular cut)
  const nx = Math.cos(nibAngle) * nibWidth * 0.5;
  const ny = Math.sin(nibAngle) * nibWidth * 0.5;
  ctx.beginPath();
  ctx.moveTo(x1 - nx, y1 - ny);
  ctx.lineTo(x1 + nx, y1 + ny);
  ctx.lineTo(x2 + nx, y2 + ny);
  ctx.lineTo(x2 - nx, y2 - ny);
  ctx.closePath();
  ctx.fill();
}

// Helper: tapered brush segment — wide at start, narrow at end
function drawTaperedSegment(ctx, x1, y1, x2, y2, w1, w2, opacity, color) {
  const dx = x2 - x1, dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < 0.3) return;
  const px = -dy / dist, py = dx / dist; // perpendicular
  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x1 + px * w1, y1 + py * w1);
  ctx.lineTo(x1 - px * w1, y1 - py * w1);
  ctx.lineTo(x2 - px * w2, y2 - py * w2);
  ctx.lineTo(x2 + px * w2, y2 + py * w2);
  ctx.closePath();
  ctx.fill();
}

const BRUSHES = [
  {
    // Reed/Qalam flat nib — classic Thuluth thick-thin character
    // Horizontal stroke = full width; vertical = thin edge
    id: 'qalam',
    name: 'Qalam',
    nameAr: 'قلم الثلث',
    description: 'Reed nib at 45° — authentic Thuluth thick/thin',
    draw: (ctx, x, y, px, py, size, opacity, color) => {
      drawNibSegment(ctx, px, py, x, y, Math.PI * 0.25, size, opacity, color);
    }
  },
  {
    // Flat nib at a steeper angle — Naskh style
    id: 'naskh',
    name: 'Naskh',
    nameAr: 'قلم النسخ',
    description: 'Flat nib at 25° — Naskh proportions',
    draw: (ctx, x, y, px, py, size, opacity, color) => {
      drawNibSegment(ctx, px, py, x, y, Math.PI * 0.14, size, opacity, color);
    }
  },
  {
    // Diwani: flowing tapered brush — thick belly, thin start/end
    id: 'diwani',
    name: 'Diwani',
    nameAr: 'الديواني',
    description: 'Flowing brush — pressure-sensitive taper',
    draw: (ctx, x, y, px, py, size, opacity, color) => {
      const dx = x - px, dy = y - py;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 0.3) return;
      // belly at midpoint, taper both ends
      const mx = (px + x) / 2, my = (py + y) / 2;
      drawTaperedSegment(ctx, px, py, mx, my, size * 0.1, size * 0.45, opacity, color);
      drawTaperedSegment(ctx, mx, my, x, y, size * 0.45, size * 0.08, opacity, color);
    }
  },
  {
    // Shadow: two overlapping layers — dark core + grey halo
    id: 'shadow',
    name: 'Shadow',
    nameAr: 'خط الظل',
    description: 'Dual-layer shadow nib',
    draw: (ctx, x, y, px, py, size, opacity, color) => {
      // Halo (wide, light grey)
      drawNibSegment(ctx, px, py, x, y, Math.PI * 0.25, size * 1.5, opacity * 0.18, '#555555');
      // Core flat nib
      drawNibSegment(ctx, px, py, x, y, Math.PI * 0.25, size * 0.7, opacity, color);
    }
  },
  {
    // Ruq'ah: narrow upright nib — quick tight strokes
    id: 'ruqah',
    name: "Ruq'ah",
    nameAr: 'الرقعة ب حاده',
    description: 'Upright narrow nib — compact Ruqah style',
    draw: (ctx, x, y, px, py, size, opacity, color) => {
      drawNibSegment(ctx, px, py, x, y, Math.PI * 0.5, size * 0.55, opacity, color);
    }
  },
  {
    // Ink scatter — خط رسومي / splatter effect
    id: 'splash',
    name: 'Ink Splash',
    nameAr: 'خط رسومي',
    description: 'Scattered ink drops — expressive marks',
    draw: (ctx, x, y, px, py, size, opacity, color) => {
      const dx = x - px, dy = y - py;
      const dist = Math.sqrt(dx * dx + dy * dy);
      // Main stroke as flat nib
      drawNibSegment(ctx, px, py, x, y, Math.PI * 0.25, size * 0.6, opacity, color);
      // Random satellite drops along path
      if (dist > 2) {
        const count = Math.floor(dist / 6);
        for (let i = 0; i < count; i++) {
          const t = Math.random();
          const sx = px + dx * t + (Math.random() - 0.5) * size * 0.9;
          const sy = py + dy * t + (Math.random() - 0.5) * size * 0.9;
          const r = (Math.random() * 0.4 + 0.1) * size * 0.22;
          ctx.globalAlpha = opacity * (0.2 + Math.random() * 0.5);
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.ellipse(sx, sy, r, r * (0.5 + Math.random() * 0.5), Math.random() * Math.PI, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  },
];

// Draw faint practice guidelines per letter based on stroke type
function drawGuideLines(ctx, letter, w, h) {
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 85, 0, 0.12)';
  ctx.fillStyle = 'rgba(255, 85, 0, 0.07)';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 6]);

  // Baseline
  ctx.strokeStyle = 'rgba(0,0,0,0.08)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(w * 0.05, h * 0.6);
  ctx.lineTo(w * 0.95, h * 0.6);
  ctx.stroke();

  // Upper guide line (cap height)
  ctx.setLineDash([3, 5]);
  ctx.strokeStyle = 'rgba(0,0,0,0.05)';
  ctx.beginPath();
  ctx.moveTo(w * 0.05, h * 0.25);
  ctx.lineTo(w * 0.95, h * 0.25);
  ctx.stroke();

  // Descender line
  ctx.beginPath();
  ctx.moveTo(w * 0.05, h * 0.8);
  ctx.lineTo(w * 0.95, h * 0.8);
  ctx.stroke();

  ctx.setLineDash([]);

  // Letter-specific guide shapes drawn as very faint orange paths
  ctx.strokeStyle = 'rgba(255, 85, 0, 0.15)';
  ctx.lineWidth = 2.5;
  ctx.lineCap = 'round';

  const cx = w / 2;
  const cy = h * 0.6; // baseline y

  const guides = {
    alif: () => {
      // Tall vertical stroke
      ctx.beginPath();
      ctx.moveTo(cx, h * 0.2);
      ctx.lineTo(cx, cy);
      ctx.stroke();
    },
    ba: () => {
      // Sweeping horizontal bowl
      ctx.beginPath();
      ctx.moveTo(cx + w * 0.25, cy - h * 0.05);
      ctx.quadraticCurveTo(cx, cy + h * 0.15, cx - w * 0.25, cy - h * 0.02);
      ctx.stroke();
    },
    ta: () => {
      ctx.beginPath();
      ctx.moveTo(cx + w * 0.25, cy - h * 0.05);
      ctx.quadraticCurveTo(cx, cy + h * 0.15, cx - w * 0.25, cy - h * 0.02);
      ctx.stroke();
    },
    tha: () => {
      ctx.beginPath();
      ctx.moveTo(cx + w * 0.25, cy - h * 0.05);
      ctx.quadraticCurveTo(cx, cy + h * 0.15, cx - w * 0.25, cy - h * 0.02);
      ctx.stroke();
    },
    jim: () => {
      // Hook head + deep bowl
      ctx.beginPath();
      ctx.moveTo(cx - w * 0.1, h * 0.3);
      ctx.quadraticCurveTo(cx + w * 0.15, h * 0.3, cx + w * 0.1, cy);
      ctx.quadraticCurveTo(cx + w * 0.05, cy + h * 0.2, cx - w * 0.15, cy + h * 0.18);
      ctx.stroke();
    },
    ha_small: () => {
      ctx.beginPath();
      ctx.moveTo(cx - w * 0.1, h * 0.3);
      ctx.quadraticCurveTo(cx + w * 0.15, h * 0.3, cx + w * 0.1, cy);
      ctx.quadraticCurveTo(cx + w * 0.05, cy + h * 0.2, cx - w * 0.15, cy + h * 0.18);
      ctx.stroke();
    },
    kha: () => {
      ctx.beginPath();
      ctx.moveTo(cx - w * 0.1, h * 0.3);
      ctx.quadraticCurveTo(cx + w * 0.15, h * 0.3, cx + w * 0.1, cy);
      ctx.quadraticCurveTo(cx + w * 0.05, cy + h * 0.2, cx - w * 0.15, cy + h * 0.18);
      ctx.stroke();
    },
    dal: () => {
      ctx.beginPath();
      ctx.moveTo(cx + w * 0.1, h * 0.35);
      ctx.lineTo(cx + w * 0.05, cy);
      ctx.quadraticCurveTo(cx, cy + h * 0.05, cx - w * 0.12, cy);
      ctx.stroke();
    },
    dhal: () => {
      ctx.beginPath();
      ctx.moveTo(cx + w * 0.1, h * 0.35);
      ctx.lineTo(cx + w * 0.05, cy);
      ctx.quadraticCurveTo(cx, cy + h * 0.05, cx - w * 0.12, cy);
      ctx.stroke();
    },
    ra: () => {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.quadraticCurveTo(cx + w * 0.05, cy + h * 0.18, cx + w * 0.1, cy + h * 0.15);
      ctx.stroke();
    },
    zay: () => {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.quadraticCurveTo(cx + w * 0.05, cy + h * 0.18, cx + w * 0.1, cy + h * 0.15);
      ctx.stroke();
    },
    sin: () => {
      // Three teeth + sweeping tail
      for (let i = 0; i < 3; i++) {
        const tx = cx + w * (0.2 - i * 0.15);
        ctx.beginPath();
        ctx.moveTo(tx, cy);
        ctx.lineTo(tx, cy - h * 0.1);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(cx - w * 0.1, cy);
      ctx.quadraticCurveTo(cx - w * 0.2, cy + h * 0.18, cx - w * 0.3, cy + h * 0.08);
      ctx.stroke();
    },
    shin: () => {
      for (let i = 0; i < 3; i++) {
        const tx = cx + w * (0.2 - i * 0.15);
        ctx.beginPath();
        ctx.moveTo(tx, cy);
        ctx.lineTo(tx, cy - h * 0.1);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(cx - w * 0.1, cy);
      ctx.quadraticCurveTo(cx - w * 0.2, cy + h * 0.18, cx - w * 0.3, cy + h * 0.08);
      ctx.stroke();
    },
    sad: () => {
      ctx.beginPath();
      ctx.ellipse(cx + w * 0.05, cy - h * 0.05, w * 0.12, h * 0.08, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - w * 0.07, cy);
      ctx.quadraticCurveTo(cx - w * 0.2, cy + h * 0.18, cx - w * 0.28, cy + h * 0.1);
      ctx.stroke();
    },
    dad: () => {
      ctx.beginPath();
      ctx.ellipse(cx + w * 0.05, cy - h * 0.05, w * 0.12, h * 0.08, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - w * 0.07, cy);
      ctx.quadraticCurveTo(cx - w * 0.2, cy + h * 0.18, cx - w * 0.28, cy + h * 0.1);
      ctx.stroke();
    },
    tah: () => {
      ctx.beginPath();
      ctx.ellipse(cx, cy - h * 0.04, w * 0.1, h * 0.06, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + w * 0.1, cy - h * 0.04);
      ctx.lineTo(cx + w * 0.1, h * 0.2);
      ctx.stroke();
    },
    dhah: () => {
      ctx.beginPath();
      ctx.ellipse(cx, cy - h * 0.04, w * 0.1, h * 0.06, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + w * 0.1, cy - h * 0.04);
      ctx.lineTo(cx + w * 0.1, h * 0.2);
      ctx.stroke();
    },
    ain: () => {
      ctx.beginPath();
      ctx.arc(cx + w * 0.1, h * 0.4, h * 0.1, Math.PI * 0.5, Math.PI * 1.5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + w * 0.05, cy);
      ctx.quadraticCurveTo(cx, cy + h * 0.2, cx - w * 0.2, cy + h * 0.15);
      ctx.stroke();
    },
    ghain: () => {
      ctx.beginPath();
      ctx.arc(cx + w * 0.1, h * 0.4, h * 0.1, Math.PI * 0.5, Math.PI * 1.5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + w * 0.05, cy);
      ctx.quadraticCurveTo(cx, cy + h * 0.2, cx - w * 0.2, cy + h * 0.15);
      ctx.stroke();
    },
    fa: () => {
      ctx.beginPath();
      ctx.arc(cx + w * 0.1, cy - h * 0.06, h * 0.07, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + w * 0.03, cy - h * 0.06);
      ctx.quadraticCurveTo(cx - w * 0.15, cy, cx - w * 0.2, cy + h * 0.12);
      ctx.stroke();
    },
    qaf: () => {
      ctx.beginPath();
      ctx.arc(cx + w * 0.08, cy - h * 0.04, h * 0.09, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - w * 0.01, cy);
      ctx.quadraticCurveTo(cx - w * 0.15, cy + h * 0.1, cx - w * 0.18, cy + h * 0.2);
      ctx.stroke();
    },
    kaf: () => {
      ctx.beginPath();
      ctx.moveTo(cx - w * 0.2, cy);
      ctx.lineTo(cx + w * 0.12, cy);
      ctx.lineTo(cx + w * 0.12, h * 0.2);
      ctx.stroke();
    },
    lam: () => {
      ctx.beginPath();
      ctx.moveTo(cx, h * 0.2);
      ctx.lineTo(cx, cy);
      ctx.quadraticCurveTo(cx - w * 0.05, cy + h * 0.05, cx - w * 0.12, cy);
      ctx.stroke();
    },
    mim: () => {
      ctx.beginPath();
      ctx.arc(cx, cy - h * 0.05, h * 0.08, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, cy + h * 0.03);
      ctx.lineTo(cx, cy + h * 0.14);
      ctx.stroke();
    },
    nun: () => {
      ctx.beginPath();
      ctx.moveTo(cx + w * 0.2, cy - h * 0.03);
      ctx.quadraticCurveTo(cx, cy + h * 0.1, cx - w * 0.2, cy - h * 0.02);
      ctx.stroke();
    },
    ha_big: () => {
      ctx.beginPath();
      ctx.ellipse(cx, cy - h * 0.05, w * 0.1, h * 0.1, 0, 0, Math.PI * 2);
      ctx.stroke();
    },
    waw: () => {
      ctx.beginPath();
      ctx.arc(cx, cy - h * 0.1, h * 0.07, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, cy - h * 0.03);
      ctx.quadraticCurveTo(cx + w * 0.08, cy + h * 0.1, cx + w * 0.12, cy + h * 0.15);
      ctx.stroke();
    },
    ya: () => {
      ctx.beginPath();
      ctx.moveTo(cx + w * 0.2, cy - h * 0.02);
      ctx.quadraticCurveTo(cx, cy + h * 0.06, cx - w * 0.05, cy + h * 0.04);
      ctx.quadraticCurveTo(cx - w * 0.18, cy + h * 0.02, cx - w * 0.22, cy + h * 0.12);
      ctx.stroke();
    },
  };

  const fn = guides[letter?.id];
  if (fn) fn();
  ctx.restore();
}

export default function PracticeCanvas({ letter, onComplete }) {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [tool, setTool] = useState('draw'); // 'draw' | 'erase'
  const [brushIndex, setBrushIndex] = useState(0);
  const [brushSize, setBrushSize] = useState(18);
  const [opacity, setOpacity] = useState(1);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const lastPos = useRef(null);
  const dpr = window.devicePixelRatio || 1;

  const getCanvas = () => canvasRef.current;
  const getCtx = () => getCanvas()?.getContext('2d');

  const saveSnapshot = useCallback(() => {
    const canvas = getCanvas();
    if (!canvas) return;
    const snap = canvas.toDataURL();
    setHistory(h => [...h.slice(-20), snap]);
    setRedoStack([]);
  }, []);

  // Draw background + guidelines
  const drawBackground = useCallback((ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#F9F7F4';
    ctx.fillRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = 'rgba(0,0,0,0.04)';
    ctx.lineWidth = 1;
    const step = 20 * dpr;
    for (let x = 0; x < w; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Ghost letter
    if (letter) {
      ctx.font = `${h * 0.55}px 'Noto Naskh Arabic', serif`;
      ctx.fillStyle = 'rgba(0,0,0,0.04)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.direction = 'rtl';
      ctx.fillText(letter.letter, w / 2, h * 0.52);
    }

    drawGuideLines(ctx, letter, w, h);
  }, [letter, dpr]);

  // Init canvas
  useEffect(() => {
    const canvas = getCanvas();
    if (!canvas) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    const w = rect.width || 500;
    const h = 260;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    const ctx = getCtx();
    ctx.scale(dpr, dpr);
    drawBackground(ctx, w, h);
    setHistory([]);
    setRedoStack([]);
    setHasDrawn(false);
  }, [letter]);

  const getPos = (e) => {
    const canvas = getCanvas();
    const rect = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return { x: src.clientX - rect.left, y: src.clientY - rect.top };
  };

  const startDraw = (e) => {
    e.preventDefault();
    saveSnapshot();
    setDrawing(true);
    const pos = getPos(e);
    lastPos.current = pos;
  };

  const draw = (e) => {
    e.preventDefault();
    if (!drawing) return;
    const pos = getPos(e);
    const ctx = getCtx();
    const canvas = getCanvas();
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    if (tool === 'erase') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, brushSize * 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    } else {
      const brush = BRUSHES[brushIndex];
      ctx.globalCompositeOperation = 'source-over';
      if (lastPos.current) {
        brush.draw(ctx, pos.x, pos.y, lastPos.current.x, lastPos.current.y, brushSize, opacity, '#0D0D0D');
      }
    }
    lastPos.current = pos;
    setHasDrawn(true);
  };

  const endDraw = (e) => {
    e.preventDefault();
    setDrawing(false);
    lastPos.current = null;
    ctx_reset();
  };

  const ctx_reset = () => {
    const ctx = getCtx();
    if (ctx) {
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      ctx.filter = 'none';
    }
  };

  const undo = () => {
    if (history.length === 0) return;
    const canvas = getCanvas();
    const ctx = getCtx();
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    const current = canvas.toDataURL();
    setRedoStack(r => [...r, current]);
    const prev = history[history.length - 1];
    setHistory(h2 => h2.slice(0, -1));
    const img = new Image();
    img.onload = () => {
      drawBackground(ctx, w, h);
      ctx.drawImage(img, 0, 0, w, h);
    };
    img.src = prev;
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const canvas = getCanvas();
    const ctx = getCtx();
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    const current = canvas.toDataURL();
    setHistory(h2 => [...h2, current]);
    const next = redoStack[redoStack.length - 1];
    setRedoStack(r => r.slice(0, -1));
    const img = new Image();
    img.onload = () => {
      drawBackground(ctx, w, h);
      ctx.drawImage(img, 0, 0, w, h);
    };
    img.src = next;
  };

  const clearCanvas = () => {
    const canvas = getCanvas();
    const ctx = getCtx();
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    saveSnapshot();
    drawBackground(ctx, w, h);
    setHasDrawn(false);
  };

  return (
    <div className="sys-window overflow-hidden">
      <div className="sys-titlebar">
        <span className="sys-titlebar-dot" />
        <span>Practice Canvas</span>
        <span className="ml-auto label-mono" style={{ color: 'var(--ink-faint)' }}>
          {BRUSHES[brushIndex].nameAr}
        </span>
      </div>

      {/* Toolbar */}
      <div className="border-b" style={{ borderColor: 'var(--rule)', background: 'var(--paper-dark)' }}>

        {/* Row 1: Brush selector */}
        <div className="flex gap-1 px-3 pt-2 pb-1 flex-wrap">
          {BRUSHES.map((b, i) => (
            <button
              key={b.id}
              onClick={() => { setBrushIndex(i); setTool('draw'); }}
              className="px-2 py-1 transition-all"
              style={{
                fontFamily: 'Space Mono',
                fontSize: 9,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: brushIndex === i && tool === 'draw' ? 'var(--ink)' : 'transparent',
                color: brushIndex === i && tool === 'draw' ? 'var(--paper)' : 'var(--ink-mid)',
                border: '1px solid',
                borderColor: brushIndex === i && tool === 'draw' ? 'var(--ink)' : 'var(--rule)',
              }}
              title={b.description}
            >
              {b.name}
            </button>
          ))}
          <button
            onClick={() => setTool('erase')}
            className="px-2 py-1 transition-all flex items-center gap-1"
            style={{
              fontFamily: 'Space Mono',
              fontSize: 9,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              background: tool === 'erase' ? 'var(--zzz-yellow)' : 'transparent',
              color: tool === 'erase' ? 'var(--ink)' : 'var(--ink-mid)',
              border: '1px solid',
              borderColor: tool === 'erase' ? 'var(--zzz-yellow)' : 'var(--rule)',
            }}
          >
            <Eraser className="w-3 h-3" /> Erase
          </button>
        </div>

        {/* Row 2: Controls */}
        <div className="flex items-center gap-4 px-3 pb-2 flex-wrap">
          {/* Pen Size */}
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

          {/* Opacity */}
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

          {/* Undo / Redo / Clear */}
          <div className="flex items-center gap-1 ml-auto">
            <button onClick={undo} disabled={history.length === 0}
              className="w-7 h-7 flex items-center justify-center border transition-colors"
              style={{ borderColor: 'var(--rule)', opacity: history.length === 0 ? 0.3 : 1 }}
              title="Undo">
              <Undo2 className="w-3.5 h-3.5" style={{ color: 'var(--ink)' }} />
            </button>
            <button onClick={redo} disabled={redoStack.length === 0}
              className="w-7 h-7 flex items-center justify-center border transition-colors"
              style={{ borderColor: 'var(--rule)', opacity: redoStack.length === 0 ? 0.3 : 1 }}
              title="Redo">
              <Redo2 className="w-3.5 h-3.5" style={{ color: 'var(--ink)' }} />
            </button>
            <button onClick={clearCanvas}
              className="w-7 h-7 flex items-center justify-center border transition-colors"
              style={{ borderColor: 'var(--rule)' }}
              title="Clear">
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