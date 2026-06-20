import { NextResponse } from 'next/server';
import { readBlob, writeBlob } from '@/lib/blob';
import { CampaignMap } from '@/lib/events';

export async function GET() {
  try {
    const data = await readBlob<CampaignMap>('campaigns');
    return NextResponse.json(data);
  } catch (err) {
    console.error('[API campaigns GET] error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as CampaignMap;
    const verified = await writeBlob<CampaignMap>('campaigns', data);
    return NextResponse.json(verified);
  } catch (err) {
    console.error('[API campaigns POST] error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
