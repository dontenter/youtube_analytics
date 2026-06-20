'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceDot,
} from 'recharts';
import { Game, formatNumber, formatDate } from '@/lib/data';
import { useEvents } from '@/components/EventsProvider';

interface GameChartProps {
  game: Game;
}

export default function GameChart({ game }: GameChartProps) {
  const { campaigns, updates } = useEvents();
  const campaignDates = campaigns[game.id] || [];
  const updateDates = updates[game.id] || [];

  const data = game.records.map(record => ({
    ...record,
    formattedDate: formatDate(record.day),
  }));

  const recordByDay = new Map(game.records.map(r => [r.day, r.gameplays]));
  const campaignSet = new Set(campaignDates);
  const updateSet = new Set(updateDates);

  const hasCampaigns = campaignDates.length > 0;
  const hasUpdates = updateDates.length > 0;
  const hasEvents = hasCampaigns || hasUpdates;

  return (
    <div>
      <div className="h-[400px] w-full rounded-2xl border border-border bg-card p-4 sm:p-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="gameplaysGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
            <XAxis
              dataKey="day"
              tickFormatter={(value: string) => {
                const [, month, day] = value.split('-');
                return `${day}.${month}`;
              }}
              stroke="#737373"
              tick={{ fill: '#737373', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              minTickGap={30}
            />
            <YAxis
              stroke="#737373"
              tick={{ fill: '#737373', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) => formatNumber(value)}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const isCampaignDay = campaignSet.has(label as string);
                  const isUpdateDay = updateSet.has(label as string);
                  return (
                    <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-lg">
                      <p className="text-xs text-muted">{formatDate(label as string)}</p>
                      <p className="mt-1 text-sm font-semibold text-foreground">
                        {formatNumber(payload[0].value as number)} геймплеев
                      </p>
                      {isCampaignDay && (
                        <p className="mt-1 text-xs font-medium text-accent">
                          Запуск рекламной кампании
                        </p>
                      )}
                      {isUpdateDay && (
                        <p className="mt-1 text-xs font-medium text-emerald-500">
                          Апдейт игры
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            {campaignDates.map((date) => (
              <ReferenceLine
                key={`campaign-${date}`}
                x={date}
                stroke="#3b82f6"
                strokeDasharray="4 4"
                strokeOpacity={0.6}
                ifOverflow="extendDomain"
              />
            ))}
            {updateDates.map((date) => {
              const gameplays = recordByDay.get(date);
              if (gameplays === undefined) return null;
              return (
                <ReferenceDot
                  key={`update-${date}`}
                  x={date}
                  y={gameplays}
                  r={5}
                  fill="#10b981"
                  stroke="none"
                />
              );
            })}
            <Area
              type="monotone"
              dataKey="gameplays"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#gameplaysGradient)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {hasEvents && (
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
          {hasCampaigns && (
            <div className="flex items-center gap-2">
              <span className="h-4 w-px border-l-2 border-dashed border-accent/60" />
              <span>кампании</span>
            </div>
          )}
          {hasUpdates && (
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>апдейты</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
