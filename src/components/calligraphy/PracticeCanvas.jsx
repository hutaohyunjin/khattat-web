import React, { useRef, useState, useEffect, useCallback } from 'react';
import { RotateCcw, Check } from 'lucide-react';

export default function PracticeCanvas({ letter, onComplete }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const lastPoint = useRef(null);
  const lastAngle = useRef(0);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    const ctx = canvas.getContext('2d');
    ctx.scale(2, 2);
    drawGuide(ctx, rect.width, rect.height);
  }, [letter]);

  useEffect(() => { setupCanvas(); }, [setupCanvas]);

  function drawGuide(ctx, w, h) {
    ctx.fillStyle = '#EEF1F5';
    ctx.fillRect(0, 0, w, h);

    // Dither dots
    for (let x = 0; x < w; x += 4) {
      for (let y = 0; y < h; y += 4) {
        ctx.fillStyle = 'rgba(140,160,185,0.15)';
        ctx.fillRect(x, y, 1, 1);
      }
    }

    const baselineY = h * 0.62;

    // Guide lines
    ctx.strokeStyle = 'rgba(188,197,211,0.9)';
    ctx.lineWidth = 0.5;
    ctx.setLineDash([4, 6]);
    for (let i = -4; i <= 4; i++) {
      if (i === 0) continue;
      const y = baselineY + i * (h * 0.08);
      ctx.beginPath(); ctx.moveTo(16, y); ctx.lineTo(w - 16, y); ctx.stroke();
    }
    ctx.setLineDash([]);

    // Baseline solid
    ctx.strokeStyle = '#0F1520';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(16, baselineY); ctx.lineTo(w - 16, baselineY); ctx.stroke();

    // Ghost letter
    ctx.font = `${h * 0.48}px "Noto Naskh Arabic", "Amiri", serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(15,21,32,0.07)';
    ctx.direction = 'rtl';
    ctx.fillText(letter.letter, w / 2, baselineY - h * 0.06);

    // Label
    ctx.font = '9px "Space Mono", monospace';
    ctx.fillStyle = 'rgba(15,21,32,0.3)';
    ctx.textAlign = 'left';
    ctx.direction = 'ltr';
    ctx.fillText('BASELINE', 18, baselineY - 7);
  }

  function getPos(e) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  function startDraw(e) {
    e.preventDefault();
    setIsDrawing(true);
    setHasDrawn(true);
    lastPoint.current = getPos(e);
    lastAngle.current = 0;
  }

  function draw(e) {
    e.preventDefault();
    if (!isDrawing || !lastPoint.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getPos(e);
    const dx = pos.x - lastPoint.current.x;
    const dy = pos.y - lastPoint.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 0.5) return;

    // Calligraphy nib angle: fixed ~40° like a held reed pen
    const nibAngle = Math.PI * 0.22; // ~40 degrees
    const perpX = Math.cos(nibAngle);
    const perpY = Math.sin(nibAngle);

    // Stroke width = projection of movement onto nib perpendicular axis
    // Thick when moving perpendicular to nib, thin when moving along nib
    const movAngle = Math.atan2(dy, dx);
    const angleDiff = Math.abs(Math.cos(movAngle - nibAngle));
    const minWidth = 1.0;
    const maxWidth = 9.0;
    const lineWidth = minWidth + (maxWidth - minWidth) * angleDiff;

    // Draw calligraphic stroke as a filled polygon (nib shape)
    const halfW = lineWidth / 2;
    const ox = perpX * halfW;
    const oy = perpY * halfW;

    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x - ox, lastPoint.current.y - oy);
    ctx.lineTo(lastPoint.current.x + ox, lastPoint.current.y + oy);
    ctx.lineTo(pos.x + ox, pos.y + oy);
    ctx.lineTo(pos.x - ox, pos.y - oy);
    ctx.closePath();
    ctx.fillStyle = '#0F1520';
    ctx.fill();

    lastPoint.current = pos;
  }

  function stopDraw() {
    setIsDrawing(false);
    lastPoint.current = null;
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGuide(ctx, rect.width, rect.height);
    setHasDrawn(false);
  }

  return (
    <div className="sys-window">
      <div className="sys-titlebar">
        <span className="sys-titlebar-dot" />
        <span>Practice Canvas — {letter.name}</span>
        <span className="ml-auto font-mono text-[9px] opacity-50">Calligraphy Nib · 40°</span>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full touch-none cursor-crosshair"
        style={{ height: 280, display: 'block' }}
        onMouseDown={startDraw} onMouseMove={draw} onMouseUp={stopDraw} onMouseLeave={stopDraw}
        onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={stopDraw}
      />
      <div className="flex border-t" style={{ borderColor: 'var(--ink)' }}>
        <button onClick={clearCanvas}
          className="flex-1 flex items-center justify-center gap-2 py-3 font-mono text-[11px] tracking-wider border-r transition-colors hover:bg-paper-dark"
          style={{ borderColor: 'var(--rule)', color: 'var(--ink-mid)' }}>
          <RotateCcw className="w-3.5 h-3.5" /> Clear
        </button>
        <button onClick={onComplete} disabled={!hasDrawn}
          className="flex-1 flex items-center justify-center gap-2 py-3 font-mono text-[11px] tracking-wider transition-colors"
          style={{
            background: hasDrawn ? 'var(--ink)' : 'transparent',
            color: hasDrawn ? 'var(--paper)' : 'var(--ink-faint)',
            cursor: hasDrawn ? 'pointer' : 'not-allowed',
          }}>
          <Check className="w-3.5 h-3.5" /> Done
        </button>
      </div>
    </div>
  );
}