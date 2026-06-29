import React from 'react';
import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StreakBadge({ streak }) {
  if (!streak || streak < 1) return null;

  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg shadow-orange-200"
    >
      <Flame className="w-4 h-4" />
      <span>{streak} day{streak !== 1 ? 's' : ''}</span>
    </motion.div>
  );
}