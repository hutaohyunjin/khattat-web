import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Star, BookOpen, Pen, Target, Award } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-white">
        <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin" />
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
    { icon: Star, label: 'Total XP', value: progress?.total_xp || 0, color: 'text-amber-500', bg: 'bg-amber-50' },
    { icon: Flame, label: 'Current Streak', value: `${progress?.current_streak || 0} days`, color: 'text-orange-500', bg: 'bg-orange-50' },
    { icon: Trophy, label: 'Longest Streak', value: `${progress?.longest_streak || 0} days`, color: 'text-purple-500', bg: 'bg-purple-50' },
    { icon: BookOpen, label: 'Lessons Done', value: `${completedLessonsCount}/${totalLessons}`, color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: Pen, label: 'Letters Mastered', value: `${masteredCount}/${totalLetters}`, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { icon: Target, label: 'Level', value: level, color: 'text-rose-500', bg: 'bg-rose-50' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/30 to-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] text-white px-6 pt-12 pb-8 rounded-b-[2rem]">
        <div className="max-w-lg mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-amber-900/20"
          >
            <Award className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold mt-4">{title}</h1>
          <p className="text-white/50 text-sm mt-1">Level {level}</p>
          <div className="mt-4 bg-white/10 rounded-2xl p-4">
            <XPBar totalXP={progress?.total_xp} />
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 mt-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
              >
                <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center mb-2`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Letter Mastery Grid */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Letter Mastery</h2>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="grid grid-cols-7 gap-2">
              {thuluthLetters.map(letter => {
                const isMastered = (progress?.mastered_letters || []).includes(letter.id);
                return (
                  <div
                    key={letter.id}
                    className={`aspect-square rounded-xl flex items-center justify-center text-lg transition-all ${
                      isMastered
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : 'bg-gray-50 text-gray-300 border border-gray-100'
                    }`}
                    style={{ fontFamily: "'Noto Naskh Arabic', serif" }}
                    dir="rtl"
                    title={letter.name}
                  >
                    {letter.letter}
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex items-center gap-4 justify-center text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-200" /> Mastered
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-gray-50 border border-gray-100" /> Not yet
              </span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        {completions.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Recent Activity</h2>
            <div className="space-y-2">
              {completions.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-xl p-3 border border-gray-100 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                      <Star className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {c.letter_id ? thuluthLetters.find(l => l.id === c.letter_id)?.name || c.lesson_id : c.lesson_id}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(c.completed_at || c.created_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-600">+{c.xp_earned} XP</span>
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