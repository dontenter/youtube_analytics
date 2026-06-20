'use client';

import { motion } from 'framer-motion';
import { formatNumber, formatDate } from '@/lib/data';

interface StatsProps {
  totalGames: number;
  totalGameplays: number;
  dateRange: {
    start: string;
    end: string;
  };
}

export default function Stats({ totalGames, totalGameplays, dateRange }: StatsProps) {
  const items = [
    { label: 'Всего игр', value: formatNumber(totalGames) },
    { label: 'Всего геймплеев', value: formatNumber(totalGameplays) },
    { label: 'Период', value: `${formatDate(dateRange.start)} – ${formatDate(dateRange.end)}` },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <p className="text-sm font-medium text-muted">{item.label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            {item.value}
          </p>
        </motion.div>
      ))}
    </section>
  );
}
