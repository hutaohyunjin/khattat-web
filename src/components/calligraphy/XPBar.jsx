import React from 'react';
import { getXPForNextLevel, levelTitles, getLevelFromXP } from '@/lib/calligraphyData';
import { motion } from 'framer-motion';

export default function XPBar({ totalXP }) {
  const xp = totalXP || 0;
  const level = getLevelFromXP(xp);
  const { current, needed, progress } = getXPForNextLevel(xp);
  const title = levelTitles[Math.min(level - 1, levelTitles.length - 1)];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 flex items-center justify-center font-display font-bold text-sm zzz-clip-corner"
            style={{ background: '#F5C940', color: '#0D0F14' }}
          >
            {level}
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest font-heading" style={{ color: '#F5C940' }}>LV.{level}</p>
            <p className="text-[10px] font-medium tracking-wider" style={{ color: '#888EA8' }}>{title.toUpperCase()}</p>
          </div>
        </div>
        <p className="text-xs font-mono" style={{ color: '#F5C940' }}>{current}<span style={{ color: '#555B6E' }}>/{needed}</span></p>
      </div>
      <div className="h-1.5 rounded-none overflow-hidden" style={{ background: '#1A1E27' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full"
          style={{ background: 'linear-gradient(90deg, #C9A030, #F5C940)', boxShadow: '0 0 8px rgba(245,201,64,0.5)' }}
        />
      </div>
    </div>
  );
}