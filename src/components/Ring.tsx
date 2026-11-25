import React from 'react';

interface RingProps {
  percent: number;
  size: number;
  color?: string;
  label: string;
}

export const Ring: React.FC<RingProps> = ({ percent, size, color = 'var(--acc)', label }) => {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div className="cat-rg" style={{ width: size, height: size }}>
      <svg viewBox="0 0 36 36" width={size} height={size} aria-hidden="true">
        <circle
          cx="18"
          cy="18"
          r="15.9"
          fill="none"
          stroke="var(--line)"
          strokeWidth="3.5"
        />
        <circle
          cx="18"
          cy="18"
          r="15.9"
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={`${clamped} 100`}
          opacity={clamped > 0 ? 1 : 0}
          transform="rotate(-90 18 18)"
        />
      </svg>
      <b>{label}</b>
    </div>
  );
};

const CONFETTI_ITEMS = Array.from({ length: 24 }, (_, i) => ({
  emoji: ['🎉', '✨', '⭐', '🔥'][i % 4],
  left: `${(i * 4 + (i % 3) * 3) % 96}%`,
  delay: `${((i * 13) % 70) / 100}s`,
}));

export const ConfettiBurst: React.FC<{ active: boolean }> = ({ active }) => {
  if (!active) return null;
  return (
    <div aria-hidden="true">
      {CONFETTI_ITEMS.map((c, idx) => (
        <span
          key={idx}
          className="cat-cf"
          style={{ left: c.left, animationDelay: c.delay }}
        >
          {c.emoji}
        </span>
      ))}
    </div>
  );
};
