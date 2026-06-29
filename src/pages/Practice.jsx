import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Check } from 'lucide-react';
import NavBar from '@/components/calligraphy/NavBar';
import { thuluthLetters } from '@/lib/calligraphyData';
import { useProgress } from '@/hooks/useProgress';

const GROUPS = [1,2,3,4,5,6,7,8].map(id => ({
  id,
  name: ['Alif','Jim','Dal','Sin','Tah','Fa','Lam','Waw'][id-1] + ' Group',
}));

export default function Practice() {
  const { progress } = useProgress();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const masteredLetters = progress?.mastered_letters || [];

  const groups = GROUPS.map(g => ({
    ...g,
    letters: thuluthLetters.filter(l => {
      const matchGroup = l.group === g.id;
      const matchSearch = !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.letter.includes(search);
      return matchGroup && matchSearch;
    }),
  })).filter(g => g.letters.length > 0);

  const masteredCount = masteredLetters.length;
  const totalCount = thuluthLetters.length;

  return (
    <div className="min-h-screen pb-24 dither-bg">
      {/* Top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between px-5 py-2"
        style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
        <span className="font-mono text-[11px] tracking-widest">✦ KHATTAT</span>
        <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Practice</span>
      </div>

      <div className="max-w-lg mx-auto px-5">
        {/* Hero */}
        <div className="pt-10 pb-8 border-b" style={{ borderColor: 'var(--ink)' }}>
          <p className="label-mono mb-3">Thuluth Script</p>
          <h1 className="display-xl">
            Letter<br />
            <em style={{ color: 'var(--ink-mid)' }}>Practice</em>
          </h1>
          <div className="flex items-center gap-4 mt-5">
            <div>
              <p className="label-mono">Mastered</p>
              <p className="font-mono text-2xl font-bold" style={{ color: 'var(--ink)' }}>
                {String(masteredCount).padStart(2,'0')}<span className="text-base font-normal" style={{ color: 'var(--ink-faint)' }}>/{totalCount}</span>
              </p>
            </div>
            <div className="flex-1 h-1" style={{ background: 'var(--paper-dark)' }}>
              <div className="h-full" style={{ width: `${(masteredCount / totalCount) * 100}%`, background: 'var(--ink)' }} />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mt-5 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'var(--ink-faint)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search letters..."
            className="w-full pl-9 pr-4 py-2.5 font-mono text-xs focus:outline-none"
            style={{ background: 'var(--paper)', border: '1.5px solid var(--ink)', color: 'var(--ink)' }}
          />
        </div>

        {/* Letter groups */}
        <div className="mt-5 space-y-5 mb-8">
          {groups.map(group => (
            <div key={group.id} className="sys-window">
              <div className="sys-titlebar">
                <span className="sys-titlebar-dot" />
                <span>{group.name}</span>
                <span className="ml-auto opacity-50">{group.letters.filter(l => masteredLetters.includes(l.id)).length}/{group.letters.length}</span>
              </div>
              {/* Table header */}
              <div style={{
                display: 'grid', gridTemplateColumns: '48px 1fr auto',
                gap: 12, padding: '5px 12px',
                borderBottom: '1px solid var(--rule)', background: 'var(--paper-dark)',
              }}>
                <span className="label-mono">Form</span>
                <span className="label-mono">Name</span>
                <span className="label-mono">Status</span>
              </div>
              {group.letters.map((letter, li) => {
                const isMastered = masteredLetters.includes(letter.id);
                return (
                  <div
                    key={letter.id}
                    className="data-row cursor-pointer"
                    style={{ gridTemplateColumns: '48px 1fr auto', alignItems: 'center', gap: 12, paddingTop: 10, paddingBottom: 10 }}
                    onClick={() => navigate(`/letter/${letter.id}`)}
                  >
                    <span
                      className="text-3xl text-center leading-none"
                      style={{ fontFamily: "'Noto Naskh Arabic', serif", display: 'block' }}
                      dir="rtl"
                    >
                      {letter.letter}
                    </span>
                    <div>
                      <p className="font-heading font-medium text-sm">{letter.name}</p>
                      <p className="font-mono text-[10px] mt-0.5" style={{ color: 'var(--ink-mid)' }}>{letter.transliteration}</p>
                    </div>
                    <span className="font-mono text-[10px]" style={{ color: isMastered ? 'var(--ink)' : 'var(--ink-faint)' }}>
                      {isMastered ? '✓ done' : ''}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <NavBar />
    </div>
  );
}