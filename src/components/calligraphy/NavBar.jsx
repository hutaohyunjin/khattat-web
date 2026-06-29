import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Pen, Award } from 'lucide-react';

const links = [
  { to: '/', icon: Home, label: 'Home', mono: '01' },
  { to: '/styles', icon: BookOpen, label: 'Styles', mono: '02' },
  { to: '/practice', icon: Pen, label: 'Practice', mono: '03' },
  { to: '/progress', icon: Award, label: 'Ranks', mono: '04' },
];

export default function NavBar() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-area-pb"
      style={{ background: 'var(--paper)', borderTop: '1.5px solid var(--ink)' }}>
      <div className="max-w-lg mx-auto flex">
        {links.map(({ to, icon: Icon, label, mono }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className="flex-1 flex flex-col items-center gap-1 py-3 relative transition-all"
              style={{
                background: isActive ? 'var(--ink)' : 'transparent',
                color: isActive ? 'var(--zzz-yellow)' : 'var(--ink-mid)',
                borderRight: '1px solid var(--rule)',
                borderTop: isActive ? '2px solid var(--zzz-yellow)' : '2px solid transparent',
              }}
            >
              <span className="font-mono text-[9px] opacity-50">{mono}</span>
              <Icon className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-[9px] font-mono tracking-wider">{label.toUpperCase()}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}