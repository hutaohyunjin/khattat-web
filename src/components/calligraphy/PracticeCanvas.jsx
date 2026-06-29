import React, { useRef, useState, useEffect, useCallback } from 'react';
import { RotateCcw, Check } from 'lucide-react';

export default function PracticeCanvas({ letter, onComplete }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const lastPoint = useRef(null);

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

  useEffect(() => {
    setupCanvas();
  }, [setupCanvas]);

  function drawGuide(ctx, w, h) {
    // ZZZ dark background
    ctx.fillStyle = '#0D0F14';
    ctx.fillRect(0, 0, w, h);

    // Subtle grid lines
    ctx.strokeStyle = 'rgba(42,46,58,0.8)';
    ctx.lineWidth = 0.5;
    const baselineY = h * 0.6;

    ctx.setLineDash([4, 6]);
    for (let i = 0; i < 5; i++) {
      const y = baselineY - i * (h * 0.08);
      ctx.beginPath();
      ctx.moveTo(16, y);
      ctx.lineTo(w - 16, y);
      ctx.stroke();
    }
    for (let i = 1; i < 4; i++) {
      const y = baselineY + i * (h * 0.08);
      ctx.beginPath();
      ctx.moveTo(16, y);
      ctx.lineTo(w - 16, y);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Baseline — yellow accent
    ctx.strokeStyle = 'rgba(245,201,64,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(16, baselineY);
    ctx.lineTo(w - 16, baselineY);
    ctx.stroke();

    // Ghost letter
    ctx.font = `${h * 0.5}px "Noto Naskh Arabic", "Amiri", serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(245,201,64,0.08)';
    ctx.direction = 'rtl';
    ctx.fillText(letter.letter, w / 2, baselineY - h * 0.05);

    // Baseline label
    ctx.font = '9px "Inter", system-ui';
    ctx.fillStyle = 'rgba(245,201,64,0.35)';
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
  }

  function draw(e) {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getPos(e);
    ctx.strokeStyle = '#F0F0F0';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
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
    <div className="space-y-3">
      <div className="relative overflow-hidden" style={{ border: '1px solid #2A2E3A', clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}>
        <canvas
          ref={canvasRef}
          className="w-full touch-none cursor-crosshair"
          style={{ height: 280 }}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={clearCanvas}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold tracking-widest font-heading transition-all zzz-clip-corner"
          style={{ background: '#13161D', border: '1px solid #2A2E3A', color: '#888EA8' }}
        >
          <RotateCcw className="w-3.5 h-3.5" /> CLEAR
        </button>
        <button
          onClick={onComplete}
          disabled={!hasDrawn}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold tracking-widest font-heading transition-all zzz-clip-corner"
          style={{
            background: hasDrawn ? '#F5C940' : '#13161D',
            border: hasDrawn ? 'none' : '1px solid #2A2E3A',
            color: hasDrawn ? '#0D0F14' : '#2A2E3A',
            cursor: hasDrawn ? 'pointer' : 'not-allowed',
            boxShadow: hasDrawn ? '0 0 16px rgba(245,201,64,0.25)' : 'none',
          }}
        >
          <Check className="w-3.5 h-3.5" /> DONE
        </button>
      </div>
    </div>
  );
}