import { NextResponse } from 'next/server';
import { readEvents, writeEvents } from '@/lib/blob';

export async function GET() {
  const data = await readEvents('campaigns');
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const data = await request.json();
  await writeEvents('campaigns', data);
  return NextResponse.json({ success: true });
}
