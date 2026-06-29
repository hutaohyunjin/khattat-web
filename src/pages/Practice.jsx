import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Check } from 'lucide-react';
import NavBar from '@/components/calligraphy/NavBar';
import LetterDisplay from '@/components/calligraphy/LetterDisplay';
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 to-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] text-white px-6 pt-12 pb-8 rounded-b-[2rem]">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold">Thuluth Practice</h1>
          <p className="text-white/60 text-sm mt-1">Master each letter of the Arabic alphabet</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-amber-300 font-bold">{masteredLetters.length}</span>
            <span className="text-white/50">of {thuluthLetters.length} letters mastered</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 mt-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search letters..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 rounded-xl border-gray-200"
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
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{group.name}</h3>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
              {group.letters.map((letter, li) => {
                const isMastered = masteredLetters.includes(letter.id);
                return (
                  <motion.button
                    key={letter.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: gi * 0.05 + li * 0.03 }}
                    onClick={() => navigate(`/letter/${letter.id}`)}
                    className={`relative flex flex-col items-center gap-1 p-3 rounded-2xl border transition-all hover:shadow-md ${
                      isMastered
                        ? 'bg-emerald-50 border-emerald-200'
                        : 'bg-white border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    {isMastered && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <span
                      className="text-3xl"
                      style={{ fontFamily: "'Noto Naskh Arabic', 'Amiri', serif" }}
                      dir="rtl"
                    >
                      {letter.letter}
                    </span>
                    <span className="text-[10px] font-semibold text-gray-500">{letter.name}</span>
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