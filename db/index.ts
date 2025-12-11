import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

// Validasi bahwa DATABASE_URL ada
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL tidak ditemukan di environment variables');
}

// Buat connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Ekspor db instance tanpa schema untuk menghindari error 'reduce'
export const db = drizzle(pool);

// Ekspor schema terpisah
export * from './schema/auth';