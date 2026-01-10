import { db } from "../db";
import { organizationalEmployees } from "../db/schema";

async function checkLeadership() {
    try {
        console.log("Checking organizational_employees table...");
        const allEmployees = await db.select().from(organizationalEmployees);
        console.log(`Total employees found: ${allEmployees.length}`);
        allEmployees.forEach((emp, i) => {
            console.log(`${i + 1}. Name: ${emp.name}`);
            console.log(`   Position: ${emp.positionName}`);
            console.log(`   Level: ${emp.positionLevel}`);
            console.log(`   Published: ${emp.isPublished}`);
        });
    } catch (error) {
        console.error("Error checking leadership:", error);
    }
    process.exit(0);
}

checkLeadership();
