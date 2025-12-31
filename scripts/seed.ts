import { db } from '@/db';
import { fakerID_ID as faker } from '@faker-js/faker';
import {
  user,
  session,
  account,
  verification,
  news,
  newsCategories,
  events,
  eventCategories,
  galleryMedia,
  galleryCategories,
  faculties,
  studyPrograms,
  academicCalendar,
  admissionPathways,
  admissionClasses,
  educationCosts,
  scholarships,
  studentServices,
  studentOrganizations,
  studentAchievements,
  partners,
  universityProfiles,
  campusStatistics,
  admissionRegistrations,
  admissionDocuments,
  partnershipDocuments,
  organizationalEmployees,
  campusFacilities as campusFacilitiesTable,
  universityAccreditations as universityAccreditationsTable,
  contactInformation as contactInformationTable,
  organizationalStructures as organizationalStructuresTable
} from '@/db/schema';
import { eq, and, or, desc, asc, sql } from 'drizzle-orm';

async function seedDatabase() {
  console.log('Memulai proses seeding database...');

  try {
    // Hapus semua data terlebih dahulu
    console.log('Membersihkan data yang ada...');
    await db.delete(partnershipDocuments);
    await db.delete(studentAchievements);
    await db.delete(admissionDocuments);
    await db.delete(admissionRegistrations);
    await db.delete(session);
    await db.delete(account);
    await db.delete(verification);
    await db.delete(user);
    await db.delete(news);
    await db.delete(newsCategories);
    await db.delete(events);
    await db.delete(eventCategories);
    await db.delete(galleryMedia);
    await db.delete(galleryCategories);

    await db.delete(academicCalendar);
    await db.delete(campusFacilitiesTable);
    await db.delete(studyPrograms);
    await db.delete(faculties);
    await db.delete(admissionPathways);
    await db.delete(admissionClasses);
    await db.delete(educationCosts);
    await db.delete(scholarships);
    await db.delete(studentServices);
    await db.delete(studentOrganizations);
    await db.delete(partners);
    await db.delete(universityProfiles);
    await db.delete(campusStatistics);
    await db.delete(universityAccreditationsTable);
    await db.delete(contactInformationTable);
    await db.delete(organizationalStructuresTable);

    // Seed tabel user (hanya admin tetap)
    console.log('Mengisi data pengguna admin...');
    const users = [];
    const [adminData] = await db.insert(user).values({
      id: faker.string.uuid(),
      name: 'Admin Universitas',
      email: 'admin@gmail.com',
      emailVerified: true,
      image: faker.image.avatar(),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();
    users.push(adminData);

    // Seed tabel kategori berita
    console.log('Mengisi kategori berita...');
    const newsCatIds = [];
    const newsCategoriesData = [
      { name: 'Akademik', slug: 'akademik', description: 'Berita seputar kegiatan akademik' },
      { name: 'Kemahasiswaan', slug: 'kemahasiswaan', description: 'Berita seputar kegiatan kemahasiswaan' },
      { name: 'Prestasi', slug: 'prestasi', description: 'Berita seputar prestasi civitas akademika' },
      { name: 'Penelitian', slug: 'penelitian', description: 'Berita seputar penelitian dan inovasi' },
      { name: 'Pengabdian Masyarakat', slug: 'pengabdian-masyarakat', description: 'Berita seputar pengabdian kepada masyarakat' }
    ];

    for (const cat of newsCategoriesData) {
      const [result] = await db.insert(newsCategories).values({
        ...cat,
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();
      newsCatIds.push(result.id);
    }

    // Seed tabel berita
    console.log('Mengisi berita...');
    for (let i = 0; i < 20; i++) {
      const randomUserId = users[Math.floor(Math.random() * users.length)].id;
      const randomCategoryId = newsCatIds[Math.floor(Math.random() * newsCatIds.length)];

      await db.insert(news).values({
        title: faker.lorem.sentence(),
        slug: faker.helpers.slugify(faker.lorem.words(3)).toLowerCase(),
        content: faker.lorem.paragraphs(5),
        excerpt: faker.lorem.paragraph(),
        featuredImage: faker.image.url(),
        viewCount: faker.number.int({ min: 100, max: 10000 }),
        isPublished: true,
        publishedAt: faker.date.past(),
        authorName: faker.person.fullName(), // Updated from authorId
        categoryId: randomCategoryId,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }



    // Seed tabel kategori event
    console.log('Mengisi kategori event...');
    const eventCatIds = [];
    const eventCategoriesData = [
      { name: 'Seminar', slug: 'seminar', description: 'Event berupa seminar' },
      { name: 'Workshop', slug: 'workshop', description: 'Event berupa workshop' },
      { name: 'Kompetisi', slug: 'kompetisi', description: 'Event berupa kompetisi' },
      { name: 'Pelatihan', slug: 'pelatihan', description: 'Event berupa pelatihan' },
      { name: 'Pameran', slug: 'pameran', description: 'Event berupa pameran' }
    ];

    for (const cat of eventCategoriesData) {
      const [result] = await db.insert(eventCategories).values({
        ...cat,
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();
      eventCatIds.push(result.id);
    }

    // Seed tabel events
    console.log('Mengisi event...');
    for (let i = 0; i < 12; i++) {
      const randomUserId = users[Math.floor(Math.random() * users.length)].id;
      const randomCategoryId = eventCatIds[Math.floor(Math.random() * eventCatIds.length)];

      await db.insert(events).values({
        title: faker.lorem.sentence(),
        slug: faker.helpers.slugify(faker.lorem.words(3)).toLowerCase(),
        description: faker.lorem.paragraph(),
        content: faker.lorem.paragraphs(3),
        poster: faker.image.url(),
        banner: faker.image.url(),
        startDate: faker.date.future(),
        endDate: faker.date.future({ refDate: faker.date.future() }),
        startTime: faker.date.recent().toISOString(),
        endTime: faker.date.recent().toISOString(),
        location: faker.location.streetAddress(),
        venue: faker.company.name(),
        address: faker.location.streetAddress(),
        mapUrl: faker.internet.url(),
        maxParticipants: faker.number.int({ min: 50, max: 500 }),
        registrationStart: faker.date.past(),
        registrationEnd: faker.date.future(),
        registrationUrl: faker.internet.url(),
        registrationFee: faker.number.float({ min: 0, max: 500000, multipleOf: 100 }).toString(),
        organizer: faker.company.name(),
        speaker: faker.person.fullName(),
        targetAudience: 'Umum',
        status: faker.helpers.arrayElement(['upcoming', 'ongoing', 'completed', 'cancelled'] as const) as any,
        isFeatured: faker.datatype.boolean(),
        isPublished: true,
        publishedAt: faker.date.past(),
        authorName: faker.person.fullName(), // Updated from authorId
        categoryId: randomCategoryId,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Seed tabel kategori galeri
    console.log('Mengisi kategori galeri...');
    const galleryCatIds = [];
    const galleryCategoriesData = [
      { name: 'Kegiatan Akademik', slug: 'kegiatan-akademik', description: 'Gambar kegiatan akademik' },
      { name: 'Kegiatan Kemahasiswaan', slug: 'kegiatan-kemahasiswaan', description: 'Gambar kegiatan kemahasiswaan' },
      { name: 'Prestasi', slug: 'prestasi', description: 'Gambar dokumentasi prestasi' },
      { name: 'Wisuda', slug: 'wisuda', description: 'Gambar dokumentasi wisuda' },
      { name: 'Fasilitas', slug: 'fasilitas', description: 'Gambar fasilitas kampus' }
    ];

    for (const cat of galleryCategoriesData) {
      const [result] = await db.insert(galleryCategories).values({
        ...cat,
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();
      galleryCatIds.push(result.id);
    }

    // Seed tabel media galeri (langsung dengan kategori)
    console.log('Mengisi media galeri...');
    const galleryMediaData = [
      // Kategori Wisuda (index 3)
      { title: 'Prosesi Wisuda di Panggung Utama', description: 'Momen khidmat prosesi wisuda dengan latar panggung utama.', categoryIndex: 3, type: 'image' },
      { title: 'Seremoni Pelepasan Wisudawan', description: 'Video dokumentasi seremoni pelepasan wisudawan.', categoryIndex: 3, type: 'video', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { title: 'Wisudawan Menerima Ijazah', description: 'Wisudawan menerima ijazah dari Rektor Universitas.', categoryIndex: 3, type: 'image' },

      // Kategori Kegiatan Akademik (index 0)
      { title: 'Highlight Seminar Nasional', description: 'Video kompilasi kegiatan seminar nasional bertema AI.', categoryIndex: 0, type: 'video', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { title: 'Pembicara Seminar Nasional', description: 'Narasumber ahli memaparkan materi di seminar nasional.', categoryIndex: 0, type: 'image' },
      { title: 'Workshop Kewirausahaan', description: 'Video cuplikan workshop kewirausahaan mahasiswa.', categoryIndex: 0, type: 'video', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },

      // Kategori Prestasi (index 2)
      { title: 'Tim Debat Meraih Juara', description: 'Pemberian piala kepada tim debat universitas.', categoryIndex: 2, type: 'image' },
      { title: 'Momen Kemenangan Atlet', description: 'Video detik-detik kemenangan atlet universitas.', categoryIndex: 2, type: 'video', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { title: 'Penyerahan Medali Emas', description: 'Atlet menerima medali emas pekan olahraga.', categoryIndex: 2, type: 'image' },

      // Kategori Kegiatan Kemahasiswaan (index 1)
      { title: 'Flashmob OSPEK', description: 'Video flashmob ribuan mahasiswa baru saat OSPEK.', categoryIndex: 1, type: 'video', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { title: 'Pentas Seni Mahasiswa', description: 'Penampilan bakat seni dari mahasiswa baru.', categoryIndex: 1, type: 'image' },
      { title: 'Aftermovie Dies Natalis', description: 'Video aftermovie perayaan dies natalis universitas.', categoryIndex: 1, type: 'video', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },

      // Kategori Fasilitas (index 4)
      { title: 'Tours Fasilitas Kampus', description: 'Video tour keliling fasilitas kampus modern.', categoryIndex: 4, type: 'video', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { title: 'Ruang Baca Perpustakaan', description: 'Suasana nyaman ruang baca perpustakaan digital.', categoryIndex: 4, type: 'image' },
      { title: 'Lab Komputer Terpadu', description: 'Video fasilitas lab komputer dengan perangkat terkini.', categoryIndex: 4, type: 'video', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
    ];

    for (let i = 0; i < galleryMediaData.length; i++) {
      const mediaItem = galleryMediaData[i];
      const isVideo = mediaItem.type === 'video';

      const imageUrl = isVideo ? null : faker.image.url({ width: 1280, height: 720 });

      await db.insert(galleryMedia).values({
        title: mediaItem.title,
        description: mediaItem.description,
        filePath: isVideo ? (mediaItem.url || '') : (imageUrl || ''),
        fileSize: isVideo ? 0 : faker.number.int({ min: 100000, max: 2000000 }),
        mediaType: isVideo ? 'video' : 'image',
        thumbnailPath: isVideo ? null : imageUrl, // Menggunakan URL yang sama agar tidak berbeda gambar
        duration: isVideo ? faker.number.int({ min: 60, max: 300 }) : null,
        width: 1280,
        height: 720,
        isPublic: true,
        isFeatured: i < 6,
        categoryId: galleryCatIds[mediaItem.categoryIndex],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Seed tabel fakultas
    console.log('Mengisi data fakultas...');
    const facultyIds = [];
    const facultiesData = [
      { name: 'Fakultas Teknik', slug: 'fakultas-teknik', description: 'Fakultas Teknik Universitas', dean: 'Dr. Ir. Ahmad Santoso, M.T.', contactEmail: 'dekan.ft@university.edu', contactPhone: '+622112345678', address: 'Jl. Teknik No. 1, Jakarta', isPublished: true },
      { name: 'Fakultas Ilmu Komputer', slug: 'fakultas-ilmu-komputer', description: 'Fakultas Ilmu Komputer Universitas', dean: 'Dr. Eng. Siti Rahayu, S.T., M.T.', contactEmail: 'dekan.fikom@university.edu', contactPhone: '+622112345679', address: 'Jl. Informatika No. 2, Jakarta', isPublished: true },
      { name: 'Fakultas Ekonomi', slug: 'fakultas-ekonomi', description: 'Fakultas Ekonomi Universitas', dean: 'Prof. Dr. Budi Santoso, S.E., M.M.', contactEmail: 'dekan.fe@university.edu', contactPhone: '+622112345680', address: 'Jl. Ekonomi No. 3, Jakarta', isPublished: true },
      { name: 'Fakultas Hukum', slug: 'fakultas-hukum', description: 'Fakultas Hukum Universitas', dean: 'Dr. H. Ali Imron, S.H., M.H.', contactEmail: 'dekan.fh@university.edu', contactPhone: '+622112345681', address: 'Jl. Hukum No. 4, Jakarta', isPublished: true },
      { name: 'Fakultas Kedokteran', slug: 'fakultas-kedokteran', description: 'Fakultas Kedokteran Universitas', dean: 'Dr. dr. Retno Wijayanti, Sp.OG., M.Kes.', contactEmail: 'dekan.fk@university.edu', contactPhone: '+622112345682', address: 'Jl. Kedokteran No. 5, Jakarta', isPublished: true }
    ];

    for (const fac of facultiesData) {
      const [result] = await db.insert(faculties).values({
        ...fac,
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();
      facultyIds.push(result.id);
    }

    // Seed tabel program studi
    console.log('Mengisi program studi...');
    const studyProgramIds = [];
    const studyProgramsData = [
      { name: 'Teknik Informatika', slug: 'teknik-informatika', code: 'TI001', description: 'Program studi Teknik Informatika', level: 'S1', duration: 8, degreeTitle: 'Sarjana Teknik Informatika', accreditation: 'A', facultyId: facultyIds[0], headOfProgram: 'Dr. Eng. Andi Pratama, S.T., M.T.', vision: 'Menjadi program studi unggul di bidang teknologi informasi', mission: 'Menyelenggarakan pendidikan dan penelitian di bidang teknologi informasi', curriculumUrl: 'https://university.edu/curriculum/ti', isPublished: true },
      { name: 'Sistem Informasi', slug: 'sistem-informasi', code: 'SI002', description: 'Program studi Sistem Informasi', level: 'S1', duration: 8, degreeTitle: 'Sarjana Sistem Informasi', accreditation: 'A', facultyId: facultyIds[1], headOfProgram: 'Dr. Sari Dewi, S.Si., M.Kom.', vision: 'Menjadi program studi unggul di bidang sistem informasi', mission: 'Menyelenggarakan pendidikan dan penelitian di bidang sistem informasi', curriculumUrl: 'https://university.edu/curriculum/si', isPublished: true },
      { name: 'Teknik Elektro', slug: 'teknik-elektro', code: 'TE003', description: 'Program studi Teknik Elektro', level: 'S1', duration: 8, degreeTitle: 'Sarjana Teknik Elektro', accreditation: 'B', facultyId: facultyIds[0], headOfProgram: 'Dr. Ir. Joko Susilo, M.T.', vision: 'Menjadi program studi unggul di bidang teknik elektro', mission: 'Menyelenggarakan pendidikan dan penelitian di bidang teknik elektro', curriculumUrl: 'https://university.edu/curriculum/te', isPublished: true },
      { name: 'Manajemen', slug: 'manajemen', code: 'MN004', description: 'Program studi Manajemen', level: 'S1', duration: 8, degreeTitle: 'Sarjana Manajemen', accreditation: 'A', facultyId: facultyIds[2], headOfProgram: 'Dr. Ir. Siti Nurhaliza, M.M.', vision: 'Menjadi program studi unggul di bidang manajemen', mission: 'Menyelenggarakan pendidikan dan penelitian di bidang manajemen', curriculumUrl: 'https://university.edu/curriculum/mn', isPublished: true },
      { name: 'Akuntansi', slug: 'akuntansi', code: 'AK005', description: 'Program studi Akuntansi', level: 'S1', duration: 8, degreeTitle: 'Sarjana Akuntansi', accreditation: 'A', facultyId: facultyIds[2], headOfProgram: 'Dr. Sri Handayani, S.E., M.Ak.', vision: 'Menjadi program studi unggul di bidang akuntansi', mission: 'Menyelenggarakan pendidikan dan penelitian di bidang akuntansi', curriculumUrl: 'https://university.edu/curriculum/ak', isPublished: true },
      { name: 'Ilmu Hukum', slug: 'ilmu-hukum', code: 'IH006', description: 'Program studi Ilmu Hukum', level: 'S1', duration: 8, degreeTitle: 'Sarjana Hukum', accreditation: 'B', facultyId: facultyIds[3], headOfProgram: 'Dr. H. Bambang Suryono, S.H., M.H.', vision: 'Menjadi program studi unggul di bidang ilmu hukum', mission: 'Menyelenggarakan pendidikan dan penelitian di bidang ilmu hukum', curriculumUrl: 'https://university.edu/curriculum/ih', isPublished: true },
      { name: 'Pendidikan Dokter', slug: 'pendidikan-dokter', code: 'PD007', description: 'Program studi Pendidikan Dokter', level: 'S1', duration: 10, degreeTitle: 'Sarjana Kedokteran', accreditation: 'A', facultyId: facultyIds[4], headOfProgram: 'Dr. dr. Maya Putri, Sp.PD-KEMD., Ph.D.', vision: 'Menjadi program studi unggul di bidang kedokteran', mission: 'Menyelenggarakan pendidikan dan penelitian di bidang kedokteran', curriculumUrl: 'https://university.edu/curriculum/pd', isPublished: true }
    ];

    for (const prog of studyProgramsData) {
      const [result] = await db.insert(studyPrograms).values({
        ...prog,
        level: prog.level as any,
        accreditation: prog.accreditation as any,
        createdAt: new Date(),
        updatedAt: new Date()
      } as any).returning();
      studyProgramIds.push(result.id);
    }



    // Seed tabel kalender akademik
    console.log('Mengisi kalender akademik...');
    const academicYears = ['2023/2024', '2024/2025'];
    const eventTypes = ['registration', 'orientation', 'classes_start', 'midterm', 'finalterm', 'holiday', 'break', 'thesis_deadline', 'graduation', 'other'];

    for (let i = 0; i < 20; i++) {
      await db.insert(academicCalendar).values({
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        startDate: faker.date.future(),
        endDate: faker.date.future({ refDate: faker.date.future() }),
        eventType: faker.helpers.arrayElement(eventTypes) as any,
        academicYear: faker.helpers.arrayElement(academicYears),
        semester: faker.helpers.arrayElement(['Ganjil', 'Genap']) as any,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Seed tabel fasilitas kampus
    console.log('Mengisi fasilitas kampus...');
    const facilityTypes = ['laboratory', 'library', 'classroom', 'sports', 'dormitory', 'health', 'other'] as const;

    for (let i = 0; i < 15; i++) {
      await db.insert(campusFacilitiesTable).values({
        name: faker.company.name() + ' ' + faker.helpers.arrayElement(['Laboratorium', 'Perpustakaan', 'Ruang Kuliah', 'Gym', 'Asrama', 'Klinik']),
        slug: faker.helpers.slugify(faker.lorem.words(2)).toLowerCase(),
        description: faker.lorem.paragraph(),
        type: faker.helpers.arrayElement(facilityTypes) as any,
        location: faker.location.streetAddress(),
        capacity: faker.number.int({ min: 20, max: 200 }),
        facilities: faker.lorem.words(5),
        operatingHours: '08:00 - 22:00',
        contactPerson: faker.person.fullName(),
        contactPhone: faker.phone.number(),
        image: faker.image.url(),
        isAvailable: true,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Seed tabel jalur masuk
    console.log('Mengisi jalur pendaftaran...');
    const admissionPathwayIds = [];
    const admissionPathwaysData = [
      { name: 'SNBP (Seleksi Nasional Berdasarkan Prestasi)', slug: 'snbp', description: 'Seleksi berdasarkan prestasi akademik dan non-akademik', requirements: 'Rata-rata rapor minimal 8.0\nMemiliki prestasi akademik/non-akademik\nSurat rekomendasi sekolah', registrationStart: new Date('2024-02-01'), registrationEnd: new Date('2024-03-31'), testDate: null, announcementDate: new Date('2024-05-15'), registrationFee: '0', isPublished: true },
      { name: 'SNBT (Seleksi Nasional Berdasarkan Tes)', slug: 'snbt', description: 'Seleksi berdasarkan hasil tes tertulis UTBK-SNBT', requirements: 'Mengikuti UTBK-SNBT\nNilai UTBK sesuai passing grade\nDokumen kelulusan', registrationStart: new Date('2024-03-01'), registrationEnd: new Date('2024-04-30'), testDate: new Date('2024-06-15'), announcementDate: new Date('2024-07-15'), registrationFee: '200000', isPublished: true },
      { name: 'Seleksi Mandiri', slug: 'seleksi-mandiri', description: 'Seleksi khusus melalui ujian masuk universitas', requirements: 'Mendaftar melalui portal universitas\nMengikuti ujian seleksi\nWawancara\nDokumen pendukung', registrationStart: new Date('2024-04-01'), registrationEnd: new Date('2024-06-30'), testDate: new Date('2024-07-15'), announcementDate: new Date('2024-07-30'), registrationFee: '300000', isPublished: true }
    ];

    for (const path of admissionPathwaysData) {
      const [result] = await db.insert(admissionPathways).values({
        ...path,
        createdAt: new Date(),
        updatedAt: new Date()
      } as any).returning();
      admissionPathwayIds.push(result.id);
    }

    // Seed tabel kelas
    console.log('Mengisi kelas pendaftaran...');
    const classIds = [];
    const classesData = [
      { name: 'Reguler', slug: 'reguler', description: 'Kelas reguler untuk mahasiswa aktif', type: 'reguler' as const, schedule: 'Senin - Jumat, 08:00 - 16:00', requirements: 'Lulus seleksi masuk', quota: 200, isPublished: true },
      { name: 'Karyawan', slug: 'karyawan', description: 'Kelas khusus untuk karyawan', type: 'executive' as const, schedule: 'Sabtu - Minggu, 08:00 - 16:00', requirements: 'Karyawan aktif, surat rekomendasi kerja', quota: 100, isPublished: true },
      { name: 'Online', slug: 'online', description: 'Kelas online untuk mahasiswa jarak jauh', type: 'online' as const, schedule: 'Online, fleksibel', requirements: 'Akses internet stabil', quota: 150, isPublished: true }
    ];

    for (const cls of classesData) {
      const [result] = await db.insert(admissionClasses).values({
        ...cls,
        type: cls.type as any,
        createdAt: new Date(),
        updatedAt: new Date()
      } as any).returning();
      classIds.push(result.id);
    }

    // Seed tabel biaya pendidikan
    console.log('Mengisi biaya pendidikan...');
    for (const studyProgramId of studyProgramIds) {
      for (const classId of classIds) {
        await db.insert(educationCosts).values({
          studyProgramId,
          classId,
          costType: faker.helpers.arrayElement(['registration', 'tuition', 'other'] as const) as any,
          year: '2024/2025',
          semester: faker.helpers.arrayElement(['Ganjil', 'Genap'] as const) as any,
          amount: faker.number.float({ min: 5000000, max: 20000000, multipleOf: 100000 }).toString(),
          description: `Biaya ${faker.helpers.arrayElement(['registrasi', 'kuliah', 'praktek'])} untuk ${studyProgramId}`,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date()
        } as any);
      }
    }

    // Seed tabel beasiswa
    console.log('Mengisi data beasiswa...');
    for (let i = 0; i < 10; i++) {
      await db.insert(scholarships).values({
        name: faker.company.name() + ' Beasiswa',
        slug: faker.helpers.slugify(faker.company.name()).toLowerCase() + '-beasiswa',
        description: faker.lorem.paragraph(),
        eligibility: faker.lorem.sentence(),
        benefits: faker.lorem.sentence(),
        requirements: faker.lorem.paragraph(),
        applicationStart: faker.date.past({ years: 1 }),
        applicationEnd: faker.date.future(),
        announcementDate: faker.date.future(),
        quota: faker.number.int({ min: 10, max: 100 }),
        amount: faker.number.float({ min: 1000000, max: 10000000, multipleOf: 100000 }).toString(),
        coverage: faker.helpers.arrayElement(['full', 'partial', 'specific'] as const) as any,
        provider: faker.company.name(),
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      } as any);
    }

    // Seed tabel profil universitas
    console.log('Mengisi profil universitas...');
    await db.insert(universityProfiles).values({
      name: 'Universitas Rianpedia',
      slug: 'universitas-rianpedia',
      shortName: 'UR',
      vision: 'Menjadi universitas teknologi terkemuka di Asia Tenggara yang berkontribusi dalam kemajuan ilmu pengetahuan dan teknologi.',
      mission: 'Menyelenggarakan pendidikan, penelitian, dan pengabdian kepada masyarakat di bidang teknologi yang unggul dan berdaya saing global.',
      values: 'Integritas, Inovasi, Kolaborasi, Kemandirian',
      history: 'Berdiri sejak tahun 1995 dengan fokus pada pengembangan teknologi informasi dan komunikasi. Kini berkembang menjadi universitas teknologi terkemuka.',
      logo: 'https://www.nicepng.com/png/full/912-9125490_yale-university-logo-png.png',
      establishedYear: 1995,
      motto: 'Menggapai Masa Depan dengan Akal Budi dan Kecerdasan Buatan Membangun Peradaban Digital yang Beretika, Inklusif, dan Berkelanjutan',
      colors: JSON.stringify({ primary: '#00f0ff', secondary: '#b376ff', accent: '#39ff14' }),
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Seed tabel statistik kampus
    console.log('Mengisi statistik kampus...');
    await db.insert(campusStatistics).values({
      year: 2024,
      totalStudents: 15000,
      totalUndergraduate: 12000,
      totalGraduate: 3000,

      totalEmployees: 800,
      totalStudyPrograms: 35,
      totalFaculties: 7,
      totalFacilities: 150,
      internationalPartners: 25,
      researchProjects: 120,
      patents: 45,
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Seed tabel akreditasi universitas
    console.log('Mengisi akreditasi universitas...');
    await db.insert(universityAccreditationsTable).values({
      name: 'Badan Akreditasi Nasional Perguruan Tinggi',
      accreditationNumber: '001/BAN-PT/Akred/S/XX/2024',
      accreditationLevel: 'A' as any,
      accreditationDate: new Date('2024-01-01'),
      accreditationExpired: new Date('2029-12-31'),
      documentFile: '/documents/akreditasi-universitas.pdf',
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Seed tabel informasi kontak
    console.log('Mengisi informasi kontak...');
    await db.insert(contactInformationTable).values({
      type: 'main_campus' as any,
      name: 'Kampus Utama',
      address: 'Jl. Teknologi No. 1, Jakarta Selatan',
      city: 'Jakarta',
      province: 'DKI Jakarta',
      postalCode: '12345',
      country: 'Indonesia',
      phone: '+622112345678',
      fax: '+622112345679',
      email: 'info@university.edu',
      website: 'https://university.edu',
      operatingHours: '08:00 - 17:00, Senin - Jumat',
      mapUrl: 'https://maps.google.com/maps?q=-6.229728,106.689485',
      latitude: '-6.229728',
      longitude: '106.689485',
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Seed tabel struktur organisasi
    console.log('Mengisi struktur organisasi...');
    const orgStructureId = faker.string.uuid();
    await db.insert(organizationalStructuresTable).values({
      id: orgStructureId,
      title: 'Struktur Organisasi Universitas 2024',
      slug: 'struktur-organisasi-universitas-2024',
      description: 'Struktur organisasi universitas periode 2024-2028',
      structureFile: '/documents/struktur-organisasi-2024.pdf',
      effectiveDate: new Date('2024-01-01'),
      isCurrent: true,
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Seed tabel layanan mahasiswa
    console.log('Mengisi layanan mahasiswa...');
    const serviceTypes = ['administrative', 'counseling', 'career', 'digital', 'satisfaction'];
    const serviceNames = ['Pengajuan KRS', 'Cuti Akademik', 'Pindah Prodi', 'Keringanan UKT', 'Surat Keterangan Aktif Kuliah', 'Pengajuan Wisuda', 'Cetak Kartu Mahasiswa Digital', 'Permohonan Transkrip Sementara', 'Pengajuan Legalisir Ijazah', 'Bimbingan Konseling', 'Pelatihan Soft Skills', 'Pelatihan Interview'];

    for (const serviceName of serviceNames) {
      await db.insert(studentServices).values({
        name: serviceName,
        slug: faker.helpers.slugify(serviceName).toLowerCase(),
        description: faker.lorem.paragraph(),
        type: faker.helpers.arrayElement(serviceTypes) as any,
        requirements: faker.lorem.sentence(),
        procedure: faker.lorem.paragraph(),
        processingTime: faker.helpers.arrayElement(['1 hari kerja', '3 hari kerja', '1 minggu', '2 minggu']),
        fee: faker.number.float({ min: 0, max: 100000, multipleOf: 1000 }).toString(),
        isOnline: faker.datatype.boolean(),
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      } as any);
    }

    // Seed tabel mitra (dengan data kerjasama)
    console.log('Mengisi data mitra & kerjasama...');
    const partnerIds = [];
    const partnerNames = [
      'Google Indonesia', 'Microsoft Indonesia', 'IBM Indonesia', 'Intel Indonesia',
      'PT. Teknologi Maju', 'PT. Solusi Digital', 'Universitas Gadjah Mada',
      'Institut Teknologi Bandung', 'Universitas Indonesia', 'Harvard University',
      'Stanford University', 'MIT', 'Cambridge University', 'Oxford University',
      'Tokyo University', 'National University of Singapore', 'Nanyang Technological University'
    ];

    for (const partnerName of partnerNames) {
      const [result] = await db.insert(partners).values({
        name: partnerName,
        slug: faker.helpers.slugify(partnerName).toLowerCase(),
        description: faker.lorem.paragraph(),
        type: faker.helpers.arrayElement(['domestic', 'international']),
        category: faker.helpers.arrayElement(['technology', 'business', 'health', 'education', 'industry', 'government', 'other']),
        country: faker.helpers.arrayElement(['Indonesia', 'United States', 'United Kingdom', 'Japan', 'Singapore', 'Malaysia']),
        city: faker.location.city(),
        address: faker.location.streetAddress(),
        contactPerson: faker.person.fullName(),
        contactEmail: faker.internet.email(),
        contactPhone: faker.phone.number(),
        website: faker.internet.url(),
        logo: faker.image.url(),
        partnershipStatus: faker.helpers.arrayElement(['active', 'inactive', 'expired', 'pending'] as const),

        // Data Kerjasama Baru
        agreementNumber: `MOU/${faker.number.int({ min: 1000, max: 9999 })}/UNIV/${new Date().getFullYear()}`,
        agreementFile: `/documents/mou-${faker.helpers.slugify(partnerName)}.pdf`,
        startDate: faker.date.past(),
        endDate: faker.date.future(),
        isActive: true,
        objectives: faker.lorem.sentences(2),
        coordinator: faker.person.fullName(),

        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();
      partnerIds.push(result.id);
    }


    // Seed tabel organisasi mahasiswa
    console.log('Mengisi organisasi mahasiswa...');
    const orgCategories = ['bem', 'dpm', 'hmj', 'uko', 'uksb', 'other'];
    const orgTypes = ['academic', 'non_academic', 'religious', 'journalism', 'language', 'entrepreneurship'];

    for (let i = 0; i < 20; i++) {
      await db.insert(studentOrganizations).values({
        name: faker.company.name() + ' ' + faker.helpers.arrayElement(['BEM', 'DPM', 'HMJ', 'UKO', 'UKSB']),
        slug: faker.helpers.slugify(faker.company.name() + '-' + faker.helpers.arrayElement(['bem', 'dpm', 'hmj', 'uko', 'uksb'])).toLowerCase(),
        description: faker.lorem.paragraph(),
        type: faker.helpers.arrayElement(orgTypes) as any,
        category: faker.helpers.arrayElement(orgCategories) as any,
        vision: faker.lorem.sentence(),
        mission: faker.lorem.sentence(),
        logo: faker.image.url(),
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      } as any);
    }

    // Seed tabel prestasi mahasiswa
    console.log('Mengisi prestasi mahasiswa...');
    for (let i = 0; i < 15; i++) {
      const randomStudyProgramId = studyProgramIds[Math.floor(Math.random() * studyProgramIds.length)];

      await db.insert(studentAchievements).values({
        studentName: faker.person.fullName(),
        studentId: `NIM${faker.number.int({ min: 100000, max: 999999 })}`,
        studyProgramId: randomStudyProgramId,
        title: faker.helpers.arrayElement([
          'Juara 1 Lomba Karya Tulis Ilmiah Nasional (LKTIN) 2024',
          'Medali Emas Olimpiade Sains Nasional Bidang Informatika',
          'Juara 2 Kompetisi Debat Mahasiswa Indonesia (KDMI)',
          'Medali Perak Pekan Olahraga Mahasiswa Nasional (POMNAS)',
          'Juara 1 Hackathon Startup Digital Indonesia',
          'Pemenang Hibah Program Kreativitas Mahasiswa (PKM-K)',
          'Juara Harapan 1 Kompetisi Robotika Indonesia',
          'Juara 3 International Business Case Competition',
          'Best Speaker pada Model United Nations (MUN) Regional',
          'Juara 1 Lomba Fotografi Jurnalistik Nasional'
        ]),
        description: 'Mahasiswa tersebut telah menunjukkan prestasi yang membanggakan dan dedikasi yang tinggi dalam kompetisi ini, membawa nama baik program studi dan universitas di tingkat nasional maupun internasional.',
        achievementType: faker.helpers.arrayElement(['non_academic', 'competition', 'community_service', 'other'] as const),
        achievementLevel: faker.helpers.arrayElement(['local', 'regional', 'national', 'international'] as const),
        achievementCategory: faker.helpers.arrayElement(['first', 'second', 'third', 'champion', 'participation', 'other'] as const),
        eventName: faker.company.name() + ' Festival 2024',
        eventDate: faker.date.past({ years: 1 }),
        organizer: faker.company.name(),
        image: faker.image.url({ width: 800, height: 600 }),
        supportingDocuments: null,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }



    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  }
}

// Jalankan seeding jika file ini dijalankan langsung
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Seeding process completed.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding process failed:', error);
      process.exit(1);
    });
}

export { seedDatabase };