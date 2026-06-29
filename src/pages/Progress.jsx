import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Star, BookOpen, Pen, Target } from 'lucide-react';
import NavBar from '@/components/calligraphy/NavBar';
import XPBar from '@/components/calligraphy/XPBar';
import { useProgress } from '@/hooks/useProgress';
import { thuluthLetters, lessons, levelTitles, getLevelFromXP } from '@/lib/calligraphyData';
import { base44 } from '@/api/base44Client';

export default function Progress() {
  const { progress, loading } = useProgress();
  const [completions, setCompletions] = useState([]);

  useEffect(() => {
    base44.entities.LessonCompletion.list('-created_date', 10).then(setCompletions).catch(() => {});
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen dither-bg flex items-center justify-center">
        <p className="font-mono text-[11px] tracking-widest uppercase" style={{ color: 'var(--ink-mid)' }}>Loading...</p>
      </div>
    );
  }

  const totalLetters = thuluthLetters.length;
  const masteredCount = (progress?.mastered_letters || []).length;
  const completedLessonsCount = (progress?.completed_lessons || []).length;
  const totalLessons = lessons.length;
  const level = getLevelFromXP(progress?.total_xp || 0);
  const title = levelTitles[Math.min(level - 1, levelTitles.length - 1)];

  const stats = [
    { label: 'Total XP', value: progress?.total_xp || 0 },
    { label: 'Streak', value: `${progress?.current_streak || 0}d` },
    { label: 'Best Streak', value: `${progress?.longest_streak || 0}d` },
    { label: 'Lessons', value: `${completedLessonsCount}/${totalLessons}` },
    { label: 'Letters', value: `${masteredCount}/${totalLetters}` },
    { label: 'Level', value: String(level).padStart(2, '0') },
  ];

  return (
    <div className="min-h-screen pb-24 dither-bg">
      {/* Top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between px-5 py-2"
        style={{ background: 'var(--ink)', color: 'var(--zzz-yellow)', borderBottom: '2px solid var(--zzz-yellow)' }}>
        <span className="font-mono text-[11px] tracking-widest" style={{ color: 'var(--zzz-yellow)' }}>✦ KHATTAT</span>
        <span className="font-mono text-[10px]" style={{ color: 'var(--zzz-yellow-dim)' }}>Ranks</span>
      </div>

      <div className="max-w-lg mx-auto px-5">
        {/* Hero */}
        <div className="pt-10 pb-8 border-b" style={{ borderColor: 'var(--ink)' }}>
          <p className="label-mono mb-3">Rank Status</p>
          <h1 className="display-xl mb-1">{title}</h1>
          <p className="font-mono text-sm" style={{ color: 'var(--ink-mid)' }}>Level {String(level).padStart(2,'0')}</p>
        </div>

        {/* XP Bar */}
        <div className="mt-6 sys-window">
          <div className="sys-titlebar">
            <span className="sys-titlebar-dot" />
            <span>Experience</span>
          </div>
          <div className="p-5">
            <XPBar totalXP={progress?.total_xp} />
          </div>
        </div>

        {/* Stats table */}
        <div className="mt-5 sys-window">
          <div className="sys-titlebar">
            <span className="sys-titlebar-dot" />
            <span>Statistics</span>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr auto',
            gap: 12, padding: '5px 12px',
            borderBottom: '1px solid var(--rule)', background: 'var(--paper-dark)',
          }}>
            <span className="label-mono">Metric</span>
            <span className="label-mono">Value</span>
          </div>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="data-row"
              style={{ gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 12, paddingTop: 12, paddingBottom: 12 }}
            >
              <span className="font-heading font-medium text-sm" style={{ color: 'var(--ink)' }}>{stat.label}</span>
              <span className="font-mono text-sm font-bold" style={{ color: 'var(--zzz-yellow-dim)' }}>{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Letter mastery grid */}
        <div className="mt-5 sys-window">
          <div className="sys-titlebar">
            <span className="sys-titlebar-dot" />
            <span>Letter Mastery — {masteredCount}/{totalLetters}</span>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-7 gap-1">
              {thuluthLetters.map(letter => {
                const isMastered = (progress?.mastered_letters || []).includes(letter.id);
                return (
                  <div
                    key={letter.id}
                    title={letter.name}
                    className="aspect-square flex items-center justify-center text-lg border transition-colors"
                    style={{
                      fontFamily: "'Noto Naskh Arabic', serif",
                      background: isMastered ? 'var(--ink)' : 'var(--paper)',
                      borderColor: isMastered ? 'var(--zzz-yellow)' : 'var(--rule)',
                      color: isMastered ? 'var(--zzz-yellow)' : 'var(--ink-faint)',
                    }}
                    dir="rtl"
                  >
                    {letter.letter}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-6 mt-4">
              <span className="flex items-center gap-2 label-mono">
                <span className="w-3 h-3 inline-block" style={{ background: 'var(--ink)' }} /> Mastered
              </span>
              <span className="flex items-center gap-2 label-mono">
                <span className="w-3 h-3 inline-block border" style={{ borderColor: 'var(--rule)' }} /> Locked
              </span>
            </div>
          </div>
        </div>

        {/* Recent activity */}
        {completions.length > 0 && (
          <div className="mt-5 sys-window mb-8">
            <div className="sys-titlebar">
              <span className="sys-titlebar-dot" />
              <span>Recent Activity</span>
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr auto',
              gap: 12, padding: '5px 12px',
              borderBottom: '1px solid var(--rule)', background: 'var(--paper-dark)',
            }}>
              <span className="label-mono">Lesson</span>
              <span className="label-mono">XP</span>
            </div>
            {completions.map(c => (
              <div
                key={c.id}
                className="data-row"
                style={{ gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 12, paddingTop: 10, paddingBottom: 10 }}
              >
                <div>
                  <p className="font-heading font-medium text-sm" style={{ color: 'var(--ink)' }}>
                    {c.letter_id ? thuluthLetters.find(l => l.id === c.letter_id)?.name || c.lesson_id : c.lesson_id}
                  </p>
                  <p className="font-mono text-[10px]" style={{ color: 'var(--ink-faint)' }}>
                    {new Date(c.completed_at || c.created_date).toLocaleDateString()}
                  </p>
                </div>
                <span className="font-mono text-xs font-bold" style={{ color: 'var(--zzz-yellow-dim)' }}>+{c.xp_earned}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <NavBar />
    </div>
  );
}