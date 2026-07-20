import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links = [
  { to: '/', label: 'Home', num: '01' },
  { to: '/styles', label: 'Styles', num: '02' },
  { to: '/practice', label: 'Practice', num: '03' },
  { to: '/progress', label: 'Ranks', num: '04' },
  { to: '/about', label: 'About', num: '05' },
];

export default function NavBar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: 'var(--paper)', borderColor: 'var(--rule)' }}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-12">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1.5">
          <span style={{ color: 'var(--zzz-yellow)', fontFamily: 'Space Mono', fontSize: 11, letterSpacing: 2 }}>+</span>
          <span style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 15, letterSpacing: '0.12em', color: 'var(--ink)', textTransform: 'uppercase' }}>
            KHATTAT
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ to, label, num }) => {
            const isActive = location.pathname === to && !(to === '/practice' && label === 'Letters');
            const isActiveLetters = label === 'Letters' && location.pathname === '/practice';
            const active = label === 'Home' ? location.pathname === '/' :
                           label === 'Letters' ? false :
                           location.pathname === to;
            return (
              <Link
                key={label}
                to={to}
                className="flex items-center gap-1.5 transition-colors"
                style={{ textDecoration: 'none' }}
              >
                {active && <span style={{ width: 24, height: 1.5, background: 'var(--ink)', display: 'inline-block', marginBottom: 1 }} />}
                <span style={{
                  fontFamily: 'Space Mono',
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: active ? 'var(--ink)' : 'var(--ink-faint)',
                  fontWeight: active ? 700 : 400,
                }}>
                  {active ? `${num} ${label.toUpperCase()}` : `${num} ${label.toUpperCase()}`}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(o => !o)}>
          {open ? <X className="w-5 h-5" style={{ color: 'var(--ink)' }} /> : <Menu className="w-5 h-5" style={{ color: 'var(--ink)' }} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-rule" style={{ background: 'var(--paper)' }}>
          {links.map(({ to, label, num }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={label}
                to={to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-6 py-3 border-b border-rule"
                style={{ textDecoration: 'none' }}
              >
                <span style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--zzz-yellow-dim)', letterSpacing: 2 }}>{num}</span>
                <span style={{
                  fontFamily: 'Barlow Condensed',
                  fontWeight: 700,
                  fontSize: 16,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: active ? 'var(--zzz-yellow)' : 'var(--ink)',
                }}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}