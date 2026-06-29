import React from 'react';
import { Check, Lock, ArrowRight } from 'lucide-react';

export default function LessonCard({ lesson, index, isCompleted, isLocked, onClick }) {
  return (
    <div
      className="data-row cursor-pointer select-none"
      style={{
        gridTemplateColumns: '2.5rem 1fr auto auto',
        alignItems: 'center',
        gap: '12px',
        opacity: isLocked ? 0.35 : 1,
        cursor: isLocked ? 'not-allowed' : 'pointer',
        background: isCompleted ? 'var(--paper-dark)' : undefined,
        paddingTop: 12,
        paddingBottom: 12,
      }}
      onClick={isLocked ? undefined : onClick}
    >
      {/* Index / status */}
      <span className="font-mono text-[10px]" style={{ color: 'var(--ink-mid)' }}>
        {isCompleted ? <Check className="w-3.5 h-3.5 inline" /> : isLocked ? <Lock className="w-3 h-3 inline" /> : String(index + 1).padStart(2, '0')}
      </span>

      {/* Title + desc */}
      <div className="min-w-0">
        <p className="font-heading font-semibold text-sm truncate" style={{ color: 'var(--ink)' }}>
          {lesson.title}
        </p>
        <p className="font-mono text-[10px] truncate mt-0.5" style={{ color: 'var(--ink-mid)' }}>
          {lesson.description}
        </p>
      </div>

      {/* XP */}
      <span className="font-mono text-[10px] whitespace-nowrap" style={{ color: 'var(--zzz-yellow-dim)' }}>
        +{lesson.xpReward}xp
      </span>

      {/* Arrow */}
      {!isLocked && (
        <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--ink-faint)' }} />
      )}
    </div>
  );
}