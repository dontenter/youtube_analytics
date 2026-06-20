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
    let message = `Failed to save ${type}: ${res.status}`;
    try {
      const body = await res.json();
      if (body.error) message = body.error;
    } catch {
      // ignore
    }
    throw new Error(message);
  }
}
