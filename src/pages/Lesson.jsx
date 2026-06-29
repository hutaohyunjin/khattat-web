import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, ChevronLeft, BookOpen, Sparkles } from 'lucide-react';
import { lessons, thuluthLetters } from '@/lib/calligraphyData';
import { useProgress } from '@/hooks/useProgress';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function Lesson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { progress, addXP } = useProgress();
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState(0);
  const [completed, setCompleted] = useState(false);

  const lesson = lessons.find(l => l.id === id);
  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Lesson not found</p>
      </div>
    );
  }

  const isAlreadyCompleted = (progress?.completed_lessons || []).includes(lesson.id);
  const isTheory = lesson.type === 'theory';
  const sections = isTheory ? lesson.content.sections : [];
  const practiceLetters = !isTheory ? (lesson.letters || []).map(lid => thuluthLetters.find(l => l.id === lid)).filter(Boolean) : [];

  async function handleComplete() {
    if (!isAlreadyCompleted) {
      await addXP(lesson.xpReward, lesson.id);
      toast({
        title: `Lesson Complete! +${lesson.xpReward} XP`,
        description: lesson.title,
      });
    }
    setCompleted(true);
  }

  function goToNext() {
    const idx = lessons.findIndex(l => l.id === id);
    if (idx < lessons.length - 1) {
      navigate(`/lesson/${lessons[idx + 1].id}`);
      setCurrentSection(0);
      setCompleted(false);
    } else {
      navigate('/');
    }
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-sm"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-amber-200">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-6">Lesson Complete!</h2>
          <p className="text-gray-500 mt-2">{lesson.title}</p>
          {!isAlreadyCompleted && (
            <div className="mt-4 inline-flex items-center gap-1 bg-amber-100 text-amber-700 px-4 py-2 rounded-full font-bold">
              +{lesson.xpReward} XP
            </div>
          )}
          <div className="mt-8 space-y-3">
            <Button onClick={goToNext} className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
              Continue <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
            <Button variant="outline" onClick={() => navigate('/')} className="w-full">
              Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] text-white px-6 pt-10 pb-6">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="font-bold">{lesson.title}</h1>
              <p className="text-white/50 text-xs mt-0.5">{lesson.description}</p>
            </div>
          </div>

          {/* Progress bar */}
          {isTheory && (
            <div className="flex gap-1.5">
              {sections.map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-1.5 rounded-full transition-colors ${
                    i <= currentSection ? 'bg-amber-400' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-8">
        {isTheory ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  {sections[currentSection].title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {sections[currentSection].text}
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  disabled={currentSection === 0}
                  onClick={() => setCurrentSection(s => s - 1)}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </Button>
                {currentSection < sections.length - 1 ? (
                  <Button
                    className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                    onClick={() => setCurrentSection(s => s + 1)}
                  >
                    Next <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                    onClick={handleComplete}
                  >
                    Complete <Sparkles className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="space-y-6">
            <p className="text-sm text-gray-500">
              Practice each letter in this group. Tap a letter to study and practice it.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {practiceLetters.map((letter, i) => {
                const isMastered = (progress?.mastered_letters || []).includes(letter.id);
                return (
                  <motion.button
                    key={letter.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => navigate(`/letter/${letter.id}`)}
                    className={`flex flex-col items-center gap-2 p-6 rounded-2xl border transition-all hover:shadow-md ${
                      isMastered
                        ? 'bg-emerald-50 border-emerald-200'
                        : 'bg-white border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    <span
                      className="text-5xl"
                      style={{ fontFamily: "'Noto Naskh Arabic', 'Amiri', serif" }}
                      dir="rtl"
                    >
                      {letter.letter}
                    </span>
                    <span className="text-sm font-semibold text-gray-700">{letter.name}</span>
                    <span className="text-xs text-gray-400">{letter.nameAr}</span>
                  </motion.button>
                );
              })}
            </div>

            <Button
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
              onClick={handleComplete}
            >
              Complete Lesson <Sparkles className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}