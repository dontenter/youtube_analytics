import { CampaignMap, UpdateMap, GameNameMap } from '@/lib/events';

export type { CampaignMap, UpdateMap, GameNameMap };

export async function fetchCampaigns(): Promise<CampaignMap> {
  const res = await fetch('/api/campaigns');
  if (!res.ok) {
    throw new Error(`Failed to fetch campaigns: ${res.status}`);
  }
  return res.json();
}

export async function fetchUpdates(): Promise<UpdateMap> {
  const res = await fetch('/api/updates');
  if (!res.ok) {
    throw new Error(`Failed to fetch updates: ${res.status}`);
  }
  return res.json();
}

export async function saveCampaigns(data: CampaignMap): Promise<CampaignMap> {
  const res = await fetch('/api/campaigns', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    let message = `Failed to save campaigns: ${res.status}`;
    try {
      const body = await res.json();
      if (body.error) message = body.error;
    } catch {
      // ignore
    }
    throw new Error(message);
  }
  return res.json();
}

export async function saveUpdates(data: UpdateMap): Promise<UpdateMap> {
  const res = await fetch('/api/updates', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    let message = `Failed to save updates: ${res.status}`;
    try {
      const body = await res.json();
      if (body.error) message = body.error;
    } catch {
      // ignore
    }
    throw new Error(message);
  }
  return res.json();
}

export async function fetchGameNames(): Promise<GameNameMap> {
  const res = await fetch('/api/game-names');
  if (!res.ok) {
    throw new Error(`Failed to fetch game names: ${res.status}`);
  }
  return res.json();
}

export async function saveGameNames(data: GameNameMap): Promise<GameNameMap> {
  const res = await fetch('/api/game-names', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    let message = `Failed to save game names: ${res.status}`;
    try {
      const body = await res.json();
      if (body.error) message = body.error;
    } catch {
      // ignore
    }
    throw new Error(message);
  }
  return res.json();
}
