import { head, put } from '@vercel/blob';

export type EventsMap = Record<string, string[]>;

const BLOB_PATHS = {
  campaigns: 'campaigns.json',
  updates: 'updates.json',
} as const;

function checkToken() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error(
      'Missing BLOB_READ_WRITE_TOKEN environment variable. Make sure a Vercel Blob store is connected to this project.'
    );
  }
}

export async function readEvents(key: keyof typeof BLOB_PATHS): Promise<EventsMap> {
  try {
    checkToken();
    const blob = await head(BLOB_PATHS[key]);
    const res = await fetch(blob.url);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${key}: ${res.status}`);
    }
    const data = (await res.json()) as EventsMap;
    return data || {};
  } catch (err) {
    console.error(`[blob] read error for ${BLOB_PATHS[key]}:`, err);
    return {};
  }
}

export async function writeEvents(key: keyof typeof BLOB_PATHS, data: EventsMap): Promise<EventsMap> {
  checkToken();
  await put(BLOB_PATHS[key], JSON.stringify(data), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  return data;
}
