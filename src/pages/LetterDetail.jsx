import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react';
import { thuluthLetters } from '@/lib/calligraphyData';
import { useProgress } from '@/hooks/useProgress';
import PracticeCanvas from '@/components/calligraphy/PracticeCanvas';
import { useToast } from '@/components/ui/use-toast';

const TABS = ['Learn', 'Forms', 'Practice'];

export default function LetterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { progress, addXP } = useProgress();
  const { toast } = useToast();
  const [tab, setTab] = useState('Learn');
  const [currentStep, setCurrentStep] = useState(0);

  const letter = thuluthLetters.find(l => l.id === id);
  if (!letter) return (
    <div className="min-h-screen dither-bg flex items-center justify-center">
      <p className="font-mono text-xs" style={{ color: 'var(--ink-mid)' }}>Letter not found</p>
    </div>
  );

  const letterIndex = thuluthLetters.findIndex(l => l.id === id);
  const prevLetter = letterIndex > 0 ? thuluthLetters[letterIndex - 1] : null;
  const nextLetter = letterIndex < thuluthLetters.length - 1 ? thuluthLetters[letterIndex + 1] : null;
  const isMastered = (progress?.mastered_letters || []).includes(letter.id);

  async function handlePracticeComplete() {
    await addXP(15, null, letter.id);
    toast({ title: '+15 XP', description: `${letter.name} practice complete.` });
  }

  return (
    <div className="min-h-screen dither-bg" style={{ paddingBottom: 100 }}>
      {/* Top bar */}
      <div className="sticky top-0 z-40 flex items-center gap-3 px-5 py-2"
        style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" style={{ color: 'var(--paper)' }} />
        </button>
        <span className="font-mono text-[11px] tracking-widest flex-1">✦ KHATTAT</span>
        {isMastered && <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.6)' }}>✓ mastered</span>}
      </div>

      <div className="max-w-lg mx-auto px-5">
        {/* Hero */}
        <div className="pt-10 pb-8 border-b flex items-end justify-between gap-6" style={{ borderColor: 'var(--ink)' }}>
          <div>
            <p className="label-mono mb-3">
              Letter {String(letterIndex + 1).padStart(2,'0')} / {thuluthLetters.length}
            </p>
            <h1 className="display-xl">{letter.name}</h1>
            <p className="font-mono text-sm mt-2" style={{ color: 'var(--ink-mid)' }}>
              {letter.transliteration} · {letter.nameAr}
            </p>
          </div>
          <div className="w-28 h-28 flex items-center justify-center border flex-shrink-0"
            style={{ borderColor: 'var(--ink)', background: 'var(--paper)' }}>
            <span className="text-6xl leading-none"
              style={{ fontFamily: "'Noto Naskh Arabic', 'Amiri', serif", color: 'var(--ink)' }}
              dir="rtl">
              {letter.letter}
            </span>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex border-b" style={{ borderColor: 'var(--ink)' }}>
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setCurrentStep(0); }}
              className="flex-1 py-3 font-mono text-[11px] tracking-wider uppercase transition-colors"
              style={{
                background: tab === t ? 'var(--ink)' : 'transparent',
                color: tab === t ? 'var(--paper)' : 'var(--ink-mid)',
                borderRight: '1px solid var(--rule)',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {tab === 'Learn' && (
            <motion.div key="learn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-5 space-y-4">
              {/* Description */}
              <div className="sys-window">
                <div className="sys-titlebar"><span className="sys-titlebar-dot" /><span>About</span></div>
                <p className="p-5 font-heading text-sm leading-relaxed" style={{ color: 'var(--ink-mid)' }}>{letter.description}</p>
              </div>

              {/* Stroke guide */}
              <div className="sys-window">
                <div className="sys-titlebar"><span className="sys-titlebar-dot" /><span>Stroke Guide — {letter.strokeGuide.length} steps</span></div>
                <div style={{
                  display: 'grid', gridTemplateColumns: '2rem 1fr',
                  gap: 8, padding: '5px 12px',
                  borderBottom: '1px solid var(--rule)', background: 'var(--paper-dark)',
                }}>
                  <span className="label-mono">#</span>
                  <span className="label-mono">Instruction</span>
                </div>
                {letter.strokeGuide.map((step, i) => (
                  <div
                    key={i}
                    className="data-row cursor-pointer"
                    style={{
                      gridTemplateColumns: '2rem 1fr', alignItems: 'start',
                      gap: 8, paddingTop: 10, paddingBottom: 10,
                      background: currentStep === i ? 'var(--ink)' : undefined,
                      color: currentStep === i ? 'var(--paper)' : undefined,
                    }}
                    onClick={() => setCurrentStep(i)}
                  >
                    <span className="font-mono text-[10px] pt-0.5">{String(i+1).padStart(2,'0')}</span>
                    <span className="font-heading text-sm leading-snug">{step}</span>
                  </div>
                ))}
              </div>

              {/* Proportion tip */}
              <div className="sys-window">
                <div className="sys-titlebar"><span className="sys-titlebar-dot" /><span>Proportion Tip</span></div>
                <p className="p-5 font-heading text-sm leading-relaxed" style={{ color: 'var(--ink-mid)' }}>{letter.proportionTip}</p>
              </div>
            </motion.div>
          )}

          {tab === 'Forms' && (
            <motion.div key="forms" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-5">
              <div className="sys-window">
                <div className="sys-titlebar"><span className="sys-titlebar-dot" /><span>Positional Forms</span></div>
                <div style={{
                  display: 'grid', gridTemplateColumns: '80px 1fr',
                  gap: 12, padding: '5px 12px',
                  borderBottom: '1px solid var(--rule)', background: 'var(--paper-dark)',
                }}>
                  <span className="label-mono">Form</span>
                  <span className="label-mono">Position</span>
                </div>
                {Object.entries(letter.forms).map(([form, char], i) => (
                  <div
                    key={form}
                    className="data-row"
                    style={{ gridTemplateColumns: '80px 1fr', alignItems: 'center', gap: 12, paddingTop: 14, paddingBottom: 14 }}
                  >
                    <span className="text-4xl leading-none"
                      style={{ fontFamily: "'Noto Naskh Arabic', serif", display: 'block', textAlign: 'center' }}
                      dir="rtl">{char}</span>
                    <div>
                      <p className="font-heading font-semibold text-sm capitalize">{form}</p>
                      <p className="font-mono text-[10px] mt-1" style={{ color: 'var(--ink-mid)' }}>
                        {form === 'isolated' && 'Standalone letter'}
                        {form === 'initial' && 'Start of a word'}
                        {form === 'medial' && 'Middle of a word'}
                        {form === 'final' && 'End of a word'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {tab === 'Practice' && (
            <motion.div key="practice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-5 space-y-4">
              <PracticeCanvas letter={letter} onComplete={handlePracticeComplete} />
              <div className="sys-window">
                <div className="sys-titlebar"><span className="sys-titlebar-dot" /><span>Tips</span></div>
                <div className="p-4 space-y-2">
                  {['Hold pen at 30° for thick-thin contrast', 'Follow stroke order from the Learn tab', 'Practice slowly — speed follows muscle memory', 'Repeat until strokes feel natural'].map((tip, i) => (
                    <div key={i} className="flex gap-3 font-mono text-[11px]" style={{ color: 'var(--ink-mid)' }}>
                      <span style={{ color: 'var(--ink-faint)' }}>{String(i+1).padStart(2,'0')}</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex"
        style={{ background: 'var(--paper)', borderTop: '1.5px solid var(--ink)' }}>
        <button
          disabled={!prevLetter}
          onClick={() => prevLetter && navigate(`/letter/${prevLetter.id}`)}
          className="flex-1 flex items-center justify-center gap-2 py-4 font-mono text-[11px] tracking-wider border-r transition-colors"
          style={{
            borderColor: 'var(--rule)',
            color: prevLetter ? 'var(--ink)' : 'var(--ink-faint)',
            cursor: prevLetter ? 'pointer' : 'not-allowed',
          }}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          {prevLetter ? prevLetter.name : 'PREV'}
        </button>
        <button
          disabled={!nextLetter}
          onClick={() => nextLetter && navigate(`/letter/${nextLetter.id}`)}
          className="flex-1 flex items-center justify-center gap-2 py-4 font-mono text-[11px] tracking-wider transition-colors"
          style={{
            background: nextLetter ? 'var(--ink)' : 'transparent',
            color: nextLetter ? 'var(--paper)' : 'var(--ink-faint)',
            cursor: nextLetter ? 'pointer' : 'not-allowed',
          }}
        >
          {nextLetter ? nextLetter.name : 'DONE'}
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}