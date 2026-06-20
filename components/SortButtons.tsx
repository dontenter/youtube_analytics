'use client';

import { motion } from 'framer-motion';

export type SortMode = 'total' | 'launch' | 'trend';

interface SortButtonsProps {
  value: SortMode;
  onChange: (mode: SortMode) => void;
}

const options: { value: SortMode; label: string }[] = [
  { value: 'total', label: 'По геймплеям' },
  { value: 'launch', label: 'По дате запуска' },
  { value: 'trend', label: 'По тренду за неделю' },
];

export default function SortButtons({ value, onChange }: SortButtonsProps) {
  return (
    <div className="inline-flex flex-wrap gap-2 rounded-2xl border border-border bg-card p-1.5">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className="relative rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-300"
          aria-pressed={value === option.value}
        >
          {value === option.value && (
            <motion.div
              layoutId="sortActive"
              className="absolute inset-0 rounded-xl bg-accent"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
          <span
            className={`relative z-10 ${
              value === option.value ? 'text-white' : 'text-muted hover:text-foreground'
            }`}
          >
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
}
