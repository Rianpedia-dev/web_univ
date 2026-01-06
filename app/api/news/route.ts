import { NextResponse } from 'next/server';
import { getLatestNewsWithCategory } from '@/lib/db';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    try {
        const news = await getLatestNewsWithCategory(limit, offset);
        return NextResponse.json(news);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
    }
}
