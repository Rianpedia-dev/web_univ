
import { db } from "@/db"
import { chatFrequentQuestions } from "@/db/schema"
import { sql } from "drizzle-orm"

/**
 * Script untuk mengisi dummy data pertanyaan chatbot
 * Jalankan dengan: npx tsx scripts/seed-chat-questions.ts
 */

const dummyQuestions = [
    { question: "Berapa biaya kuliah di sini?", category: "biaya", count: 15 },
    { question: "Apa saja jalur pendaftaran yang tersedia?", category: "pmb", count: 12 },
    { question: "Kapan pendaftaran gelombang 2 dibuka?", category: "pmb", count: 8 },
    { question: "Apakah ada beasiswa untuk mahasiswa berprestasi?", category: "beasiswa", count: 10 },
    { question: "Di mana lokasi kampus utama?", category: "kontak", count: 5 },
    { question: "Apa saja program studi S1 yang terakreditasi A?", category: "akademik", count: 7 },
    { question: "Siapa Rektor universitas saat ini?", category: "pimpinan", count: 4 },
    { question: "Apakah ada fasilitas asrama untuk mahasiswa luar kota?", category: "fasilitas", count: 6 },
    { question: "Unit Kegiatan Mahasiswa apa saja yang aktif?", category: "kemahasiswaan", count: 3 },
    { question: "Bagaimana cara menghubungi bagian administrasi?", category: "kontak", count: 5 },
]

async function main() {
    console.log("🌱 Mulai seeding data pertanyaan chatbot...")

    try {
        // 1. Bersihkan tabel (opsional, uncomment jika ingin reset)
        // await db.delete(chatFrequentQuestions)

        // 2. Insert data
        for (const q of dummyQuestions) {
            // Cek apakah sudah ada
            const existing = await db
                .select()
                .from(chatFrequentQuestions)
                .where(sql`LOWER(${chatFrequentQuestions.question}) = ${q.question.toLowerCase()}`)
                .limit(1)

            if (existing.length > 0) {
                console.log(`Pertanyaan "${q.question}" sudah ada, skip.`)
            } else {
                await db.insert(chatFrequentQuestions).values({
                    question: q.question,
                    category: q.category,
                    count: q.count,
                    lastAskedAt: new Date(), // Waktu sekarang
                })
                console.log(`✅ Berhasil menambahkan: "${q.question}"`)
            }
        }

        console.log("✨ Seeding selesai!")
    } catch (error) {
        console.error("❌ Terjadi kesalahan:", error)
    } finally {
        process.exit(0)
    }
}

main()
