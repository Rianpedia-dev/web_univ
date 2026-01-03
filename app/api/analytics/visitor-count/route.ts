import { db } from "@/db";
import { siteAnalytics } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const results = await db.select()
            .from(siteAnalytics)
            .where(eq(siteAnalytics.metricName, "total_visitors"))
            .limit(1);

        let record = results[0];

        if (!record) {
            // Initialize if not exists
            const [newRecord] = await db.insert(siteAnalytics).values({
                metricName: "total_visitors",
                metricValue: 0,
            }).returning();
            record = newRecord;
        }

        return NextResponse.json({ count: record.metricValue });
    } catch (error) {
        console.error("Error fetching visitor count:", error);
        return NextResponse.json({ error: "Failed to fetch count" }, { status: 500 });
    }
}

export async function POST() {
    try {
        await db.insert(siteAnalytics)
            .values({
                metricName: "total_visitors",
                metricValue: 1,
            })
            .onConflictDoUpdate({
                target: siteAnalytics.metricName,
                set: {
                    metricValue: sql`${siteAnalytics.metricValue} + 1`,
                    updatedAt: new Date()
                },
            });

        const results = await db.select()
            .from(siteAnalytics)
            .where(eq(siteAnalytics.metricName, "total_visitors"))
            .limit(1);

        return NextResponse.json({ count: results[0]?.metricValue || 0 });
    } catch (error) {
        console.error("Error incrementing visitor count:", error);
        return NextResponse.json({ error: "Failed to increment" }, { status: 500 });
    }
}
