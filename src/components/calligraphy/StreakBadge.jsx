import React from 'react';

export default function StreakBadge({ streak }) {
  if (!streak || streak < 1) return null;
  return (
    <div className="flex items-center gap-1.5 px-2 py-1 border border-ink">
      <span className="font-mono text-[10px] font-bold" style={{ color: 'var(--ink)' }}>
        {streak}d streak
      </span>
    </div>
  );
}