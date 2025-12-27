import { db } from '@/db';
import { fakerID_ID as faker } from '@faker-js/faker';
import {
  // Tabel autentikasi
  user,
  session,
  account,
  verification,


  // Tabel berita
  news,
  newsCategories,
  newsComments,
  newsTags,
  newsTagsRel,

  // Tabel pengumuman
  announcements,
  announcementCategories,
  announcementAttachments,

  // Tabel events
  events,
  eventCategories,
  eventRegistrants,
  eventDocuments,

  // Tabel galeri
  galleryAlbums,
  galleryMedia,
  galleryCategories,
  galleryAlbumMediaRel,

  // Tabel akademik
  faculties,
  studyPrograms,
  academicCalendar,
  campusFacilities,
  careerProspects,


  // Tabel penerimaan
  admissionPathways,
  admissionClasses,
  educationCosts,
  scholarships,
  admissionRegistrations,
  admissionDocuments,


  // Tabel kemahasiswaan
  studentServices,
  studentServiceRequests,
  studentServiceDocuments,
  studentOrganizations,
  studentAchievements,

  counselors,


  // Tabel kerjasama
  partnerships,
  partners,
  partnershipTypes,
  partnershipActivities,
  partnershipDocuments,


  // Tabel profil
  universityProfiles,
  campusStatistics,
  universityAccreditations,

  contactInformation,
  organizationalStructures,
  organizationalEmployees,
  testimonials,
  rectorMessages,
  homepageStatistics,
  heroSections,
  universityLogoMeanings,
  universityAwards,
  campusAccessibilities,
  socialMediaLinks
} from '@/db/schema';
import { eq, and, or, desc, asc, sql } from 'drizzle-orm';

async function seedComprehensiveDatabase() {
  console.log('Memulai proses seeding database komprehensif...');

  try {
    // Hapus semua data terlebih dahulu (opsional, sesuaikan kebijakan Anda)
    console.log('Membersihkan data yang ada...');
    await db.delete(testimonials);
    await db.delete(rectorMessages);
    await db.delete(homepageStatistics);
    await db.delete(heroSections);
    await db.delete(organizationalEmployees);
    await db.delete(partnershipDocuments);
    await db.delete(partnershipActivities);
    await db.delete(studentAchievements);
    await db.delete(studentServiceDocuments);
    await db.delete(studentServiceRequests);
    await db.delete(admissionDocuments);
    await db.delete(universityLogoMeanings);
    await db.delete(admissionRegistrations);
    await db.delete(eventDocuments);
    await db.delete(eventRegistrants);
    await db.delete(announcementAttachments);
    await db.delete(newsComments);
    await db.delete(newsTagsRel);
    await db.delete(session);
    await db.delete(account);
    await db.delete(verification);
    await db.delete(user);
    await db.delete(news);
    await db.delete(newsCategories);
    await db.delete(newsTags);
    await db.delete(announcements);
    await db.delete(announcementCategories);
    await db.delete(events);
    await db.delete(eventCategories);
    await db.delete(galleryAlbumMediaRel);
    await db.delete(galleryMedia);
    await db.delete(galleryAlbums);
    await db.delete(galleryCategories);
    await db.delete(academicCalendar);
    await db.delete(campusFacilities);
    await db.delete(studyPrograms);
    await db.delete(faculties);
    await db.delete(admissionPathways);
    await db.delete(admissionClasses);
    await db.delete(educationCosts);
    await db.delete(scholarships);
    await db.delete(studentServices);
    await db.delete(studentOrganizations);
    await db.delete(counselors);
    await db.delete(partnerships);
    await db.delete(careerProspects);
    await db.delete(partners);
    await db.delete(partnershipTypes);
    await db.delete(universityProfiles);
    await db.delete(campusStatistics);
    await db.delete(universityAccreditations);
    await db.delete(contactInformation);
    await db.delete(organizationalStructures);
    await db.delete(universityAwards);
    await db.delete(campusAccessibilities);
    await db.delete(socialMediaLinks);


    // Seed tabel user (hanya admin tetap)
    console.log('Mengisi data pengguna admin...');
    const userIds = [];
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
    userIds.push(adminData.id);

    // Seed tabel kategori berita
    console.log('Mengisi kategori berita...');
    const newsCategoryIds = [];
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
      newsCategoryIds.push(result.id);
    }

    // Seed tabel berita
    console.log('Mengisi berita...');
    const newsIds = [];
    for (let i = 0; i < 30; i++) {
      const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
      const randomCategoryId = newsCategoryIds[Math.floor(Math.random() * newsCategoryIds.length)];

      const [result] = await db.insert(news).values({
        title: faker.helpers.arrayElement([
          'Mahasiswa UTI Berhasil Meraih Emas di PIMNAS 2024',
          'Workshop Implementasi AI dalam Kurikulum Teknik Informatika',
          'UTI Resmi Menjalin Kerja Sama dengan Perusahaan Teknologi Global',
          'Pengumuman Beasiswa Prestasi Semester Ganjil 2024/2025',
          'Rektor UTI Melantik Ketua Organisasi Mahasiswa Baru',
          'Seminar Nasional: Masa Depan Ketahanan Pangan Indonesia',
          'Inovasi Pengolahan Limbah oleh Fakultas Teknik Dipamerkan di Jakarta',
          'Tim Basket UTI Masuk Final Liga Mahasiswa Nasional'
        ]),
        slug: faker.helpers.slugify(faker.lorem.words(3)).toLowerCase() + '-' + faker.string.alphanumeric(5),
        content: 'Dalam upaya meningkatkan kualitas pendidikan dan prestasi mahasiswa, universitas terus melakukan berbagai terobosan inovatif. Kegiatan ini melibatkan berbagai pihak mulai dari dosen, praktisi industri, hingga dukungan penuh dari pihak birokrasi kampus. Diharapkan dengan adanya kegiatan seperti ini, mahasiswa dapat lebih siap menghadapi tantangan di dunia kerja serta mampu memberikan kontribusi nyata bagi masyarakat luas melalui ilmu pengetahuan yang telah diperoleh selama masa perkuliahan.',
        excerpt: 'Kegiatan strategis universitas dalam rangka meningkatkan mutu akademik dan non-akademik di lingkungan kampus.',
        featuredImage: faker.image.url(),
        viewCount: faker.number.int({ min: 100, max: 10000 }),
        isPublished: true,
        publishedAt: faker.date.past({ years: 1 }),
        authorName: faker.person.fullName(), // Updated from authorId
        categoryId: randomCategoryId,
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();
      newsIds.push(result.id);
    }

    // Seed tabel komentar berita
    console.log('Mengisi komentar berita...');
    for (let i = 0; i < 50; i++) {
      const randomNewsId = newsIds[Math.floor(Math.random() * newsIds.length)];
      const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];

      await db.insert(newsComments).values({
        newsId: randomNewsId,
        authorName: faker.person.fullName(),
        content: faker.helpers.arrayElement([
          'Informasi yang sangat bermanfaat, terima kasih kampus!',
          'Bangga sekali menjadi bagian dari UTI, jaya terus!',
          'Semoga kegiatan ini bisa rutin diadakan setiap semester.',
          'Bagaimana cara pendaftarannya? Mohon info lebih lanjut.',
          'Luar biasa prestasinya, selamat untuk teman-teman yang terlibat!'
        ]),
        isApproved: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Seed tabel tag berita
    console.log('Mengisi tag berita...');
    const newsTagIds = [];
    const tagNames = ['teknologi', 'pendidikan', 'inovasi', 'prestasi', 'mahasiswa', 'dosen', 'akademik', 'kampus'];

    for (const tagName of tagNames) {
      const [result] = await db.insert(newsTags).values({
        name: tagName,
        slug: faker.helpers.slugify(tagName).toLowerCase(),
        createdAt: new Date()
      }).returning();
      newsTagIds.push(result.id);
    }

    // Seed tabel relasi tag-berita
    console.log('Mengisi relasi tag berita...');
    for (const newsId of newsIds) {
      const numTags = faker.number.int({ min: 1, max: 3 });
      const selectedTags = faker.helpers.arrayElements(newsTagIds, numTags);

      for (const tagId of selectedTags) {
        await db.insert(newsTagsRel).values({
          newsId,
          tagId,
          createdAt: new Date()
        });
      }
    }

    // Seed tabel kategori pengumuman
    console.log('Mengisi kategori pengumuman...');
    const announcementCategoryIds = [];
    const announcementCategoriesData = [
      { name: 'Akademik', slug: 'akademik', description: 'Pengumuman seputar kegiatan akademik' },
      { name: 'Administrasi', slug: 'administrasi', description: 'Pengumuman seputar administrasi' },
      { name: 'Kegiatan', slug: 'kegiatan', description: 'Pengumuman seputar kegiatan kampus' },
      { name: 'Pendaftaran', slug: 'pendaftaran', description: 'Pengumuman seputar pendaftaran' },
      { name: 'Lainnya', slug: 'lainnya', description: 'Pengumuman lainnya' }
    ];

    for (const cat of announcementCategoriesData) {
      const [result] = await db.insert(announcementCategories).values({
        ...cat,
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();
      announcementCategoryIds.push(result.id);
    }

    // Seed tabel pengumuman
    console.log('Mengisi pengumuman...');
    const announcementIds = [];
    for (let i = 0; i < 20; i++) {
      const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
      const randomCategoryId = announcementCategoryIds[Math.floor(Math.random() * announcementCategoryIds.length)];

      const [result] = await db.insert(announcements).values({
        title: faker.helpers.arrayElement([
          'Jadwal Ujian Akhir Semester (UAS) Ganjil 2024',
          'Pemberitahuan Perbaikan Sistem KRS Online',
          'Pendaftaran Wisuda Periode Desember 2024 Telah Dibuka',
          'Pengumuman Libur Nasional Hari Raya Idul Fitri',
          'Panggilan Wawancara Calon Penerima Beasiswa Bank Indonesia',
          'Ketentuan Penggunaan Laboratorium Komputer Selama UAS',
          'Informasi Pengambilan Toga dan Undangan Wisuda'
        ]),
        slug: faker.helpers.slugify(faker.lorem.words(3)).toLowerCase() + '-' + faker.string.alphanumeric(5),
        content: 'Diharapkan seluruh civitas akademika untuk memperhatikan pengumuman ini baik-baik. Seluruh detil persyaratan dan tenggat waktu telah dilampirkan dalam dokumen pendukung. Jika terdapat pertanyaan lebih lanjut, silakan menghubungi bagian administrasi kampus pada jam kerja yang telah ditentukan.',
        excerpt: 'Informasi penting mengenai prosedur akademik dan kegiatan administratif kampus yang harus diperhatikan.',
        featuredImage: faker.image.url(),
        priority: faker.number.int({ min: 0, max: 2 }),
        isPublished: true,
        publishedAt: faker.date.past({ years: 1 }),
        expiresAt: faker.date.future({ years: 1 }),
        authorName: faker.person.fullName(), // Updated from authorId
        categoryId: randomCategoryId,
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();
      announcementIds.push(result.id);
    }

    // Seed tabel lampiran pengumuman
    console.log('Mengisi lampiran pengumuman...');
    for (const announcementId of announcementIds) {
      const numAttachments = faker.number.int({ min: 0, max: 2 });

      for (let i = 0; i < numAttachments; i++) {
        await db.insert(announcementAttachments).values({
          announcementId,
          fileName: `attachment_${faker.string.alphanumeric(8)}.pdf`,
          filePath: `/attachments/announcement_${announcementId}_attachment_${i + 1}.pdf`,
          fileSize: faker.number.int({ min: 100000, max: 5000000 }),
          mimeType: 'application/pdf',
          downloadCount: faker.number.int({ min: 0, max: 1000 }),
          uploadedAt: new Date()
        });
      }
    }

    // Seed tabel kategori event
    console.log('Mengisi kategori event...');
    const eventCategoryIds = [];
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
      eventCategoryIds.push(result.id);
    }

    // Seed tabel events
    console.log('Mengisi event...');
    const eventIds = [];
    for (let i = 0; i < 15; i++) {
      const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
      const randomCategoryId = eventCategoryIds[Math.floor(Math.random() * eventCategoryIds.length)];

      const [result] = await db.insert(events).values({
        title: faker.helpers.arrayElement([
          'Seminar Nasional: Transformasi Digital di Indonesia',
          'Workshop UI/UX Design for Professional Careers',
          'Lomba Hackathon Universitas 2024',
          'Festival Seni dan Budaya Mahasiswa UTI',
          'Pelatihan Penulisan Jurnal Ilmiah Internasional',
          'Pameran Inovasi Teknologi Hasil Riset Dosen',
          'Job Fair UTI: Bertemu dengan 50+ Perusahaan Ternama'
        ]),
        slug: faker.helpers.slugify(faker.lorem.words(3)).toLowerCase() + '-' + faker.string.alphanumeric(5),
        description: 'Ikuti kegiatan menarik ini untuk menambah wawasan dan jaringan profesional Anda.',
        content: 'Kegiatan ini dirancang khusus bagi mahasiswa dan praktisi yang ingin mendalami bidang terkait lebih jauh. Pembicara yang dihadirkan adalah mereka yang ahli di bidangnya masing-masing. Fasilitas yang disediakan meliputi sertifikat, konsumsi, dan materi eksklusif. Segera daftarkan diri Anda sebelum kuota penuh.',
        poster: faker.image.url(),
        banner: faker.image.url(),
        startDate: faker.date.future({ years: 0.1 }),
        endDate: faker.date.future({ years: 0.15 }),
        startTime: faker.date.recent().toISOString(),
        endTime: faker.date.recent().toISOString(),
        location: 'Auditorium Lantai 3, Gedung Utama',
        venue: 'Kampus UTI Jakarta',
        address: 'Jl. Teknologi No. 1, Jakarta Selatan',
        mapUrl: faker.internet.url(),
        maxParticipants: faker.number.int({ min: 50, max: 500 }),
        registrationStart: faker.date.past({ years: 0.1 }),
        registrationEnd: faker.date.future({ years: 0.05 }),
        registrationUrl: faker.internet.url(),
        registrationFee: faker.number.float({ min: 0, max: 500000, multipleOf: 1000 }).toString(),
        organizer: 'Direktorat Kemahasiswaan UTI',
        speaker: faker.person.fullName(),
        targetAudience: 'Umum',
        status: faker.helpers.arrayElement(['upcoming', 'ongoing', 'completed', 'cancelled'] as const),
        isFeatured: faker.datatype.boolean(),
        isPublished: true,
        publishedAt: faker.date.past({ years: 0.03 }),
        authorName: faker.person.fullName(), // Updated from authorId
        categoryId: randomCategoryId,
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();
      eventIds.push(result.id);
    }

    // Seed tabel pendaftar event
    console.log('Mengisi pendaftar event...');
    for (const eventId of eventIds) {
      const numRegistrants = faker.number.int({ min: 10, max: 50 });

      for (let i = 0; i < numRegistrants; i++) {
        await db.insert(eventRegistrants).values({
          eventId,
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          institution: faker.company.name(),
          status: faker.helpers.arrayElement(['registered', 'confirmed', 'attended', 'cancelled']),
          registrationDate: faker.date.past({ years: 0.05 }),
          confirmationDate: faker.date.past({ years: 0.04 }),
          ticketNumber: `TKT${faker.string.alphanumeric(8)}`,
          checkedIn: faker.datatype.boolean(),
          checkedInAt: faker.date.past({ years: 0.03 }),
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    // Seed tabel dokumen event
    console.log('Mengisi dokumen event...');
    for (const eventId of eventIds) {
      const numDocuments = faker.number.int({ min: 1, max: 3 });

      for (let i = 0; i < numDocuments; i++) {
        await db.insert(eventDocuments).values({
          eventId,
          title: faker.lorem.words(3),
          fileName: `document_${faker.string.alphanumeric(8)}.pdf`,
          filePath: `/documents/event_${eventId}_doc_${i + 1}.pdf`,
          fileSize: faker.number.int({ min: 100000, max: 5000000 }),
          mimeType: 'application/pdf',
          documentType: faker.helpers.arrayElement(['proposal', 'report', 'certificate', 'other'] as const),
          uploadedAt: new Date()
        });
      }
    }

    // Seed tabel kategori galeri
    console.log('Mengisi kategori galeri...');
    const galleryCategoryIds = [];
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
      galleryCategoryIds.push(result.id);
    }

    // Seed tabel album galeri
    console.log('Mengisi album galeri...');
    const albumIds = [];
    for (let i = 0; i < 10; i++) {
      const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
      const randomCategoryId = galleryCategoryIds[Math.floor(Math.random() * galleryCategoryIds.length)];

      const [result] = await db.insert(galleryAlbums).values({
        title: faker.lorem.words(3),
        slug: faker.helpers.slugify(faker.lorem.words(3)).toLowerCase(),
        description: faker.lorem.paragraph(),
        coverImage: faker.image.url(),
        isPublic: true,
        isFeatured: faker.datatype.boolean(),
        authorName: faker.person.fullName(), // Updated from authorId
        categoryId: randomCategoryId,
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();
      albumIds.push(result.id);
    }

    // Seed tabel media galeri
    console.log('Mengisi media galeri...');
    for (let i = 0; i < 100; i++) {
      const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
      const randomAlbumId = albumIds[Math.floor(Math.random() * albumIds.length)];

      await db.insert(galleryMedia).values({
        title: faker.lorem.words(3),
        description: faker.lorem.paragraph(),
        fileName: faker.system.commonFileName(),
        filePath: faker.system.directoryPath() + '/' + faker.system.commonFileName(),
        fileSize: faker.number.int({ min: 100000, max: 5000000 }),
        mimeType: faker.helpers.arrayElement(['image/jpeg', 'image/png', 'image/gif']),
        mediaType: 'image',
        thumbnailPath: faker.system.directoryPath() + '/' + faker.system.commonFileName(),
        duration: null,
        width: faker.number.int({ min: 800, max: 1920 }),
        height: faker.number.int({ min: 600, max: 1080 }),
        isPublic: true,
        isFeatured: faker.datatype.boolean(),
        authorName: faker.person.fullName(), // Updated from authorId
        albumId: randomAlbumId,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Seed tabel relasi album-media
    console.log('Mengisi relasi album-media galeri...');
    for (const albumId of albumIds) {
      const numMedia = faker.number.int({ min: 5, max: 15 });
      const allMedia = await db.select().from(galleryMedia);
      const selectedMedia = faker.helpers.arrayElements(allMedia, numMedia);

      for (const media of selectedMedia) {
        await db.insert(galleryAlbumMediaRel).values({
          albumId,
          mediaId: media.id,
          sortOrder: faker.number.int({ min: 0, max: 100 }),
          createdAt: new Date()
        });
      }
    }

    // Seed tabel fakultas
    console.log('Mengisi data fakultas...');
    const facultyIds = [];
    const facultiesData = [
      { name: 'Fakultas Teknik', slug: 'fakultas-teknik', description: 'Fakultas Teknik Universitas', dean: 'Dr. Ir. Ahmad Santoso, M.T.', contactEmail: 'dekan.ft@university.edu', contactPhone: '+622112345678', address: 'Jl. Teknik No. 1, Jakarta', accreditation: 'Unggul' as const, logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=ft', isPublished: true },
      { name: 'Fakultas Ilmu Komputer', slug: 'fakultas-ilmu-komputer', description: 'Fakultas Ilmu Komputer Universitas', dean: 'Dr. Eng. Siti Rahayu, S.T., M.T.', contactEmail: 'dekan.fikom@university.edu', contactPhone: '+622112345679', address: 'Jl. Informatika No. 2, Jakarta', accreditation: 'A' as const, logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=fikom', isPublished: true },
      { name: 'Fakultas Ekonomi', slug: 'fakultas-ekonomi', description: 'Fakultas Ekonomi Universitas', dean: 'Prof. Dr. Budi Santoso, S.E., M.M.', contactEmail: 'dekan.fe@university.edu', contactPhone: '+622112345680', address: 'Jl. Ekonomi No. 3, Jakarta', accreditation: 'A' as const, logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=fe', isPublished: true },
      { name: 'Fakultas Hukum', slug: 'fakultas-hukum', description: 'Fakultas Hukum Universitas', dean: 'Dr. H. Ali Imron, S.H., M.H.', contactEmail: 'dekan.fh@university.edu', contactPhone: '+622112345681', address: 'Jl. Hukum No. 4, Jakarta', accreditation: 'B' as const, logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=fh', isPublished: true },
      { name: 'Fakultas Kedokteran', slug: 'fakultas-kedokteran', description: 'Fakultas Kedokteran Universitas', dean: 'Dr. dr. Retno Wijayanti, Sp.OG., M.Kes.', contactEmail: 'dekan.fk@university.edu', contactPhone: '+622112345682', address: 'Jl. Kedokteran No. 5, Jakarta', accreditation: 'Unggul' as const, logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=fk', isPublished: true }
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
      { name: 'Teknik Informatika', slug: 'teknik-informatika', description: 'Program studi Teknik Informatika', level: 'S1' as const, accreditation: 'A' as const, facultyId: facultyIds[0], headOfProgram: 'Dr. Eng. Andi Pratama, S.T., M.T.', contactEmail: 'if@university.ac.id', contactPhone: '0812-3456-7890', totalStudents: 1250, logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=ti', isPublished: true },
      { name: 'Sistem Informasi', slug: 'sistem-informasi', description: 'Program studi Sistem Informasi', level: 'S1' as const, accreditation: 'A' as const, facultyId: facultyIds[1], headOfProgram: 'Dr. Sari Dewi, S.Si., M.Kom.', contactEmail: 'si@university.ac.id', contactPhone: '0812-3456-7891', totalStudents: 850, logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=si', isPublished: true },
      { name: 'Teknik Elektro', slug: 'teknik-elektro', description: 'Program studi Teknik Elektro', level: 'S1' as const, accreditation: 'B' as const, facultyId: facultyIds[0], headOfProgram: 'Dr. Ir. Joko Susilo, M.T.', contactEmail: 'te@university.ac.id', contactPhone: '0812-3456-7892', totalStudents: 450, logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=te', isPublished: true },
      { name: 'Manajemen', slug: 'manajemen', description: 'Program studi Manajemen', level: 'S1' as const, accreditation: 'A' as const, facultyId: facultyIds[2], headOfProgram: 'Dr. Ir. Siti Nurhaliza, M.M.', contactEmail: 'manajemen@university.ac.id', contactPhone: '0812-3456-7893', totalStudents: 1540, logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=mn', isPublished: true },
      { name: 'Akuntansi', slug: 'akuntansi', description: 'Program studi Akuntansi', level: 'S1' as const, accreditation: 'A' as const, facultyId: facultyIds[2], headOfProgram: 'Dr. Sri Handayani, S.E., M.Ak.', contactEmail: 'akuntansi@university.ac.id', contactPhone: '0812-3456-7894', totalStudents: 1120, logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=ak', isPublished: true },
      { name: 'Ilmu Hukum', slug: 'ilmu-hukum', description: 'Program studi Ilmu Hukum', level: 'S1' as const, accreditation: 'B' as const, facultyId: facultyIds[3], headOfProgram: 'Dr. H. Bambang Suryono, S.H., M.H.', contactEmail: 'hukum@university.ac.id', contactPhone: '0812-3456-7895', totalStudents: 980, logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=ih', isPublished: true },
      { name: 'Pendidikan Dokter', slug: 'pendidikan-dokter', description: 'Program studi Pendidikan Dokter', level: 'S1' as const, accreditation: 'A' as const, facultyId: facultyIds[4], headOfProgram: 'Dr. dr. Maya Putri, Sp.PD-KEMD., Ph.D.', contactEmail: 'kedokteran@university.ac.id', contactPhone: '0812-3456-7896', totalStudents: 650, logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=pd', isPublished: true }
    ];

    for (const prog of studyProgramsData) {
      const [result] = await db.insert(studyPrograms).values({
        ...prog,
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();
      studyProgramIds.push(result.id);
    }



    // Seed tabel kalender akademik
    console.log('Mengisi kalender akademik...');
    const academicCalendarData = [
      {
        title: 'Pendaftaran Mahasiswa Baru Gelombang 1',
        description: 'Pembukaan pendaftaran untuk calon mahasiswa baru tahun akademik 2024/2025.',
        startDate: new Date('2024-01-02'),
        endDate: new Date('2024-03-31'),
        eventType: 'registration' as const,
        academicYear: '2024/2025',
        semester: 'Ganjil' as const,
        isPublished: true
      },
      {
        title: 'Orientasi Mahasiswa Baru (PKKMB)',
        description: 'Kegiatan pengenalan kehidupan kampus bagi mahasiswa baru.',
        startDate: new Date('2024-08-15'),
        endDate: new Date('2024-08-20'),
        eventType: 'orientation' as const,
        academicYear: '2024/2025',
        semester: 'Ganjil' as const,
        isPublished: true
      },
      {
        title: 'Awal Perkuliahan Semester Ganjil',
        description: 'Hari pertama perkuliahan efektif untuk seluruh program studi.',
        startDate: new Date('2024-09-02'),
        endDate: new Date('2024-09-02'),
        eventType: 'classes_start' as const,
        academicYear: '2024/2025',
        semester: 'Ganjil' as const,
        isPublished: true
      },
      {
        title: 'Ujian Tengah Semester (UTS) Ganjil',
        description: 'Pelaksanaan evaluasi tengah semester untuk seluruh mata kuliah.',
        startDate: new Date('2024-10-21'),
        endDate: new Date('2024-11-01'),
        eventType: 'midterm' as const,
        academicYear: '2024/2025',
        semester: 'Ganjil' as const,
        isPublished: true
      },
      {
        title: 'Ujian Akhir Semester (UAS) Ganjil',
        description: 'Pelaksanaan evaluasi akhir semester ganjil.',
        startDate: new Date('2025-01-06'),
        endDate: new Date('2025-01-17'),
        eventType: 'finalterm' as const,
        academicYear: '2024/2025',
        semester: 'Ganjil' as const,
        isPublished: true
      },
      {
        title: 'Libur Semester Ganjil',
        description: 'Masa libur akademik setelah pelaksanaan UAS Ganjil.',
        startDate: new Date('2025-01-20'),
        endDate: new Date('2025-02-07'),
        eventType: 'break' as const,
        academicYear: '2024/2025',
        semester: 'Ganjil' as const,
        isPublished: true
      },
      {
        title: 'Dies Natalis Universitas',
        description: 'Peringatan hari jadi universitas yang ke-25.',
        startDate: new Date('2024-11-15'),
        endDate: new Date('2024-11-15'),
        eventType: 'other' as const,
        academicYear: '2024/2025',
        semester: 'Ganjil' as const,
        isPublished: true
      },
      {
        title: 'Wisuda Periode I Tahun 2024',
        description: 'Upacara pengukuhan lulusan universitas periode pertama.',
        startDate: new Date('2024-05-25'),
        endDate: new Date('2024-05-25'),
        eventType: 'graduation' as const,
        academicYear: '2023/2024',
        semester: 'Genap' as const,
        isPublished: true
      }
    ];

    for (const item of academicCalendarData) {
      await db.insert(academicCalendar).values({
        ...item,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Seed tabel fasilitas kampus
    console.log('Mengisi fasilitas kampus...');
    const campusFacilitiesData = [
      {
        name: 'Perpustakaan Pusat',
        slug: 'perpustakaan-pusat',
        description: 'Perpustakaan utama universitas dengan koleksi ribuan buku, jurnal, dan akses digital.',
        type: 'library' as const,
        location: 'Gedung Rektorat Lantai 2-4',
        capacity: 500,
        facilities: 'Ruang Baca AC, WiFi, Komputer, Cafe Perpustakaan, Ruang Diskusi',
        operatingHours: '08:00 - 20:00 (Senin-Jumat), 09:00 - 15:00 (Sabtu)',
        contactPerson: 'Dra. Siti Aminah, M.Lib.',
        contactPhone: '021-1234567-101',
        isAvailable: true,
        isPublished: true
      },
      {
        name: 'Laboratorium Rekayasa Perangkat Lunak',
        slug: 'lab-rpl',
        description: 'Laboratorium khusus untuk praktek pengembangan perangkat lunak dan pemrograman.',
        type: 'laboratory' as const,
        location: 'Gedung Fakultas Ilmu Komputer Lantai 3',
        capacity: 40,
        facilities: 'PC High-Spec, iMac, Fiber Optic Internet, AC, Proyektor',
        operatingHours: '08:00 - 18:00',
        contactPerson: 'Eko Prasetyo, S.Kom.',
        contactPhone: '0812-9876-5432',
        isAvailable: true,
        isPublished: true
      },
      {
        name: 'Gedung Olahraga (GOR) Serbaguna',
        slug: 'gor-serbaguna',
        description: 'Fasilitas olahraga indoor untuk basket, futsal, dan bulutangkis.',
        type: 'sports' as const,
        location: 'Area Kampus Timur',
        capacity: 1000,
        facilities: 'Lapangan Indoor, Ruang Ganti, Tribun Penonton, Kantin Olahraga',
        operatingHours: '06:00 - 22:00',
        contactPerson: 'Budi Darmawan, S.Pd.',
        contactPhone: '0813-1122-3344',
        isAvailable: true,
        isPublished: true
      },
      {
        name: 'Asrama Mahasiswa (Wisma Ganesha)',
        slug: 'asrama-mahasiswa',
        description: 'Hunian nyaman di dalam kampus khusus bagi mahasiswa luar daerah.',
        type: 'dormitory' as const,
        location: 'Gerbang Utara Kampus',
        capacity: 400,
        facilities: 'Kamar Mandi Dalam, Pantry Bersama, Laundry, Musholla, Keamanan 24 Jam',
        operatingHours: '24 Jam (Akses Mahasiswa)',
        contactPerson: 'Hj. Rohaya',
        contactPhone: '0852-4455-6677',
        isAvailable: true,
        isPublished: true
      },
      {
        name: 'Poliklinik Universitas',
        slug: 'poliklinik-universitas',
        description: 'Layanan kesehatan dasar bagi seluruh civitas akademika.',
        type: 'health' as const,
        location: 'Area Pusat Layanan Mahasiswa',
        capacity: 100,
        facilities: 'Ruang Tunggu, Ruang Periksa, Apotek Mini, Ambulans',
        operatingHours: '08:00 - 16:00',
        contactPerson: 'dr. Hendra Saputra',
        contactPhone: '021-1234567-202',
        isAvailable: true,
        isPublished: true
      },
      {
        name: 'Auditorium Graha Cendekia',
        slug: 'auditorium-graha-cendekia',
        description: 'Ruang pertemuan besar untuk kuliah umum, seminar, dan acara wisuda.',
        type: 'classroom' as const,
        location: 'Gedung Utama Sisi Selatan',
        capacity: 1500,
        facilities: 'Sound System Pro, Panggung Luas, AC, Kursi VIP',
        operatingHours: 'Berdasarkan Reservasi',
        contactPerson: 'Andini Putri, S.E.',
        contactPhone: '0878-0099-8877',
        isAvailable: true,
        isPublished: true
      }
    ];

    for (const item of campusFacilitiesData) {
      await db.insert(campusFacilities).values({
        ...item,
        image: `https://api.dicebear.com/7.x/identicon/svg?seed=${item.slug}`,
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
      }).returning();
      admissionPathwayIds.push(result.id);
    }

    // Seed tabel kelas pendaftaran
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
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();
      classIds.push(result.id);
    }

    // Seed tabel biaya pendidikan
    console.log('Mengisi biaya pendidikan...');
    for (const studyProgramId of studyProgramIds) {
      for (const classId of classIds) {
        await db.insert(educationCosts).values({
          studyProgramId,
          classId,
          costType: faker.helpers.arrayElement(['registration', 'tuition', 'other'] as const),
          year: '2024/2025',
          semester: faker.helpers.arrayElement(['Ganjil', 'Genap'] as const),
          amount: faker.number.float({ min: 5000000, max: 20000000, multipleOf: 100000 }).toString(),
          description: `Biaya ${faker.helpers.arrayElement(['registrasi', 'kuliah', 'praktek'])} untuk ${studyProgramId}`,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    // Seed tabel beasiswa
    console.log('Mengisi data beasiswa...');
    for (let i = 0; i < 15; i++) {
      await db.insert(scholarships).values({
        name: faker.company.name() + ' Beasiswa',
        slug: faker.helpers.slugify(faker.company.name() + '-beasiswa').toLowerCase(),
        description: 'Beasiswa ini diberikan kepada mahasiswa berprestasi yang memiliki indeks prestasi tinggi dan aktif dalam kegiatan organisasi.',
        eligibility: 'Mahasiswa aktif semester 3 sampai 7 yang memiliki IPK minimal 3.50.',
        benefits: 'Bebas biaya UKT selama satu tahun penuh dan uang saku bulanan.',
        requirements: 'Scan Kartu Mahasiswa, KHS Terakhir, Sertifikat Prestasi, dan Surat Kelakuan Baik.',
        applicationStart: faker.date.past({ years: 1 }),
        applicationEnd: faker.date.future(),
        announcementDate: faker.date.future(),
        quota: faker.number.int({ min: 10, max: 100 }),
        amount: faker.number.float({ min: 1000000, max: 10000000, multipleOf: 100000 }).toString(),
        coverage: faker.helpers.arrayElement(['full', 'partial', 'specific'] as const),
        provider: faker.company.name(),
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Seed tabel pendaftaran mahasiswa baru
    console.log('Mengisi pendaftaran mahasiswa baru...');
    for (let i = 0; i < 100; i++) {
      const randomStudyProgramId = studyProgramIds[Math.floor(Math.random() * studyProgramIds.length)];
      const randomClassId = classIds[Math.floor(Math.random() * classIds.length)];
      const randomPathwayId = admissionPathwayIds[Math.floor(Math.random() * admissionPathwayIds.length)];

      const [registration] = await db.insert(admissionRegistrations).values({
        registrationNumber: `REG-${faker.string.alphanumeric(8).toUpperCase()}`,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        dateOfBirth: faker.date.birthdate({ min: 17, max: 25, mode: 'age' }),
        placeOfBirth: faker.location.city(),
        gender: faker.helpers.arrayElement(['male', 'female'] as const),
        nationality: 'Indonesia',
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        province: faker.location.state(),
        postalCode: faker.location.zipCode(),
        highSchool: 'SMA ' + faker.location.city(),
        highSchoolMajor: faker.helpers.arrayElement(['IPA', 'IPS', 'Bahasa']),
        graduationYear: (new Date().getFullYear() - faker.number.int({ min: 1, max: 3 })).toString(),
        studyProgramId: randomStudyProgramId,
        classId: randomClassId,
        pathwayId: randomPathwayId,
        status: faker.helpers.arrayElement(['registered', 'paid', 'document_submitted', 'verified', 'accepted', 'rejected', 'enrolled'] as const),
        registrationDate: faker.date.past({ years: 0.5 }),
        paymentDate: faker.helpers.arrayElement([faker.date.past({ years: 0.5 }), null]),
        verificationDate: faker.helpers.arrayElement([faker.date.past({ years: 0.4 }), null]),
        acceptanceDate: faker.helpers.arrayElement([faker.date.past({ years: 0.3 }), null]),
        documentStatus: faker.helpers.arrayElement(['pending', 'submitted', 'verified', 'rejected'] as const),
        documentNotes: faker.helpers.arrayElement([faker.lorem.sentence(), null]),
        notes: faker.helpers.arrayElement([faker.lorem.sentence(), null]),
        isVerified: faker.datatype.boolean(),
        isAccepted: faker.datatype.boolean(),
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();

      // Buat dokumen pendaftaran acak
      if (registration.status !== 'rejected') {
        const docTypes = [
          'identity_card', 'birth_certificate', 'high_school_diploma',
          'high_school_transcript', 'photo', 'payment_proof', 'other'
        ];
        const numDocs = faker.number.int({ min: 3, max: 7 });
        const selectedDocTypes = faker.helpers.arrayElements(docTypes, numDocs);

        for (const docType of selectedDocTypes) {
          await db.insert(admissionDocuments).values({
            registrationId: registration.id,
            documentType: docType as any,
            fileName: `document_${faker.string.alphanumeric(8)}.pdf`,
            filePath: `/documents/registration_${registration.id}_${docType}.pdf`,
            fileSize: faker.number.int({ min: 100000, max: 5000000 }),
            mimeType: 'application/pdf',
            isVerified: faker.datatype.boolean(),
            verifiedAt: faker.helpers.arrayElement([faker.date.past({ years: 0.33 }), null]),
            notes: faker.helpers.arrayElement([faker.lorem.sentence(), null]),
            uploadedAt: new Date()
          });
        }
      }
    }

    // Seed tabel layanan mahasiswa
    console.log('Mengisi layanan mahasiswa...');
    const serviceTypes = ['administrative', 'counseling', 'career', 'digital', 'satisfaction'] as const;
    const serviceNames = [
      'Pengajuan KRS', 'Cuti Akademik', 'Pindah Prodi', 'Keringanan UKT',
      'Surat Keterangan Aktif Kuliah', 'Pengajuan Wisuda', 'Cetak Kartu Mahasiswa Digital',
      'Permohonan Transkrip Sementara', 'Pengajuan Legalisir Ijazah', 'Bimbingan Konseling',
      'Pelatihan Soft Skills', 'Pelatihan Interview'
    ];

    for (const serviceName of serviceNames) {
      await db.insert(studentServices).values({
        name: serviceName,
        slug: faker.helpers.slugify(serviceName).toLowerCase(),
        description: 'Layanan resmi bagi mahasiswa untuk mengurus berbagai keperluan administratif dan akademik secara efisien.',
        type: faker.helpers.arrayElement(serviceTypes),
        requirements: 'Membawa KTM aktif dan fotokopi dokumen pendukung terkait.',
        procedure: 'Silakan ajukan melalui portal SSO mahasiswa, kemudian unggah dokumen yang diperlukan dan tunggu verifikasi petugas.',
        processingTime: faker.helpers.arrayElement(['1 hari kerja', '3 hari kerja', '1 minggu', '2 minggu']),
        fee: faker.number.float({ min: 0, max: 100000, multipleOf: 1000 }).toString(),
        isOnline: faker.datatype.boolean(),
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Seed tabel pengajuan layanan mahasiswa
    console.log('Mengisi pengajuan layanan mahasiswa...');
    const allServices = await db.select().from(studentServices);
    for (let i = 0; i < 50; i++) {
      const randomServiceId = allServices[Math.floor(Math.random() * allServices.length)].id;

      const [request] = await db.insert(studentServiceRequests).values({
        serviceId: randomServiceId,
        studentName: faker.person.fullName(),
        studentEmail: faker.internet.email(),
        studentId: `NIM${faker.number.int({ min: 100000, max: 999999 })}`,
        requestDate: faker.date.past({ years: 0.5 }),
        status: faker.helpers.arrayElement(['pending', 'in_progress', 'completed', 'rejected', 'cancelled'] as const),
        priority: faker.number.int({ min: 0, max: 2 }),
        notes: faker.helpers.arrayElement([faker.lorem.sentence(), null]),
        completedAt: faker.helpers.arrayElement([faker.date.past({ years: 0.25 }), null]),
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();

      // Buat dokumen layanan jika statusnya bukan pending
      if (request.status !== 'pending') {
        await db.insert(studentServiceDocuments).values({
          requestId: request.id,
          documentType: faker.lorem.word(),
          fileName: `service_doc_${faker.string.alphanumeric(8)}.pdf`,
          filePath: `/documents/service_${request.id}_doc.pdf`,
          fileSize: faker.number.int({ min: 100000, max: 5000000 }),
          mimeType: 'application/pdf',
          uploadedAt: new Date()
        });
      }
    }

    // Seed tabel organisasi mahasiswa
    console.log('Mengisi organisasi mahasiswa...');
    const orgCategories = ['bem', 'dpm', 'hmj', 'uko', 'uksb', 'other'];
    const orgTypes = ['academic', 'non_academic', 'religious', 'journalism', 'language', 'entrepreneurship'];

    for (let i = 0; i < 25; i++) {
      await db.insert(studentOrganizations).values({
        name: faker.company.name() + ' ' + faker.helpers.arrayElement(['BEM', 'DPM', 'HMJ', 'UKO', 'UKSB']),
        slug: faker.helpers.slugify(faker.company.name() + '-' + faker.helpers.arrayElement(['bem', 'dpm', 'hmj', 'uko', 'uksb'])).toLowerCase(),
        description: 'Organisasi mahasiswa yang berfokus pada pengembangan minat, bakat, dan kepemimpinan di lingkungan universitas.',
        type: faker.helpers.arrayElement(orgTypes) as any,
        category: faker.helpers.arrayElement(orgCategories) as any,
        vision: 'Menjadi wadah aspirasi dan inovasi mahasiswa yang unggul dan kolaboratif.',
        mission: 'Menyelenggarakan kegiatan yang mendukung peningkatan kompetensi mahasiswa baik akademik maupun non-akademik.',
        logo: faker.image.url(),
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Seed tabel prestasi mahasiswa
    console.log('Mengisi prestasi mahasiswa...');
    for (let i = 0; i < 30; i++) {
      const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
      const randomStudyProgramId = studyProgramIds[Math.floor(Math.random() * studyProgramIds.length)];

      await db.insert(studentAchievements).values({
        studentName: faker.person.fullName(),
        studentId: `NIM${faker.number.int({ min: 100000, max: 999999 })}`,
        studyProgramId: randomStudyProgramId,
        title: faker.helpers.arrayElement([
          'Juara 1 Lomba Karya Tulis Ilmiah Nasional',
          'Medali Perunggu Olimpiade Matematika Internasional',
          'Juara Harapan 2 Kompetisi Robotika Regional',
          'Pemenang Hibah Bisnis Mahasiswa Kreatif 2024',
          'Finalis Pemilihan Mahasiswa Berprestasi Nasional'
        ]),
        description: 'Prestasi gemilang yang diraih mahasiswa dalam ajang kompetisi bergengsi, membuktikan kualitas akademik dan semangat juang yang tinggi.',
        achievementType: faker.helpers.arrayElement(['academic', 'non_academic', 'competition', 'research', 'community_service', 'other'] as const),
        achievementLevel: faker.helpers.arrayElement(['local', 'regional', 'national', 'international'] as const),
        achievementCategory: faker.helpers.arrayElement(['first', 'second', 'third', 'champion', 'participation', 'other'] as const),
        eventName: faker.company.name() + ' Cup 2024',
        eventDate: faker.date.past({ years: 1 }),
        organizer: faker.company.name(),
        certificateUrl: faker.internet.url(),
        supportingDocuments: faker.helpers.arrayElement([faker.internet.url(), null]),
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Seed tabel konselor
    console.log('Mengisi data konselor...');
    for (let i = 0; i < 12; i++) {
      await db.insert(counselors).values({
        name: faker.person.fullName(),
        nip: `NIP${faker.number.int({ min: 100000, max: 999999 })}`,
        email: faker.internet.email(),
        phone: faker.phone.number(),
        specialization: faker.lorem.words(2),
        qualifications: faker.lorem.words(3),
        photo: faker.image.avatar(),
        isAvailable: true,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Seed tabel jenis kerja sama
    console.log('Mengisi jenis kerja sama...');
    const partnershipTypeIds = [];
    const partnershipTypesData = [
      { name: 'Joint Research', slug: 'joint-research', description: 'Kerjasama penelitian bersama', type: 'joint_research' as const, isPublished: true },
      { name: 'Student Exchange', slug: 'student-exchange', description: 'Kerjasama pertukaran mahasiswa', type: 'student_exchange' as const, isPublished: true },
      { name: 'Faculty Exchange', slug: 'faculty-exchange', description: 'Kerjasama pertukaran dosen', type: 'faculty_exchange' as const, isPublished: true },
      { name: 'Academic Collaboration', slug: 'academic-collaboration', description: 'Kerjasama akademik', type: 'academic_collaboration' as const, isPublished: true },
      { name: 'Internship Program', slug: 'internship-program', description: 'Kerjasama program magang', type: 'internship' as const, isPublished: true },
      { name: 'Employment Partnership', slug: 'employment-partnership', description: 'Kerjasama penyaluran kerja', type: 'employment' as const, isPublished: true },
      { name: 'Technology Transfer', slug: 'technology-transfer', description: 'Kerjasama alih teknologi', type: 'technology_transfer' as const, isPublished: true }
    ];

    for (const ptype of partnershipTypesData) {
      const [result] = await db.insert(partnershipTypes).values({
        ...ptype,
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();
      partnershipTypeIds.push(result.id);
    }

    // Seed tabel mitra
    console.log('Mengisi data mitra...');
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
        partnershipStatus: faker.helpers.arrayElement(['active', 'inactive', 'expired', 'pending']),
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();
      partnerIds.push(result.id);
    }

    // Seed tabel kerja sama
    console.log('Mengisi data kerja sama...');
    for (let i = 0; i < 20; i++) {
      const randomPartnerId = partnerIds[Math.floor(Math.random() * partnerIds.length)];
      const randomTypeId = partnershipTypeIds[Math.floor(Math.random() * partnershipTypeIds.length)];

      const [partnership] = await db.insert(partnerships).values({
        title: `Kerjasama Strategis UTI dengan ${faker.company.name()}`,
        slug: faker.helpers.slugify(`kerjasama-${faker.company.name()}`).toLowerCase() + '-' + faker.string.alphanumeric(5),
        description: 'Kesepakatan bersama untuk meningkatkan kualitas pendidikan dan penyerapan lulusan di dunia kerja.',
        partnerId: randomPartnerId,
        partnershipTypeId: randomTypeId,
        startDate: faker.date.past({ years: 1 }),
        endDate: faker.date.future({ years: 2 }),
        isActive: faker.datatype.boolean(),
        agreementNumber: `MOU/${faker.number.int({ min: 1000, max: 9999 })}/UTI/${new Date().getFullYear()}`,
        agreementDate: faker.date.past({ years: 0.5 }),
        agreementFile: `/documents/mou-${faker.helpers.slugify(faker.company.name())}.pdf`,
        objectives: 'Meningkatkan kompetensi SDM melalui program magang dan pelatihan teknis.',
        activities: 'Pelaksanaan workshop rutin, penyusunan kurikulum bersama, dan pengabdian masyarakat.',
        benefits: 'Prioritas rekrutmen bagi lulusan UTI dan akses fasilitas laboratorium perusahaan bagi dosen.',
        funding: faker.number.float({ min: 10000000, max: 1000000000, multipleOf: 1000000 }).toString(),
        coordinator: faker.person.fullName(),
        partnerCoordinator: faker.person.fullName(),
        status: faker.helpers.arrayElement(['draft', 'proposed', 'approved', 'active', 'completed', 'terminated'] as const),
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();

      // Buat kegiatan kerja sama
      const numActivities = faker.number.int({ min: 1, max: 5 });
      for (let j = 0; j < numActivities; j++) {
        await db.insert(partnershipActivities).values({
          partnershipId: partnership.id,
          title: faker.helpers.arrayElement(['Seminar Karir', 'Kunjungan Industri', 'Sertifikasi Kompetensi', 'Kuliah Tamu Praktisi']),
          description: 'Kegiatan kolaboratif untuk memperpendek jarak antara dunia pendidikan dengan kebutuhan industri nyata.',
          startDate: faker.date.future({ years: 0.08 }),
          endDate: faker.date.future({ years: 0.5 }),
          status: faker.helpers.arrayElement(['planning', 'ongoing', 'completed', 'cancelled'] as const),
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }

      // Buat dokumen kerja sama
      const numDocuments = faker.number.int({ min: 1, max: 3 });
      for (let j = 0; j < numDocuments; j++) {
        await db.insert(partnershipDocuments).values({
          partnershipId: partnership.id,
          title: faker.lorem.words(3),
          documentType: faker.helpers.arrayElement(['proposal', 'report', 'certificate', 'other'] as const),
          fileName: `partnership_doc_${faker.string.alphanumeric(8)}.pdf`,
          filePath: `/documents/partnership_${partnership.id}_doc_${j + 1}.pdf`,
          fileSize: faker.number.int({ min: 100000, max: 5000000 }),
          mimeType: 'application/pdf',
          uploadedAt: new Date()
        });
      }
    }

    // Seed tabel profil universitas
    console.log('Mengisi profil universitas...');
    await db.insert(universityProfiles).values({
      name: 'Universitas Teknologi Indonesia',
      slug: 'universitas-teknologi-indonesia',
      shortName: 'UTI',
      description: 'Universitas Teknologi Indonesia adalah perguruan tinggi swasta yang berfokus pada pengembangan teknologi dan inovasi.',
      vision: 'Menjadi universitas teknologi terkemuka di Asia Tenggara yang berkontribusi dalam kemajuan ilmu pengetahuan dan teknologi.',
      mission: 'Menyelenggarakan pendidikan, penelitian, dan pengabdian kepada masyarakat di bidang teknologi yang unggul dan berdaya saing global.',
      values: 'Integritas, Inovasi, Kolaborasi, Kemandirian',
      history: 'Berdiri sejak tahun 1995 dengan fokus pada pengembangan teknologi informasi dan komunikasi. Kini berkembang menjadi universitas teknologi terkemuka.',
      logo: '/images/uti-logo.png',
      banner: '/images/uti-banner.jpg',
      establishedYear: 1995,
      motto: 'Technology for Better Future',
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
    await db.insert(universityAccreditations).values({
      name: 'Badan Akreditasi Nasional Perguruan Tinggi',
      accreditationNumber: '001/BAN-PT/Akred/S/XX/2024',
      accreditationLevel: 'A' as const,
      accreditationDate: new Date('2024-01-01'),
      accreditationExpired: new Date('2029-12-31'),
      documentFile: '/documents/akreditasi-universitas.pdf',
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Seed tabel informasi kontak
    console.log('Mengisi informasi kontak...');
    await db.insert(contactInformation).values({
      type: 'main_campus' as const,
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
    await db.insert(organizationalStructures).values({
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

    // Seed tabel pegawai & jabatan organisasi
    console.log('Mengisi pegawai dan jabatan organisasi...');
    const orgStructureResult = await db.select().from(organizationalStructures).limit(1);
    if (orgStructureResult.length > 0) {
      const structureId = orgStructureResult[0].id;

      const positionDetails = [
        { name: 'Rektor', level: 1, order: 1, description: 'Pimpinan tertinggi universitas' },
        { name: 'Wakil Rektor I', level: 2, order: 1, description: 'Bidang Akademik' },
        { name: 'Wakil Rektor II', level: 2, order: 2, description: 'Bidang Administrasi dan Keuangan' },
        { name: 'Wakil Rektor III', level: 2, order: 3, description: 'Bidang Kemahasiswaan dan Alumni' },
        { name: 'Wakil Rektor IV', level: 2, order: 4, description: 'Bidang Kerjasama dan Teknologi' },
        { name: 'Dekan Fakultas Teknik', level: 3, order: 1, description: 'Pimpinan Fakultas Teknik' },
        { name: 'Dekan Fakultas Ilmu Komputer', level: 3, order: 2, description: 'Pimpinan Fakultas Ilmu Komputer' },
        { name: 'Ketua Program Studi Teknik Informatika', level: 4, order: 1, description: 'Koordinator Prodi Teknik Informatika' }
      ];

      for (const pos of positionDetails) {
        await db.insert(organizationalEmployees).values({
          structureId,
          parentId: null,
          name: faker.person.fullName(),
          nip: `NIP${faker.number.int({ min: 100000, max: 999999 })}`,
          nidn: faker.helpers.arrayElement([`NIDN${faker.number.int({ min: 100000, max: 999999 })}`, null]),
          positionName: pos.name,
          positionLevel: pos.level,
          positionOrder: pos.order,
          period: `${new Date().getFullYear()}/${new Date().getFullYear() + 4}`,
          photo: faker.image.avatar(),
          description: pos.description,
          responsibilities: faker.lorem.sentence(),
          authority: faker.lorem.sentence(),
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    // Seed tabel testimoni
    console.log('Mengisi testimoni...');
    for (let i = 0; i < 6; i++) {
      await db.insert(testimonials).values({
        name: faker.person.fullName(),
        role: faker.helpers.arrayElement([
          'Alumni Teknik Informatika 2020',
          'Alumni Sistem Informasi 2021',
          'Alumni Manajemen 2019',
          'Mahasiswa Akhir Hukum',
          'Alumni Kedokteran 2022'
        ]),
        content: faker.lorem.sentences(2),
        image: faker.image.avatar(),
        rating: faker.number.int({ min: 4, max: 5 }),
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Seed Pesan Rektor
    console.log('Generating rector message...');
    await db.insert(rectorMessages).values({
      name: 'Prof. Dr. H. Ahmad Fauzi, M.Sc.',
      position: 'Rektor Universitas',
      message: 'Universitas kami berkomitmen untuk menciptakan lulusan yang tidak hanya cerdas secara akademik, tetapi juga memiliki integritas, kreativitas, dan jiwa kepemimpinan yang kuat untuk menghadapi tantangan global.',
      photo: '/images/rektor.png',
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Seed Statistik Beranda
    console.log('Generating homepage statistics...');
    await db.insert(homepageStatistics).values({
      establishedYear: '50+',
      totalStudents: '15.000+',
      accreditation: 'Unggul',
      totalLecturers: '500+',
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Seed Hero Section
    console.log('Generating hero section...');
    await db.insert(heroSections).values({
      title: 'Selamat Datang di Universitas Unggul',
      subtitle: 'Membangun generasi cerdas dan berintegritas melalui pendidikan kelas dunia dengan teknologi terkini.',
      buttonText: 'Mulai Menjelajah',
      buttonLink: '#',
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });


    // 34. Seed Makna Logo Universitas
    console.log('Seeding makna logo universitas...');
    const logoMeanings = [
      {
        element: "Bentuk Lingkaran",
        meaning: "Melambangkan keutuhan, kesatuan, dan kesinambungan dalam mencapai visi dan misi universitas.",
        order: 1
      },
      {
        element: "Warna Biru",
        meaning: "Mencerminkan kedalaman ilmu pengetahuan, kebijaksanaan, dan integritas.",
        order: 2
      },
      {
        element: "Bintang Bersudut Lima",
        meaning: "Melambangkan Pancasila sebagai dasar negara, serta semangat kebangsaan dan ketuhanan.",
        order: 3
      },
      {
        element: "Buku Terbuka",
        meaning: "Melambangkan sumber ilmu pengetahuan, keterbukaan, dan proses pembelajaran yang berkelanjutan.",
        order: 4
      },
      {
        element: "Padi dan Kapas",
        meaning: "Simbol kemakmuran, keadilan sosial, dan kesejahteraan yang menjadi tujuan pendidikan.",
        order: 5
      },
      {
        element: "Obor",
        meaning: "Melambangkan semangat pencerahan, bimbingan, dan harapan untuk masa depan yang lebih baik.",
        order: 6
      }
    ];

    for (const item of logoMeanings) {
      await db.insert(universityLogoMeanings).values({
        element: item.element,
        meaning: item.meaning,
        order: item.order,
        isPublished: true
      });
    }

    // Seed Penghargaan Universitas
    console.log('Seeding penghargaan universitas...');
    const awardsData = [
      {
        year: "2023",
        title: "Universitas dengan Inovasi Teknologi Terbaik",
        provider: "Kementerian Riset dan Teknologi",
        level: "Nasional",
        order: 1
      },
      {
        year: "2023",
        title: "Kampus Ramah Lingkungan (Green Campus)",
        provider: "Kementerian Lingkungan Hidup",
        level: "Nasional",
        order: 2
      },
      {
        year: "2022",
        title: "Peringkat 10 Besar Universitas Swasta Terbaik",
        provider: "Webometrics",
        level: "Nasional",
        order: 3
      },
      {
        year: "2024",
        title: "Pusat Unggulan Riset AI & Robotika",
        provider: "International Research Association",
        level: "Internasional",
        order: 0
      }
    ];

    for (const award of awardsData) {
      await db.insert(universityAwards).values({
        ...award,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Seed Aksesibilitas Kampus
    console.log('Seeding aksesibilitas kampus...');
    const accessData = [
      {
        name: "Transportasi Umum",
        icon: "Bus",
        description: "Mudah diakses dengan angkutan kota dan bus kota yang beroperasi 24 jam.",
        order: 1
      },
      {
        name: "Stasiun Terdekat",
        icon: "Train",
        description: "Stasiun Kota berjarak hanya 1 km dari kampus utama.",
        order: 2
      },
      {
        name: "Bandara Terdekat",
        icon: "Car",
        description: "Bandara Internasional berjarak 30 km dari kampus, dapat ditembus dalam 45 menit.",
        order: 3
      }
    ];

    for (const access of accessData) {
      await db.insert(campusAccessibilities).values({
        ...access,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Seed Media Sosial
    console.log('Seeding media sosial...');
    const socialData = [
      {
        platform: "Instagram",
        icon: "Instagram",
        url: "https://instagram.com/university",
        username: "@university",
        order: 1
      },
      {
        platform: "Facebook",
        icon: "Facebook",
        url: "https://facebook.com/university",
        username: "@universityofficial",
        order: 2
      },
      {
        platform: "Twitter",
        icon: "Twitter",
        url: "https://twitter.com/university",
        username: "@university_id",
        order: 3
      },
      {
        platform: "Youtube",
        icon: "Youtube",
        url: "https://youtube.com/university",
        username: "University Official",
        order: 4
      }
    ];

    for (const social of socialData) {
      await db.insert(socialMediaLinks).values({
        ...social,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    console.log('Seeding prospek karir...');
    const careerData = [
      { field: "Teknologi Informasi", minSalary: "8", maxSalary: "15", unit: "juta", order: 1 },
      { field: "Manajemen", minSalary: "6", maxSalary: "12", unit: "juta", order: 2 },
      { field: "Hukum", minSalary: "5", maxSalary: "10", unit: "juta", order: 3 },
      { field: "Akuntansi", minSalary: "5", maxSalary: "9", unit: "juta", order: 4 },
      { field: "Pendidikan", minSalary: "4", maxSalary: "8", unit: "juta", order: 5 },
      { field: "Riset", minSalary: "6", maxSalary: "12", unit: "juta", order: 6 }
    ];

    for (const career of careerData) {
      await db.insert(careerProspects).values({
        ...career,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    console.log('Seeding database komprehensif selesai!');
  } catch (error) {
    console.error('Terjadi kesalahan saat seeding komprehensif:', error);
    throw error;
  }
}

// Jalankan seeding jika file ini dijalankan langsung
if (require.main === module) {
  seedComprehensiveDatabase()
    .then(() => {
      console.log('Proses seeding komprehensif selesai.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Proses seeding komprehensif gagal:', error);
      process.exit(1);
    });
}

export { seedComprehensiveDatabase };