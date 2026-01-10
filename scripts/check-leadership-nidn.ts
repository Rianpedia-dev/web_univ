import { db } from "../db";
import { organizationalEmployees } from "../db/schema";

async function checkLeadershipNidn() {
    try {
        console.log("Checking NIDN in organizational_employees table...");
        const allEmployees = await db.select().from(organizationalEmployees);
        console.log(`Total employees found: ${allEmployees.length}`);
        allEmployees.forEach((emp, i) => {
            console.log(`${i + 1}. Name: ${emp.name}`);
            console.log(`   Position: ${emp.positionName}`);
            console.log(`   NIDN: ${emp.nidn || "NULL"}`);
            console.log(`   Published: ${emp.isPublished}`);
        });
    } catch (error) {
        console.error("Error checking leadership NIDN:", error);
    }
    process.exit(0);
}

checkLeadershipNidn();
