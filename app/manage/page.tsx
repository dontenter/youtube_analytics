'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import data from '@/public/data.json';
import { formatDate } from '@/lib/data';
import { CampaignRange, isValidCampaignRange } from '@/lib/events';
import { useEvents } from '@/components/EventsProvider';

function formatRange(range: CampaignRange): string {
  return `${formatDate(range.start)} – ${formatDate(range.end)}`;
}

function isValidDate(date: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

export default function ManagePage() {
  const {
    campaigns,
    updates,
    loading,
    error,
    saveCampaigns,
    saveUpdates,
  } = useEvents();

  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [campaignStart, setCampaignStart] = useState('');
  const [campaignEnd, setCampaignEnd] = useState('');
  const [updateInput, setUpdateInput] = useState('');
  const [saving, setSaving] = useState(false);

  const filteredGames = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return data.games;
    return data.games.filter(
      (game) =>
        game.name.toLowerCase().includes(query) ||
        game.id.toLowerCase().includes(query)
    );
  }, [search]);

  const selectedGame = useMemo(
    () => data.games.find((g) => g.id === selectedId) || null,
    [selectedId]
  );

  const handleAddCampaign = async () => {
    if (!selectedGame || !campaignStart || !campaignEnd) return;
    if (!isValidDate(campaignStart) || !isValidDate(campaignEnd)) {
      alert('Даты должны быть в формате YYYY-MM-DD');
      return;
    }
    if (campaignStart > campaignEnd) {
      alert('Дата начала не может быть позже даты окончания');
      return;
    }

    setSaving(true);
    try {
      const newRange: CampaignRange = { start: campaignStart, end: campaignEnd };
      const current = (campaigns[selectedGame.id] || []).filter(isValidCampaignRange);
      const next = {
        ...campaigns,
        [selectedGame.id]: [...current, newRange],
      };
      await saveCampaigns(next);
      setCampaignStart('');
      setCampaignEnd('');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveCampaign = async (range: CampaignRange) => {
    if (!selectedGame) return;

    setSaving(true);
    try {
      const current = campaigns[selectedGame.id] || [];
      const next = {
        ...campaigns,
        [selectedGame.id]: current.filter(
          (r) => r.start !== range.start || r.end !== range.end
        ),
      };
      await saveCampaigns(next);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  const handleAddUpdate = async () => {
    if (!selectedGame || !updateInput) return;
    if (!isValidDate(updateInput)) {
      alert('Дата должна быть в формате YYYY-MM-DD');
      return;
    }

    setSaving(true);
    try {
      const current = updates[selectedGame.id] || [];
      if (current.includes(updateInput)) return;
      const next = {
        ...updates,
        [selectedGame.id]: [...current, updateInput].sort(),
      };
      await saveUpdates(next);
      setUpdateInput('');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveUpdate = async (date: string) => {
    if (!selectedGame) return;

    setSaving(true);
    try {
      const current = updates[selectedGame.id] || [];
      const next = {
        ...updates,
        [selectedGame.id]: current.filter((d) => d !== date),
      };
      await saveUpdates(next);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-foreground"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Назад к списку
        </Link>

        <header className="mt-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Управление событиями
          </h1>
          <p className="mt-2 text-sm text-muted">
            Добавляйте периоды рекламных кампаний и даты апдейтов для игр.
          </p>
        </header>

        {loading && (
          <div className="mt-8 text-sm text-muted">Загрузка событий...</div>
        )}

        {error && (
          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-500">
            Ошибка загрузки: {error}
          </div>
        )}

        {!loading && !error && (
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
              <h2 className="text-sm font-semibold text-foreground">Игры</h2>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск..."
                className="mt-3 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
              />
              <div className="mt-3 max-h-[60vh] overflow-auto">
                {filteredGames.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => setSelectedId(game.id)}
                    className={`w-full rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                      selectedId === game.id
                        ? 'bg-accent/10 text-accent'
                        : 'text-foreground hover:bg-card-hover'
                    }`}
                  >
                    <div className="truncate font-medium">{game.name}</div>
                    <div className="truncate text-xs text-muted">{game.id}</div>
                  </button>
                ))}
              </div>
            </section>

            <section className="lg:col-span-2 rounded-2xl border border-border bg-card p-4 sm:p-5">
              {selectedGame ? (
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    {selectedGame.name}
                  </h2>
                  <p className="text-xs text-muted">{selectedGame.id}</p>

                  <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-semibold text-accent">
                        Рекламные кампании
                      </h3>
                      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                        <input
                          type="date"
                          value={campaignStart}
                          onChange={(e) => setCampaignStart(e.target.value)}
                          placeholder="С"
                          className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
                        />
                        <input
                          type="date"
                          value={campaignEnd}
                          onChange={(e) => setCampaignEnd(e.target.value)}
                          placeholder="По"
                          className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
                        />
                        <button
                          onClick={handleAddCampaign}
                          disabled={saving || !campaignStart || !campaignEnd}
                          className="rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                        >
                          Добавить
                        </button>
                      </div>
                      <ul className="mt-3 space-y-2">
                        {(campaigns[selectedGame.id] || [])
                          .filter(isValidCampaignRange)
                          .map((range, index) => (
                            <li
                              key={`${range.start}-${range.end}-${index}`}
                              className="flex items-center justify-between rounded-xl bg-background px-3 py-2 text-sm text-foreground"
                            >
                              <span>{formatRange(range)}</span>
                              <button
                                onClick={() => handleRemoveCampaign(range)}
                                disabled={saving}
                                className="text-xs text-muted transition-colors hover:text-red-500"
                              >
                                Удалить
                              </button>
                            </li>
                          ))}
                        {(campaigns[selectedGame.id] || []).filter(isValidCampaignRange).length === 0 && (
                          <li className="text-sm text-muted">Нет кампаний</li>
                        )}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-emerald-500">
                        Апдейты
                      </h3>
                      <div className="mt-3 flex gap-2">
                        <input
                          type="date"
                          value={updateInput}
                          onChange={(e) => setUpdateInput(e.target.value)}
                          className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-emerald-500"
                        />
                        <button
                          onClick={handleAddUpdate}
                          disabled={saving || !updateInput}
                          className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                        >
                          Добавить
                        </button>
                      </div>
                      <ul className="mt-3 space-y-2">
                        {(updates[selectedGame.id] || []).map((date) => (
                          <li
                            key={date}
                            className="flex items-center justify-between rounded-xl bg-background px-3 py-2 text-sm text-foreground"
                          >
                            <span>{formatDate(date)}</span>
                            <button
                              onClick={() => handleRemoveUpdate(date)}
                              disabled={saving}
                              className="text-xs text-muted transition-colors hover:text-red-500"
                            >
                              Удалить
                            </button>
                          </li>
                        ))}
                        {(updates[selectedGame.id] || []).length === 0 && (
                          <li className="text-sm text-muted">Нет апдейтов</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted">Выберите игру слева</p>
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
