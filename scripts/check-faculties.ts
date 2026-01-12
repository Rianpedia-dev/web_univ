import { pool } from '../db/index';
import 'dotenv/config';

async function check() {
    const client = await pool.connect();
    try {
        const result = await client.query(`
      SELECT column_name
      FROM information_schema.columns 
      WHERE table_name = 'faculties'
      ORDER BY ordinal_position;
    `);
        console.log('Columns in faculties:');
        result.rows.forEach(row => console.log('- ' + row.column_name));
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        client.release();
        process.exit(0);
    }
}

check();
