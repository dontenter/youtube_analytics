'use client';

import { useEvents } from './EventsProvider';

interface GameNameProps {
  game: { id: string; name: string };
  className?: string;
}

export function useGameName(gameId: string, fallbackName: string): string {
  const { gameNames } = useEvents();
  return gameNames[gameId] || fallbackName;
}

export function GameName({ game, className }: GameNameProps) {
  const name = useGameName(game.id, game.name);
  return <span className={className}>{name}</span>;
}
