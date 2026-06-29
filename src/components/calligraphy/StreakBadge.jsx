import React from 'react';

export default function StreakBadge({ streak }) {
  if (!streak || streak < 1) return null;
  return (
    <div className="flex items-center gap-1.5 px-2 py-1" style={{ border: '1px solid var(--zzz-yellow)', background: 'var(--zzz-yellow-pale)' }}>
      <span className="font-mono text-[10px] font-bold" style={{ color: 'var(--zzz-yellow)' }}>
        {streak}d streak
      </span>
    </div>
  );
}