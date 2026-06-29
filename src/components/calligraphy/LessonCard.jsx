import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Pen, Check, Lock, ChevronRight } from 'lucide-react';

export default function LessonCard({ lesson, index, isCompleted, isLocked, onClick }) {
  const icons = { BookOpen, Pen, Edit3: Pen };
  const IconComponent = icons[lesson.icon] || BookOpen;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      className="flex items-stretch gap-3 mb-2"
    >
      {/* Left icon + connector */}
      <div className="flex flex-col items-center">
        <div
          className="w-12 h-12 flex items-center justify-center flex-shrink-0"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
            background: isCompleted
              ? 'linear-gradient(135deg, #22c55e, #16a34a)'
              : isLocked
              ? '#1A1E27'
              : 'linear-gradient(135deg, #C9A030, #F5C940)',
            boxShadow: isCompleted
              ? '0 0 12px rgba(34,197,94,0.3)'
              : isLocked
              ? 'none'
              : '0 0 12px rgba(245,201,64,0.35)',
          }}
        >
          {isCompleted
            ? <Check className="w-5 h-5 text-white" />
            : isLocked
            ? <Lock className="w-4 h-4" style={{ color: '#3A3F4E' }} />
            : <IconComponent className="w-5 h-5" style={{ color: '#0D0F14' }} />
          }
        </div>
        {index < 9 && (
          <div className="w-px flex-1 mt-1" style={{ background: '#2A2E3A', minHeight: 16 }} />
        )}
      </div>

      {/* Content card */}
      <button
        onClick={isLocked ? undefined : onClick}
        disabled={isLocked}
        className="flex-1 text-left p-4 mb-1 transition-all group"
        style={{
          background: isCompleted ? 'rgba(34,197,94,0.06)' : isLocked ? '#11131A' : '#13161D',
          border: `1px solid ${isCompleted ? 'rgba(34,197,94,0.25)' : isLocked ? '#1F2230' : '#2A2E3A'}`,
          clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
          cursor: isLocked ? 'not-allowed' : 'pointer',
          opacity: isLocked ? 0.5 : 1,
        }}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-xs tracking-widest font-bold font-heading mb-0.5" style={{ color: '#555B6E' }}>
              LESSON {String(index + 1).padStart(2, '0')}
            </p>
            <h3 className="font-bold text-sm font-heading tracking-wide truncate"
              style={{ color: isCompleted ? '#4ade80' : isLocked ? '#3A3F4E' : '#F0F0F0' }}>
              {lesson.title.toUpperCase()}
            </h3>
            <p className="text-xs mt-0.5 truncate" style={{ color: isLocked ? '#2A2E3A' : '#666C82' }}>
              {lesson.description}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span
              className="text-[10px] font-bold font-heading tracking-wider px-2 py-0.5"
              style={{
                color: isCompleted ? '#4ade80' : isLocked ? '#3A3F4E' : '#F5C940',
                border: `1px solid ${isCompleted ? 'rgba(74,222,128,0.3)' : isLocked ? '#2A2E3A' : 'rgba(245,201,64,0.3)'}`,
              }}
            >
              +{lesson.xpReward}XP
            </span>
            {!isLocked && <ChevronRight className="w-4 h-4" style={{ color: isCompleted ? '#4ade80' : '#F5C940' }} />}
          </div>
        </div>
      </button>
    </motion.div>
  );
}