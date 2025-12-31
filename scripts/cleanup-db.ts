import { db } from '../db';
import { sql } from 'drizzle-orm';

async function cleanup() {
    console.log('Cleaning up problematic tables and constraints...');
    try {
        // Drop foreign key constraints first if they exist
        await db.execute(sql`ALTER TABLE IF EXISTS gallery_media DROP CONSTRAINT IF EXISTS gallery_media_album_id_gallery_albums_id_fk`);
        await db.execute(sql`ALTER TABLE IF EXISTS gallery_album_media_rel DROP CONSTRAINT IF EXISTS gallery_album_media_rel_album_id_gallery_albums_id_fk`);
        await db.execute(sql`ALTER TABLE IF EXISTS gallery_album_media_rel DROP CONSTRAINT IF EXISTS gallery_album_media_rel_media_id_gallery_media_id_fk`);

        // Drop the tables we want to remove
        await db.execute(sql`DROP TABLE IF EXISTS gallery_album_media_rel`);
        await db.execute(sql`DROP TABLE IF EXISTS gallery_albums CASCADE`);

        console.log('Cleanup successful!');
    } catch (error) {
        console.error('Cleanup failed:', error);
    }
}

cleanup();
