import { NextResponse } from 'next/server';
import { readEvents, writeEvents } from '@/lib/blob';

export async function GET() {
  try {
    const data = await readEvents('updates');
    return NextResponse.json(data);
  } catch (err) {
    console.error('[API updates GET] error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await writeEvents('updates', data);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[API updates POST] error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
