import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Check } from 'lucide-react';
import NavBar from '@/components/calligraphy/NavBar';
import { thuluthLetters } from '@/lib/calligraphyData';
import { useProgress } from '@/hooks/useProgress';
import { Input } from '@/components/ui/input';

export default function Practice() {
  const { progress } = useProgress();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const masteredLetters = progress?.mastered_letters || [];

  const groups = [
    { id: 1, name: 'Alif Group', letters: thuluthLetters.filter(l => l.group === 1) },
    { id: 2, name: 'Jim Group', letters: thuluthLetters.filter(l => l.group === 2) },
    { id: 3, name: 'Dal Group', letters: thuluthLetters.filter(l => l.group === 3) },
    { id: 4, name: 'Sin Group', letters: thuluthLetters.filter(l => l.group === 4) },
    { id: 5, name: 'Tah Group', letters: thuluthLetters.filter(l => l.group === 5) },
    { id: 6, name: 'Fa Group', letters: thuluthLetters.filter(l => l.group === 6) },
    { id: 7, name: 'Lam Group', letters: thuluthLetters.filter(l => l.group === 7) },
    { id: 8, name: 'Waw Group', letters: thuluthLetters.filter(l => l.group === 8) }
  ];

  const filteredGroups = groups.map(g => ({
    ...g,
    letters: g.letters.filter(l =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.letter.includes(search) ||
      l.nameAr.includes(search)
    )
  })).filter(g => g.letters.length > 0);

  const masteredCount = masteredLetters.length;
  const totalCount = thuluthLetters.length;

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
            <p className="text-[10px] tracking-widest font-bold font-heading" style={{ color: '#F5C940' }}>TRAINING</p>
          </div>
          <h1 className="text-2xl font-bold font-heading tracking-wider" style={{ color: '#F0F0F0' }}>THULUTH PRACTICE</h1>
          <p className="text-xs tracking-wider mt-1 font-heading" style={{ color: '#555B6E' }}>MASTER EACH LETTER OF THE ARABIC ALPHABET</p>
          <div className="mt-4 flex items-center gap-3">
            <span className="font-bold font-heading text-lg" style={{ color: '#F5C940' }}>{masteredCount}</span>
            <span className="text-xs font-heading tracking-wider" style={{ color: '#555B6E' }}>/ {totalCount} LETTERS MASTERED</span>
            <div className="flex-1 h-1 ml-2" style={{ background: '#1A1E27' }}>
              <div className="h-full transition-all" style={{ width: `${(masteredCount / totalCount) * 100}%`, background: 'linear-gradient(90deg, #C9A030, #F5C940)', boxShadow: '0 0 6px rgba(245,201,64,0.5)' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 mt-5 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#555B6E' }} />
          <input
            placeholder="SEARCH LETTERS..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-sm font-heading tracking-wider placeholder:tracking-widest focus:outline-none"
            style={{
              background: '#13161D',
              border: '1px solid #2A2E3A',
              color: '#F0F0F0',
              clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
            }}
          />
        </div>

        {/* Letter Groups */}
        {filteredGroups.map((group, gi) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gi * 0.05 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1.5 h-1.5" style={{ background: '#F5C940' }} />
              <h3 className="text-[10px] font-bold tracking-widest font-heading" style={{ color: '#888EA8' }}>
                {group.name.toUpperCase()}
              </h3>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #2A2E3A, transparent)' }} />
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {group.letters.map((letter, li) => {
                const isMastered = masteredLetters.includes(letter.id);
                return (
                  <motion.button
                    key={letter.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: gi * 0.04 + li * 0.02 }}
                    onClick={() => navigate(`/letter/${letter.id}`)}
                    className="relative flex flex-col items-center gap-1.5 p-3 transition-all group"
                    style={{
                      background: isMastered ? 'rgba(34,197,94,0.08)' : '#13161D',
                      border: `1px solid ${isMastered ? 'rgba(34,197,94,0.3)' : '#2A2E3A'}`,
                      clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                    }}
                  >
                    {isMastered && (
                      <div className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center"
                        style={{ background: '#22c55e' }}>
                        <Check className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                    <span
                      className="text-3xl leading-none"
                      style={{ fontFamily: "'Noto Naskh Arabic', 'Amiri', serif", color: isMastered ? '#4ade80' : '#F0F0F0' }}
                      dir="rtl"
                    >
                      {letter.letter}
                    </span>
                    <span className="text-[9px] font-bold tracking-wider font-heading" style={{ color: isMastered ? '#4ade80' : '#555B6E' }}>
                      {letter.name.toUpperCase()}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      <NavBar />
    </div>
  );
}