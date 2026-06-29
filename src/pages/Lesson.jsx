import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, ChevronLeft, BookOpen, Sparkles, Check } from 'lucide-react';
import { lessons, thuluthLetters } from '@/lib/calligraphyData';
import { useProgress } from '@/hooks/useProgress';
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
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0D0F14' }}>
        <p className="font-heading tracking-widest text-sm" style={{ color: '#555B6E' }}>LESSON NOT FOUND</p>
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
      toast({ title: `▶ +${lesson.xpReward} XP`, description: `${lesson.title} complete.` });
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
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#0D0F14' }}>
        <div className="absolute inset-0 zzz-stripe pointer-events-none" />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-sm w-full relative"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring' }}
            className="w-20 h-20 flex items-center justify-center mx-auto mb-6"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
              background: 'linear-gradient(135deg, #C9A030, #F5C940)',
              boxShadow: '0 0 40px rgba(245,201,64,0.3)',
            }}
          >
            <Sparkles className="w-9 h-9" style={{ color: '#0D0F14' }} />
          </motion.div>

          <div className="flex items-center gap-2 justify-center mb-2">
            <div className="w-6 h-px" style={{ background: '#F5C940' }} />
            <p className="text-[10px] tracking-widest font-bold font-heading" style={{ color: '#F5C940' }}>MISSION COMPLETE</p>
            <div className="w-6 h-px" style={{ background: '#F5C940' }} />
          </div>
          <h2 className="text-2xl font-bold font-heading tracking-wider mb-1" style={{ color: '#F0F0F0' }}>
            LESSON CLEAR
          </h2>
          <p className="text-xs tracking-wider font-heading" style={{ color: '#555B6E' }}>{lesson.title.toUpperCase()}</p>

          {!isAlreadyCompleted && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 mt-5 px-6 py-2 font-bold font-heading tracking-widest text-sm"
              style={{ background: 'rgba(245,201,64,0.1)', color: '#F5C940', border: '1px solid rgba(245,201,64,0.3)' }}
            >
              <Sparkles className="w-4 h-4" />
              +{lesson.xpReward} XP
            </motion.div>
          )}

          <div className="mt-8 space-y-3">
            <button
              onClick={goToNext}
              className="w-full py-3 font-bold tracking-widest font-heading text-sm transition-all zzz-clip-corner"
              style={{ background: '#F5C940', color: '#0D0F14', boxShadow: '0 0 20px rgba(245,201,64,0.2)' }}
            >
              ▶ CONTINUE
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full py-3 font-bold tracking-widest font-heading text-sm transition-all zzz-clip-corner"
              style={{ background: '#13161D', color: '#888EA8', border: '1px solid #2A2E3A' }}
            >
              ← MISSION BOARD
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#0D0F14' }}>
      {/* Header */}
      <div className="relative overflow-hidden px-6 pt-10 pb-6"
        style={{ background: '#13161D', borderBottom: '1px solid #2A2E3A' }}>
        <div className="absolute inset-0 zzz-stripe pointer-events-none" />
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center transition-all"
              style={{ background: '#0D0F14', border: '1px solid #2A2E3A', clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
            >
              <ArrowLeft className="w-4 h-4" style={{ color: '#888EA8' }} />
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <div className="w-1.5 h-1.5" style={{ background: '#F5C940' }} />
                <span className="text-[9px] tracking-widest font-bold font-heading" style={{ color: '#F5C940' }}>MISSION</span>
              </div>
              <h1 className="font-bold font-heading tracking-wide text-sm" style={{ color: '#F0F0F0' }}>
                {lesson.title.toUpperCase()}
              </h1>
            </div>
            <span className="text-[10px] font-bold font-heading tracking-wider px-2 py-1"
              style={{ color: '#F5C940', border: '1px solid rgba(245,201,64,0.3)' }}>
              +{lesson.xpReward}XP
            </span>
          </div>

          {isTheory && (
            <div className="flex gap-1">
              {sections.map((_, i) => (
                <div key={i} className="flex-1 h-0.5 transition-all"
                  style={{ background: i <= currentSection ? '#F5C940' : '#2A2E3A', boxShadow: i <= currentSection ? '0 0 6px rgba(245,201,64,0.4)' : 'none' }} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6 pb-8">
        {isTheory ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-5"
            >
              <div className="p-6 zzz-clip-corner-lg" style={{ background: '#13161D', border: '1px solid #2A2E3A' }}>
                <div className="w-9 h-9 flex items-center justify-center mb-4"
                  style={{ background: 'rgba(245,201,64,0.1)', clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}>
                  <BookOpen className="w-4 h-4" style={{ color: '#F5C940' }} />
                </div>
                <p className="text-[10px] tracking-widest font-bold font-heading mb-2" style={{ color: '#F5C940' }}>
                  {String(currentSection + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
                </p>
                <h2 className="text-xl font-bold font-heading tracking-wide mb-4" style={{ color: '#F0F0F0' }}>
                  {sections[currentSection].title.toUpperCase()}
                </h2>
                <p className="leading-relaxed text-sm" style={{ color: '#888EA8' }}>
                  {sections[currentSection].text}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  className="flex-1 flex items-center justify-center gap-2 py-3 font-bold tracking-widest font-heading text-xs transition-all zzz-clip-corner"
                  disabled={currentSection === 0}
                  onClick={() => setCurrentSection(s => s - 1)}
                  style={{
                    background: '#13161D',
                    border: '1px solid #2A2E3A',
                    color: currentSection === 0 ? '#2A2E3A' : '#888EA8',
                    cursor: currentSection === 0 ? 'not-allowed' : 'pointer',
                  }}
                >
                  <ChevronLeft className="w-4 h-4" /> BACK
                </button>
                {currentSection < sections.length - 1 ? (
                  <button
                    className="flex-1 flex items-center justify-center gap-2 py-3 font-bold tracking-widest font-heading text-xs transition-all zzz-clip-corner"
                    onClick={() => setCurrentSection(s => s + 1)}
                    style={{ background: '#F5C940', color: '#0D0F14', boxShadow: '0 0 16px rgba(245,201,64,0.2)' }}
                  >
                    NEXT <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    className="flex-1 flex items-center justify-center gap-2 py-3 font-bold tracking-widest font-heading text-xs transition-all zzz-clip-corner"
                    onClick={handleComplete}
                    style={{ background: '#F5C940', color: '#0D0F14', boxShadow: '0 0 16px rgba(245,201,64,0.2)' }}
                  >
                    COMPLETE <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="space-y-5">
            <p className="text-xs tracking-wider font-heading" style={{ color: '#555B6E' }}>
              PRACTICE EACH LETTER IN THIS GROUP. TAP A LETTER TO STUDY IT.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {practiceLetters.map((letter, i) => {
                const isMastered = (progress?.mastered_letters || []).includes(letter.id);
                return (
                  <motion.button
                    key={letter.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => navigate(`/letter/${letter.id}`)}
                    className="flex flex-col items-center gap-2 p-6 transition-all zzz-clip-corner"
                    style={{
                      background: isMastered ? 'rgba(34,197,94,0.07)' : '#13161D',
                      border: `1px solid ${isMastered ? 'rgba(34,197,94,0.25)' : '#2A2E3A'}`,
                    }}
                  >
                    <span className="text-5xl" style={{ fontFamily: "'Noto Naskh Arabic', 'Amiri', serif", color: isMastered ? '#4ade80' : '#F0F0F0' }} dir="rtl">
                      {letter.letter}
                    </span>
                    <span className="text-xs font-bold tracking-widest font-heading" style={{ color: isMastered ? '#4ade80' : '#888EA8' }}>
                      {letter.name.toUpperCase()}
                    </span>
                    {isMastered && (
                      <span className="text-[9px] tracking-widest font-heading" style={{ color: '#4ade80' }}>✓ MASTERED</span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            <button
              onClick={handleComplete}
              className="w-full py-3 font-bold tracking-widest font-heading text-sm transition-all zzz-clip-corner flex items-center justify-center gap-2"
              style={{ background: '#F5C940', color: '#0D0F14', boxShadow: '0 0 20px rgba(245,201,64,0.2)' }}
            >
              <Check className="w-4 h-4" /> COMPLETE LESSON
            </button>
          </div>
        )}
      </div>
    </div>
  );
}