import { head, put } from '@vercel/blob';

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

export async function readBlob<T>(key: keyof typeof BLOB_PATHS): Promise<T> {
  try {
    checkToken();
    const blob = await head(BLOB_PATHS[key]);
    const res = await fetch(blob.url);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${key}: ${res.status}`);
    }
    const data = (await res.json()) as T;
    return data || ({} as T);
  } catch (err) {
    console.error(`[blob] read error for ${BLOB_PATHS[key]}:`, err);
    return {} as T;
  }
}

export async function writeBlob<T>(key: keyof typeof BLOB_PATHS, data: T): Promise<T> {
  checkToken();
  await put(BLOB_PATHS[key], JSON.stringify(data), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  return data;
}
