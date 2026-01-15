import { db } from "../db";
import { visitorStats } from "../db/schema";

async function checkData() {
    console.log("Checking visitor_stats table content...");
    const data = await db.select().from(visitorStats).orderBy(visitorStats.year, visitorStats.month);
    console.log(JSON.stringify(data, null, 2));
}

checkData().catch(console.error);
