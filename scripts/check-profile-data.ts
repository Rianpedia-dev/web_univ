import { getPublishedUniversityProfile } from "./lib/db";

async function check() {
    const profile = await getPublishedUniversityProfile();
    console.log("Profile Data:", JSON.stringify(profile, null, 2));
}

check().catch(console.error);
