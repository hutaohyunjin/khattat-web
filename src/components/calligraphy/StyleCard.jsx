import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function StyleCard({ style, index, onClick }) {
  const difficultyColors = {
    Beginner: 'bg-emerald-100 text-emerald-700',
    Intermediate: 'bg-amber-100 text-amber-700',
    Advanced: 'bg-rose-100 text-rose-700'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300"
    >
      <div className="relative h-40 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${style.color}22, ${style.color}44)` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-7xl font-bold opacity-30" style={{ color: style.color, fontFamily: 'serif' }}>
            {style.nameAr}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColors[style.difficulty]}`}>
            {style.difficulty}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{style.name}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{style.nameAr}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all mt-1" />
        </div>
        <p className="text-sm text-gray-600 mt-3 line-clamp-2 leading-relaxed">{style.description}</p>
      </div>
    </motion.div>
  );
}