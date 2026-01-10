import { db } from "../db";
import { news } from "../db/schema";

async function checkNews() {
    try {
        console.log("Checking news table...");
        const allNews = await db.select().from(news);
        console.log(`Total news found: ${allNews.length}`);
        allNews.forEach((n, i) => {
            console.log(`${i + 1}. Title: ${n.title}`);
            console.log(`   Published: ${n.isPublished}`);
        });
    } catch (error) {
        console.error("Error checking news:", error);
    }
    process.exit(0);
}

checkNews();
