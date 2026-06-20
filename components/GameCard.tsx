'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Game, formatNumber, formatDate } from '@/lib/data';
import { useEvents } from '@/components/EventsProvider';
import Sparkline from './Sparkline';

interface GameCardProps {
  game: Game;
  index: number;
  trendWeek?: number;
}

export default function GameCard({ game, index, trendWeek }: GameCardProps) {
  const { campaigns, updates } = useEvents();
  const campaignDates = campaigns[game.id] || [];
  const updateDates = updates[game.id] || [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={`/game/${encodeURIComponent(game.id)}`}
        className="group block rounded-2xl border border-border bg-card p-5 transition-colors duration-300 hover:border-accent hover:bg-card-hover"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold text-foreground">
              {game.name}
            </h3>
            <p className="mt-1 truncate text-xs text-muted">{game.id}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-foreground">
              {formatNumber(game.total)}
            </p>
            <p className="text-xs text-muted">всего</p>
          </div>
        </div>

        {(campaignDates.length > 0 || updateDates.length > 0) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {campaignDates.length > 0 && (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  />
                </svg>
                <span title={campaignDates.map(formatDate).join(', ')}>
                  {campaignDates.length} {campaignDates.length === 1 ? 'кампания' : campaignDates.length < 5 ? 'кампании' : 'кампаний'}
                </span>
              </div>
            )}
            {updateDates.length > 0 && (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-500">
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span title={updateDates.map(formatDate).join(', ')}>
                  {updateDates.length} {updateDates.length === 1 ? 'апдейт' : updateDates.length < 5 ? 'апдейта' : 'апдейтов'}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 h-10 w-full opacity-80 transition-opacity duration-300 group-hover:opacity-100">
          <Sparkline data={game.records} />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div>
            <p className="text-muted">Среднее</p>
            <p className="mt-0.5 font-medium text-foreground">
              {formatNumber(game.avg)}
            </p>
          </div>
          <div>
            <p className="text-muted">
              {typeof trendWeek === 'number' ? 'За неделю' : 'Максимум'}
            </p>
            <p className="mt-0.5 font-medium text-foreground">
              {formatNumber(typeof trendWeek === 'number' ? trendWeek : game.max)}
            </p>
          </div>
          <div>
            <p className="text-muted">Запуск</p>
            <p className="mt-0.5 font-medium text-foreground">
              {formatDate(game.launchDate)}
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
