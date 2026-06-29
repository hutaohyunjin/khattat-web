import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, ChevronLeft, Info, Pen, Eye, Sparkles } from 'lucide-react';
import { thuluthLetters } from '@/lib/calligraphyData';
import { useProgress } from '@/hooks/useProgress';
import PracticeCanvas from '@/components/calligraphy/PracticeCanvas';
import { useToast } from '@/components/ui/use-toast';

export default function LetterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { progress, addXP } = useProgress();
  const { toast } = useToast();
  const [tab, setTab] = useState('learn');
  const [currentStep, setCurrentStep] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const letter = thuluthLetters.find(l => l.id === id);
  if (!letter) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0D0F14' }}>
        <p className="font-heading tracking-widest text-sm" style={{ color: '#555B6E' }}>LETTER NOT FOUND</p>
      </div>
    );
  }

  const letterIndex = thuluthLetters.findIndex(l => l.id === id);
  const prevLetter = letterIndex > 0 ? thuluthLetters[letterIndex - 1] : null;
  const nextLetter = letterIndex < thuluthLetters.length - 1 ? thuluthLetters[letterIndex + 1] : null;
  const isMastered = (progress?.mastered_letters || []).includes(letter.id);

  async function handlePracticeComplete() {
    await addXP(15, null, letter.id);
    setShowCelebration(true);
    toast({ title: "▶ +15 XP EARNED", description: `${letter.name} practice complete.` });
    setTimeout(() => setShowCelebration(false), 2000);
  }

  const tabs = [
    { id: 'learn', label: 'LEARN', icon: Info },
    { id: 'forms', label: 'FORMS', icon: Eye },
    { id: 'practice', label: 'PRACTICE', icon: Pen }
  ];

  return (
    <div className="min-h-screen" style={{ background: '#0D0F14' }}>
      {/* Celebration overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ scale: 0.7, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.7, y: 20 }}
              className="p-10 text-center zzz-clip-corner-lg"
              style={{ background: '#13161D', border: '1px solid rgba(245,201,64,0.4)', boxShadow: '0 0 40px rgba(245,201,64,0.15)' }}
            >
              <Sparkles className="w-10 h-10 mx-auto mb-3" style={{ color: '#F5C940' }} />
              <h2 className="text-2xl font-bold font-heading tracking-widest" style={{ color: '#F5C940' }}>EXCELLENT!</h2>
              <p className="text-xs tracking-widest font-heading mt-1" style={{ color: '#555B6E' }}>+15 XP EARNED</p>
              <p className="text-7xl mt-5" style={{ fontFamily: "'Noto Naskh Arabic', serif", color: '#F0F0F0' }} dir="rtl">
                {letter.letter}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="relative overflow-hidden px-6 pt-10 pb-6"
        style={{ background: '#13161D', borderBottom: '1px solid #2A2E3A' }}>
        <div className="absolute inset-0 zzz-stripe pointer-events-none" />
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center transition-all"
              style={{ background: '#0D0F14', border: '1px solid #2A2E3A', clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
            >
              <ArrowLeft className="w-4 h-4" style={{ color: '#888EA8' }} />
            </button>
            <div className="flex-1">
              <h1 className="font-bold font-heading tracking-wider" style={{ color: '#F0F0F0' }}>
                {letter.name.toUpperCase()} — {letter.nameAr}
              </h1>
              <p className="text-[10px] tracking-widest font-heading" style={{ color: '#555B6E' }}>{letter.transliteration.toUpperCase()}</p>
            </div>
            {isMastered && (
              <span className="text-[9px] font-bold tracking-widest font-heading px-3 py-1"
                style={{ background: 'rgba(34,197,94,0.1)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)', clipPath: 'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))' }}>
                ✓ MASTERED
              </span>
            )}
          </div>

          {/* Large letter display */}
          <div className="flex justify-center">
            <div className="w-32 h-32 flex items-center justify-center zzz-clip-corner-lg"
              style={{ background: '#0D0F14', border: '1px solid #2A2E3A', boxShadow: '0 0 30px rgba(245,201,64,0.06)' }}>
              <span className="text-7xl" style={{ fontFamily: "'Noto Naskh Arabic', 'Amiri', serif", color: '#F0F0F0' }} dir="rtl">
                {letter.letter}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-10" style={{ background: '#0D0F14', borderBottom: '1px solid #2A2E3A' }}>
        <div className="max-w-lg mx-auto flex">
          {tabs.map(t => {
            const Icon = t.icon;
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => { setTab(t.id); setCurrentStep(0); }}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-bold tracking-widest font-heading transition-all relative"
                style={{ color: isActive ? '#F5C940' : '#555B6E' }}
              >
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: '#F5C940', boxShadow: '0 0 8px rgba(245,201,64,0.6)' }} />
                )}
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-6 py-5 pb-32">
        <AnimatePresence mode="wait">
          {tab === 'learn' && (
            <motion.div key="learn" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
              <div className="p-5 zzz-clip-corner" style={{ background: '#13161D', border: '1px solid #2A2E3A' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-px" style={{ background: '#F5C940' }} />
                  <h3 className="text-[10px] font-bold tracking-widest font-heading" style={{ color: '#F5C940' }}>ABOUT THIS LETTER</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#888EA8' }}>{letter.description}</p>
              </div>

              <div className="p-5 zzz-clip-corner" style={{ background: '#13161D', border: '1px solid #2A2E3A' }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-px" style={{ background: '#F5C940' }} />
                  <h3 className="text-[10px] font-bold tracking-widest font-heading" style={{ color: '#F5C940' }}>STROKE GUIDE</h3>
                </div>
                <div className="space-y-2">
                  {letter.strokeGuide.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      onClick={() => setCurrentStep(i)}
                      className="flex items-start gap-3 p-3 cursor-pointer transition-all"
                      style={{
                        background: currentStep === i ? 'rgba(245,201,64,0.06)' : 'transparent',
                        border: `1px solid ${currentStep === i ? 'rgba(245,201,64,0.25)' : 'transparent'}`,
                        clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                      }}
                    >
                      <span
                        className="w-6 h-6 flex items-center justify-center text-xs font-bold font-heading flex-shrink-0"
                        style={{
                          background: currentStep === i ? '#F5C940' : '#1A1E27',
                          color: currentStep === i ? '#0D0F14' : '#555B6E',
                          clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
                        }}
                      >
                        {i + 1}
                      </span>
                      <p className="text-sm leading-relaxed pt-0.5" style={{ color: currentStep === i ? '#F0F0F0' : '#666C82' }}>{step}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-4 zzz-clip-corner" style={{ background: 'rgba(245,201,64,0.05)', border: '1px solid rgba(245,201,64,0.2)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-px" style={{ background: '#F5C940' }} />
                  <h3 className="text-[10px] font-bold tracking-widest font-heading" style={{ color: '#F5C940' }}>PROPORTION TIP</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#C9A030' }}>{letter.proportionTip}</p>
              </div>
            </motion.div>
          )}

          {tab === 'forms' && (
            <motion.div key="forms" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-3">
              <p className="text-xs tracking-wider font-heading mb-4" style={{ color: '#555B6E' }}>
                ARABIC LETTERS CHANGE SHAPE DEPENDING ON THEIR POSITION IN A WORD.
              </p>
              {Object.entries(letter.forms).map(([form, char], i) => (
                <motion.div
                  key={form}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 zzz-clip-corner"
                  style={{ background: '#13161D', border: '1px solid #2A2E3A' }}
                >
                  <div className="w-16 h-16 flex items-center justify-center text-4xl flex-shrink-0"
                    style={{
                      fontFamily: "'Noto Naskh Arabic', 'Amiri', serif",
                      background: 'rgba(245,201,64,0.06)',
                      border: '1px solid rgba(245,201,64,0.15)',
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                      color: '#F5C940',
                    }}
                    dir="rtl"
                  >
                    {char}
                  </div>
                  <div>
                    <h4 className="font-bold tracking-wider font-heading text-sm" style={{ color: '#F0F0F0' }}>
                      {form.toUpperCase()} FORM
                    </h4>
                    <p className="text-xs mt-1" style={{ color: '#555B6E' }}>
                      {form === 'isolated' && 'When the letter stands alone'}
                      {form === 'initial' && 'At the beginning of a word'}
                      {form === 'medial' && 'In the middle of a word'}
                      {form === 'final' && 'At the end of a word'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {tab === 'practice' && (
            <motion.div key="practice" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
              <p className="text-xs tracking-wider font-heading" style={{ color: '#555B6E' }}>
                TRACE OVER THE GUIDE LETTER. FOCUS ON STROKE ORDER AND PROPORTIONS.
              </p>
              <PracticeCanvas letter={letter} onComplete={handlePracticeComplete} />
              <div className="p-4 zzz-clip-corner" style={{ background: '#13161D', border: '1px solid #2A2E3A' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-px" style={{ background: '#F5C940' }} />
                  <h4 className="text-[10px] font-bold tracking-widest font-heading" style={{ color: '#F5C940' }}>TRAINING TIPS</h4>
                </div>
                <ul className="space-y-1.5 text-xs" style={{ color: '#666C82' }}>
                  <li>▸ Hold pen at 30° angle for authentic thick-thin contrast</li>
                  <li>▸ Follow the stroke order shown in the Learn tab</li>
                  <li>▸ Practice slowly — speed comes with muscle memory</li>
                  <li>▸ Try multiple times to build consistency</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 px-6 py-4"
        style={{ background: 'rgba(13,15,20,0.97)', borderTop: '1px solid #2A2E3A' }}>
        <div className="max-w-lg mx-auto flex gap-3">
          <button
            className="flex-1 flex items-center justify-center gap-2 py-3 font-bold tracking-widest font-heading text-xs transition-all zzz-clip-corner"
            disabled={!prevLetter}
            onClick={() => prevLetter && navigate(`/letter/${prevLetter.id}`)}
            style={{
              background: '#13161D',
              border: '1px solid #2A2E3A',
              color: prevLetter ? '#888EA8' : '#2A2E3A',
              cursor: prevLetter ? 'pointer' : 'not-allowed',
            }}
          >
            <ChevronLeft className="w-4 h-4" />
            {prevLetter ? prevLetter.name.toUpperCase() : 'PREV'}
          </button>
          <button
            className="flex-1 flex items-center justify-center gap-2 py-3 font-bold tracking-widest font-heading text-xs transition-all zzz-clip-corner"
            disabled={!nextLetter}
            onClick={() => nextLetter && navigate(`/letter/${nextLetter.id}`)}
            style={{
              background: nextLetter ? '#F5C940' : '#13161D',
              border: `1px solid ${nextLetter ? 'transparent' : '#2A2E3A'}`,
              color: nextLetter ? '#0D0F14' : '#2A2E3A',
              cursor: nextLetter ? 'pointer' : 'not-allowed',
              boxShadow: nextLetter ? '0 0 16px rgba(245,201,64,0.25)' : 'none',
            }}
          >
            {nextLetter ? nextLetter.name.toUpperCase() : 'COMPLETE'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}