import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, ChevronLeft, Info, Pen, Eye, Sparkles } from 'lucide-react';
import { thuluthLetters } from '@/lib/calligraphyData';
import { useProgress } from '@/hooks/useProgress';
import LetterDisplay from '@/components/calligraphy/LetterDisplay';
import PracticeCanvas from '@/components/calligraphy/PracticeCanvas';
import { Button } from '@/components/ui/button';
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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Letter not found</p>
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
    toast({
      title: "Great work! +15 XP",
      description: `You practiced ${letter.name} (${letter.letter})`,
    });
    setTimeout(() => setShowCelebration(false), 2000);
  }

  const tabs = [
    { id: 'learn', label: 'Learn', icon: Info },
    { id: 'forms', label: 'Forms', icon: Eye },
    { id: 'practice', label: 'Practice', icon: Pen }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white">
      {/* Celebration overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-amber-500/20 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              className="bg-white rounded-3xl p-8 shadow-2xl text-center"
            >
              <Sparkles className="w-12 h-12 text-amber-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900">Excellent!</h2>
              <p className="text-gray-500 mt-1">+15 XP earned</p>
              <p className="text-6xl mt-4" style={{ fontFamily: "'Noto Naskh Arabic', serif" }} dir="rtl">
                {letter.letter}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] text-white px-6 pt-10 pb-6">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="font-bold text-lg">{letter.name} — {letter.nameAr}</h1>
              <p className="text-white/50 text-xs">{letter.transliteration}</p>
            </div>
            {isMastered && (
              <span className="text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full font-semibold">
                Mastered ✓
              </span>
            )}
          </div>

          <LetterDisplay letter={letter} size="lg" active />
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-10">
        <div className="max-w-lg mx-auto flex">
          {tabs.map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => { setTab(t.id); setCurrentStep(0); }}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-colors border-b-2 ${
                  tab === t.id
                    ? 'text-amber-600 border-amber-500'
                    : 'text-gray-400 border-transparent hover:text-gray-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-6 py-6 pb-28">
        <AnimatePresence mode="wait">
          {tab === 'learn' && (
            <motion.div
              key="learn"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">About this letter</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{letter.description}</p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3">Stroke Guide</h3>
                <div className="space-y-3">
                  {letter.strokeGuide.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
                        currentStep === i ? 'bg-amber-50 border border-amber-200' : ''
                      }`}
                      onClick={() => setCurrentStep(i)}
                    >
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        currentStep === i
                          ? 'bg-amber-500 text-white'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {i + 1}
                      </span>
                      <p className="text-sm text-gray-700 leading-relaxed pt-0.5">{step}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
                <h3 className="font-bold text-amber-900 mb-2 text-sm">📐 Proportion Tip</h3>
                <p className="text-sm text-amber-800 leading-relaxed">{letter.proportionTip}</p>
              </div>
            </motion.div>
          )}

          {tab === 'forms' && (
            <motion.div
              key="forms"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <p className="text-sm text-gray-500 mb-4">
                Arabic letters change shape depending on their position in a word. Study each form:
              </p>
              {Object.entries(letter.forms).map(([form, char], i) => (
                <motion.div
                  key={form}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-5"
                >
                  <div
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 flex items-center justify-center text-4xl"
                    style={{ fontFamily: "'Noto Naskh Arabic', 'Amiri', serif" }}
                    dir="rtl"
                  >
                    {char}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 capitalize">{form} Form</h4>
                    <p className="text-xs text-gray-500 mt-1">
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
            <motion.div
              key="practice"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <p className="text-sm text-gray-500">
                Trace over the guide letter. Focus on stroke order and proportions.
              </p>
              <PracticeCanvas letter={letter} onComplete={handlePracticeComplete} />
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tips while practicing</h4>
                <ul className="space-y-1.5 text-xs text-gray-600">
                  <li>• Hold pen at 30° angle for authentic thick-thin contrast</li>
                  <li>• Follow the stroke order shown in the Learn tab</li>
                  <li>• Practice slowly — speed comes with muscle memory</li>
                  <li>• Try multiple times to build consistency</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 px-6 py-4 z-40">
        <div className="max-w-lg mx-auto flex gap-3">
          <Button
            variant="outline"
            className="flex-1 gap-2"
            disabled={!prevLetter}
            onClick={() => prevLetter && navigate(`/letter/${prevLetter.id}`)}
          >
            <ChevronLeft className="w-4 h-4" />
            {prevLetter ? prevLetter.name : 'Previous'}
          </Button>
          <Button
            className="flex-1 gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
            disabled={!nextLetter}
            onClick={() => nextLetter && navigate(`/letter/${nextLetter.id}`)}
          >
            {nextLetter ? nextLetter.name : 'Complete'}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}