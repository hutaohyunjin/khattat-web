import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Pen, Award } from 'lucide-react';

export default function NavBar() {
  const location = useLocation();

  const links = [
    { to: '/', icon: Home, label: 'HOME' },
    { to: '/styles', icon: BookOpen, label: 'STYLES' },
    { to: '/practice', icon: Pen, label: 'PRACTICE' },
    { to: '/progress', icon: Award, label: 'RANKS' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-area-pb"
      style={{ background: 'rgba(13,15,20,0.97)', borderTop: '1px solid #2A2E3A' }}>
      {/* Top accent line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #F5C940, transparent)' }} />
      <div className="max-w-lg mx-auto flex">
        {links.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className="flex-1 flex flex-col items-center gap-1 py-3 relative transition-all"
              style={{ color: isActive ? '#F5C940' : '#555B6E' }}
            >
              {isActive && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5"
                  style={{ background: '#F5C940', boxShadow: '0 0 8px #F5C940' }}
                />
              )}
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="text-[9px] font-bold tracking-widest font-heading">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}