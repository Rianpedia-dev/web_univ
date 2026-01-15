
import { db } from "@/db"
import { chatMessages } from "@/db/schema"
import { desc } from "drizzle-orm"

async function main() {
    console.log("Checking chat_messages table...")

    try {
        const messages = await db.select().from(chatMessages).orderBy(desc(chatMessages.createdAt)).limit(10);

        console.log(`Found ${messages.length} messages.`);

        if (messages.length > 0) {
            console.log("Sample messages:");
            messages.forEach(msg => {
                console.log(`- [${msg.role}] ${msg.content.substring(0, 50)}... (${msg.createdAt})`);
            });
        } else {
            console.log("Table is empty!");
        }
    } catch (error) {
        console.error("Error querying database:", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })
