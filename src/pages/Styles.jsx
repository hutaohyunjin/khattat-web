import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import NavBar from '@/components/calligraphy/NavBar';
import StyleCard from '@/components/calligraphy/StyleCard';
import { calligraphyStyles } from '@/lib/calligraphyData';
import { Button } from '@/components/ui/button';

export default function Styles() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] text-white px-6 pt-12 pb-8 rounded-b-[2rem]">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold">Calligraphy Styles</h1>
          <p className="text-white/60 text-sm mt-1">Explore the rich world of Arabic script traditions</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {calligraphyStyles.map((style, i) => (
            <StyleCard
              key={style.id}
              style={style}
              index={i}
              onClick={() => setSelected(style)}
            />
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
            >
              {/* Style header */}
              <div
                className="relative p-8 rounded-t-3xl"
                style={{ background: `linear-gradient(135deg, ${selected.color}15, ${selected.color}30)` }}
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="text-center">
                  <span className="text-6xl block mb-3" style={{ color: selected.color, fontFamily: 'serif' }}>
                    {selected.nameAr}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900">{selected.name}</h2>
                  <span
                    className="inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ backgroundColor: `${selected.color}20`, color: selected.color }}
                  >
                    {selected.difficulty}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">About</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{selected.description}</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">History</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{selected.history}</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Key Characteristics</h3>
                  <ul className="space-y-2">
                    {selected.characteristics.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: selected.color }} />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {selected.id === 'thuluth' && (
                  <Button
                    onClick={() => { setSelected(null); window.location.href = '/practice'; }}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                  >
                    Start Learning Thuluth Letters
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <NavBar />
    </div>
  );
}