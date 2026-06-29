import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Pen, Trophy, ChevronRight, Sparkles, Zap } from 'lucide-react';
import NavBar from '@/components/calligraphy/NavBar';
import XPBar from '@/components/calligraphy/XPBar';
import StreakBadge from '@/components/calligraphy/StreakBadge';
import LessonCard from '@/components/calligraphy/LessonCard';
import { useProgress } from '@/hooks/useProgress';
import { lessons } from '@/lib/calligraphyData';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { progress, loading } = useProgress();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0D0F14' }}>
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto" style={{ borderColor: '#F5C940', borderTopColor: 'transparent' }} />
          <p className="text-xs tracking-widest font-heading" style={{ color: '#555B6E' }}>LOADING...</p>
        </div>
      </div>
    );
  }

  const completedLessons = progress?.completed_lessons || [];
  const nextLessonIndex = completedLessons.length;
  const nextLesson = lessons[nextLessonIndex];

  const quickActions = [
    { to: '/styles', icon: BookOpen, label: 'STYLES', sub: 'Scripts' },
    { to: '/practice', icon: Pen, label: 'PRACTICE', sub: 'Letters' },
    { to: '/progress', icon: Trophy, label: 'RANKS', sub: 'Progress' },
  ];

  return (
    <div className="min-h-screen pb-24" style={{ background: '#0D0F14' }}>
      {/* Header */}
      <div className="relative overflow-hidden px-6 pt-12 pb-8"
        style={{ background: 'linear-gradient(135deg, #0D0F14 0%, #13161D 60%, #16190F 100%)', borderBottom: '1px solid #2A2E3A' }}>

        {/* Background decoration */}
        <div className="absolute inset-0 zzz-stripe pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
          style={{ background: 'radial-gradient(circle at top right, rgba(245,201,64,0.06) 0%, transparent 70%)' }} />

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-0.5" style={{ background: '#F5C940' }} />
          <div className="absolute top-0 right-0 w-0.5 h-full" style={{ background: '#F5C940' }} />
        </div>

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5" style={{ background: '#F5C940' }} />
                <p className="text-[10px] tracking-widest font-bold font-heading" style={{ color: '#F5C940' }}>WELCOME BACK</p>
              </div>
              <h1 className="text-3xl font-bold font-heading tracking-wide" style={{ color: '#F0F0F0' }}>
                KHAT<span style={{ color: '#F5C940' }}>TAT</span>
              </h1>
              <p className="text-xs tracking-widest mt-0.5 font-heading" style={{ color: '#555B6E' }}>
                الخَطَّاط · ARABIC CALLIGRAPHY
              </p>
            </div>
            <StreakBadge streak={progress?.current_streak} />
          </div>

          {/* XP Panel */}
          <div className="p-4 zzz-clip-corner" style={{ background: '#13161D', border: '1px solid #2A2E3A' }}>
            <XPBar totalXP={progress?.total_xp} />
          </div>
        </motion.div>
      </div>

      <div className="max-w-lg mx-auto px-6 mt-6 space-y-6">

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3">
          {quickActions.map(({ to, icon: Icon, label, sub }) => (
            <Link
              key={to}
              to={to}
              className="flex flex-col items-center gap-2 p-4 group transition-all zzz-clip-corner"
              style={{ background: '#13161D', border: '1px solid #2A2E3A' }}
            >
              <Icon className="w-5 h-5 transition-colors" style={{ color: '#F5C940' }} />
              <div className="text-center">
                <p className="text-[10px] font-bold tracking-widest font-heading" style={{ color: '#F0F0F0' }}>{label}</p>
                <p className="text-[9px] tracking-wider font-heading" style={{ color: '#555B6E' }}>{sub}</p>
              </div>
            </Link>
          ))}
        </motion.div>

        {/* Continue Learning */}
        {nextLesson && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5" style={{ background: '#F5C940' }} />
              <h2 className="text-xs font-bold tracking-widest font-heading" style={{ color: '#888EA8' }}>CONTINUE MISSION</h2>
            </div>
            <button
              onClick={() => navigate(`/lesson/${nextLesson.id}`)}
              className="w-full text-left transition-all relative overflow-hidden zzz-clip-corner-lg group"
              style={{ background: '#13161D', border: '1px solid rgba(245,201,64,0.3)', boxShadow: '0 0 20px rgba(245,201,64,0.08)' }}
            >
              {/* Glow overlay on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'linear-gradient(135deg, rgba(245,201,64,0.04), transparent)' }} />

              <div className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(245,201,64,0.12)', clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}>
                  <Zap className="w-5 h-5" style={{ color: '#F5C940' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] tracking-widest font-bold font-heading mb-0.5" style={{ color: '#F5C940' }}>NEXT LESSON</p>
                  <p className="font-bold text-sm font-heading tracking-wide truncate" style={{ color: '#F0F0F0' }}>
                    {nextLesson.title.toUpperCase()}
                  </p>
                  <p className="text-xs mt-0.5 truncate" style={{ color: '#555B6E' }}>{nextLesson.description}</p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="text-[10px] font-bold font-heading" style={{ color: '#F5C940' }}>+{nextLesson.xpReward}XP</span>
                  <ChevronRight className="w-4 h-4" style={{ color: '#F5C940' }} />
                </div>
              </div>

              {/* Bottom accent */}
              <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, #F5C940, transparent)' }} />
            </button>
          </motion.div>
        )}

        {/* Lesson Path */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5" style={{ background: '#F5C940' }} />
            <h2 className="text-xs font-bold tracking-widest font-heading" style={{ color: '#888EA8' }}>MISSION BOARD</h2>
            <div className="flex-1 h-px ml-2" style={{ background: 'linear-gradient(90deg, #2A2E3A, transparent)' }} />
          </div>
          <div className="space-y-0">
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