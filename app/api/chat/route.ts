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

## PRINSIP UTAMA (WAJIB DIIKUTI):
1. **DATABASE-FIRST**: Kamu adalah antarmuka untuk database kami. JANGAN PERNAH memberikan informasi tentang ${universityName} berdasarkan pengetahuan umum Anda. Gunakan Tools untuk mendapatkan fakta.
2. **STRICT GROUNDING**: Jika Tools mengembalikan data kosong atau tidak relevan, katakan: "Maaf, saat ini saya tidak menemukan data tersebut di sistem kami" - JANGAN mengarang jawaban atau memberikan asumsi.
3. **MANDATORY TOOL USE**: Untuk pertanyaan seputar:
    - Daftar Program Studi / Jurusan
    - Biaya Kuliah (UKT, Pendaftaran, dll)
    - Beasiswa dan Syaratnya
    - Jalur Pendaftaran & Tanggal Penting (Gelombang)
    - Alamat, Email, dan Nomor Telepon Kampus
    - Siapa Rektor, Wakil Rektor (I, II, III, IV), Dekan, atau Pejabat Kampus Lainnya (WAJIB panggil getLeadership)
    - Organisasi Mahasiswa (UKM)
    - Akreditasi Kampus/Prodi
    - Statistik Kampus (Jumlah Mahasiswa, dll)
    - Kalender Akademik & Fasilitas
    - Layanan Mahasiswa (Konseling, Karir, dll)
    - Tim PMB (Kontak Panitia Pendaftaran)
    - Berita dan Pengumuman Universitas (WAJIB panggil getNews)
    - Agenda dan Event Kampus (WAJIB panggil getEvents)
    - Foto/Video Kegiatan (Galeri)
    - Publikasi Jurnal Dosen/Mahasiswa
    - Kerja Sama/Mitra Universitas
    - Testimoni Alumni & Prestasi Mahasiswa (WAJIB panggil getAlumniAndAchievements)
    - Prospek Karir Lulusan (WAJIB panggil getCareerProspects)
    - Syarat Detail Pendaftaran (Murni/Pindahan) & Timeline (WAJIB panggil getAdmissionDetails)
    - Makna Logo, Penghargaan, & Media Sosial (WAJIB panggil getUniversityIdentity)
    - Aksesibilitas Kampus & Kontak Layanan (WAJIB panggil getCampusFacilitiesAndAccess)
    WAJIB menggunakan tools yang sesuai sebelum menjawab.

## Aturan Penulisan:
- Gunakan format markdown (bold, list, table) agar mudah dibaca.
- Jika menampilkan daftar (seperti prodi atau fasilitas), buatlah dalam bentuk list yang rapi.
- Akhiri setiap jawaban dengan tawaran bantuan lainnya yang relevan.

Ingat: Kamu dilarang keras memberikan informasi kampus yang tidak berasal dari database resmi kami.`;

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
const getAccreditationsSchema = z.object({});
const getCampusStatsSchema = z.object({});
const getAcademicCalendarSchema = z.object({});
const getStudentServicesSchema = z.object({});
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
        description: 'Mendapatkan informasi profil universitas seperti visi, misi, sejarah, dan informasi umum',
        inputSchema: z.object({}),
        execute: async () => {
            console.log('TOOL: Calling getUniversityInfo...');
            const profiles = await db
                .select()
                .from(universityProfiles)
                .where(eq(universityProfiles.isPublished, true))
                .limit(1);

            const data = profiles.length > 0 ? profiles[0] : null;
            console.log('TOOL RESULT: getUniversityInfo returned:', profiles.length > 0 ? 'Data found' : 'No data');
            return { data: profiles[0] || null };
        },
    }),

    getScholarships: tool({
        description: 'Mendapatkan informasi beasiswa yang tersedia, syarat, dan manfaatnya',
        inputSchema: getScholarshipsSchema,
        execute: async () => {
            console.log('TOOL: Calling getScholarships...');
            const results = await db
                .select()
                .from(scholarships)
                .where(eq(scholarships.isPublished, true));
            console.log('TOOL RESULT: getScholarships returned:', results.length, 'items');
            return { data: results, count: results.length };
        },
    }),

    getAdmissionInfo: tool({
        description: 'Mendapatkan informasi jalur pendaftaran, gelombang pendaftaran PMB, dan persyaratan khusus',
        inputSchema: getAdmissionInfoSchema,
        execute: async () => {
            console.log('TOOL: Calling getAdmissionInfo...');
            const pathways = await db.select().from(admissionPathways).where(eq(admissionPathways.isPublished, true));
            const waves = await db.select().from(admissionWaves).where(eq(admissionWaves.isPublished, true));
            const faqs = await db.select().from(admissionFaqs).where(eq(admissionFaqs.isPublished, true)).limit(5);
            const classes = await db.select().from(admissionClasses).where(eq(admissionClasses.isPublished, true));
            console.log('TOOL RESULT: getAdmissionInfo returned:', { pathways: pathways.length, waves: waves.length, classes: classes.length });
            return { pathways, waves, faqs, classes };
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
        description: 'Mendapatkan seluruh daftar dan struktur pimpinan universitas (Rektor, Wakil Rektor, Dekan, Kaprodi, dll)',
        inputSchema: z.object({}),
        execute: async () => {
            console.log('TOOL: Calling getLeadership...');
            const results = await db
                .select()
                .from(organizationalEmployees)
                .where(eq(organizationalEmployees.isPublished, true))
                .orderBy(asc(organizationalEmployees.positionLevel));

            console.log('TOOL RESULT: getLeadership returned:', results.length, 'records');
            return { data: results, count: results.length };
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
        description: 'Mendapatkan informasi akreditasi institusi universitas',
        inputSchema: getAccreditationsSchema,
        execute: async () => {
            console.log('TOOL: Calling getAccreditations...');
            const results = await db
                .select()
                .from(universityAccreditations)
                .where(eq(universityAccreditations.isPublished, true));
            console.log('TOOL RESULT: getAccreditations returned:', results.length, 'items');
            return { data: results, count: results.length };
        },
    }),

    getCampusStats: tool({
        description: 'Mendapatkan statistik kampus seperti jumlah mahasiswa, prodi, dan fakultas',
        inputSchema: getCampusStatsSchema,
        execute: async () => {
            console.log('TOOL: Calling getCampusStats...');
            const results = await db.select().from(campusStatistics).where(eq(campusStatistics.isPublished, true));
            console.log('TOOL RESULT: getCampusStats returned:', results.length, 'items');
            return { data: results, count: results.length };
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
        description: 'Mendapatkan daftar program studi yang tersedia, bisa difilter berdasarkan jenjang (D3, S1, S2, S3) atau fakultas',
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

            console.log('TOOL RESULT: getStudyPrograms returned:', filtered.length, 'items');
            return {
                data: filtered,
                count: filtered.length,
            };
        },
    }),

    getFaculties: tool({
        description: 'Mendapatkan daftar fakultas yang tersedia',
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
            return { data, count: data.length };
        },
    }),

    getEducationCosts: tool({
        description: 'Mendapatkan informasi biaya pendidikan per program studi',
        inputSchema: getEducationCostsSchema,
        execute: async ({ programName }: GetEducationCostsArgs) => {
            console.log('TOOL: Calling getEducationCosts...', { programName });
            const costs = await db
                .select({
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
                filtered = filtered.filter(c =>
                    c.programName?.toLowerCase().includes(searchLower)
                );
            }

            console.log('TOOL RESULT: getEducationCosts returned:', filtered.length, 'items');
            return { data: filtered, count: filtered.length };
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
        description: 'Mendapatkan berita terbaru dari kampus',
        inputSchema: getNewsSchema,
        execute: async ({ limit }: GetNewsArgs) => {
            console.log('TOOL: Calling getNews...', { limit });
            const latestNews = await db
                .select({
                    title: news.title,
                    excerpt: news.excerpt,
                    publishedAt: news.publishedAt,
                    category: newsCategories.name,
                })
                .from(news)
                .leftJoin(newsCategories, eq(news.categoryId, newsCategories.id))
                .where(eq(news.isPublished, true))
                .orderBy(desc(news.publishedAt))
                .limit(limit ?? 5);

            console.log('TOOL RESULT: getNews returned:', latestNews.length, 'items');
            return { data: latestNews, count: latestNews.length };
        },
    }),

    getFacilities: tool({
        description: 'Mendapatkan informasi fasilitas kampus',
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

            console.log('TOOL RESULT: getFacilities returned:', data.length, 'items');
            return { data, count: data.length };
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
        description: 'Mendapatkan informasi mitra kerja sama universitas (MOU/MOA) dan dokumen terkait',
        inputSchema: getPartnershipsSchema,
        execute: async () => {
            console.log('TOOL: Calling getPartnerships...');
            const p = await db.select().from(partners).where(eq(partners.isPublished, true));
            const docs = await db.select().from(partnershipDocuments).limit(10);
            console.log('TOOL RESULT: getPartnerships returned:', p.length, 'partners');
            return { partners: p, documents: docs, count: p.length };
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

        // Konversi format pesan dari AI SDK v5 (parts array) ke format model (content string)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const messages = rawMessages.map((msg: any) => {
            // Jika sudah ada content, gunakan langsung
            if (msg.content) {
                return { role: msg.role, content: msg.content };
            }
            // Jika menggunakan parts array (AI SDK v5 format)
            if (msg.parts && Array.isArray(msg.parts)) {
                const textContent = msg.parts
                    .filter((part: { type: string }) => part.type === 'text')
                    .map((part: { text: string }) => part.text)
                    .join('');
                return { role: msg.role, content: textContent };
            }
            return { role: msg.role, content: '' };
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
            stopWhen: stepCountIs(5),
        });

        // Simpan pertanyaan terakhir user untuk analisis (async, tidak blocking)
        if (sessionId && messages.length > 0) {
            const lastUserMessage = messages.filter((m: { role: string }) => m.role === 'user').pop();
            if (lastUserMessage && lastUserMessage.content) {
                saveQuestionForAnalysis(lastUserMessage.content).catch(console.error);
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

// Fungsi untuk menyimpan pertanyaan untuk analisis
async function saveQuestionForAnalysis(question: string) {
    try {
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
                })
                .where(eq(chatFrequentQuestions.id, existing[0].id));
        } else {
            // Insert pertanyaan baru
            await db.insert(chatFrequentQuestions).values({
                question,
                count: 1,
                lastAskedAt: new Date(),
            });
        }
    } catch (error) {
        console.error('Error saving question:', error);
    }
}

// Endpoint untuk menyimpan feedback
export async function PUT(req: Request) {
    try {
        const { messageId, rating, comment } = await req.json();

        await db.insert(chatFeedback).values({
            messageId,
            rating,
            comment,
        });

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
