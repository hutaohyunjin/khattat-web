import React, { useState, useEffect } from 'react';
import NavBar from '@/components/calligraphy/NavBar';
import XPBar from '@/components/calligraphy/XPBar';
import { useProgress } from '@/hooks/useProgress';
import { thuluthLetters, lessons, levelTitles, getLevelFromXP } from '@/lib/calligraphyData';
import { base44 } from '@/api/base44Client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Progress() {
  const { progress, loading } = useProgress();
  const [completions, setCompletions] = useState([]);

  const [letterCompletions, setLetterCompletions] = useState([]);

  useEffect(() => {
    base44.entities.LessonCompletion.list('-created_date', 10).then(setCompletions).catch(() => {});
    base44.entities.LessonCompletion.list('-created_date', 200).then(all => {
      // Only keep records where a letter was mastered
      const withLetters = all.filter(c => c.letter_id);
      // Group by ISO week (Mon–Sun)
      const weekMap = {};
      withLetters.forEach(c => {
        const date = new Date(c.completed_at || c.created_date);
        // Get Monday of that week
        const day = date.getDay(); // 0=Sun
        const diff = (day === 0 ? -6 : 1 - day);
        const monday = new Date(date);
        monday.setDate(date.getDate() + diff);
        monday.setHours(0, 0, 0, 0);
        const key = monday.toISOString().split('T')[0];
        weekMap[key] = (weekMap[key] || 0) + 1;
      });
      const sorted = Object.entries(weekMap)
        .sort(([a], [b]) => a.localeCompare(b))
        .slice(-8) // last 8 weeks
        .map(([week, count]) => {
          const d = new Date(week);
          const label = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
          return { week: label, count };
        });
      setLetterCompletions(sorted);
    }).catch(() => {});
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p style={{ fontFamily: 'Space Mono', fontSize: 11, letterSpacing: '0.1em', color: 'var(--ink-faint)' }}>LOADING...</p>
      </div>
    );
  }

  const totalLetters = thuluthLetters.length;
  const masteredCount = (progress?.mastered_letters || []).length;
  const completedLessonsCount = (progress?.completed_lessons || []).length;
  const totalLessons = lessons.length;
  const level = getLevelFromXP(progress?.total_xp || 0);
  const title = levelTitles[Math.min(level - 1, levelTitles.length - 1)];

  const stats = [
    { label: 'Total XP', value: progress?.total_xp || 0 },
    { label: 'Streak', value: `${progress?.current_streak || 0}d` },
    { label: 'Best Streak', value: `${progress?.longest_streak || 0}d` },
    { label: 'Lessons', value: `${completedLessonsCount}/${totalLessons}` },
    { label: 'Letters', value: `${masteredCount}/${totalLetters}` },
    { label: 'Level', value: String(level).padStart(2, '0') },
  ];

  return (
    <div className="min-h-screen bg-white">
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
          <p className="label-mono mb-4" style={{ color: 'var(--zzz-yellow-dim)' }}>Rank Status</p>
          <h1 className="display-xl mb-1">{title.toUpperCase()}</h1>
          <p style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--ink-mid)', marginTop: 6 }}>
            Level {String(level).padStart(2, '0')}
          </p>
        </div>

        <div className="py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: XP + Stats */}
          <div className="space-y-6">
            <div className="sys-window">
              <div className="sys-titlebar">
                <span className="sys-titlebar-dot" />
                <span>Experience</span>
              </div>
              <div className="p-5">
                <XPBar totalXP={progress?.total_xp} />
              </div>
            </div>

            <div className="sys-window">
              <div className="sys-titlebar">
                <span className="sys-titlebar-dot" />
                <span>Statistics</span>
              </div>
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr auto',
                gap: 12, padding: '8px 16px',
                borderBottom: '1px solid var(--rule)', background: 'var(--paper-dark)',
              }}>
                <span className="label-mono" style={{ color: 'var(--ink-faint)' }}>Metric</span>
                <span className="label-mono" style={{ color: 'var(--ink-faint)' }}>Value</span>
              </div>
              {stats.map(stat => (
                <div
                  key={stat.label}
                  className="data-row"
                  style={{ gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 12, paddingTop: 12, paddingBottom: 12 }}
                >
                  <span style={{ fontFamily: 'Barlow', fontWeight: 500, fontSize: 14, color: 'var(--ink)' }}>{stat.label}</span>
                  <span style={{ fontFamily: 'Space Mono', fontSize: 13, fontWeight: 700, color: 'var(--zzz-yellow-dim)' }}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Letter mastery + recent activity */}
          <div className="lg:col-span-2 space-y-6">

            {/* Weekly mastery chart */}
            <div className="sys-window">
              <div className="sys-titlebar">
                <span className="sys-titlebar-dot" />
                <span>Letters Mastered per Week</span>
              </div>
              <div className="p-5">
                {letterCompletions.length === 0 ? (
                  <p style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--ink-faint)', letterSpacing: '0.1em' }}>
                    No letter practice data yet.
                  </p>
                ) : (
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={letterCompletions} barSize={24}>
                      <XAxis
                        dataKey="week"
                        tick={{ fontFamily: 'Space Mono', fontSize: 9, fill: 'var(--ink-mid)', letterSpacing: 1 }}
                        axisLine={{ stroke: 'var(--rule)' }}
                        tickLine={false}
                      />
                      <YAxis
                        allowDecimals={false}
                        tick={{ fontFamily: 'Space Mono', fontSize: 9, fill: 'var(--ink-faint)' }}
                        axisLine={false}
                        tickLine={false}
                        width={24}
                      />
                      <Tooltip
                        cursor={{ fill: 'var(--paper-dark)' }}
                        contentStyle={{ fontFamily: 'Space Mono', fontSize: 10, border: '1px solid var(--rule)', background: 'var(--paper)', borderRadius: 0 }}
                        formatter={(v) => [`${v} letter${v !== 1 ? 's' : ''}`, 'Mastered']}
                      />
                      <Bar dataKey="count" radius={0}>
                        {letterCompletions.map((_, i) => (
                          <Cell key={i} fill={i === letterCompletions.length - 1 ? 'var(--zzz-yellow)' : 'var(--ink)'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            <div className="sys-window">
              <div className="sys-titlebar">
                <span className="sys-titlebar-dot" />
                <span>Letter Mastery: {masteredCount}/{totalLetters}</span>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-7 gap-1">
                  {thuluthLetters.map(letter => {
                    const isMastered = (progress?.mastered_letters || []).includes(letter.id);
                    return (
                      <div
                        key={letter.id}
                        title={letter.name}
                        className="aspect-square flex items-center justify-center text-lg border transition-colors"
                        style={{
                          fontFamily: "'Noto Naskh Arabic', serif",
                          background: isMastered ? 'var(--ink)' : 'var(--paper)',
                          borderColor: isMastered ? 'var(--zzz-yellow-dim)' : 'var(--rule)',
                          color: isMastered ? 'var(--zzz-yellow)' : 'var(--ink-faint)',
                        }}
                        dir="rtl"
                      >
                        {letter.letter}
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center gap-6 mt-4">
                  <span className="flex items-center gap-2 label-mono" style={{ color: 'var(--ink-faint)' }}>
                    <span className="w-3 h-3 inline-block" style={{ background: 'var(--ink)' }} /> Mastered
                  </span>
                  <span className="flex items-center gap-2 label-mono" style={{ color: 'var(--ink-faint)' }}>
                    <span className="w-3 h-3 inline-block border" style={{ borderColor: 'var(--rule)' }} /> Locked
                  </span>
                </div>
              </div>
            </div>

            {completions.length > 0 && (
              <div className="sys-window mb-10">
                <div className="sys-titlebar">
                  <span className="sys-titlebar-dot" />
                  <span>Recent Activity</span>
                </div>
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr auto',
                  gap: 12, padding: '8px 16px',
                  borderBottom: '1px solid var(--rule)', background: 'var(--paper-dark)',
                }}>
                  <span className="label-mono" style={{ color: 'var(--ink-faint)' }}>Lesson</span>
                  <span className="label-mono" style={{ color: 'var(--ink-faint)' }}>XP</span>
                </div>
                {completions.map(c => (
                  <div
                    key={c.id}
                    className="data-row"
                    style={{ gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 12, paddingTop: 10, paddingBottom: 10 }}
                  >
                    <div>
                      <p style={{ fontFamily: 'Barlow', fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>
                        {c.letter_id ? thuluthLetters.find(l => l.id === c.letter_id)?.name || c.lesson_id : c.lesson_id}
                      </p>
                      <p style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--ink-faint)', marginTop: 2 }}>
                        {new Date(c.completed_at || c.created_date).toLocaleDateString()}
                      </p>
                    </div>
                    <span style={{ fontFamily: 'Space Mono', fontSize: 11, fontWeight: 700, color: 'var(--zzz-yellow-dim)' }}>+{c.xp_earned}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}