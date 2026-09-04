import React from 'react';
import { Flame, Zap, Award, Medal, Trophy, Crown, Sparkles, Lock } from 'lucide-react';

const BADGES = [
  { days: 1,   id: 'first_mark',      name: 'First Mark',        icon: Flame,    desc: 'Practice once' },
  { days: 3,   id: 'finding_rhythm',  name: 'Finding Rhythm',    icon: Zap,      desc: '3-day streak' },
  { days: 7,   id: 'weekly_devotion', name: 'Weekly Devotion',   icon: Award,    desc: '7-day streak' },
  { days: 14,  id: 'fortnight_scribe',name: 'Fortnight Scribe',  icon: Medal,    desc: '14-day streak' },
  { days: 30,  id: 'month_of_lines',  name: 'Month of Lines',    icon: Trophy,   desc: '30-day streak' },
  { days: 60,  id: 'iron_pen',        name: 'Iron Pen',          icon: Crown,    desc: '60-day streak' },
  { days: 100, id: 'master_khattat',  name: 'Master Khattat',    icon: Sparkles, desc: '100-day streak' },
];

export default function Badges({ longestStreak }) {
  const streak = longestStreak || 0;
  const unlockedCount = BADGES.filter(b => streak >= b.days).length;

  return (
    <div className="sys-window mt-8 mb-12">
      <div className="sys-titlebar justify-between">
        <div className="flex items-center gap-2">
          <span className="sys-titlebar-dot" />
          <span>Streak Milestones</span>
        </div>
        <span style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--ink-faint)' }}>
          {unlockedCount}/{BADGES.length} Unlocked
        </span>
      </div>

      <div className="p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {BADGES.map(badge => {
          const unlocked = streak >= badge.days;
          const Icon = badge.icon;
          return (
            <div
              key={badge.id}
              className="flex flex-col items-center text-center p-4 border transition-all"
              style={{
                borderColor: unlocked ? 'var(--zzz-yellow)' : 'var(--rule)',
                background: unlocked ? 'var(--zzz-yellow-pale)' : 'var(--paper)',
                opacity: unlocked ? 1 : 0.45,
              }}
            >
              <div
                className="w-11 h-11 flex items-center justify-center mb-3"
                style={{
                  border: '1.5px solid',
                  borderColor: unlocked ? 'var(--zzz-yellow)' : 'var(--rule)',
                  background: unlocked ? 'var(--paper)' : 'transparent',
                }}
              >
                {unlocked
                  ? <Icon className="w-5 h-5" style={{ color: 'var(--zzz-yellow-dim)' }} />
                  : <Lock className="w-3.5 h-3.5" style={{ color: 'var(--ink-faint)' }} />}
              </div>
              <p style={{
                fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 13,
                textTransform: 'uppercase', letterSpacing: '0.04em',
                color: unlocked ? 'var(--ink)' : 'var(--ink-mid)', lineHeight: 1.1,
              }}>
                {badge.name}
              </p>
              <p className="mt-1" style={{
                fontFamily: 'Space Mono', fontSize: 9, letterSpacing: '0.08em',
                color: unlocked ? 'var(--zzz-yellow-dim)' : 'var(--ink-faint)',
              }}>
                {badge.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}