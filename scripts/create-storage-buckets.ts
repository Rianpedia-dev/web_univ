import * as dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("🔍 Mengecek variabel lingkungan...");
if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Error: NEXT_PUBLIC_SUPABASE_URL atau NEXT_PUBLIC_SUPABASE_ANON_KEY tidak ditemukan.");
    process.exit(1);
}
console.log("✅ Variabel ditemukan.");

const supabase = createClient(supabaseUrl, supabaseKey);

async function createBuckets() {
    console.log("🚀 Memulai proses pembuatan bucket...");

    const buckets = ["images", "documents"];

    for (const bucketName of buckets) {
        console.log(`\n--- [Bucket: ${bucketName}] ---`);
        console.log(`⏳ Mencoba mengambil informasi bucket '${bucketName}'...`);

        try {
            const { data: bucket, error: getError } = await supabase.storage.getBucket(bucketName);

            if (getError) {
                console.log(`ℹ️ Info: Bucket tidak ditemukan atau tidak bisa diakses (${getError.message}).`);
                console.log(`➕ Mencoba membuat bucket '${bucketName}'...`);

                const { data: createData, error: createError } = await supabase.storage.createBucket(bucketName, {
                    public: true,
                });

                if (createError) {
                    console.error(`❌ Gagal membuat bucket: ${createError.message}`);
                    if (createError.message.includes("401") || createError.message.includes("Unauthorized")) {
                        console.error("💡 Tip: Kunci 'anon' biasanya tidak memiliki izin untuk membuat bucket. Silakan gunakan SQL Editor di dashboard Supabase.");
                    }
                } else {
                    console.log(`✅ Sukses! Bucket '${bucketName}' berhasil dibuat.`);
                }
            } else {
                console.log(`✅ Bucket '${bucketName}' sudah tersedia.`);
            }
        } catch (err: any) {
            console.error(`💥 Error tidak terduga: ${err.message}`);
        }
    }

    console.log("\n✨ Proses selesai.");
}

createBuckets().catch(err => console.error("🔥 Fatal Error:", err));
