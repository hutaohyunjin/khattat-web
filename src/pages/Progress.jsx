import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Star, BookOpen, Pen, Target, Award, Zap } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0D0F14' }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto" style={{ borderColor: '#F5C940', borderTopColor: 'transparent' }} />
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
    { icon: Star, label: 'TOTAL XP', value: progress?.total_xp || 0, color: '#F5C940' },
    { icon: Flame, label: 'STREAK', value: `${progress?.current_streak || 0}D`, color: '#F97316' },
    { icon: Trophy, label: 'BEST STREAK', value: `${progress?.longest_streak || 0}D`, color: '#A855F7' },
    { icon: BookOpen, label: 'LESSONS', value: `${completedLessonsCount}/${totalLessons}`, color: '#3B82F6' },
    { icon: Pen, label: 'LETTERS', value: `${masteredCount}/${totalLetters}`, color: '#22C55E' },
    { icon: Target, label: 'LEVEL', value: level, color: '#EF4444' }
  ];

  return (
    <div className="min-h-screen pb-24" style={{ background: '#0D0F14' }}>
      {/* Header */}
      <div className="relative overflow-hidden px-6 pt-12 pb-8"
        style={{ background: '#13161D', borderBottom: '1px solid #2A2E3A' }}>
        <div className="absolute inset-0 zzz-stripe pointer-events-none" />
        <div className="absolute top-0 right-0 w-0.5 h-16" style={{ background: '#F5C940' }} />
        <div className="absolute top-0 right-0 w-16 h-0.5" style={{ background: '#F5C940' }} />

        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-4">
            {/* Rank icon */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 flex items-center justify-center flex-shrink-0"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                background: 'linear-gradient(135deg, #C9A030, #F5C940)',
                boxShadow: '0 0 24px rgba(245,201,64,0.35)'
              }}
            >
              <Award className="w-8 h-8" style={{ color: '#0D0F14' }} />
            </motion.div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <div className="w-1.5 h-1.5" style={{ background: '#F5C940' }} />
                <p className="text-[10px] tracking-widest font-bold font-heading" style={{ color: '#F5C940' }}>RANK STATUS</p>
              </div>
              <h1 className="text-xl font-bold font-heading tracking-wider" style={{ color: '#F0F0F0' }}>
                {title.toUpperCase()}
              </h1>
              <p className="text-xs tracking-widest font-heading" style={{ color: '#555B6E' }}>LEVEL {level} CALLIGRAPHER</p>
            </div>
          </div>
          <div className="mt-5 p-4 zzz-clip-corner" style={{ background: '#0D0F14', border: '1px solid #2A2E3A' }}>
            <XPBar totalXP={progress?.total_xp} />
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 mt-6 space-y-6">

        {/* Stats Grid */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5" style={{ background: '#F5C940' }} />
            <h2 className="text-[10px] font-bold tracking-widest font-heading" style={{ color: '#888EA8' }}>STATISTICS</h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="p-4 zzz-clip-corner"
                  style={{ background: '#13161D', border: '1px solid #2A2E3A' }}
                >
                  <Icon className="w-4 h-4 mb-2" style={{ color: stat.color }} />
                  <p className="text-xl font-bold font-heading" style={{ color: '#F0F0F0' }}>{stat.value}</p>
                  <p className="text-[9px] tracking-widest font-heading mt-0.5" style={{ color: '#555B6E' }}>{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Letter Mastery */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5" style={{ background: '#F5C940' }} />
            <h2 className="text-[10px] font-bold tracking-widest font-heading" style={{ color: '#888EA8' }}>LETTER MASTERY</h2>
            <div className="flex-1 h-px ml-2" style={{ background: 'linear-gradient(90deg, #2A2E3A, transparent)' }} />
          </div>
          <div className="p-4 zzz-clip-corner" style={{ background: '#13161D', border: '1px solid #2A2E3A' }}>
            <div className="grid grid-cols-7 gap-1.5">
              {thuluthLetters.map(letter => {
                const isMastered = (progress?.mastered_letters || []).includes(letter.id);
                return (
                  <div
                    key={letter.id}
                    title={letter.name}
                    className="aspect-square flex items-center justify-center text-base transition-all"
                    style={{
                      background: isMastered ? 'rgba(34,197,94,0.1)' : '#0D0F14',
                      border: `1px solid ${isMastered ? 'rgba(34,197,94,0.3)' : '#1A1E27'}`,
                      color: isMastered ? '#4ade80' : '#2A2E3A',
                      fontFamily: "'Noto Naskh Arabic', serif",
                      boxShadow: isMastered ? '0 0 8px rgba(34,197,94,0.15)' : 'none',
                    }}
                    dir="rtl"
                  >
                    {letter.letter}
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex items-center gap-5 justify-center">
              <span className="flex items-center gap-1.5 text-[9px] tracking-widest font-heading" style={{ color: '#555B6E' }}>
                <span className="w-3 h-3" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)' }} />
                MASTERED
              </span>
              <span className="flex items-center gap-1.5 text-[9px] tracking-widest font-heading" style={{ color: '#555B6E' }}>
                <span className="w-3 h-3" style={{ background: '#0D0F14', border: '1px solid #1A1E27' }} />
                LOCKED
              </span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        {completions.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5" style={{ background: '#F5C940' }} />
              <h2 className="text-[10px] font-bold tracking-widest font-heading" style={{ color: '#888EA8' }}>RECENT ACTIVITY</h2>
              <div className="flex-1 h-px ml-2" style={{ background: 'linear-gradient(90deg, #2A2E3A, transparent)' }} />
            </div>
            <div className="space-y-2">
              {completions.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center justify-between p-3"
                  style={{ background: '#13161D', border: '1px solid #2A2E3A', clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 flex items-center justify-center"
                      style={{ background: 'rgba(245,201,64,0.1)', clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))' }}>
                      <Zap className="w-3.5 h-3.5" style={{ color: '#F5C940' }} />
                    </div>
                    <div>
                      <p className="text-xs font-bold font-heading tracking-wide" style={{ color: '#F0F0F0' }}>
                        {c.letter_id ? thuluthLetters.find(l => l.id === c.letter_id)?.name?.toUpperCase() || c.lesson_id : c.lesson_id}
                      </p>
                      <p className="text-[9px] tracking-wider font-heading" style={{ color: '#555B6E' }}>
                        {new Date(c.completed_at || c.created_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold font-heading" style={{ color: '#F5C940' }}>+{c.xp_earned} XP</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <NavBar />
    </div>
  );
}