import { db } from "../db";
import { organizationalEmployees } from "../db/schema";
import { sql } from "drizzle-orm";

async function checkTargetLeadership() {
    try {
        const wr3 = await db.select()
            .from(organizationalEmployees)
            .where(sql`${organizationalEmployees.positionName} ILIKE '%Wakil Rektor III%'`);

        console.log(`Found ${wr3.length} matching entries for Wakil Rektor III`);
        wr3.forEach(emp => {
            console.log("--- DATA FOUND ---");
            console.log(`Name: ${emp.name}`);
            console.log(`Position: ${emp.positionName}`);
            console.log(`NIDN: "${emp.nidn}"`);
            console.log(`Is Published: ${emp.isPublished}`);
            console.log(`Raw Object: ${JSON.stringify(emp)}`);
            console.log("------------------");
        });
    } catch (error) {
        console.error("Error:", error);
    }
    process.exit(0);
}

checkTargetLeadership();
