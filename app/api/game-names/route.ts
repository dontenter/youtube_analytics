import { NextResponse } from 'next/server';
import { readBlob, writeBlob } from '@/lib/blob';
import { GameNameMap } from '@/lib/events';

export async function GET() {
  try {
    const data = await readBlob<GameNameMap>('gameNames');
    return NextResponse.json(data);
  } catch (err) {
    console.error('[API game-names GET] error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as GameNameMap;
    const verified = await writeBlob<GameNameMap>('gameNames', data);
    return NextResponse.json(verified);
  } catch (err) {
    console.error('[API game-names POST] error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
