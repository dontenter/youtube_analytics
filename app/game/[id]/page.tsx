import { notFound } from 'next/navigation';
import Link from 'next/link';
import data from '@/public/data.json';
import { Game, formatNumber, formatDate } from '@/lib/data';
import GameChart from '@/components/GameChart';

interface GamePageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return data.games.map((game) => ({
    id: encodeURIComponent(game.id),
  }));
}

export async function generateMetadata({ params }: GamePageProps) {
  const { id } = await params;
  const game = data.games.find((g) => g.id === decodeURIComponent(id));
  return {
    title: game ? `${game.name} — YouTube Game Analytics` : 'Game Not Found',
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { id } = await params;
  const game = data.games.find((g) => g.id === decodeURIComponent(id)) as Game | undefined;

  if (!game) {
    notFound();
  }

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
            {game.name}
          </h1>
          <p className="mt-2 text-sm text-muted">{game.id}</p>
        </header>

        <section className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
          <Stat label="Всего геймплеев" value={formatNumber(game.total)} />
          <Stat label="Среднее в день" value={formatNumber(game.avg)} />
          <Stat label="Максимум" value={formatNumber(game.max)} />
          <Stat label="Минимум" value={formatNumber(game.min)} />
          <Stat label="Дата запуска" value={formatDate(game.launchDate)} />
        </section>



        <section className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Динамика геймплеев
          </h2>
          <GameChart game={game} />
        </section>

        <section className="mt-8 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground">Данные по дням</h2>
          <div className="mt-4 max-h-96 overflow-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-card">
                <tr className="border-b border-border text-left text-muted">
                  <th className="pb-3 font-medium">Дата</th>
                  <th className="pb-3 text-right font-medium">Геймплеи</th>
                </tr>
              </thead>
              <tbody>
                {[...game.records].reverse().map((record) => (
                  <tr
                    key={record.day}
                    className="border-b border-border last:border-b-0"
                  >
                    <td className="py-3 text-foreground">
                      {formatDate(record.day)}
                    </td>
                    <td className="py-3 text-right tabular-nums text-foreground">
                      {formatNumber(record.gameplays)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-xl font-semibold text-foreground sm:text-2xl">
        {value}
      </p>
    </div>
  );
}
