import React from 'react';
import { AppView } from '../types/cat';

interface BottomNavProps {
  activeView: AppView;
  onNavigate: (view: 'home' | 'exam' | 'guide' | 'find') => void;
}

const TABS: { id: 'home' | 'exam' | 'guide' | 'find'; icon: string; label: string }[] = [
  { id: 'home', icon: '🏠', label: 'Today' },
  { id: 'exam', icon: '📝', label: 'Exam Qs' },
  { id: 'guide', icon: '🧭', label: 'Guide' },
  { id: 'find', icon: '🔍', label: 'Search' },
];

export const BottomNav: React.FC<BottomNavProps> = ({ activeView, onNavigate }) => {
  const currentTab =
    activeView === 'exam'
      ? 'exam'
      : activeView === 'guide'
      ? 'guide'
      : activeView === 'find'
      ? 'find'
      : 'home';

  return (
    <nav className="cat-bn" aria-label="Bottom navigation">
      {TABS.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            className={isActive ? 'on' : undefined}
            onClick={() => onNavigate(tab.id)}
          >
            <span style={{ fontSize: '1.25rem', lineHeight: 1.1 }} aria-hidden="true">
              {tab.icon}
            </span>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
