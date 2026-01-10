import { db } from '../db/index';
import { universityProfiles } from '../db/schema/profiles';

async function checkProfiles() {
    try {
        const profiles = await db.select({
            name: universityProfiles.name,
            isPublished: universityProfiles.isPublished
        }).from(universityProfiles);
        console.log('--- University Profiles ---');
        console.log(`Total records: ${profiles.length}`);
        profiles.forEach((p, i) => {
            console.log(`${i + 1}. Name: "${p.name}", Published: ${p.isPublished}`);
        });
        console.log('---------------------------');
        process.exit(0);
    } catch (error) {
        console.error('Error checking profiles:', error);
        process.exit(1);
    }
}

checkProfiles();
