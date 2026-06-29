import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Pen, Check, Lock } from 'lucide-react';

export default function LessonCard({ lesson, index, isCompleted, isLocked, onClick }) {
  const icons = { BookOpen, Pen, Edit3: Pen };
  const IconComponent = icons[lesson.icon] || BookOpen;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
      className="flex items-center gap-4"
    >
      {/* Connector line */}
      <div className="flex flex-col items-center">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-all ${
            isCompleted
              ? 'bg-gradient-to-br from-emerald-400 to-emerald-600'
              : isLocked
              ? 'bg-gray-200'
              : 'bg-gradient-to-br from-amber-400 to-amber-600'
          }`}
        >
          {isCompleted ? (
            <Check className="w-6 h-6 text-white" />
          ) : isLocked ? (
            <Lock className="w-5 h-5 text-gray-400" />
          ) : (
            <IconComponent className="w-6 h-6 text-white" />
          )}
        </div>
        {index < 9 && <div className="w-0.5 h-6 bg-gray-200 mt-1" />}
      </div>

      {/* Content */}
      <button
        onClick={isLocked ? undefined : onClick}
        disabled={isLocked}
        className={`flex-1 text-left p-4 rounded-2xl border transition-all ${
          isCompleted
            ? 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
            : isLocked
            ? 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed'
            : 'bg-white border-gray-200 hover:border-amber-300 hover:shadow-md cursor-pointer'
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`font-bold text-sm ${isCompleted ? 'text-emerald-800' : isLocked ? 'text-gray-400' : 'text-gray-900'}`}>
              {lesson.title}
            </h3>
            <p className={`text-xs mt-1 ${isCompleted ? 'text-emerald-600' : isLocked ? 'text-gray-400' : 'text-gray-500'}`}>
              {lesson.description}
            </p>
          </div>
          <div className={`text-xs font-bold px-2 py-1 rounded-full ${
            isCompleted ? 'bg-emerald-200 text-emerald-700' : isLocked ? 'bg-gray-100 text-gray-400' : 'bg-amber-100 text-amber-700'
          }`}>
            +{lesson.xpReward} XP
          </div>
        </div>
      </button>
    </motion.div>
  );
}