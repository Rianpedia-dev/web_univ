import { db } from "../db";
import { organizationalEmployees } from "../db/schema";
import { sql } from "drizzle-orm";

async function checkBroadLeadership() {
    try {
        const rektors = await db.select()
            .from(organizationalEmployees)
            .where(sql`${organizationalEmployees.positionName} ILIKE '%Rektor%'`);

        console.log(`Found ${rektors.length} entries containing "Rektor"`);
        rektors.forEach(emp => {
            console.log(`- [${emp.positionName}] ${emp.name} | NIDN: ${emp.nidn || "EMPTY/NULL"}`);
        });
    } catch (error) {
        console.error("Error:", error);
    }
    process.exit(0);
}

checkBroadLeadership();
