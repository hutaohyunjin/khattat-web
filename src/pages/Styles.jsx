import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';
import NavBar from '@/components/calligraphy/NavBar';
import { calligraphyStyles } from '@/lib/calligraphyData';

export default function Styles() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen pb-24" style={{ background: '#0D0F14' }}>
      {/* Header */}
      <div className="relative overflow-hidden px-6 pt-12 pb-8"
        style={{ background: '#13161D', borderBottom: '1px solid #2A2E3A' }}>
        <div className="absolute inset-0 zzz-stripe pointer-events-none" />
        <div className="absolute top-0 right-0 w-0.5 h-16" style={{ background: '#F5C940' }} />
        <div className="absolute top-0 right-0 w-16 h-0.5" style={{ background: '#F5C940' }} />
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5" style={{ background: '#F5C940' }} />
            <p className="text-[10px] tracking-widest font-bold font-heading" style={{ color: '#F5C940' }}>CODEX</p>
          </div>
          <h1 className="text-2xl font-bold font-heading tracking-wider" style={{ color: '#F0F0F0' }}>CALLIGRAPHY STYLES</h1>
          <p className="text-xs tracking-wider mt-1 font-heading" style={{ color: '#555B6E' }}>EXPLORE ARABIC SCRIPT TRADITIONS</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {calligraphyStyles.map((style, i) => (
            <motion.button
              key={style.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setSelected(style)}
              className="text-left p-5 group transition-all relative overflow-hidden zzz-clip-corner"
              style={{ background: '#13161D', border: '1px solid #2A2E3A' }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(135deg, ${style.color}08, transparent)` }} />

              {/* Difficulty tag */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] tracking-widest font-bold font-heading px-2 py-0.5"
                  style={{ color: style.color, border: `1px solid ${style.color}40`, background: `${style.color}10` }}>
                  {style.difficulty.toUpperCase()}
                </span>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#F5C940' }} />
              </div>

              {/* Arabic name */}
              <p className="text-4xl mb-2"
                style={{ fontFamily: "'Noto Naskh Arabic', serif", color: style.color, lineHeight: 1.3 }}
                dir="rtl">
                {style.nameAr}
              </p>

              <h3 className="font-bold tracking-wider font-heading text-sm" style={{ color: '#F0F0F0' }}>
                {style.name.toUpperCase()}
              </h3>
              <p className="text-xs mt-1 line-clamp-2 leading-relaxed" style={{ color: '#555B6E' }}>
                {style.description}
              </p>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                style={{ background: style.color }} />
            </motion.button>
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
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-lg max-h-[85vh] overflow-y-auto"
              style={{ background: '#13161D', border: `1px solid ${selected.color}40`, clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))' }}
            >
              {/* Modal header */}
              <div className="relative p-6" style={{ borderBottom: '1px solid #2A2E3A' }}>
                <div className="absolute inset-0 zzz-stripe pointer-events-none" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center"
                  style={{ background: '#1A1E27', border: '1px solid #2A2E3A' }}
                >
                  <X className="w-4 h-4" style={{ color: '#888EA8' }} />
                </button>
                <div className="text-center">
                  <p className="text-6xl mb-3 block"
                    style={{ fontFamily: "'Noto Naskh Arabic', serif", color: selected.color, lineHeight: 1.4 }}
                    dir="rtl">
                    {selected.nameAr}
                  </p>
                  <h2 className="text-xl font-bold font-heading tracking-widest" style={{ color: '#F0F0F0' }}>
                    {selected.name.toUpperCase()}
                  </h2>
                  <span className="inline-block mt-2 text-[9px] font-bold tracking-widest px-3 py-1 font-heading"
                    style={{ color: selected.color, border: `1px solid ${selected.color}50`, background: `${selected.color}12` }}>
                    {selected.difficulty.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-px" style={{ background: selected.color }} />
                    <h3 className="text-[10px] font-bold tracking-widest font-heading" style={{ color: selected.color }}>ABOUT</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#888EA8' }}>{selected.description}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-px" style={{ background: selected.color }} />
                    <h3 className="text-[10px] font-bold tracking-widest font-heading" style={{ color: selected.color }}>HISTORY</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#888EA8' }}>{selected.history}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-px" style={{ background: selected.color }} />
                    <h3 className="text-[10px] font-bold tracking-widest font-heading" style={{ color: selected.color }}>CHARACTERISTICS</h3>
                  </div>
                  <ul className="space-y-2">
                    {selected.characteristics.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#888EA8' }}>
                        <span className="w-1.5 h-1.5 mt-1.5 flex-shrink-0" style={{ background: selected.color }} />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {selected.id === 'thuluth' && (
                  <button
                    onClick={() => { setSelected(null); window.location.href = '/practice'; }}
                    className="w-full py-3 font-bold tracking-widest font-heading text-sm transition-all zzz-clip-corner"
                    style={{ background: '#F5C940', color: '#0D0F14', boxShadow: '0 0 20px rgba(245,201,64,0.2)' }}
                  >
                    ▶ START THULUTH TRAINING
                  </button>
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