import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, ChevronLeft, Check } from 'lucide-react';
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

  if (completed) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="sys-window">
            <div className="sys-titlebar"><span className="sys-titlebar-dot" /><span>Lesson Complete</span></div>
            <div className="p-8 text-center">
              <p className="label-mono mb-3">Mission Clear</p>
              <h2 className="display-lg mb-2">{lesson.title}</h2>
              {!isAlreadyCompleted && (
                <p className="font-mono text-2xl font-bold mt-4" style={{ color: 'var(--ink)' }}>+{lesson.xpReward} xp</p>
              )}
            </div>
            <div className="rule-h" />
            <div className="flex">
              <button onClick={() => navigate('/')} className="flex-1 py-4 font-mono text-[11px] tracking-wider border-r hover:bg-paper-dark transition-colors" style={{ borderColor: 'var(--rule)', color: 'var(--ink-mid)' }}>
                ← Home
              </button>
              <button onClick={goToNext} className="flex-1 py-4 font-mono text-[11px] tracking-wider transition-colors" style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
                Continue →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-8">
      {/* Top bar */}
      <div className="sticky top-0 z-40 flex items-center gap-3 px-6 py-3 bg-white border-b border-rule">
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

        {/* Practice letters */}
        {!isTheory && (
          <div className="mt-6 space-y-5">
            <div className="sys-window">
              <div className="sys-titlebar"><span className="sys-titlebar-dot" /><span>Letters in this group</span></div>
              <div style={{
                display: 'grid', gridTemplateColumns: '60px 1fr auto',
                gap: 12, padding: '5px 12px',
                borderBottom: '1px solid var(--rule)', background: 'var(--paper-dark)',
              }}>
                <span className="label-mono">Form</span>
                <span className="label-mono">Name</span>
                <span className="label-mono">Status</span>
              </div>
              {practiceLetters.map((letter, i) => {
                const isMastered = (progress?.mastered_letters || []).includes(letter.id);
                return (
                  <div
                    key={letter.id}
                    className="data-row cursor-pointer"
                    style={{ gridTemplateColumns: '60px 1fr auto', alignItems: 'center', gap: 12, paddingTop: 12, paddingBottom: 12 }}
                    onClick={() => navigate(`/letter/${letter.id}`)}
                  >
                    <span className="text-4xl text-center block leading-none"
                      style={{ fontFamily: "'Noto Naskh Arabic', serif" }} dir="rtl">{letter.letter}</span>
                    <div>
                      <p className="font-heading font-medium text-sm">{letter.name}</p>
                      <p className="font-mono text-[10px] mt-0.5" style={{ color: 'var(--ink-mid)' }}>{letter.nameAr}</p>
                    </div>
                    <span className="font-mono text-[10px]" style={{ color: isMastered ? 'var(--ink)' : 'var(--ink-faint)' }}>
                      {isMastered ? '✓' : '→'}
                    </span>
                  </div>
                );
              })}
            </div>

            <button onClick={handleComplete} className="w-full btn-system justify-center">
              Complete Lesson <Check className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}