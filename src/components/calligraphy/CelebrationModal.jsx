import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const GIFS = [
  'https://media.base44.com/images/public/6a41bd2ca6771bd95aa5d5f2/80f884608_mozai-mo-zai.gif',
  'https://media.base44.com/images/public/6a41bd2ca6771bd95aa5d5f2/5a177f071_happy-catto.gif',
];

export default function CelebrationModal({ show, xp, title, onContinue, onHome }) {
  const gifRef = useRef(GIFS[Math.floor(Math.random() * GIFS.length)]);

  useEffect(() => {
    if (!show) return;
    gifRef.current = GIFS[Math.floor(Math.random() * GIFS.length)];

    const duration = 3000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF4D00', '#1C2333', '#FF6B2B', '#FFFFFF'],
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF4D00', '#1C2333', '#FF6B2B', '#FFFFFF'],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-5"
          style={{ background: 'rgba(28,35,51,0.7)', backdropFilter: 'blur(4px)' }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="w-full max-w-sm"
          >
            <div className="sys-window overflow-hidden">
              <div className="sys-titlebar">
                <span className="sys-titlebar-dot" />
                <span>Mission Complete</span>
              </div>

              {/* GIF */}
              <div className="flex justify-center pt-6 px-6">
                <img
                  src={gifRef.current}
                  alt="Celebration"
                  className="w-36 h-36 object-cover rounded-sm"
                  style={{ border: '2px solid var(--zzz-yellow)' }}
                />
              </div>

              {/* Text */}
              <div className="p-6 text-center">
                <p className="label-mono mb-2" style={{ color: 'var(--zzz-yellow-dim)' }}>Congratulations!</p>
                <h2 className="display-lg mb-1">{title}</h2>
                <p style={{ fontFamily: 'Barlow', fontSize: 14, color: 'var(--ink-mid)', marginTop: 4 }}>
                  Lesson completed!
                </p>
                {xp > 0 && (
                  <p className="font-mono text-2xl font-bold mt-4" style={{ color: 'var(--ink)' }}>
                    +{xp} xp
                  </p>
                )}
              </div>

              <div className="rule-h" />
              <div className="flex">
                <button
                  onClick={onHome}
                  className="flex-1 py-4 font-mono text-[11px] tracking-wider border-r hover:bg-paper-dark transition-colors"
                  style={{ borderColor: 'var(--rule)', color: 'var(--ink-mid)' }}
                >
                  ← Home
                </button>
                <button
                  onClick={onContinue}
                  className="flex-1 py-4 font-mono text-[11px] tracking-wider transition-colors"
                  style={{ background: 'var(--ink)', color: 'var(--paper)' }}
                >
                  Continue →
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}