import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import NavBar from '@/components/calligraphy/NavBar';
import { calligraphyStyles } from '@/lib/calligraphyData';

export default function Styles() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen pb-24 dither-bg">
      {/* Top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between px-5 py-2"
        style={{ background: 'var(--ink)', color: 'var(--zzz-yellow)', borderBottom: '2px solid var(--zzz-yellow)' }}>
        <span className="font-mono text-[11px] tracking-widest" style={{ color: 'var(--zzz-yellow)' }}>✦ KHATTAT</span>
        <span className="font-mono text-[10px]" style={{ color: 'var(--zzz-yellow-dim)' }}>Codex</span>
      </div>

      <div className="max-w-lg mx-auto px-5">
        {/* Hero */}
        <div className="pt-10 pb-8 border-b" style={{ borderColor: 'var(--ink)' }}>
          <p className="label-mono mb-3">Script Library</p>
          <h1 className="display-xl">
            Calli­<br />graphy<br />
            <em style={{ color: 'var(--ink-mid)' }}>Styles</em>
          </h1>
        </div>

        {/* Styles table */}
        <div className="mt-6 sys-window mb-8">
          <div className="sys-titlebar">
            <span className="sys-titlebar-dot" />
            <span>All Scripts — {calligraphyStyles.length} entries</span>
          </div>
          {/* Header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr auto auto',
            gap: '12px', padding: '6px 12px',
            borderBottom: '1px solid var(--rule)', background: 'var(--paper-dark)',
          }}>
            <span className="label-mono">Script</span>
            <span className="label-mono">Level</span>
            <span className="label-mono" style={{ minWidth: 14 }}></span>
          </div>
          {calligraphyStyles.map((style, i) => (
            <div
              key={style.id}
              className="data-row cursor-pointer"
              style={{ gridTemplateColumns: '1fr auto auto', alignItems: 'center', gap: '12px', paddingTop: 14, paddingBottom: 14 }}
              onClick={() => setSelected(style)}
            >
              <div>
                <p className="font-heading font-semibold text-sm" style={{ color: 'var(--ink)' }}>{style.name}</p>
                <p className="font-mono text-[10px] mt-0.5" style={{ color: 'var(--ink-mid)' }}>
                  <span style={{ fontFamily: "'Noto Naskh Arabic', serif" }} dir="rtl">{style.nameAr}</span>
                </p>
              </div>
              <span className="font-mono text-[10px]" style={{ color: 'var(--ink-mid)' }}>{style.difficulty}</span>
              <ArrowRight className="w-3.5 h-3.5" style={{ color: 'var(--ink-faint)' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal — system window */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
            style={{ background: 'rgba(20,20,20,0.7)' }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="sys-window w-full max-w-lg max-h-[85vh] overflow-y-auto"
            >
              <div className="sys-titlebar justify-between">
                <div className="flex items-center gap-2">
                  <span className="sys-titlebar-dot" />
                  <span>{selected.name}</span>
                </div>
                <button onClick={() => setSelected(null)} className="opacity-70 hover:opacity-100">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Big letter display */}
              <div className="p-8 text-center border-b" style={{ borderColor: 'var(--rule)', background: 'var(--paper-dark)' }}>
                <p className="text-8xl leading-none mb-4"
                  style={{ fontFamily: "'Noto Naskh Arabic', serif", color: 'var(--ink)' }} dir="rtl">
                  {selected.nameAr}
                </p>
                <p className="font-display text-3xl" style={{ color: 'var(--ink)' }}>{selected.name}</p>
                <p className="label-mono mt-2">{selected.difficulty}</p>
              </div>

              <div className="p-6 space-y-6">
                {[['About', selected.description], ['History', selected.history]].map(([title, text]) => (
                  <div key={title}>
                    <p className="label-mono mb-2">{title}</p>
                    <div className="rule-h mb-3" />
                    <p className="font-heading text-sm leading-relaxed font-semibold" style={{ color: 'var(--ink)' }}>{text}</p>
                  </div>
                ))}
                <div>
                  <p className="label-mono mb-2">Characteristics</p>
                  <div className="rule-h mb-3" />
                  {selected.characteristics.map((c, i) => (
                    <div key={i} className="data-row" style={{ gridTemplateColumns: '1rem 1fr', gap: 8, paddingTop: 6, paddingBottom: 6 }}>
                      <span className="font-mono text-[10px]" style={{ color: 'var(--ink-faint)' }}>{String(i+1).padStart(2,'0')}</span>
                      <span className="font-heading text-sm" style={{ color: 'var(--ink)' }}>{c}</span>
                    </div>
                  ))}
                </div>

                {selected.id === 'thuluth' && (
                  <button
                    className="btn-system w-full justify-center"
                    onClick={() => { setSelected(null); window.location.href = '/practice'; }}
                  >
                    Begin Thuluth Training <ArrowRight className="w-3.5 h-3.5" />
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