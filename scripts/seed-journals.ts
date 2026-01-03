import { db } from '@/db';
import { journals } from '@/db/schema';

async function seedJournals() {
    console.log('Memulai seeding data jurnal...');

    const sampleJournals = [
        {
            title: "Penerapan Chatbot Berbasis NLP untuk Dukungan Kesehatan Mental Mahasiswa dalam Lingkungan Akademik",
            authors: "Jemi A. Darin, Sarah Johnson",
            journalName: "Jurnal Teknol. Informasi UNIVPA",
            journalAbbr: "JTIF",
            year: "2025",
            volume: "7",
            number: "1",
            keywords: "AI, MentalHealth, Chatbot",
            imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop",
            link: "#",
            isPublished: true,
        },
        {
            title: "Analisis Sentimen Pengguna Media Sosial terhadap Kebijakan Transportasi Publik Menggunakan Deep Learning",
            authors: "Budi Santoso, Ani Wijaya, Catherine Tan et al.",
            journalName: "Int. Journal of Data Science",
            journalAbbr: "IJDS",
            year: "2024",
            volume: "12",
            number: "3",
            keywords: "DeepLearning, SocialMedia, NLP",
            imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
            link: "#",
            isPublished: true,
        },
        {
            title: "Optimasi Jaringan Sensor Nirkabel untuk Pemantauan Kualitas Air Waduk Berbasis IoT",
            authors: "Ahmad Fauzi et al.",
            journalName: "Jurnal Elektronika & Telekomunikasi",
            journalAbbr: "JET",
            year: "2025",
            volume: "5",
            number: "2",
            keywords: "IoT, WirelessSensor, Environment",
            imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
            link: "#",
            isPublished: true,
        },
        {
            title: "Implementasi Blockchain untuk Keamanan Data Rekam Medis Elektronik di Rumah Sakit Daerah",
            authors: "Dr. Linda Putri, Mark Spencer",
            journalName: "Journal of MedTech",
            journalAbbr: "JMT",
            year: "2024",
            volume: "9",
            number: "4",
            keywords: "Blockchain, Cybersecurity, HealthTech",
            imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=800&auto=format&fit=crop",
            link: "#",
            isPublished: true,
        },
        {
            title: "Pengembangan Sistem Peringatan Dini Banjir Berbasis Machine Learning dan Sensor Ultrasonik",
            authors: "Rizky Pratama, Siti Aminah",
            journalName: "Jurnal Teknik Sipil & Lingkungan",
            journalAbbr: "JTSL",
            year: "2025",
            volume: "10",
            number: "2",
            keywords: "MachineLearning, FloodWarning, IoT",
            imageUrl: "https://images.unsplash.com/photo-1545156521-77bd85671d30?q=80&w=800&auto=format&fit=crop",
            link: "#",
            isPublished: true,
        },
        {
            title: "Analisis Kinerja Protokol Routing pada Jaringan Software Defined Network (SDN)",
            authors: "Kevin Sanjaya, Marcus Gideon",
            journalName: "Cyber Security & Networks",
            journalAbbr: "CSN",
            year: "2024",
            volume: "8",
            number: "1",
            keywords: "SDN, Networking, Routing",
            imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=800&auto=format&fit=crop",
            link: "#",
            isPublished: true,
        }
    ];

    try {
        // Bersihkan data lama jika ada
        await db.delete(journals);

        for (const data of sampleJournals) {
            await db.insert(journals).values({
                ...data,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }

        console.log('Seeding jurnal berhasil!');
    } catch (error) {
        console.error('Error seeding journals:', error);
    }
}

seedJournals().catch(console.error);
