import { NextResponse } from 'next/server';
import { readBlob, writeBlob } from '@/lib/blob';
import { UpdateMap } from '@/lib/events';

export async function GET() {
  try {
    const data = await readBlob<UpdateMap>('updates');
    return NextResponse.json(data);
  } catch (err) {
    console.error('[API updates GET] error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as UpdateMap;
    const verified = await writeBlob<UpdateMap>('updates', data);
    return NextResponse.json(verified);
  } catch (err) {
    console.error('[API updates POST] error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
