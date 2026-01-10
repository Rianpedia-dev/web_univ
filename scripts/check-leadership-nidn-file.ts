import { db } from "../db";
import { organizationalEmployees } from "../db/schema";
import fs from "fs";

async function checkLeadershipNidn() {
    try {
        const allEmployees = await db.select().from(organizationalEmployees);
        let output = "";
        allEmployees.forEach((emp, i) => {
            output += `Name: ${emp.name}\n`;
            output += `Position: ${emp.positionName}\n`;
            output += `NIDN: ${emp.nidn || "NULL"}\n`;
            output += `Published: ${emp.isPublished}\n`;
            output += `-------------------\n`;
        });
        fs.writeFileSync("nidn_check.txt", output);
        console.log("Results written to nidn_check.txt");
    } catch (error) {
        console.error("Error checking leadership NIDN:", error);
    }
    process.exit(0);
}

checkLeadershipNidn();
