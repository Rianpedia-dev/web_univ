import { db } from "../db";
import { sql } from "drizzle-orm";

async function createTable() {
    console.log("Creating visitor_stats table...");

    try {
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS "visitor_stats" (
                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                "month" integer NOT NULL,
                "year" integer NOT NULL,
                "count" integer NOT NULL DEFAULT 0,
                "updated_at" timestamp DEFAULT now()
            );
        `);

        await db.execute(sql`
            CREATE UNIQUE INDEX IF NOT EXISTS "month_year_idx" ON "visitor_stats" ("month", "year");
        `);

        console.log("Table created successfully.");
    } catch (error) {
        console.error("Error creating table:", error);
    }
}

createTable().catch(console.error);
