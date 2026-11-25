import React from 'react';
import { AppView } from '../types/cat';

interface HeaderProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  onStartSession: () => void;
}

const NAV_ITEMS: { id: AppView; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'notes', label: 'Study Notes' },
  { id: 'worked', label: 'Worked Exams' },
  { id: 'practice', label: 'Practice' },
  { id: 'guide', label: 'SAGS Guide' },
];

export const Header: React.FC<HeaderProps> = ({ activeView, onNavigate, onStartSession }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6">
        <button
          type="button"
          onClick={() => onNavigate('dashboard')}
          className="text-left text-lg font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-slate-100"
        >
          CAT Theory Prep
        </button>

        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`border-b-2 py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                  isActive
                    ? 'border-blue-600 text-blue-700 dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={onStartSession}
          className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          Daily Session
        </button>
      </div>

      {/* Responsive mobile nav */}
      <nav
        aria-label="Mobile navigation"
        className="flex md:hidden flex-wrap items-center justify-center gap-1 border-t border-slate-100 px-3 py-1.5 dark:border-slate-800/80"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`rounded-md px-2.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
