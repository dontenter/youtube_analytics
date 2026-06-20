import { head, put } from '@vercel/blob';

export type EventsMap = Record<string, string[]>;

const BLOB_PATHS = {
  campaigns: 'campaigns.json',
  updates: 'updates.json',
} as const;

export async function readEvents(key: keyof typeof BLOB_PATHS): Promise<EventsMap> {
  try {
    console.log(`[blob] reading ${BLOB_PATHS[key]}`);
    const blob = await head(BLOB_PATHS[key]);
    console.log(`[blob] got head for ${BLOB_PATHS[key]}:`, blob);
    const url = blob.downloadUrl || blob.url;
    const res = await fetch(url);
    console.log(`[blob] fetch status for ${BLOB_PATHS[key]}:`, res.status);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${key}: ${res.status}`);
    }
    const text = await res.text();
    console.log(`[blob] fetch body for ${BLOB_PATHS[key]}:`, text);
    const data = text ? (JSON.parse(text) as EventsMap) : {};
    return data || {};
  } catch (err) {
    console.error(`[blob] read error for ${BLOB_PATHS[key]}:`, err);
    return {};
  }
}

export async function writeEvents(key: keyof typeof BLOB_PATHS, data: EventsMap): Promise<EventsMap> {
  console.log(`[blob] writing ${BLOB_PATHS[key]}:`, JSON.stringify(data));
  const blob = await put(BLOB_PATHS[key], JSON.stringify(data), {
    access: 'private',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  console.log(`[blob] wrote ${BLOB_PATHS[key]}:`, blob);

  // Verify by reading back
  const url = blob.downloadUrl || blob.url;
  const res = await fetch(url);
  const text = await res.text();
  console.log(`[blob] verify read ${BLOB_PATHS[key]}:`, text);
  return text ? (JSON.parse(text) as EventsMap) : {};
}
