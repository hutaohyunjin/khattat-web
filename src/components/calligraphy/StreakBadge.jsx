import React from 'react';
import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StreakBadge({ streak }) {
  if (!streak || streak < 1) return null;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex items-center gap-1.5 px-3 py-1.5 zzz-clip-corner text-xs font-bold tracking-widest font-heading"
      style={{ background: '#F5C940', color: '#0D0F14', boxShadow: '0 0 12px rgba(245,201,64,0.4)' }}
    >
      <Flame className="w-3.5 h-3.5" />
      <span>{streak}D</span>
    </motion.div>
  );
}