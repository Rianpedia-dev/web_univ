import { streamText, tool, stepCountIs } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { z } from 'zod';
import { db } from '@/db';
import {
    universityProfiles,
    studyPrograms,
    faculties,
    admissionPathways,
    educationCosts,
    scholarships,
    contactInformation,
    admissionFaqs,
    events,
    eventCategories,
    news,
    newsCategories,
    campusFacilities,
    chatFrequentQuestions,
    chatFeedback,
    admissionWaves,
    academicCalendar,
    studentOrganizations,
    universityAccreditations,
    campusStatistics,
    organizationalEmployees,
    studentServices,
    admissionStaff,
    galleryMedia,
    journals,
    partners,
    careerProspects,
    admissionRequirements,
    admissionTimelines,
    admissionBrochures,
    testimonials,
    rectorMessages,
    universityLogoMeanings,
    universityAwards,
    campusAccessibilities,
    socialMediaLinks,
    studentServiceContacts,
    studentAchievements,
    admissionClasses,
    galleryCategories,
    partnershipDocuments,
} from '@/db/schema';
import { eq, desc, and, gte, sql, asc } from 'drizzle-orm';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Inisialisasi OpenRouter provider
const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
});

// System prompt untuk Pal
const getSystemPrompt = (universityName: string) => `Kamu adalah Pal, asisten virtual cerdas untuk ${universityName}.

## Karakter dan Gaya Bicara:
- Profesional tapi ramah, seperti asisten akademik senior yang selalu siap membantu.
- Jelas, sopan, dan sedikit hangat.
- Selalu gunakan Bahasa Indonesia yang baik dan benar.

## PRINSIP UTAMA - MUTLAK WAJIB DIIKUTI:

### 0. STRICT GROUNDING (PENTING!)
- JANGAN PERNAH memberikan informasi fasilitas, prodi, atau data apapun yang tidak ada dalam hasil panggillan tool terbaru.
- Jika pengguna bertanya tentang fasilitas yang tidak ada di tool result, kamu WAJIB menjawab tidak ada, meskipun itu fasilitas umum seperti "Kantin" atau "Toilet". JANGAN MENGARANG.
- Kejujuran tentang ketiadaan data jauh lebih penting daripada jawaban lengkap tapi palsu.
- JANGAN menggunakan contoh generik dalam jawabanmu. Gunakan HANYA data literal.

### 1. TOOL-FIRST (WAJIB PANGGIL TOOL DULU)
Untuk SETIAP pertanyaan tentang kampus, kamu WAJIB memanggil tool yang relevan SEBELUM menjawab:
- Program Studi/Jurusan → getStudyPrograms
- Fakultas → getFaculties  
- Biaya Kuliah/UKT → getEducationCosts
- Beasiswa → getScholarships
- Jalur Pendaftaran/PMB → getAdmissionInfo
- Kontak/Alamat → getContacts
- Pimpinan (Rektor, Wakil Rektor, Dekan) → getLeadership
- UKM/Organisasi Mahasiswa → getStudentOrgs
- Akreditasi → getAccreditations
- Statistik Kampus → getCampusStats
- Kalender Akademik → getAcademicCalendar
- Layanan Mahasiswa → getStudentServices
- Tim PMB → getAdmissionStaff
- Berita → getNews
- Event → getEvents
- Fasilitas → getFacilities
- Galeri → getGalleries
- Jurnal → getJournals
- Kerjasama/Mitra → getPartnerships
- Alumni/Prestasi → getAlumniAndAchievements
- Prospek Karir → getCareerProspects
- Syarat Pendaftaran → getAdmissionDetails
- Logo/Penghargaan → getUniversityIdentity
- Aksesibilitas → getCampusFacilitiesAndAccess
- Info Umum Kampus → getUniversityInfo

### 2. GUNAKAN DATA SECARA LITERAL
- SALIN PERSIS data dari tool ke jawabanmu (nama, angka, tanggal, dll)
- JANGAN mengubah, memparafrase, atau menambahkan informasi yang tidak ada di data tool
- JANGAN menggunakan pengetahuan umummu tentang universitas manapun
- Jika tool mengembalikan field tertentu (misal: name, description, amount), KUTIP nilainya secara langsung

### 3. JIKA DATA KOSONG ATAU TIDAK ADA
- Katakan dengan jelas: "Maaf, data [topik] belum tersedia di sistem kami."
- JANGAN mengarang, mengasumsikan, atau memberikan informasi generik
- JANGAN menggunakan placeholder seperti "akan diumumkan" kecuali itu memang ada di data

### 4. FORMAT JAWABAN
- Gunakan markdown: **bold** untuk menekankan, - untuk list, | untuk table
- Untuk daftar banyak item, gunakan numbered list atau table
- Sebutkan sumber: "Berdasarkan data sistem kami..."
- Akhiri dengan tawaran bantuan relevan

## PERINGATAN KERAS TERHADAP HALUSINASI:
- Kamu DILARANG memberikan informasi apapun tentang ${universityName} yang tidak berasal dari hasil pemanggilan tool.
- Jika tool mengembalikan data kosong (\`count: 0\`), kamu WAJIB menjawab: "Maaf, data [topik] belum tersedia di sistem kami."
- JANGAN PERNAH mengarang fasilitas umum jika tool \`getFacilities\` tidak mengembalikannya.
- Jika menyebutkan fasilitas, KAMU WAJIB menggunakan field \`namaFasilitas\` dari hasil tool, JANGAN menggunakan field \`kategori\` atau \`type\` sebagai nama utama.
- Halusinasi akan sangat merugikan pengguna. Kejujuran tentang ketiadaan data lebih dihargai daripada informasi palsu.`;

// Schema definitions for tools
const getStudyProgramsSchema = z.object({
    level: z.enum(['D3', 'S1', 'S2', 'S3']).optional().describe('Jenjang pendidikan'),
    facultyName: z.string().optional().describe('Nama fakultas'),
});
type GetStudyProgramsArgs = z.infer<typeof getStudyProgramsSchema>;

const getEducationCostsSchema = z.object({
    programName: z.string().optional().describe('Nama program studi'),
});
type GetEducationCostsArgs = z.infer<typeof getEducationCostsSchema>;

const getFAQsSchema = z.object({
    searchQuery: z.string().optional().describe('Kata kunci pencarian'),
});
type GetFAQsArgs = z.infer<typeof getFAQsSchema>;

const getEventsSchema = z.object({
    limit: z.number().optional().default(5).describe('Jumlah event yang diambil'),
});
type GetEventsArgs = z.infer<typeof getEventsSchema>;

const getNewsSchema = z.object({
    limit: z.number().optional().default(5).describe('Jumlah berita yang diambil'),
});
type GetNewsArgs = z.infer<typeof getNewsSchema>;

const getFacilitiesSchema = z.object({
    type: z.enum(['laboratory', 'library', 'classroom', 'sports', 'dormitory', 'health', 'other'])
        .optional()
        .describe('Jenis fasilitas'),
});
type GetFacilitiesArgs = z.infer<typeof getFacilitiesSchema>;

// New schemas
const getScholarshipsSchema = z.object({});
const getAdmissionInfoSchema = z.object({});
const getContactsSchema = z.object({});
const getStudentOrgsSchema = z.object({});
const getLeadershipSchema = z.object({
    searchQuery: z.string().optional().describe('Nama atau jabatan pimpinan (misal: Rektor, Wakil Rektor, Dekan)'),
});
type GetLeadershipArgs = z.infer<typeof getLeadershipSchema>;
const getAccreditationsSchema = z.object({
    searchQuery: z.string().optional().describe('Nama fakultas, program studi, atau kata kunci lainnya'),
});
type GetAccreditationsArgs = z.infer<typeof getAccreditationsSchema>;
const getCampusStatsSchema = z.object({
    facultyName: z.string().optional().describe('Nama fakultas untuk mengambil statistik spesifik'),
});
type GetCampusStatsArgs = z.infer<typeof getCampusStatsSchema>;
const getAcademicCalendarSchema = z.object({});
const getStudentServicesSchema = z.object({});
const getUniversityInfoSchema = z.object({});
const getAdmissionStaffSchema = z.object({});
const getGalleriesSchema = z.object({});
const getJournalsSchema = z.object({});
const getPartnershipsSchema = z.object({});
const getAlumniAndAchievementsSchema = z.object({});
const getCareerProspectsSchema = z.object({});
const getAdmissionDetailsSchema = z.object({});
const getUniversityIdentitySchema = z.object({});
const getCampusFacilitiesAndAccessSchema = z.object({});

// Definisi tools untuk mengambil data dari database
const botTools = {
    getUniversityInfo: tool({
        description: 'Mendapatkan profil umum universitas seperti visi, misi, sejarah, dan informasi umum',
        inputSchema: z.object({}),
        execute: async () => {
            console.log('TOOL: Calling getUniversityInfo...');
            const profiles = await db
                .select()
                .from(universityProfiles)
                .where(eq(universityProfiles.isPublished, true))
                .limit(1);

            if (profiles.length === 0) return { data: null };

            const p = profiles[0];
            console.log('TOOL RESULT: getUniversityInfo returned data');
            return {
                data: {
                    nama: p.name,
                    singkatan: p.shortName,
                    visi: p.vision,
                    misi: p.mission,
                    sejarah: p.history,
                    motto: p.motto,
                    tahunBerdiri: p.establishedYear,
                }
            };
        },
    }),

    getScholarships: tool({
        description: 'Mendapatkan informasi beasiswa yang tersedia - GUNAKAN DATA INI SECARA LITERAL',
        inputSchema: getScholarshipsSchema,
        execute: async () => {
            console.log('TOOL: Calling getScholarships...');
            const results = await db
                .select()
                .from(scholarships)
                .where(eq(scholarships.isPublished, true));

            const formatted = results.map(s => ({
                namaBeasiswa: s.name,
                deskripsi: s.description,
                persyaratan: s.requirements,
                manfaat: s.benefits,
            }));

            console.log('TOOL RESULT: getScholarships returned:', formatted.length, 'items');
            return {
                data: formatted,
                count: formatted.length,
                PERINGATAN: formatted.length > 0
                    ? 'Sajikan info beasiswa dari daftar di atas.'
                    : 'DATA BEASISWA KOSONG. Katakan data belum tersedia.'
            };
        },
    }),

    getAdmissionInfo: tool({
        description: 'Mendapatkan informasi jalur pendaftaran PMB, gelombang, dan JENIS KELAS (Reguler, Karyawan, dll) - GUNAKAN DATA INI SECARA LITERAL',
        inputSchema: getAdmissionInfoSchema,
        execute: async () => {
            console.log('TOOL: Calling getAdmissionInfo...');
            const pathways = await db.select().from(admissionPathways).where(eq(admissionPathways.isPublished, true));
            const waves = await db.select().from(admissionWaves).where(eq(admissionWaves.isPublished, true));
            const faqs = await db.select().from(admissionFaqs).where(eq(admissionFaqs.isPublished, true)).limit(5);
            const classes = await db.select().from(admissionClasses).where(eq(admissionClasses.isPublished, true));

            // Format jalur pendaftaran dengan jelas
            const formattedPathways = pathways.map((p, i) => ({
                nomor: i + 1,
                namaJalur: p.name,
                deskripsi: p.description || 'Tidak ada deskripsi',
            }));

            // Format gelombang dengan jelas
            const formattedWaves = waves.map((w, i) => ({
                nomor: i + 1,
                namaGelombang: w.name,
                tanggalMulai: w.startDate ? new Date(w.startDate).toLocaleDateString('id-ID') : '-',
                tanggalSelesai: w.endDate ? new Date(w.endDate).toLocaleDateString('id-ID') : '-',
                catatan: w.notes || '-',
            }));

            // Format jenis kelas dengan jelas
            const formattedClasses = classes.map((c, i) => ({
                nomor: i + 1,
                namaJenisKelas: c.name,
                deskripsi: c.description || '-',
            }));

            console.log('TOOL RESULT: getAdmissionInfo returned:', { pathways: pathways.length, waves: waves.length, classes: classes.length });
            console.log('TOOL RESULT: Class types:', formattedClasses.map(c => c.namaJenisKelas));

            const hasData = formattedPathways.length > 0 || formattedWaves.length > 0 || formattedClasses.length > 0;

            return {
                jalurPendaftaran: formattedPathways,
                gelombangPendaftaran: formattedWaves,
                jenisKelasTersedia: formattedClasses,
                faq: faqs.map(f => ({ pertanyaan: f.question, jawaban: f.answer })),
                PERINGATAN_KERAS: hasData
                    ? 'SALIN PERSIS nama jalur, gelombang, dan JENIS KELAS dari data di atas. JANGAN UBAH atau TAMBAHKAN informasi apapun.'
                    : 'DATA KOSONG - Katakan: "Maaf, data jalur dan jenis kelas belum tersedia di sistem kami."',
                jumlahData: {
                    jalur: formattedPathways.length,
                    gelombang: formattedWaves.length,
                    jenisKelas: formattedClasses.length
                }
            };
        },
    }),

    getContacts: tool({
        description: 'Mendapatkan informasi kontak universitas seperti alamat, email, telepon, dan lokasi',
        inputSchema: getContactsSchema,
        execute: async () => {
            console.log('TOOL: Calling getContacts...');
            const results = await db.select().from(contactInformation).where(eq(contactInformation.isPublished, true));
            console.log('TOOL RESULT: getContacts returned:', results.length, 'items');
            return { data: results, count: results.length };
        },
    }),

    getLeadership: tool({
        description: 'Mendapatkan daftar pimpinan universitas (Rektor, Wakil Rektor, Dekan) BESERTA NIDN mereka - GUNAKAN DATA INI SECARA LITERAL',
        inputSchema: getLeadershipSchema,
        execute: async ({ searchQuery }: GetLeadershipArgs) => {
            console.log('TOOL: Calling getLeadership...', { searchQuery });
            const query = db
                .select()
                .from(organizationalEmployees)
                .where(eq(organizationalEmployees.isPublished, true))
                .orderBy(asc(organizationalEmployees.positionLevel));

            const results = await query;

            let filtered = results;
            if (searchQuery) {
                const searchLower = searchQuery.toLowerCase();
                // Normalisasi romawi sederhana (3 -> iii, dst untuk pencarian)
                const normalizedSearch = searchLower
                    .replace(/\b3\b/g, 'iii')
                    .replace(/\b2\b/g, 'ii')
                    .replace(/\b1\b/g, 'i');

                filtered = results.filter(r =>
                    r.name.toLowerCase().includes(searchLower) ||
                    r.positionName.toLowerCase().includes(searchLower) ||
                    r.positionName.toLowerCase().includes(normalizedSearch) ||
                    // Handle kebalikannya: III -> 3
                    (searchLower.includes('iii') && r.positionName.toLowerCase().includes('3'))
                );
            }

            const formatted = filtered.map(r => ({
                nama: r.name,
                jabatan: r.positionName,
                nidn: r.nidn || 'Tidak disebutkan/Belum ada',
                deskripsi: r.description || '-',
            }));

            console.log('TOOL RESULT: getLeadership returned:', formatted.length, 'records');
            console.log('TOOL RESULT (DATA):', formatted.map(r => `${r.jabatan}: ${r.nidn}`));

            return {
                data: formatted,
                count: formatted.length,
                PERINGATAN_STRICT: 'Tampilkan NIDN pimpinan sesuai data di atas. Jika data NIDN adalah "Tidak disebutkan/Belum ada", katakan sejujurnya. JANGAN MENGARANG.',
                instruksi: formatted.length > 0
                    ? 'Tampilkan struktur pimpinan beserta NIDN secara literal.'
                    : `Data pimpinan untuk "${searchQuery || 'semua'}" tidak ditemukan atau belum tersedia di sistem kami.`
            };
        },
    }),

    getStudentOrgs: tool({
        description: 'Mendapatkan daftar UKM dan organisasi mahasiswa yang ada di kampus',
        inputSchema: getStudentOrgsSchema,
        execute: async () => {
            console.log('TOOL: Calling getStudentOrgs...');
            const results = await db
                .select()
                .from(studentOrganizations)
                .where(eq(studentOrganizations.isPublished, true));
            console.log('TOOL RESULT: getStudentOrgs returned:', results.length, 'items');
            return { data: results, count: results.length };
        },
    }),

    getAccreditations: tool({
        description: 'Mendapatkan informasi akreditasi universitas, fakultas, atau program studi - GUNAKAN DATA INI SECARA LITERAL',
        inputSchema: getAccreditationsSchema,
        execute: async ({ searchQuery }: GetAccreditationsArgs) => {
            console.log('TOOL: Calling getAccreditations...', { searchQuery });

            // 1. Ambil akreditasi institusi
            const instResults = await db
                .select()
                .from(universityAccreditations)
                .where(eq(universityAccreditations.isPublished, true));

            // 2. Jika ada query, cari di fakultas
            let facultyResults: any[] = [];
            if (searchQuery) {
                facultyResults = await db
                    .select({
                        name: faculties.name,
                        accreditation: faculties.accreditation,
                    })
                    .from(faculties)
                    .where(and(
                        eq(faculties.isPublished, true),
                        sql`LOWER(${faculties.name}) LIKE ${'%' + searchQuery.toLowerCase() + '%'}`
                    ));
            }

            // 3. Jika ada query, cari di prodi
            let prodiResults: any[] = [];
            if (searchQuery) {
                prodiResults = await db
                    .select({
                        name: studyPrograms.name,
                        accreditation: studyPrograms.accreditation,
                        level: studyPrograms.level,
                    })
                    .from(studyPrograms)
                    .where(and(
                        eq(studyPrograms.isPublished, true),
                        sql`LOWER(${studyPrograms.name}) LIKE ${'%' + searchQuery.toLowerCase() + '%'}`
                    ));
            }

            const formattedInst = instResults.map(i => ({
                tipe: 'Institusi',
                nama: i.name, // Dari lint: name
                akreditasi: i.accreditationLevel, // Dari lint: accreditationLevel
                berlakuHingga: i.accreditationExpired ? new Date(i.accreditationExpired).toLocaleDateString('id-ID') : '-', // Dari lint: accreditationExpired
            }));

            const formattedFaculty = facultyResults.map(f => ({
                tipe: 'Fakultas',
                nama: f.name,
                akreditasi: f.accreditation || 'Belum terakreditasi',
            }));

            const formattedProdi = prodiResults.map(p => ({
                tipe: 'Program Studi',
                nama: `${p.name} (${p.level})`,
                akreditasi: p.accreditation || 'Belum terakreditasi',
            }));

            const allResults = [...formattedInst, ...formattedFaculty, ...formattedProdi];

            console.log('TOOL RESULT: getAccreditations returned:', allResults.length, 'items');
            return {
                data: allResults,
                count: allResults.length,
                instruksi: allResults.length > 0
                    ? 'Gunakan data akreditasi di atas secara literal.'
                    : `Maaf, data akreditasi untuk "${searchQuery || 'umum'}" tidak ditemukan di database.`
            };
        },
    }),

    getCampusStats: tool({
        description: 'Mendapatkan statistik kampus atau statistik spesifik per fakultas (jumlah mahasiswa, prodi, dll)',
        inputSchema: getCampusStatsSchema,
        execute: async ({ facultyName }: GetCampusStatsArgs) => {
            console.log('TOOL: Calling getCampusStats...', { facultyName });

            if (facultyName) {
                // Cari data mahasiswa per fakultas dengan menjumlahkan totalStudents dari prodi terkait
                const stats = await db
                    .select({
                        facultyName: faculties.name,
                        totalStudents: sql<number>`sum(${studyPrograms.totalStudents})`,
                        totalStudyPrograms: sql<number>`count(${studyPrograms.id})`,
                    })
                    .from(studyPrograms)
                    .leftJoin(faculties, eq(studyPrograms.facultyId, faculties.id))
                    .where(and(
                        eq(studyPrograms.isPublished, true),
                        sql`LOWER(${faculties.name}) LIKE ${'%' + facultyName.toLowerCase() + '%'}`
                    ))
                    .groupBy(faculties.name);

                console.log('TOOL RESULT: getCampusStats (faculty) returned:', stats.length, 'records');

                if (stats.length > 0) {
                    return {
                        data: stats.map(s => ({
                            cakupan: `Fakultas ${s.facultyName}`,
                            jumlahMahasiswaAktif: Number(s.totalStudents) || 0,
                            jumlahProgramStudi: Number(s.totalStudyPrograms) || 0,
                        })),
                        message: `Statistik untuk Fakultas ${stats[0].facultyName} ditemukan.`
                    };
                }
            }

            // Default: Ambil statistik umum kampus
            const results = await db.select().from(campusStatistics).where(eq(campusStatistics.isPublished, true));
            console.log('TOOL RESULT: getCampusStats (general) returned:', results.length, 'items');

            return {
                data: results.map(r => ({
                    cakupan: 'Universitas (Umum)',
                    tahun: r.year,
                    totalMahasiswa: r.totalStudents,
                    mahasiswaSarjana: r.totalUndergraduate,
                    mahasiswaPascasarjana: r.totalGraduate,
                    totalDosenDanPegawai: r.totalEmployees,
                    totalFakultas: r.totalFaculties,
                    totalProdi: r.totalStudyPrograms,
                    akreditasiKampus: r.accreditation
                })),
                count: results.length
            };
        },
    }),

    getAcademicCalendar: tool({
        description: 'Mendapatkan jadwal kalender akademik seperti awal perkuliahan, UTS, UAS, dan libur',
        inputSchema: getAcademicCalendarSchema,
        execute: async () => {
            console.log('TOOL: Calling getAcademicCalendar...');
            const results = await db
                .select()
                .from(academicCalendar)
                .where(eq(academicCalendar.isPublished, true))
                .orderBy(asc(academicCalendar.startDate));
            console.log('TOOL RESULT: getAcademicCalendar returned:', results.length, 'items');
            return { data: results, count: results.length };
        },
    }),

    getStudentServices: tool({
        description: 'Mendapatkan informasi layanan mahasiswa seperti bimbingan konseling, karir, dan administrasi',
        inputSchema: getStudentServicesSchema,
        execute: async () => {
            console.log('TOOL: Calling getStudentServices...');
            const results = await db
                .select()
                .from(studentServices)
                .where(eq(studentServices.isPublished, true));
            console.log('TOOL RESULT: getStudentServices returned:', results.length, 'items');
            return { data: results, count: results.length };
        },
    }),

    getAdmissionStaff: tool({
        description: 'Mendapatkan daftar panitia pendaftaran (Tim PMB) dan kontak WhatsApp mereka',
        inputSchema: getAdmissionStaffSchema,
        execute: async () => {
            console.log('TOOL: Calling getAdmissionStaff...');
            const results = await db
                .select()
                .from(admissionStaff)
                .where(eq(admissionStaff.isPublished, true))
                .orderBy(asc(admissionStaff.order));
            console.log('TOOL RESULT: getAdmissionStaff returned:', results.length, 'items');
            return { data: results, count: results.length };
        },
    }),

    getStudyPrograms: tool({
        description: 'Mendapatkan daftar prodi - GUNAKAN DATA INI SECARA LITERAL',
        inputSchema: getStudyProgramsSchema,
        execute: async ({ level, facultyName }: GetStudyProgramsArgs) => {
            console.log('TOOL: Calling getStudyPrograms...', { level, facultyName });
            const query = db
                .select({
                    id: studyPrograms.id,
                    name: studyPrograms.name,
                    level: studyPrograms.level,
                    accreditation: studyPrograms.accreditation,
                    description: studyPrograms.description,
                    headOfProgram: studyPrograms.headOfProgram,
                    facultyName: faculties.name,
                    totalStudents: studyPrograms.totalStudents,
                })
                .from(studyPrograms)
                .leftJoin(faculties, eq(studyPrograms.facultyId, faculties.id))
                .where(eq(studyPrograms.isPublished, true));

            const results = await query;

            let filtered = results;
            if (level) {
                filtered = filtered.filter(p => p.level === level);
            }
            if (facultyName) {
                const searchLower = facultyName.toLowerCase();
                filtered = filtered.filter(p =>
                    p.facultyName?.toLowerCase().includes(searchLower)
                );
            }

            const formatted = filtered.map(p => ({
                namaProdi: p.name,
                jenjang: p.level,
                akreditasi: p.accreditation || 'Belum terakreditasi',
                fakultas: p.facultyName || '-',
                kaprodi: p.headOfProgram || '-',
                jumlahMahasiswa: p.totalStudents || 0,
            }));

            console.log('TOOL RESULT: getStudyPrograms returned:', formatted.length, 'items');
            return {
                data: formatted,
                count: formatted.length,
                PERINGATAN: formatted.length > 0
                    ? 'Tampilkan daftar prodi PERSIS seperti data di atas.'
                    : 'DATA PRODI KOSONG. Katakan data prodi belum tersedia.'
            };
        },
    }),

    getFaculties: tool({
        description: 'Mendapatkan daftar fakultas yang tersedia - GUNAKAN DATA INI SECARA LITERAL',
        inputSchema: z.object({}),
        execute: async () => {
            console.log('TOOL: Calling getFaculties...');
            const data = await db
                .select({
                    id: faculties.id,
                    name: faculties.name,
                    dean: faculties.dean,
                    accreditation: faculties.accreditation,
                    description: faculties.description,
                })
                .from(faculties)
                .where(eq(faculties.isPublished, true));

            console.log('TOOL RESULT: getFaculties returned:', data.length, 'items');

            const results = data.map((f, i) => ({
                nomor: i + 1,
                namaFakultas: f.name,
                dekan: f.dean || 'Tidak disebutkan',
                akreditasi: f.accreditation || 'Belum terakreditasi',
                deskripsi: f.description || '-',
            }));

            return {
                data: results,
                count: results.length,
                PERINGATAN: results.length > 0
                    ? 'Tampilkan nama fakultas dan dekan PERSIS seperti data di atas.'
                    : 'DATA KOSONG - Katakan: "Maaf, data daftar fakultas belum tersedia di sistem kami."'
            };
        },
    }),

    getEducationCosts: tool({
        description: 'Mendapatkan informasi biaya pendidikan per program studi termasuk UKT, biaya pendaftaran, dan biaya lainnya',
        inputSchema: getEducationCostsSchema,
        execute: async ({ programName }: GetEducationCostsArgs) => {
            console.log('TOOL: Calling getEducationCosts...', { programName });

            // Ambil semua biaya yang dipublikasikan
            const costs = await db
                .select({
                    id: educationCosts.id,
                    programName: studyPrograms.name,
                    programLevel: studyPrograms.level,
                    costType: educationCosts.costType,
                    amount: educationCosts.amount,
                    year: educationCosts.year,
                    description: educationCosts.description,
                })
                .from(educationCosts)
                .leftJoin(studyPrograms, eq(educationCosts.studyProgramId, studyPrograms.id))
                .where(eq(educationCosts.isPublished, true));

            let filtered = costs;
            if (programName) {
                const searchLower = programName.toLowerCase();
                // Filter berdasarkan nama prodi, atau ambil yang general (programName null)
                filtered = costs.filter(c =>
                    c.programName?.toLowerCase().includes(searchLower) ||
                    c.programName === null // Biaya umum yang berlaku untuk semua
                );
            }

            // Jika tidak ada hasil untuk prodi spesifik, kembalikan semua biaya umum
            if (filtered.length === 0 && programName) {
                filtered = costs.filter(c => c.programName === null);
            }

            // Format output yang lebih jelas untuk AI
            const formattedCosts = filtered.map(c => ({
                programStudi: c.programName || 'Umum (berlaku untuk semua program)',
                jenjang: c.programLevel || '-',
                jenisBiaya: c.costType === 'registration' ? 'Biaya Pendaftaran' :
                    c.costType === 'tuition' ? 'UKT/SPP' : 'Biaya Lainnya',
                jumlah: `Rp ${Number(c.amount).toLocaleString('id-ID')}`,
                tahunAkademik: c.year,
                keterangan: c.description || '-',
            }));

            console.log('TOOL RESULT: getEducationCosts returned:', formattedCosts.length, 'items');
            return {
                data: formattedCosts,
                count: formattedCosts.length,
                message: formattedCosts.length > 0
                    ? `Ditemukan ${formattedCosts.length} data biaya pendidikan`
                    : 'Tidak ada data biaya pendidikan di database'
            };
        },
    }),

    getFAQs: tool({
        description: 'Mendapatkan daftar FAQ (pertanyaan yang sering diajukan) tentang pendaftaran',
        inputSchema: getFAQsSchema,
        execute: async ({ searchQuery }: GetFAQsArgs) => {
            console.log('TOOL: Calling getFAQs...', { searchQuery });
            const faqs = await db
                .select()
                .from(admissionFaqs)
                .where(eq(admissionFaqs.isPublished, true))
                .orderBy(admissionFaqs.order);

            let filtered = faqs;
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                filtered = faqs.filter(f =>
                    f.question.toLowerCase().includes(query) ||
                    f.answer.toLowerCase().includes(query)
                );
            }

            console.log('TOOL RESULT: getFAQs returned:', filtered.length, 'items');
            return { data: filtered, count: filtered.length };
        },
    }),

    getEvents: tool({
        description: 'Mendapatkan informasi event dan kegiatan kampus yang akan datang',
        inputSchema: getEventsSchema,
        execute: async ({ limit }: GetEventsArgs) => {
            console.log('TOOL: Calling getEvents...', { limit });
            const now = new Date();
            const upcomingEvents = await db
                .select({
                    title: events.title,
                    description: events.description,
                    startDate: events.startDate,
                    endDate: events.endDate,
                    location: events.location,
                    category: eventCategories.name,
                })
                .from(events)
                .leftJoin(eventCategories, eq(events.categoryId, eventCategories.id))
                .where(and(
                    eq(events.isPublished, true),
                    gte(events.startDate, now)
                ))
                .orderBy(events.startDate)
                .limit(limit ?? 5);

            console.log('TOOL RESULT: getEvents returned:', upcomingEvents.length, 'items');
            return { data: upcomingEvents, count: upcomingEvents.length };
        },
    }),

    getNews: tool({
        description: 'Mendapatkan berita terbaru dari kampus - WAJIB gunakan data dari tool ini secara literal',
        inputSchema: getNewsSchema,
        execute: async ({ limit }: GetNewsArgs) => {
            console.log('TOOL: Calling getNews...', { limit });
            const latestNews = await db
                .select({
                    id: news.id,
                    title: news.title,
                    excerpt: news.excerpt,
                    content: news.content,
                    publishedAt: news.publishedAt,
                    category: newsCategories.name,
                })
                .from(news)
                .leftJoin(newsCategories, eq(news.categoryId, newsCategories.id))
                .where(eq(news.isPublished, true))
                .orderBy(desc(news.publishedAt))
                .limit(limit ?? 5);

            // Format untuk output yang lebih jelas
            const formattedNews = latestNews.map((item, index) => ({
                nomor: index + 1,
                judulBerita: item.title,
                kategori: item.category || 'Umum',
                tanggalPublikasi: item.publishedAt
                    ? new Date(item.publishedAt).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'long', year: 'numeric'
                    })
                    : 'Tidak ada tanggal',
                ringkasan: item.excerpt || item.content?.substring(0, 200) || 'Tidak ada ringkasan',
            }));

            console.log('TOOL RESULT: getNews returned:', formattedNews.length, 'items');
            console.log('TOOL RESULT: News titles:', formattedNews.map(n => n.judulBerita));

            return {
                data: formattedNews,
                count: formattedNews.length,
                peringatan: 'GUNAKAN DATA INI SECARA LITERAL - JANGAN UBAH JUDUL ATAU KONTEN',
                instruksi: formattedNews.length > 0
                    ? 'Tampilkan berita dengan judul PERSIS seperti di atas'
                    : 'Tidak ada berita di database - katakan data tidak tersedia'
            };
        },
    }),

    getFacilities: tool({
        description: 'Mendapatkan daftar NAMA FASILITAS rill yang ada di kampus - GUNAKAN DATA INI SECARA LITERAL',
        inputSchema: getFacilitiesSchema,
        execute: async ({ type }: GetFacilitiesArgs) => {
            console.log('TOOL: Calling getFacilities...', { type });
            let data = await db
                .select({
                    name: campusFacilities.name,
                    description: campusFacilities.description,
                    type: campusFacilities.type,
                    location: campusFacilities.location,
                    operatingHours: campusFacilities.operatingHours,
                })
                .from(campusFacilities)
                .where(eq(campusFacilities.isPublished, true));

            if (type) {
                data = data.filter(f => f.type === type);
            }

            // Logging untuk verifikasi di terminal
            console.log('TOOL RESULT (RAW_NAMES):', data.map(f => f.name));

            const results = data.map((f, i) => ({
                nomor: i + 1,
                namaFasilitas: f.name,
                deskripsiSingkat: f.description || '-',
                lokasi: f.location || '-',
            }));

            console.log('TOOL RESULT: getFacilities returned:', results.length, 'items');

            return {
                daftarFasilitasValid: results,
                totalData: results.length,
                PERINGATAN_STRICT: 'Hanya gunakan nama-nama di atas. Jika tidak ada di sini, berarti fasilitas tersebut TIDAK ADA di kampus.',
            };
        },
    }),

    getGalleries: tool({
        description: 'Mendapatkan foto dan video kegiatan dari galeri kampus beserta kategorinya',
        inputSchema: getGalleriesSchema,
        execute: async () => {
            console.log('TOOL: Calling getGalleries...');
            const results = await db
                .select({
                    id: galleryMedia.id,
                    title: galleryMedia.title,
                    description: galleryMedia.description,
                    filePath: galleryMedia.filePath,
                    mediaType: galleryMedia.mediaType,
                    categoryName: galleryCategories.name,
                })
                .from(galleryMedia)
                .leftJoin(galleryCategories, eq(galleryMedia.categoryId, galleryCategories.id))
                .where(eq(galleryMedia.isPublic, true))
                .limit(10);
            console.log('TOOL RESULT: getGalleries returned:', results.length, 'items');
            return { data: results, count: results.length };
        },
    }),

    getJournals: tool({
        description: 'Mendapatkan daftar publikasi jurnal akademik dosen dan mahasiswa',
        inputSchema: getJournalsSchema,
        execute: async () => {
            console.log('TOOL: Calling getJournals...');
            const results = await db
                .select()
                .from(journals)
                .where(eq(journals.isPublished, true));
            console.log('TOOL RESULT: getJournals returned:', results.length, 'items');
            return { data: results, count: results.length };
        },
    }),

    getPartnerships: tool({
        description: 'Mendapatkan informasi mitra kerja sama universitas (MOU/MOA) dan dokumen terkait - GUNAKAN DATA INI SECARA LITERAL',
        inputSchema: getPartnershipsSchema,
        execute: async () => {
            console.log('TOOL: Calling getPartnerships...');
            const allPartners = await db.select().from(partners).where(eq(partners.isPublished, true));
            const allDocs = await db.select().from(partnershipDocuments);

            // Group documents by partnerId
            const docsByPartner = allDocs.reduce((acc, doc) => {
                if (!acc[doc.partnerId]) acc[doc.partnerId] = [];
                acc[doc.partnerId].push({
                    judulDokumen: doc.title,
                    tipeDokumen: doc.documentType,
                    linkFile: doc.filePath
                });
                return acc;
            }, {} as Record<string, any[]>);

            const formattedPartners = allPartners.map(p => ({
                namaMitra: p.name,
                tipe: p.type === 'international' ? 'Internasional' : 'Dalam Negeri',
                kategori: p.category,
                lokasi: p.city ? `${p.city}, ${p.country}` : p.country,
                status: p.partnershipStatus,
                tanggalMulai: p.startDate ? new Date(p.startDate).toLocaleDateString('id-ID') : '-',
                tanggalBerakhir: p.endDate ? new Date(p.endDate).toLocaleDateString('id-ID') : '-',
                tujuanKerjasama: p.objectives || '-',
                dokumenTerkait: docsByPartner[p.id] || []
            }));

            console.log('TOOL RESULT: getPartnerships returned:', formattedPartners.length, 'partners');
            console.log('TOOL RESULT (PARTNER_NAMES):', formattedPartners.map(p => p.namaMitra));

            return {
                data: formattedPartners,
                count: formattedPartners.length,
                PERINGATAN_STRICT: 'HANYA tampilkan mitra yang ada dalam daftar di atas. JANGAN TAMBAHKAN mitra atau instansi pemerintah (seperti Kemdikbud) jika tidak ada dalam data tool ini.',
                instruksi: formattedPartners.length > 0
                    ? 'Tampilkan daftar mitra dengan link dokumen jika tersedia.'
                    : 'DATA KOSONG - Katakan: "Maaf, data mitra kerjasama belum tersedia di sistem kami."'
            };
        },
    }),

    getAlumniAndAchievements: tool({
        description: 'Mendapatkan testimoni alumni dan daftar prestasi hebat yang diraih mahasiswa',
        inputSchema: getAlumniAndAchievementsSchema,
        execute: async () => {
            console.log('TOOL: Calling getAlumniAndAchievements...');
            const alums = await db.select().from(testimonials).where(eq(testimonials.isPublished, true));
            const achs = await db.select().from(studentAchievements).where(eq(studentAchievements.isPublished, true)).limit(10);
            console.log('TOOL RESULT: getAlumniAndAchievements returned:', { testimonials: alums.length, achievements: achs.length });
            return { testimonials: alums, achievements: achs };
        },
    }),

    getCareerProspects: tool({
        description: 'Mendapatkan informasi prospek karir dan perkiraan gaji untuk lulusan',
        inputSchema: getCareerProspectsSchema,
        execute: async () => {
            console.log('TOOL: Calling getCareerProspects...');
            const results = await db.select().from(careerProspects).where(eq(careerProspects.isPublished, true));
            console.log('TOOL RESULT: getCareerProspects returned:', results.length, 'items');
            return { data: results, count: results.length };
        },
    }),

    getAdmissionDetails: tool({
        description: 'Mendapatkan syarat pendaftaran mendalam (murni/pindahan), timeline pendaftaran, dan brosur',
        inputSchema: getAdmissionDetailsSchema,
        execute: async () => {
            console.log('TOOL: Calling getAdmissionDetails...');
            const requirements = await db.select().from(admissionRequirements).where(eq(admissionRequirements.isPublished, true));
            const timelines = await db.select().from(admissionTimelines).where(eq(admissionTimelines.isPublished, true));
            const brochures = await db.select().from(admissionBrochures).where(eq(admissionBrochures.isPublished, true));
            console.log('TOOL RESULT: getAdmissionDetails returned:', { requirements: requirements.length, timelines: timelines.length });
            return { requirements, timelines, brochures };
        },
    }),

    getUniversityIdentity: tool({
        description: 'Mendapatkan informasi makna logo, penghargaan yang diraih kampus, media sosial, dan pesan rektor',
        inputSchema: getUniversityIdentitySchema,
        execute: async () => {
            console.log('TOOL: Calling getUniversityIdentity...');
            const logo = await db.select().from(universityLogoMeanings).where(eq(universityLogoMeanings.isPublished, true));
            const awards = await db.select().from(universityAwards).where(eq(universityAwards.isPublished, true));
            const social = await db.select().from(socialMediaLinks).where(eq(socialMediaLinks.isPublished, true));
            const rector = await db.select().from(rectorMessages).where(eq(rectorMessages.isPublished, true));
            console.log('TOOL RESULT: getUniversityIdentity returned data for identity categories');
            return { logoMeanings: logo, awards, socialMedia: social, rectorMessages: rector };
        },
    }),

    getCampusFacilitiesAndAccess: tool({
        description: 'Mendapatkan informasi aksesibilitas kampus (transportasi) dan kontak spesifik layanan mahasiswa',
        inputSchema: getCampusFacilitiesAndAccessSchema,
        execute: async () => {
            console.log('TOOL: Calling getCampusFacilitiesAndAccess...');
            const access = await db.select().from(campusAccessibilities).where(eq(campusAccessibilities.isPublished, true));
            const contacts = await db.select().from(studentServiceContacts).where(eq(studentServiceContacts.isPublished, true));
            console.log('TOOL RESULT: getCampusFacilitiesAndAccess returned:', { accessibility: access.length, contacts: contacts.length });
            return { accessibility: access, serviceContacts: contacts };
        },
    }),

};

export async function POST(req: Request) {
    try {
        const { messages: rawMessages, sessionId } = await req.json();

        // Debug: Log headers to see if any auth cookies are present
        const cookieHeader = req.headers.get('cookie');
        if (cookieHeader) {
            console.log('DEBUG: Chat request contains cookies:', cookieHeader.substring(0, 50) + '...');
        }

        console.log(`DEBUG: Received chat request, sessionId: ${sessionId}`);
        console.log(`DEBUG: Raw messages count: ${rawMessages.length}`);

        // Konversi format pesan dari AI SDK (parts atau content)
        const messages = rawMessages.map((msg: any) => {
            // Jika sudah ada content string sederhana
            if (typeof msg.content === 'string' && msg.content !== '') {
                return { role: msg.role, content: msg.content };
            }

            // Jika menggunakan parts array (AI SDK format)
            if (msg.parts && Array.isArray(msg.parts)) {
                // Untuk tool calls, kita harus menyertakan parts tersebut
                const hasToolCalls = msg.parts.some((p: any) => p.type === 'tool-call');
                if (hasToolCalls) {
                    return { role: msg.role, content: msg.parts };
                }

                // Gabungkan teks dari parts
                const textContent = msg.parts
                    .filter((part: any) => part.type === 'text')
                    .map((part: any) => part.text || '')
                    .join('');

                return { role: msg.role, content: textContent };
            }

            // Fallback jika formatting tidak dikenal
            return msg;
        });

        // Validasi API key
        if (!process.env.OPENROUTER_API_KEY) {
            console.error('OPENROUTER_API_KEY tidak ditemukan di environment variables');
            return new Response(
                JSON.stringify({ error: 'Konfigurasi API belum lengkap. Hubungi administrator.' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }


        // Ambil nama universitas dari database
        const profiles = await db
            .select({ name: universityProfiles.name })
            .from(universityProfiles)
            .where(eq(universityProfiles.isPublished, true))
            .limit(1);

        const universityName = profiles.length > 0 ? profiles[0].name : 'Universitas';
        console.log('DEBUG: Using university name:', universityName);

        // Stream response dari AI
        const result = streamText({
            model: openrouter('google/gemini-2.0-flash-001'),
            system: getSystemPrompt(universityName),
            messages,
            tools: botTools,
            stopWhen: stepCountIs(10), // Memberikan lebih banyak langkah untuk tool calls yang kompleks
        });

        // Simpan pertanyaan terakhir user untuk analisis (async, tidak blocking)
        if (sessionId && messages.length > 0) {
            const lastUserMessage = messages.filter((m: { role: string }) => m.role === 'user').pop();
            if (lastUserMessage && lastUserMessage.content) {
                // Handle content that might be an array of parts
                let questionText = '';
                if (typeof lastUserMessage.content === 'string') {
                    questionText = lastUserMessage.content;
                } else if (Array.isArray(lastUserMessage.content)) {
                    questionText = lastUserMessage.content
                        .filter((part: any) => part.type === 'text')
                        .map((part: any) => part.text || '')
                        .join(' ');
                }

                if (questionText.trim()) {
                    saveQuestionForAnalysis(questionText).catch(console.error);
                }
            }
        }

        return result.toUIMessageStreamResponse();
    } catch (error) {
        console.error('Chat API Error:', error);
        // Log lebih detail untuk debugging
        if (error instanceof Error) {
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
        }
        return new Response(
            JSON.stringify({ error: 'Terjadi kesalahan pada server. Silakan coba lagi.' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

// Fungsi untuk mendeteksi kategori pertanyaan secara otomatis
function detectQuestionCategory(question: string): string {
    const lowerQuestion = question.toLowerCase();

    // Kategori PMB/Pendaftaran
    if (lowerQuestion.includes('daftar') || lowerQuestion.includes('pmb') ||
        lowerQuestion.includes('pendaftaran') || lowerQuestion.includes('gelombang') ||
        lowerQuestion.includes('jalur masuk') || lowerQuestion.includes('persyaratan')) {
        return 'pmb';
    }

    // Kategori Biaya
    if (lowerQuestion.includes('biaya') || lowerQuestion.includes('ukt') ||
        lowerQuestion.includes('spp') || lowerQuestion.includes('bayar') ||
        lowerQuestion.includes('harga') || lowerQuestion.includes('tarif')) {
        return 'biaya';
    }

    // Kategori Beasiswa
    if (lowerQuestion.includes('beasiswa') || lowerQuestion.includes('bantuan') ||
        lowerQuestion.includes('gratis') || lowerQuestion.includes('potongan')) {
        return 'beasiswa';
    }

    // Kategori Program Studi
    if (lowerQuestion.includes('jurusan') || lowerQuestion.includes('prodi') ||
        lowerQuestion.includes('program studi') || lowerQuestion.includes('fakultas') ||
        lowerQuestion.includes('akreditasi')) {
        return 'akademik';
    }

    // Kategori Kontak/Lokasi
    if (lowerQuestion.includes('alamat') || lowerQuestion.includes('lokasi') ||
        lowerQuestion.includes('telepon') || lowerQuestion.includes('email') ||
        lowerQuestion.includes('kontak') || lowerQuestion.includes('whatsapp')) {
        return 'kontak';
    }

    // Kategori Fasilitas
    if (lowerQuestion.includes('fasilitas') || lowerQuestion.includes('gedung') ||
        lowerQuestion.includes('laboratorium') || lowerQuestion.includes('perpustakaan') ||
        lowerQuestion.includes('asrama') || lowerQuestion.includes('kantin')) {
        return 'fasilitas';
    }

    // Kategori Kemahasiswaan
    if (lowerQuestion.includes('ukm') || lowerQuestion.includes('organisasi') ||
        lowerQuestion.includes('ekstrakurikuler') || lowerQuestion.includes('kegiatan mahasiswa')) {
        return 'kemahasiswaan';
    }

    // Kategori Pimpinan
    if (lowerQuestion.includes('rektor') || lowerQuestion.includes('wakil') ||
        lowerQuestion.includes('dekan') || lowerQuestion.includes('pimpinan') ||
        lowerQuestion.includes('struktur organisasi')) {
        return 'pimpinan';
    }

    return 'umum';
}

// Fungsi untuk menyimpan pertanyaan untuk analisis
async function saveQuestionForAnalysis(question: string) {
    try {
        const category = detectQuestionCategory(question);

        // Cek apakah pertanyaan sudah ada
        const existing = await db
            .select()
            .from(chatFrequentQuestions)
            .where(eq(chatFrequentQuestions.question, question))
            .limit(1);

        if (existing.length > 0) {
            // Update count jika sudah ada
            await db
                .update(chatFrequentQuestions)
                .set({
                    count: sql`${chatFrequentQuestions.count} + 1`,
                    lastAskedAt: new Date(),
                    category: category, // Update kategori jika berubah
                })
                .where(eq(chatFrequentQuestions.id, existing[0].id));
        } else {
            // Insert pertanyaan baru dengan kategori
            await db.insert(chatFrequentQuestions).values({
                question,
                category,
                count: 1,
                lastAskedAt: new Date(),
            });
        }
        console.log(`Question saved with category: ${category}`);
    } catch (error) {
        console.error('Error saving question:', error);
    }
}

// Endpoint untuk menyimpan feedback
export async function PUT(req: Request) {
    try {
        const { messageId, rating, comment, sessionId, userQuestion } = await req.json();

        await db.insert(chatFeedback).values({
            sessionId: sessionId || null,
            messageId: messageId || null,
            userQuestion: userQuestion || null,
            rating,
            comment: comment || null,
        });

        console.log(`Feedback saved: messageId=${messageId}, rating=${rating}`);

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Feedback API Error:', error);
        return new Response(
            JSON.stringify({ error: 'Gagal menyimpan feedback' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
