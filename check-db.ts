import { db } from './db/index';
import { admissionStaff, admissionPathways } from './db/schema/index';

async function checkData() {
    try {
        const staff = await db.select().from(admissionStaff);
        console.log('--- ADMISSION STAFF ---');
        console.log(JSON.stringify(staff, null, 2));

        const pathways = await db.select().from(admissionPathways);
        console.log('--- ADMISSION PATHWAYS ---');
        console.log(JSON.stringify(pathways, null, 2));
    } catch (e) {
        console.error(e);
    }

    process.exit(0);
}

checkData().catch(err => {
    console.error(err);
    process.exit(1);
});
