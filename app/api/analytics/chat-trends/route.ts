import { db } from "@/db";
import { chatMessages } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Aggregate messages by month (Role 'user' only to count distinct interactions)
        const results = await db
            .select({
                month: sql<string>`to_char(${chatMessages.createdAt}, 'Mon')`,
                monthNum: sql<number>`extract(month from ${chatMessages.createdAt})`,
                count: sql<number>`count(*)::int`,
            })
            .from(chatMessages)
            .where(sql`${chatMessages.role} = 'user'`)
            .groupBy(sql`month`, sql`monthNum`)
            .orderBy(sql`monthNum`);

        // Format for Recharts
        const formattedData = results.map(row => ({
            month: row.month,
            count: row.count
        }));

        // Fallback for empty data
        if (formattedData.length === 0) {
            return NextResponse.json({
                data: [
                    { month: "Jan", count: 0 },
                    { month: "Feb", count: 0 },
                ]
            });
        }

        return NextResponse.json({ data: formattedData });
    } catch (error) {
        console.error("Error fetching chat trends:", error);
        return NextResponse.json({ error: "Failed to fetch trends" }, { status: 500 });
    }
}
