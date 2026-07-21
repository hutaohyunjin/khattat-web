import React, { useState } from 'react';
import { Download, FileText, ChevronRight } from 'lucide-react';
import NavBar from '@/components/calligraphy/NavBar';
import { thuluthLetters } from '@/lib/calligraphyData';

// Map letter IDs to page numbers in the PDF (pages 3–22 of the PDF = pages 1–20 of content)
// Each practice sheet page corresponds to one or more letters
const LETTER_PAGES = {
  alif:     { page: 1,  strokes: 3 },
  ba:       { page: 2,  strokes: 2 },
  ta:       { page: 2,  strokes: 2 },
  tha:      { page: 2,  strokes: 2 },
  jim:      { page: 3,  strokes: 4 },
  ha_small: { page: 3,  strokes: 4 },
  kha:      { page: 3,  strokes: 4 },
  dal:      { page: 4,  strokes: 5 },
  dhal:     { page: 4,  strokes: 5 },
  ra:       { page: 5,  strokes: 4 },
  zay:      { page: 5,  strokes: 4 },
  sin:      { page: 6,  strokes: 4 },
  shin:     { page: 6,  strokes: 4 },
  sad:      { page: 7,  strokes: 4 },
  dad:      { page: 7,  strokes: 4 },
  tah:      { page: 8,  strokes: 4 },
  dhah:     { page: 8,  strokes: 4 },
  ain:      { page: 9,  strokes: 5 },
  ghain:    { page: 9,  strokes: 5 },
  fa:       { page: 10, strokes: 3 },
  qaf:      { page: 11, strokes: 3 },
  kaf:      { page: 12, strokes: 7 },
  lam:      { page: 13, strokes: 3 },
  mim:      { page: 14, strokes: 4 },
  nun:      { page: 15, strokes: 6 },
  ha_big:   { page: 16, strokes: 3 },
  waw:      { page: 17, strokes: 4 },
  ya:       { page: 18, strokes: 3 },
};

const PDF_URL = 'https://media.base44.com/files/public/6a41bd2ca6771bd95aa5d5f2/96a06c4de_6e858ea-b1bc-0f2e-4000-cc2bd2c0544_Thuluth_Script_Practice_Book1.pdf';

const GROUPS = [
  { label: 'Group 1 — Alif Family', ids: ['alif', 'ba', 'ta', 'tha'] },
  { label: 'Group 2 — Jeem Family', ids: ['jim', 'ha_small', 'kha'] },
  { label: 'Group 3 — Dal / Ra Family', ids: ['dal', 'dhal', 'ra', 'zay'] },
  { label: 'Group 4 — Seen / Saad Family', ids: ['sin', 'shin', 'sad', 'dad'] },
  { label: 'Group 5 — Tah / Ain Family', ids: ['tah', 'dhah', 'ain', 'ghain'] },
  { label: 'Group 6 — Fa / Qaf / Kaf', ids: ['fa', 'qaf', 'kaf'] },
  { label: 'Group 7 — Lam / Meem / Noon / Ha', ids: ['lam', 'mim', 'nun', 'ha_big'] },
  { label: 'Group 8 — Waw & Ya', ids: ['waw', 'ya'] },
];

function downloadFullBook() {
  const link = document.createElement('a');
  link.href = PDF_URL;
  link.download = 'Thuluth_Script_Practice_Book.pdf';
  link.target = '_blank';
  link.click();
}

function LetterCard({ letter }) {
  const info = LETTER_PAGES[letter.id] || { page: 1, strokes: '-' };

  return (
    <div className="sys-window group hover:border-t-orange-500 transition-all" style={{ borderTopColor: 'var(--zzz-yellow)' }}>
      {/* Letter display */}
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--rule)' }}>
        <div>
          <p style={{ fontFamily: 'Space Mono', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--zzz-yellow-dim)' }}>
            {letter.transliteration}
          </p>
          <p style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 16, color: 'var(--ink)', lineHeight: 1.1, marginTop: 2 }}>
            {letter.name}
          </p>
          <p style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--ink-faint)', marginTop: 1 }}>
            {info.strokes} strokes · Sheet {String(info.page).padStart(2, '0')}
          </p>
        </div>
        <span
          dir="rtl"
          style={{
            fontFamily: "'Noto Naskh Arabic', serif",
            fontSize: 52,
            color: 'var(--ink)',
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          {letter.letter}
        </span>
      </div>

      {/* Stroke hint */}
      {letter.strokes && (
        <p className="px-4 pt-3 pb-2" style={{ fontFamily: 'Barlow', fontSize: 11, color: 'var(--ink-mid)', lineHeight: 1.6 }}>
          {letter.strokes[0]}
        </p>
      )}

      {/* Download button */}
      <button
        onClick={downloadFullBook}
        className="w-full flex items-center justify-between px-4 py-3 border-t transition-colors hover:bg-paper-dark"
        style={{ borderColor: 'var(--rule)' }}
      >
        <span style={{ fontFamily: 'Space Mono', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-mid)' }}>
          Download Sheet
        </span>
        <Download className="w-3.5 h-3.5" style={{ color: 'var(--zzz-yellow-dim)' }} />
      </button>
    </div>
  );
}

export default function PracticeSheets() {
  const [openGroup, setOpenGroup] = useState(null);

  const lettersById = Object.fromEntries(thuluthLetters.map(l => [l.id, l]));

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <NavBar />

      <div className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        {/* Hero */}
        <div className="border-b pb-10 mb-10" style={{ borderColor: 'var(--rule)' }}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="label-mono mb-3" style={{ color: 'var(--zzz-yellow-dim)', letterSpacing: '0.2em' }}>
                Thuluth Script Only
              </p>
              <h1 className="display-lg">Practice<br />Sheets</h1>
              <p className="mt-3 max-w-lg" style={{ fontFamily: 'Barlow', fontSize: 14, color: 'var(--ink-mid)', lineHeight: 1.75 }}>
                Printable practice sheets for every Thuluth letter, based on the Mesk of Şevki Efendi. Each sheet shows the master form, proportional guides, stroke order, and repetition rows to trace.
              </p>
            </div>

            {/* Full book download */}
            <div className="sys-window flex-shrink-0" style={{ minWidth: 220 }}>
              <div className="sys-titlebar">
                <span className="sys-titlebar-dot" />
                <span>Full Book</span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-8 h-8" style={{ color: 'var(--zzz-yellow-dim)' }} />
                  <div>
                    <p style={{ fontFamily: 'Barlow', fontWeight: 600, fontSize: 13, color: 'var(--ink)' }}>
                      Thuluth Practice Book
                    </p>
                    <p style={{ fontFamily: 'Space Mono', fontSize: 9, color: 'var(--ink-faint)', letterSpacing: '0.08em' }}>
                      33 SHEETS · PDF
                    </p>
                  </div>
                </div>
                <button onClick={downloadFullBook} className="btn-system w-full justify-center gap-2">
                  <Download className="w-3.5 h-3.5" />
                  Download All
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Groups */}
        <div className="space-y-8">
          {GROUPS.map((group) => {
            const isOpen = openGroup === group.label || openGroup === null;
            return (
              <div key={group.label}>
                {/* Group header */}
                <button
                  className="w-full flex items-center justify-between mb-4 group"
                  onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                >
                  <div className="flex items-center gap-3">
                    <span className="accent-bar" style={{ height: 20 }} />
                    <span style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 18, textTransform: 'uppercase', color: 'var(--ink)', letterSpacing: '0.04em' }}>
                      {group.label}
                    </span>
                    <span style={{ fontFamily: 'Space Mono', fontSize: 9, color: 'var(--ink-faint)', letterSpacing: '0.1em' }}>
                      {group.ids.length} letters
                    </span>
                  </div>
                  <ChevronRight
                    className="w-4 h-4 transition-transform"
                    style={{
                      color: 'var(--ink-faint)',
                      transform: openGroup === group.label ? 'rotate(90deg)' : openGroup === null ? 'rotate(90deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>

                {(openGroup === group.label || openGroup === null) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {group.ids.map(id => {
                      const letter = lettersById[id];
                      if (!letter) return null;
                      return <LetterCard key={id} letter={letter} />;
                    })}
                  </div>
                )}
                <div className="rule-h mt-8" />
              </div>
            );
          })}
        </div>

        {/* Attribution note */}
        <p className="mt-10 text-center" style={{ fontFamily: 'Space Mono', fontSize: 9, color: 'var(--ink-faint)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Practice book based on the Mesk of Şevki Efendi · Designed by My Qalam Academy
        </p>
      </div>
    </div>
  );
}