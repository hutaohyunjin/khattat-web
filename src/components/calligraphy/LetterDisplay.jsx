import React from 'react';
import { motion } from 'framer-motion';

export default function LetterDisplay({ letter, size = 'lg', showForms = false, active = false }) {
  const sizes = {
    sm: 'text-4xl w-16 h-16',
    md: 'text-6xl w-24 h-24',
    lg: 'text-8xl w-36 h-36',
    xl: 'text-9xl w-48 h-48'
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`${sizes[size]} rounded-3xl flex items-center justify-center ${
          active
            ? 'bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-300 shadow-lg shadow-amber-100'
            : 'bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200'
        }`}
        style={{ fontFamily: "'Noto Naskh Arabic', 'Amiri', serif" }}
      >
        <span className={active ? 'text-amber-900' : 'text-gray-800'} dir="rtl">
          {letter.letter}
        </span>
      </motion.div>

      {showForms && (
        <div className="flex gap-3 mt-2">
          {Object.entries(letter.forms).map(([form, char]) => (
            <div key={form} className="text-center">
              <div
                className="w-14 h-14 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-2xl text-gray-800"
                style={{ fontFamily: "'Noto Naskh Arabic', 'Amiri', serif" }}
                dir="rtl"
              >
                {char}
              </div>
              <p className="text-[10px] text-gray-500 mt-1 capitalize">{form}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}