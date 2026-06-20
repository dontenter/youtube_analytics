export type EventsMap = Record<string, string[]>;

export async function fetchEvents(type: 'campaigns' | 'updates'): Promise<EventsMap> {
  const res = await fetch(`/api/${type}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${type}: ${res.status}`);
  }
  return res.json();
}

export async function saveEvents(type: 'campaigns' | 'updates', data: EventsMap): Promise<void> {
  const res = await fetch(`/api/${type}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`Failed to save ${type}: ${res.status}`);
  }
}
