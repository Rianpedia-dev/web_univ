import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

// Validasi bahwa DATABASE_URL ada
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL tidak ditemukan di environment variables');
}

// Konfigurasi connection pool untuk production
const poolConfig = {
  connectionString: process.env.DATABASE_URL,
  // Konfigurasi pool yang sangat minimal untuk mengatasi limitasi koneksi
  max: 1,
  min: 0,
  idleTimeoutMillis: 5000, // tutup koneksi idle lebih cepat (5 detik)
  connectionTimeoutMillis: 10000,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : undefined,
};

// Gunakan singleton pattern agar koneksi tidak dibuat berulang kali saat hot-reload di Next.js
interface GlobalWithDb {
  db?: ReturnType<typeof drizzle>;
  pool?: Pool;
}

const globalWithDb = global as unknown as GlobalWithDb;

// Buat connection pool jika belum ada
let pool: Pool;
if (process.env.NODE_ENV === 'production') {
  pool = new Pool(poolConfig);
} else {
  if (!globalWithDb.pool) {
    globalWithDb.pool = new Pool(poolConfig);
  }
  pool = globalWithDb.pool;
}

// Event listener untuk monitoring koneksi
pool.on('connect', () => {
  if (process.env.NODE_ENV === 'development') {
    // console.log('✅ Database: Koneksi baru dibuat');
  }
});

pool.on('error', (err) => {
  console.error('❌ Database: Error koneksi pool:', err.message);
});

// Fungsi untuk test koneksi database
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    console.log('✅ Database: Koneksi berhasil');
    return true;
  } catch (error) {
    console.error('❌ Database: Gagal terhubung:', error);
    return false;
  }
}

// Fungsi untuk menutup pool
export async function closeDatabasePool(): Promise<void> {
  try {
    await pool.end();
    console.log('✅ Database: Pool ditutup dengan sukses');
  } catch (error) {
    console.error('❌ Database: Error saat menutup pool:', error);
  }
}

// Inisialisasi db
let db: ReturnType<typeof drizzle>;
if (process.env.NODE_ENV === 'production') {
  db = drizzle(pool);
} else {
  if (!globalWithDb.db) {
    globalWithDb.db = drizzle(pool);
  }
  db = globalWithDb.db;
}

export { db, pool };

// Ekspor schema terpisah
export * from './schema/auth';
export * from './schema/news';
export * from './schema/events';
export * from './schema/galleries';
export * from './schema/academic';
export * from './schema/admissions';
export * from './schema/studentServices';
export * from './schema/partnerships';
export * from './schema/profiles';