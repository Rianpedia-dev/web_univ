import { db } from "@/db";
import { visitorStats } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth(); // 0-11 (Jan is 0)

        const results = await db
            .select({
                monthNum: visitorStats.month,
                count: visitorStats.count,
            })
            .from(visitorStats)
            .where(eq(visitorStats.year, currentYear))
            .orderBy(visitorStats.month);

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];

        // Initialize with 0s only up to the current month to create the "growing chart" effect
        const visibleMonthsData = monthNames.slice(0, currentMonth + 1).map((name) => ({
            name: name,
            visitors: 0
        }));

        // Fill with actual data from DB (only for visible months)
        results.forEach(row => {
            if (row.monthNum >= 1 && row.monthNum <= currentMonth + 1) {
                visibleMonthsData[row.monthNum - 1].visitors = row.count;
            }
        });

        return NextResponse.json({ data: visibleMonthsData });
    } catch (error) {
        console.error("Error fetching visitor trends:", error);
        return NextResponse.json({ error: "Failed to fetch trends" }, { status: 500 });
    }
}
