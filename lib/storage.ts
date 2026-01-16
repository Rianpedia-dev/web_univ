import { supabase } from "./supabase";

/**
 * Mengunggah file ke Supabase Storage.
 * @param file File yang akan diunggah (dari input HTML atau Blob).
 * @param bucket Nama bucket (contoh: 'images' atau 'documents').
 * @param path Path tujuan di dalam bucket (contoh: 'avatars/user-1.png').
 * @returns Path file yang berhasil diunggah atau error.
 */
/**
 * Mengunggah file ke Supabase Storage.
 * Jika file adalah gambar dan ukurannya > 2.5MB, akan dikompres otomatis.
 * @param file File yang akan diunggah (dari input HTML atau Blob).
 * @param bucket Nama bucket (contoh: 'images' atau 'documents').
 * @param path Path tujuan di dalam bucket (contoh: 'avatars/user-1.png').
 * @returns Path file yang berhasil diunggah atau error.
 */
export async function uploadFile(file: File | Blob, bucket: string, path: string) {
    let fileToUpload = file;

    // Check if it's an image and needs compression
    if (file instanceof File && file.type.startsWith('image/') && file.size > 2.5 * 1024 * 1024) {
        try {
            console.log(`Compressing image ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)...`);
            fileToUpload = await compressImage(file, 2.5);
            console.log(`Compressed to ${(fileToUpload.size / 1024 / 1024).toFixed(2)} MB`);
        } catch (error) {
            console.error("Compression failed, uploading original file:", error);
        }
    }

    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, fileToUpload, {
            upsert: true,
            cacheControl: "3600",
        });

    if (error) {
        throw error;
    }

    return data.path;
}

/**
 * Mengkompres gambar hingga di bawah ukuran tertentu (MB).
 * @param file File gambar.
 * @param maxSizeMB Ukuran maksimal dalam MB.
 * @returns Promise<File> File gambar yang sudah dikompres.
 */
async function compressImage(file: File, maxSizeMB: number): Promise<File> {
    return new Promise((resolve, reject) => {
        const maxWidth = 1920; // Batas resolusi width
        const maxHeight = 1080; // Batas resolusi height
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;

            img.onload = () => {
                let width = img.width;
                let height = img.height;

                // Resize dimensions if too large
                if (width > maxWidth || height > maxHeight) {
                    if (width > height) {
                        height = Math.round((height *= maxWidth / width));
                        width = maxWidth;
                    } else {
                        width = Math.round((width *= maxHeight / height));
                        height = maxHeight;
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error("Canvas context not available"));
                    return;
                }

                ctx.drawImage(img, 0, 0, width, height);

                // Iterative compression
                let quality = 0.9;

                const compress = () => {
                    canvas.toBlob(
                        (blob) => {
                            if (!blob) {
                                reject(new Error("Compression failed"));
                                return;
                            }

                            if (blob.size <= maxSizeMB * 1024 * 1024 || quality <= 0.3) {
                                const compressedFile = new File([blob], file.name, {
                                    type: file.type,
                                    lastModified: Date.now(),
                                });
                                resolve(compressedFile);
                            } else {
                                quality -= 0.1;
                                compress();
                            }
                        },
                        file.type,
                        quality
                    );
                };

                compress();
            };

            img.onerror = (err) => reject(err);
        };

        reader.onerror = (err) => reject(err);
    });
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

/**
 * Mendapatkan path file dari URL publik.
 * @param url URL publik file.
 * @param bucket Nama bucket.
 * @returns Path file atau null jika URL tidak valid.
 */
export function getPathFromUrl(url: string, bucket: string): string | null {
    try {
        const urlObj = new URL(url);
        // URL Supabase format: .../storage/v1/object/public/{bucket}/{path}
        const regex = new RegExp(`/storage/v1/object/public/${bucket}/(.+)`);
        const match = urlObj.pathname.match(regex);
        if (match && match[1]) {
            return decodeURIComponent(match[1]);
        }
        return null;
    } catch (e) {
        return null;
    }
}
