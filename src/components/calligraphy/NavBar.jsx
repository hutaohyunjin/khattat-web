import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Pen, Award } from 'lucide-react';

export default function NavBar() {
  const location = useLocation();

  const links = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/styles', icon: BookOpen, label: 'Styles' },
    { to: '/practice', icon: Pen, label: 'Practice' },
    { to: '/progress', icon: Award, label: 'Progress' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 z-50 safe-area-pb">
      <div className="max-w-lg mx-auto flex">
        {links.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${
                isActive ? 'text-amber-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span className="text-[10px] font-semibold">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}