import { head, put } from '@vercel/blob';

export type EventsMap = Record<string, string[]>;

const BLOB_PATHS = {
  campaigns: 'campaigns.json',
  updates: 'updates.json',
} as const;

export async function readEvents(key: keyof typeof BLOB_PATHS): Promise<EventsMap> {
  try {
    const blob = await head(BLOB_PATHS[key]);
    const res = await fetch(blob.url);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${key}: ${res.status}`);
    }
    const data = (await res.json()) as EventsMap;
    return data || {};
  } catch (err) {
    if (err instanceof Error && err.message.includes('not found')) {
      return {};
    }
    console.warn(`Could not read ${key} from blob:`, err);
    return {};
  }
}

export async function writeEvents(key: keyof typeof BLOB_PATHS, data: EventsMap): Promise<void> {
  await put(BLOB_PATHS[key], JSON.stringify(data), {
    access: 'private',
    contentType: 'application/json',
    addRandomSuffix: false,
  });
}
