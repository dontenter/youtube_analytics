import { NextResponse } from 'next/server';
import { readEvents, writeEvents } from '@/lib/blob';

export async function GET() {
  try {
    const data = await readEvents('campaigns');
    return NextResponse.json(data);
  } catch (err) {
    console.error('[API campaigns GET] error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const verified = await writeEvents('campaigns', data);
    return NextResponse.json(verified);
  } catch (err) {
    console.error('[API campaigns POST] error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
