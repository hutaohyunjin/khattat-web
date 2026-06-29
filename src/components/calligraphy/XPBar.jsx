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
      <div className="flex items-end justify-between">
        <div>
          <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'var(--ink-mid)' }}>Current Rank</p>
          <p className="font-display text-2xl leading-tight uppercase" style={{ color: 'var(--ink)' }}>{title}</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'var(--ink-mid)' }}>Level</p>
          <p className="font-mono text-xl font-bold" style={{ color: 'var(--ink)' }}>{String(level).padStart(2,'0')}</p>
        </div>
      </div>
      <div className="h-px w-full" style={{ background: 'var(--rule)' }} />
      <div className="h-1 w-full" style={{ background: 'var(--paper-dark)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="h-full"
          style={{ background: 'var(--zzz-yellow)' }}
        />
      </div>
      <div className="flex justify-between">
        <span className="font-mono text-[9px]" style={{ color: 'var(--ink-mid)' }}>{current} XP</span>
        <span className="font-mono text-[9px]" style={{ color: 'var(--ink-faint)' }}>{needed} XP</span>
      </div>
    </div>
  );
}