import { NextResponse } from 'next/server';
import { db } from '@/db';
import { journals } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

export async function GET() {
    try {
        const data = await db.select()
            .from(journals)
            .where(eq(journals.isPublished, true))
            .orderBy(desc(journals.createdAt));

        return NextResponse.json({ data });
    } catch (error) {
        console.error('Error fetching journals:', error);
        return NextResponse.json(
            { error: 'Failed to fetch journals' },
            { status: 500 }
        );
    }
}
