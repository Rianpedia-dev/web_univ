import { supabase } from "./supabase";

/**
 * Mengunggah file ke Supabase Storage.
 * @param file File yang akan diunggah (dari input HTML atau Blob).
 * @param bucket Nama bucket (contoh: 'images' atau 'documents').
 * @param path Path tujuan di dalam bucket (contoh: 'avatars/user-1.png').
 * @returns Path file yang berhasil diunggah atau error.
 */
export async function uploadFile(file: File | Blob, bucket: string, path: string) {
    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
            upsert: true,
            cacheControl: "3600",
        });

    if (error) {
        throw error;
    }

    return data.path;
}

/**
 * Menghapus file dari Supabase Storage.
 * @param bucket Nama bucket.
 * @param path Path file yang akan dihapus.
 */
export async function deleteFile(bucket: string, path: string) {
    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) {
        throw error;
    }
}

/**
 * Mendapatkan URL publik dari file.
 * @param bucket Nama bucket.
 * @param path Path file.
 * @returns URL publik string.
 */
export function getPublicUrl(bucket: string, path: string) {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
}
