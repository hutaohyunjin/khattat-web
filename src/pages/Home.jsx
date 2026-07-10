import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import NavBar from '@/components/calligraphy/NavBar';
import XPBar from '@/components/calligraphy/XPBar';
import { useProgress } from '@/hooks/useProgress';
import { lessons } from '@/lib/calligraphyData';

export default function Home() {
  const { progress, loading } = useProgress();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p style={{ fontFamily: 'Space Mono', fontSize: 11, letterSpacing: '0.1em', color: 'var(--ink-faint)' }}>LOADING...</p>
      </div>
    );
  }

  const completedLessons = progress?.completed_lessons || [];
  const nextLessonIndex = completedLessons.length;
  const nextLesson = lessons[nextLessonIndex];
  const totalXP = progress?.total_xp || 0;

  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      {/* Hero — two column */}
      <section className="pt-12 border-b border-rule">
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="label-mono mb-4" style={{ color: 'var(--zzz-yellow-dim)', letterSpacing: '0.2em' }}>Arabic Calligraphy Practice</p>
            <h1 className="display-xl">
              THE<br />
              <span style={{ color: 'var(--ink-mid)' }}>ART OF</span><br />
              KHATT
            </h1>
            <p className="mt-6 max-w-xs" style={{ fontFamily: 'Barlow', fontSize: 16, color: 'var(--ink-mid)', lineHeight: 1.6 }}>
              Master classical Arabic scripts through structured lessons and guided practice.
            </p>
          </div>
          {/* Calligraphy image right */}
          <div className="flex items-center justify-center md:justify-end">
            <img
              src="https://media.base44.com/images/public/6a41bd2ca6771bd95aa5d5f2/9d4aa91bc_arabickhattat.png"
              alt="خطاط"
              className="w-full object-contain"
              style={{ maxHeight: 260, maxWidth: 420 }}
            />
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left col — rank + next lesson */}
        <div className="lg:col-span-1 space-y-6">

          {/* Rank Progress */}
          <div className="sys-window">
            <div className="sys-titlebar">
              <span className="sys-titlebar-dot" />
              <span>Rank Progress</span>
            </div>
            <div className="p-5">
              <XPBar totalXP={totalXP} />
            </div>
          </div>

          {/* Next Lesson */}
          {nextLesson && (
            <div className="sys-window">
              <div className="sys-titlebar">
                <span className="sys-titlebar-dot" />
                <span>Next Lesson</span>
              </div>
              <button
                onClick={() => navigate(`/lesson/${nextLesson.id}`)}
                className="w-full text-left p-5 group hover:bg-paper-dark transition-colors"
              >
                <p className="label-mono mb-1" style={{ color: 'var(--zzz-yellow-dim)' }}>
                  Mission #{String(nextLessonIndex + 1).padStart(2, '0')}
                </p>
                <div className="flex items-start justify-between gap-3 mt-2">
                  <div>
                    <p style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 20, textTransform: 'uppercase', color: 'var(--ink)', lineHeight: 1.1 }}>
                      {nextLesson.title}
                    </p>
                    <p className="mt-1.5" style={{ fontFamily: 'Barlow', fontSize: 12, color: 'var(--ink-mid)' }}>
                      {nextLesson.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform" style={{ color: 'var(--ink-faint)' }} />
                </div>
                <span className="inline-block mt-3 px-2 py-0.5" style={{ fontFamily: 'Space Mono', fontSize: 10, border: '1px solid var(--zzz-yellow)', color: 'var(--zzz-yellow-dim)', background: 'var(--zzz-yellow-pale)', letterSpacing: 2 }}>
                  +{nextLesson.xpReward}xp
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Right col — mission board */}
        <div className="lg:col-span-2">
          <div className="sys-window">
            <div className="sys-titlebar justify-between">
              <div className="flex items-center gap-2">
                <span className="sys-titlebar-dot" />
                <span>Mission Board</span>
              </div>
              <span style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--ink-faint)' }}>
                {completedLessons.length}/{lessons.length} Complete
              </span>
            </div>

            {/* Table header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2rem 1fr 4rem 1.5rem',
              gap: 12,
              padding: '8px 16px',
              borderBottom: '1px solid var(--rule)',
              background: 'var(--paper-dark)',
            }}>
              <span style={{ fontFamily: 'Space Mono', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>#</span>
              <span style={{ fontFamily: 'Space Mono', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>Lesson</span>
              <span style={{ fontFamily: 'Space Mono', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-faint)', textAlign: 'right' }}>XP</span>
              <span />
            </div>

            {lessons.map((lesson, i) => {
              const isCompleted = completedLessons.includes(lesson.id);
              const isLocked = i > 0 && !completedLessons.includes(lessons[i - 1].id) && !isCompleted;
              return (
                <div
                  key={lesson.id}
                  className="data-row"
                  style={{
                    gridTemplateColumns: '2rem 1fr 4rem 1.5rem',
                    alignItems: 'center',
                    gap: 12,
                    paddingTop: 14,
                    paddingBottom: 14,
                    opacity: isLocked ? 0.4 : 1,
                    cursor: isLocked ? 'not-allowed' : 'pointer',
                    background: isCompleted ? 'var(--paper-dark)' : undefined,
                  }}
                  onClick={isLocked ? undefined : () => navigate(`/lesson/${lesson.id}`)}
                >
                  <span style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'var(--ink-mid)', textAlign: 'center' }}>
                    {isCompleted
                      ? <Check className="w-3.5 h-3.5 inline" style={{ color: 'var(--zzz-yellow-dim)' }} />
                      : isLocked
                        ? <Lock className="w-3 h-3 inline" style={{ color: 'var(--ink-faint)' }} />
                        : String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <p style={{ fontFamily: 'Barlow', fontWeight: 600, fontSize: 14, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {lesson.title}
                    </p>
                    <p style={{ fontFamily: 'Barlow', fontSize: 11, color: 'var(--ink-faint)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {lesson.description}
                    </p>
                  </div>
                  <span style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--zzz-yellow-dim)', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    +{lesson.xpReward}xp
                  </span>
                  {!isLocked && <ArrowRight className="w-3.5 h-3.5" style={{ color: 'var(--ink-faint)' }} />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}