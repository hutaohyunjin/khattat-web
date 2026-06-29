import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import NavBar from '@/components/calligraphy/NavBar';
import XPBar from '@/components/calligraphy/XPBar';
import StreakBadge from '@/components/calligraphy/StreakBadge';
import LessonCard from '@/components/calligraphy/LessonCard';
import { useProgress } from '@/hooks/useProgress';
import { lessons } from '@/lib/calligraphyData';

export default function Home() {
  const { progress, loading } = useProgress();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen dither-bg flex items-center justify-center">
        <p className="font-mono text-[11px] tracking-widest uppercase" style={{ color: 'var(--ink-mid)' }}>Loading...</p>
      </div>
    );
  }

  const completedLessons = progress?.completed_lessons || [];
  const nextLessonIndex = completedLessons.length;
  const nextLesson = lessons[nextLessonIndex];
  const totalXP = progress?.total_xp || 0;

  return (
    <div className="min-h-screen pb-24 dither-bg">

      {/* Top bar — system menubar */}
      <div className="sticky top-0 z-40 flex items-center justify-between px-5 py-2"
        style={{ background: 'var(--ink)', color: 'var(--zzz-yellow)', borderBottom: '2px solid var(--zzz-yellow)' }}>
        <span className="font-mono text-[11px] tracking-widest">✦ KHATTAT</span>
        <div className="flex items-center gap-4">
          <StreakBadge streak={progress?.current_streak} />
          <span className="font-mono text-[10px]" style={{ color: 'var(--zzz-yellow-dim)' }}>
          {new Date().toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-5">

        {/* Hero — big display type */}
        <div className="pt-10 pb-8 border-b" style={{ borderColor: 'var(--ink)' }}>
          <p className="label-mono mb-3">Arabic Calligraphy Training</p>
          <h1 className="display-xl mb-4">
            The<br />
            <em style={{ fontStyle: 'italic', color: 'var(--ink-mid)' }}>Art of</em><br />
            Khatt
          </h1>
          <p className="font-heading text-sm leading-relaxed max-w-xs font-semibold" style={{ color: 'var(--ink)' }}>
            Master classical Arabic scripts through structured lessons and guided practice.
          </p>
        </div>

        {/* XP / Rank panel */}
        <div className="mt-6 sys-window">
          <div className="sys-titlebar">
            <span className="sys-titlebar-dot" />
            <span>Rank Progress</span>
          </div>
          <div className="p-4">
            <XPBar totalXP={totalXP} />
          </div>
        </div>

        {/* Next Mission */}
        {nextLesson && (
          <div className="mt-6 sys-window">
            <div className="sys-titlebar">
              <span className="sys-titlebar-dot" />
              <span>Next Lesson</span>
            </div>
            <button
              onClick={() => navigate(`/lesson/${nextLesson.id}`)}
              className="w-full text-left p-5 group"
              style={{ background: 'var(--paper)' }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="label-mono mb-1">Mission #{String(nextLessonIndex + 1).padStart(2, '0')}</p>
                  <p className="font-display text-2xl leading-tight" style={{ color: 'var(--ink)' }}>
                    {nextLesson.title}
                  </p>
                  <p className="font-mono text-[10px] mt-2" style={{ color: 'var(--ink-mid)' }}>
                    {nextLesson.description}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-3 flex-shrink-0">
                  <span className="font-mono text-xs px-2 py-0.5" style={{ border: '1px solid var(--zzz-yellow)', color: 'var(--zzz-yellow-dim)', background: 'var(--zzz-yellow-pale)' }}>
                    +{nextLesson.xpReward}xp
                  </span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" style={{ color: 'var(--ink)' }} />
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Lesson Index */}
        <div className="mt-6 sys-window mb-8">
          <div className="sys-titlebar">
            <span className="sys-titlebar-dot" />
            <span>Mission Board · {completedLessons.length}/{lessons.length} Complete</span>
          </div>
          {/* Column headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2.5rem 1fr auto auto',
            gap: '12px',
            padding: '6px 12px',
            borderBottom: '1px solid var(--rule)',
            background: 'var(--paper-dark)',
          }}>
            <span className="label-mono">#</span>
            <span className="label-mono">Lesson</span>
            <span className="label-mono">XP</span>
            <span className="label-mono" style={{ minWidth: 14 }}></span>
          </div>
          <div>
            {lessons.map((lesson, i) => {
              const isCompleted = completedLessons.includes(lesson.id);
              const isLocked = i > 0 && !completedLessons.includes(lessons[i - 1].id) && !isCompleted;
              return (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  index={i}
                  isCompleted={isCompleted}
                  isLocked={isLocked}
                  onClick={() => navigate(`/lesson/${lesson.id}`)}
                />
              );
            })}
          </div>
        </div>
      </div>

      <NavBar />
    </div>
  );
}