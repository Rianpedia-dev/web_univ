import { db } from "../db";
import { organizationalEmployees } from "../db/schema";
import { eq } from "drizzle-orm";
import fs from "fs";

async function checkWr3Exact() {
    try {
        const results = await db.select().from(organizationalEmployees);
        const wr3 = results.find(e => e.positionName.includes("Wakil Rektor III"));
        if (wr3) {
            fs.writeFileSync("wr3_data.json", JSON.stringify(wr3, null, 2));
            console.log("Data written to wr3_data.json");
        } else {
            console.log("Wakil Rektor III not found");
        }
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}

checkWr3Exact();
