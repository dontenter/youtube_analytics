'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import data from '@/public/data.json';
import Stats from '@/components/Stats';
import GameCard from '@/components/GameCard';
import SearchBar from '@/components/SearchBar';
import SortButtons, { SortMode } from '@/components/SortButtons';

function calcTrendWeek(game: (typeof data.games)[number]): number {
  const recent = game.records.slice(-7);
  return recent.reduce((sum, record) => sum + record.gameplays, 0);
}

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [sortMode, setSortMode] = useState<SortMode>('total');

  const sortedGames = useMemo(() => {
    const games = [...data.games];
    switch (sortMode) {
      case 'launch':
        return games.sort((a, b) => a.launchDate.localeCompare(b.launchDate));
      case 'trend':
        return games
          .map((game) => ({ game, trend: calcTrendWeek(game) }))
          .sort((a, b) => b.trend - a.trend)
          .map(({ game }) => game);
      case 'total':
      default:
        return games.sort((a, b) => b.total - a.total);
    }
  }, [sortMode]);

  const filteredGames = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return sortedGames;
    return sortedGames.filter(
      (game) =>
        game.name.toLowerCase().includes(query) ||
        game.id.toLowerCase().includes(query)
    );
  }, [search, sortedGames]);

  const trendsById = useMemo(() => {
    if (sortMode !== 'trend') return {};
    return Object.fromEntries(
      data.games.map((game) => [game.id, calcTrendWeek(game)])
    );
  }, [sortMode]);

  return (
    <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            YouTube Game Analytics
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Аналитика геймплеев игр на YouTube. Выберите игру,
            чтобы увидеть детальный график изменения активности.
          </p>
          <div className="mt-6">
            <Link
              href="/manage"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm text-foreground transition-colors hover:border-accent hover:bg-card-hover"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
              Управление событиями
            </Link>
          </div>
        </motion.header>

        <div className="mb-10">
          <Stats
            totalGames={data.totalGames}
            totalGameplays={data.totalGameplays}
            dateRange={data.dateRange}
          />
        </div>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              Список игр
              <span className="ml-2 text-sm font-normal text-muted">
                ({filteredGames.length})
              </span>
            </h2>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <SortButtons value={sortMode} onChange={setSortMode} />
              <div className="w-full sm:w-64">
                <SearchBar value={search} onChange={setSearch} />
              </div>
            </div>
          </div>

          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredGames.map((game, index) => (
                <GameCard
                  key={game.id}
                  game={game}
                  index={index}
                  trendWeek={sortMode === 'trend' ? trendsById[game.id] : undefined}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card p-12 text-center">
              <p className="text-muted">Игры не найдены</p>
            </div>
          )}
        </motion.section>
      </div>
    </main>
  );
}
