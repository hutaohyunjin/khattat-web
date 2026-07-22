import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Check } from 'lucide-react';
import NavBar from '@/components/calligraphy/NavBar';
import { thuluthLetters } from '@/lib/calligraphyData';
import { useProgress } from '@/hooks/useProgress';

const GROUPS = [1,2,3,4,5,6,7,8].map(id => ({
  id,
  name: ['Alif','Jeem','Dal','Seen','Tah','Fa','Lam','Waw'][id-1] + ' Group',
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
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <NavBar />

      <div className="max-w-6xl mx-auto px-6">
        {/* Hero */}
        <div className="pt-20 pb-10 border-b border-rule" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: '-10%', right: '-8%', width: '55%', height: '130%',
            backgroundImage: 'url(https://media.base44.com/images/public/6a41bd2ca6771bd95aa5d5f2/ec49070dc_3.png)',
            backgroundSize: 'cover', backgroundPosition: 'left center',
            mixBlendMode: 'soft-light', opacity: 0.55, pointerEvents: 'none',
          }} />
          <p className="label-mono mb-4" style={{ color: 'var(--zzz-yellow-dim)' }}>Thuluth Script</p>
          <h1 className="display-xl">
            LETTER<br />
            <span style={{ color: 'var(--ink-mid)' }}>PRACTICE</span>
          </h1>

        </div>

        {/* Search */}
        <div className="mt-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'var(--ink-faint)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search letters..."
            className="w-full pl-9 pr-4 py-2.5 focus:outline-none"
            style={{ background: 'var(--paper)', border: '1px solid var(--rule)', color: 'var(--ink)', fontFamily: 'Barlow', fontSize: 14 }}
          />
        </div>

        {/* Letter groups */}
        <div className="mt-6 space-y-5 mb-12">
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

    </div>
  );
}