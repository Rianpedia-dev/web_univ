import { db } from "@/db";
import { siteAnalytics, visitorStats } from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const results = await db.select()
            .from(siteAnalytics)
            .where(eq(siteAnalytics.metricName, "total_visitors"))
            .limit(1);

        const totalCount = results[0]?.metricValue || 0;
        return NextResponse.json({ count: totalCount });
    } catch (error) {
        console.error("Error fetching visitor count:", error);
        return NextResponse.json({ error: "Failed to fetch count" }, { status: 500 });
    }
}

export async function POST() {
    try {
        const now = new Date();
        const currentMonth = now.getMonth() + 1; // 1-12
        const currentYear = now.getFullYear();

        // 1. Increment total visitors (Source of truth for "Total")
        await db.insert(siteAnalytics)
            .values({
                metricName: "total_visitors",
                metricValue: 1,
            })
            .onConflictDoUpdate({
                target: siteAnalytics.metricName,
                set: {
                    metricValue: sql`${siteAnalytics.metricValue} + 1`,
                    updatedAt: now
                },
            });

        // 2. Increment monthly visitors (Source of truth for "Trends")
        await db.insert(visitorStats)
            .values({
                month: currentMonth,
                year: currentYear,
                count: 1,
                updatedAt: now
            })
            .onConflictDoUpdate({
                target: [visitorStats.month, visitorStats.year],
                set: {
                    count: sql`${visitorStats.count} + 1`,
                    updatedAt: now
                },
            });

        // Get the latest absolute total
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
