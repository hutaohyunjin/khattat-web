import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Eraser, RotateCcw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    // Background
    ctx.fillStyle = '#FFFDF7';
    ctx.fillRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = '#E8E0D4';
    ctx.lineWidth = 0.5;

    // Horizontal guidelines
    const baselineY = h * 0.6;
    ctx.setLineDash([5, 5]);
    for (let i = 0; i < 5; i++) {
      const y = baselineY - i * (h * 0.08);
      ctx.beginPath();
      ctx.moveTo(20, y);
      ctx.lineTo(w - 20, y);
      ctx.stroke();
    }
    // Below baseline
    for (let i = 1; i < 4; i++) {
      const y = baselineY + i * (h * 0.08);
      ctx.beginPath();
      ctx.moveTo(20, y);
      ctx.lineTo(w - 20, y);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Baseline (solid)
    ctx.strokeStyle = '#C49B3C';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(20, baselineY);
    ctx.lineTo(w - 20, baselineY);
    ctx.stroke();

    // Ghost letter
    ctx.font = `${h * 0.5}px "Noto Naskh Arabic", "Amiri", serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(196, 155, 60, 0.12)';
    ctx.direction = 'rtl';
    ctx.fillText(letter.letter, w / 2, baselineY - h * 0.05);

    // Label
    ctx.font = '11px system-ui';
    ctx.fillStyle = '#999';
    ctx.textAlign = 'left';
    ctx.direction = 'ltr';
    ctx.fillText('baseline', 24, baselineY - 6);
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
    const pos = getPos(e);
    lastPoint.current = pos;
  }

  function draw(e) {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getPos(e);

    ctx.strokeStyle = '#1A1A2E';
    ctx.lineWidth = 3;
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
      <div className="relative rounded-2xl overflow-hidden border-2 border-amber-200 shadow-inner">
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
        <Button variant="outline" size="sm" onClick={clearCanvas} className="flex-1 gap-2">
          <RotateCcw className="w-4 h-4" /> Clear
        </Button>
        <Button
          size="sm"
          onClick={onComplete}
          disabled={!hasDrawn}
          className="flex-1 gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
        >
          <Check className="w-4 h-4" /> Done
        </Button>
      </div>
    </div>
  );
}