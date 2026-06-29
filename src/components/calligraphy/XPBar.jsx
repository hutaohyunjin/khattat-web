import React from 'react';
import { getXPForNextLevel, levelTitles, getLevelFromXP } from '@/lib/calligraphyData';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function XPBar({ totalXP }) {
  const xp = totalXP || 0;
  const level = getLevelFromXP(xp);
  const { current, needed, progress } = getXPForNextLevel(xp);
  const title = levelTitles[Math.min(level - 1, levelTitles.length - 1)];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md">
            <Star className="w-4 h-4 text-white fill-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Level {level}</p>
            <p className="text-xs text-amber-700 font-medium">{title}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 font-medium">{current} / {needed} XP</p>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
        />
      </div>
    </div>
  );
}