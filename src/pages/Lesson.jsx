import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { lessons, thuluthLetters } from '@/lib/calligraphyData';
import { useProgress } from '@/hooks/useProgress';
import { useToast } from '@/components/ui/use-toast';
import CelebrationModal from '@/components/calligraphy/CelebrationModal';
import PracticeCanvas from '@/components/calligraphy/PracticeCanvas';

export default function Lesson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { progress, addXP } = useProgress();
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [practiceStep, setPracticeStep] = useState(0); // index into practiceLetters
  const [drawnLetters, setDrawnLetters] = useState(new Set()); // ids of letters drawn

  const lesson = lessons.find(l => l.id === id);
  if (!lesson) return (
    <div className="min-h-screen dither-bg flex items-center justify-center">
      <p className="font-mono text-xs" style={{ color: 'var(--ink-mid)' }}>Lesson not found</p>
    </div>
  );

  const isAlreadyCompleted = (progress?.completed_lessons || []).includes(lesson.id);
  const isTheory = lesson.type === 'theory';
  const sections = isTheory ? lesson.content.sections : [];
  const practiceLetters = !isTheory
    ? (lesson.letters || []).map(lid => thuluthLetters.find(l => l.id === lid)).filter(Boolean)
    : [];

  async function handleComplete() {
    if (!isAlreadyCompleted) {
      await addXP(lesson.xpReward, lesson.id);
      toast({ title: `+${lesson.xpReward} XP`, description: lesson.title });
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

  return (
    <div className="min-h-screen pb-8" style={{ background: 'var(--paper)' }}>
    <CelebrationModal
      show={completed}
      xp={isAlreadyCompleted ? 0 : lesson.xpReward}
      title={lesson.title}
      onContinue={goToNext}
      onHome={() => navigate('/')}
    />
      {/* Top bar */}
      <div className="sticky top-0 z-40 flex items-center gap-3 px-6 py-3 border-b border-rule" style={{ background: 'var(--paper)' }}>
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" style={{ color: 'var(--ink)' }} />
        </button>
        <span style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 14, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink)', flex: 1 }}>KHATTAT</span>
        <span style={{ fontFamily: 'Space Mono', fontSize: 10, letterSpacing: 2, border: '1px solid var(--zzz-yellow)', color: 'var(--zzz-yellow-dim)', padding: '2px 8px', background: 'var(--zzz-yellow-pale)' }}>
          +{lesson.xpReward}xp
        </span>
      </div>

      <div className="max-w-2xl mx-auto px-6">
        {/* Hero */}
        <div className="pt-10 pb-8 border-b border-rule">
          <p className="label-mono mb-3" style={{ color: 'var(--zzz-yellow-dim)' }}>{isTheory ? 'Theory' : 'Practice'}</p>
          <h1 className="display-lg">{lesson.title}</h1>
          <p className="font-heading text-sm mt-3 font-semibold" style={{ color: 'var(--ink)' }}>{lesson.description}</p>
          {isTheory && (
            <div className="flex gap-1 mt-5">
              {sections.map((_, i) => (
                <div key={i} className="flex-1 h-1 transition-all"
                  style={{ background: i <= currentSection ? 'var(--ink)' : 'var(--rule)' }} />
              ))}
            </div>
          )}
        </div>

        {/* Theory content */}
        {isTheory && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="mt-6"
            >
              <div className="sys-window">
                <div className="sys-titlebar">
                  <span className="sys-titlebar-dot" />
                  <span>{String(currentSection + 1).padStart(2,'0')} / {String(sections.length).padStart(2,'0')} · {sections[currentSection].title}</span>
                </div>
                <p className="p-6 font-heading text-sm leading-relaxed" style={{ color: 'var(--ink-mid)' }}>
                  {sections[currentSection].text}
                </p>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  disabled={currentSection === 0}
                  onClick={() => setCurrentSection(s => s - 1)}
                  className="flex-1 btn-ghost justify-center"
                  style={{ opacity: currentSection === 0 ? 0.3 : 1, borderColor: 'var(--ink)', color: 'var(--ink)', background: 'transparent' }}
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Back
                </button>
                {currentSection < sections.length - 1 ? (
                  <button onClick={() => setCurrentSection(s => s + 1)} className="flex-1 btn-system justify-center">
                    Next <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button onClick={handleComplete} className="flex-1 btn-system justify-center">
                    Complete <Check className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Practice letters — step through each letter with canvas */}
        {!isTheory && practiceLetters.length > 0 && (
          <div className="mt-6 space-y-5">
            {/* Progress dots */}
            <div className="flex gap-1">
              {practiceLetters.map((_, i) => (
                <div key={i} className="flex-1 h-1 transition-all"
                  style={{ background: i < practiceStep ? 'var(--zzz-yellow)' : i === practiceStep ? 'var(--ink)' : 'var(--rule)' }} />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={practiceStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {practiceStep < practiceLetters.length ? (() => {
                  const letter = practiceLetters[practiceStep];
                  return (
                    <>
                      {/* Letter info */}
                      <div className="sys-window">
                        <div className="sys-titlebar">
                          <span className="sys-titlebar-dot" />
                          <span>Letter {String(practiceStep + 1).padStart(2,'0')} / {String(practiceLetters.length).padStart(2,'0')} · {letter.name}</span>
                        </div>
                        <div className="p-5 flex gap-5 items-start">
                          <span className="text-6xl leading-none flex-shrink-0"
                            style={{ fontFamily: "'Noto Naskh Arabic', serif" }} dir="rtl">
                            {letter.letter}
                          </span>
                          <div>
                            <p style={{ fontFamily: 'Space Mono', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--zzz-yellow-dim)' }}>{letter.transliteration}</p>
                            <p className="font-heading font-semibold text-sm mt-1" style={{ color: 'var(--ink)' }}>{letter.nameAr}</p>
                            {letter.strokes && (
                              <p className="mt-2 font-body text-xs leading-relaxed" style={{ color: 'var(--ink-mid)', maxWidth: 260 }}>
                                {letter.strokes[0]}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Canvas */}
                      <PracticeCanvas
                        letter={letter}
                        onComplete={() => {
                          setDrawnLetters(prev => new Set([...prev, letter.id]));
                          if (practiceStep < practiceLetters.length - 1) {
                            setPracticeStep(s => s + 1);
                          } else {
                            handleComplete();
                          }
                        }}
                      />
                    </>
                  );
                })() : null}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}