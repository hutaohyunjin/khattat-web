import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Pen, Trophy, ChevronRight, Sparkles } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-white">
        <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin" />
      </div>
    );
  }

  const completedLessons = progress?.completed_lessons || [];
  const nextLessonIndex = completedLessons.length;
  const nextLesson = lessons[nextLessonIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] text-white px-6 pt-12 pb-8 rounded-b-[2rem]">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-amber-300 text-sm font-medium">Welcome back</p>
              <h1 className="text-2xl font-bold mt-1">الخط العربي</h1>
              <p className="text-white/60 text-xs mt-0.5">Arabic Calligraphy</p>
            </div>
            <StreakBadge streak={progress?.current_streak} />
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <XPBar totalXP={progress?.total_xp} />
          </div>
        </motion.div>
      </div>

      <div className="max-w-lg mx-auto px-6 mt-8 space-y-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3"
        >
          <Link
            to="/styles"
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs font-semibold text-gray-700">Styles</span>
          </Link>
          <Link
            to="/practice"
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
              <Pen className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-xs font-semibold text-gray-700">Practice</span>
          </Link>
          <Link
            to="/progress"
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-xs font-semibold text-gray-700">Progress</span>
          </Link>
        </motion.div>

        {/* Continue Learning */}
        {nextLesson && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-bold text-gray-900 mb-3">Continue Learning</h2>
            <button
              onClick={() => navigate(`/lesson/${nextLesson.id}`)}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl p-5 flex items-center gap-4 shadow-lg shadow-amber-200 hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="text-left flex-1">
                <p className="font-bold">{nextLesson.title}</p>
                <p className="text-sm text-white/80 mt-0.5">{nextLesson.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-white/60" />
            </button>
          </motion.div>
        )}

        {/* Lesson Path */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Your Learning Path</h2>
          <div className="space-y-1">
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