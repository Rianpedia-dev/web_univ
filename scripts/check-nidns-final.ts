import { db } from "../db";
import { organizationalEmployees } from "../db/schema";
import { sql } from "drizzle-orm";

async function checkNidns() {
    try {
        const rektors = await db.select()
            .from(organizationalEmployees)
            .where(sql`${organizationalEmployees.positionName} ILIKE '%Rektor%'`);

        for (const emp of rektors) {
            console.log(`POS: ${emp.positionName} | NAME: ${emp.name} | NIDN: ${emp.nidn}`);
        }
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}

checkNidns();
