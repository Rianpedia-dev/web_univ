import { db } from "../db";
import { visitorStats } from "../db/schema";
import { sql } from "drizzle-orm";

async function seedVisitorStats() {
    console.log("Seeding visitor stats...");

    const now = new Date();
    const currentYear = now.getFullYear();

    const seedData = [
        { month: 1, year: currentYear, count: 450 },
        { month: 2, year: currentYear, count: 320 },
        { month: 3, year: currentYear, count: 580 },
        { month: 4, year: currentYear, count: 890 },
        { month: 5, year: currentYear, count: 410 },
        { month: 6, year: currentYear, count: 950 },
        { month: 7, year: currentYear, count: 720 },
    ];

    for (const data of seedData) {
        await db.insert(visitorStats)
            .values({
                ...data,
                updatedAt: new Date()
            })
            .onConflictDoUpdate({
                target: [visitorStats.month, visitorStats.year],
                set: {
                    count: data.count,
                    updatedAt: new Date()
                }
            });
    }

    console.log("Seeding completed.");
}

seedVisitorStats().catch(console.error);
