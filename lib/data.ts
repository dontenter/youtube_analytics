export interface CampaignRange {
  start: string;
  end: string;
}

export interface GameRecord {
  day: string;
  gameplays: number;
}

export interface Game {
  id: string;
  name: string;
  records: GameRecord[];
  total: number;
  avg: number;
  max: number;
  min: number;
  launchDate: string;
  campaignRanges: CampaignRange[];
  updateDates: string[];
}

export interface Summary {
  totalGames: number;
  totalGameplays: number;
  dateRange: {
    start: string;
    end: string;
  };
  games: Game[];
}

export async function getData(): Promise<Summary> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/data.json`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ru-RU').format(num);
}

export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-');
  return `${day}.${month}.${year}`;
}
