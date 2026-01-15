const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    console.error('DATABASE_URL is not set');
    process.exit(1);
}

const client = postgres(connectionString);
const db = drizzle(client);

async function check() {
    try {
        const result = await db.execute('SELECT * FROM university_profiles');
        console.log('University Profiles Count:', result.length);
        console.log('Data:', JSON.stringify(result, null, 2));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

check();
