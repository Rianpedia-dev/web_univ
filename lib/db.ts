import { db } from '@/db';
import {
  announcements,
  announcementCategories,
  news,
  newsCategories,
  events,
  eventCategories,
  faculties,
  studyPrograms,
  studentOrganizations,
  studentAchievements,
  campusStatistics,
  campusFacilities,
  academicCalendar,
  galleryAlbums,
  studentServices,
  educationCosts,
  scholarships,
  partnerships,
  partners,
  universityProfiles,
  admissionClasses,
  admissionPathways,
  organizationalStructures,
  organizationalEmployees,
  universityAccreditations,
  contactInformation,
  testimonials,
  rectorMessages,
  homepageStatistics,
  heroSections,
  universityLogoMeanings,
  universityAwards,
  user,
  campusAccessibilities,
  socialMediaLinks,
  careerProspects
} from '@/db/schema';
import { eq, and, or, sql } from 'drizzle-orm';

/**
 * Fungsi untuk mengambil pengumuman yang dipublikasikan dengan detail kategori
 */
export async function getPublishedAnnouncements(limit: number = 10) {
  try {
    const result = await db
      .select({
        id: announcements.id,
        title: announcements.title,
        slug: announcements.slug,
        content: announcements.content,
        excerpt: announcements.excerpt,
        featuredImage: announcements.featuredImage,
        priority: announcements.priority,
        isPublished: announcements.isPublished,
        publishedAt: announcements.publishedAt,
        expiresAt: announcements.expiresAt,
        authorName: announcements.authorName, // Updated from authorId
        categoryId: announcements.categoryId,
        categoryName: announcementCategories.name,
        categorySlug: announcementCategories.slug,
        createdAt: announcements.createdAt,
        updatedAt: announcements.updatedAt
      })
      .from(announcements)
      .leftJoin(announcementCategories, eq(announcements.categoryId, announcementCategories.id))
      .where(eq(announcements.isPublished, true))
      .orderBy(sql`${announcements.publishedAt} DESC`)
      .limit(limit);

    return result;
  } catch (error) {
    console.error('Error fetching published announcements:', error);
    throw new Error('Failed to fetch announcements');
  }
}

/**
 * Fungsi untuk mengambil beasiswa yang dipublikasikan
 */
export async function getPublishedScholarships() {
  try {
    const result = await db
      .select()
      .from(scholarships)
      .where(eq(scholarships.isPublished, true))
      .orderBy(sql`${scholarships.name} ASC`);

    return result;
  } catch (error) {
    console.error('Error fetching published scholarships:', error);
    throw new Error('Failed to fetch scholarships');
  }
}

/**
 * Fungsi untuk mengambil pengumuman berdasarkan kategori
 */
export async function getPublishedAnnouncementsByCategory(categorySlug: string, limit: number = 10) {
  try {
    const result = await db
      .select({
        announcement: announcements,
        category: announcementCategories
      })
      .from(announcements)
      .leftJoin(announcementCategories, eq(announcements.categoryId, announcementCategories.id))
      .where(
        and(
          eq(announcements.isPublished, true),
          eq(announcementCategories.slug, categorySlug)
        )
      )
      .orderBy(sql`${announcements.publishedAt} DESC`)
      .limit(limit);

    return result;
  } catch (error) {
    console.error('Error fetching published announcements by category:', error);
    throw new Error('Failed to fetch announcements by category');
  }
}

/**
 * Fungsi untuk mengambil berita yang dipublikasikan
 */
export async function getPublishedNews(limit: number = 10) {
  try {
    const result = await db
      .select()
      .from(news)
      .where(eq(news.isPublished, true))
      .orderBy(sql`${news.publishedAt} DESC`)
      .limit(limit);

    return result;
  } catch (error) {
    console.error('Error fetching published news:', error);
    throw new Error('Failed to fetch news');
  }
}

/**
 * Fungsi untuk mengambil berita berdasarkan kategori
 */
export async function getPublishedNewsByCategory(categorySlug: string, limit: number = 10) {
  try {
    const result = await db
      .select({
        news: news,
        category: newsCategories
      })
      .from(news)
      .leftJoin(newsCategories, eq(news.categoryId, newsCategories.id))
      .where(
        and(
          eq(news.isPublished, true),
          eq(newsCategories.slug, categorySlug)
        )
      )
      .orderBy(sql`${news.publishedAt} DESC`)
      .limit(limit);

    return result;
  } catch (error) {
    console.error('Error fetching published news by category:', error);
    throw new Error('Failed to fetch news by category');
  }
}

/**
 * Fungsi untuk mengambil events yang dipublikasikan
 */
export async function getPublishedEvents(limit: number = 10) {
  try {
    const result = await db
      .select()
      .from(events)
      .where(
        and(
          eq(events.isPublished, true),
          eq(events.status, 'upcoming')
        )
      )
      .orderBy(sql`${events.startDate} ASC`)
      .limit(limit);

    return result;
  } catch (error) {
    console.error('Error fetching published events:', error);
    throw new Error('Failed to fetch events');
  }
}

/**
 * Fungsi untuk mengambil events berdasarkan kategori
 */
export async function getPublishedEventsByCategory(categorySlug: string, limit: number = 10) {
  try {
    const result = await db
      .select({
        event: events,
        category: eventCategories
      })
      .from(events)
      .leftJoin(eventCategories, eq(events.categoryId, eventCategories.id))
      .where(
        and(
          eq(events.isPublished, true),
          eq(eventCategories.slug, categorySlug),
          eq(events.status, 'upcoming')
        )
      )
      .orderBy(sql`${events.startDate} ASC`)
      .limit(limit);

    return result;
  } catch (error) {
    console.error('Error fetching published events by category:', error);
    throw new Error('Failed to fetch events by category');
  }
}

/**
 * Fungsi untuk mengambil fakultas yang dipublikasikan
 */
export async function getPublishedFaculties() {
  try {
    const result = await db
      .select()
      .from(faculties)
      .where(eq(faculties.isPublished, true));

    return result;
  } catch (error) {
    console.error('Error fetching published faculties:', error);
    throw new Error('Failed to fetch faculties');
  }
}

/**
 * Fungsi untuk mengambil program studi yang dipublikasikan
 */
export async function getPublishedStudyPrograms() {
  try {
    const result = await db
      .select({
        id: studyPrograms.id,
        name: studyPrograms.name,
        slug: studyPrograms.slug,
        description: studyPrograms.description,
        level: studyPrograms.level,
        accreditation: studyPrograms.accreditation,
        headOfProgram: studyPrograms.headOfProgram,
        contactEmail: studyPrograms.contactEmail,
        contactPhone: studyPrograms.contactPhone,
        totalStudents: studyPrograms.totalStudents,
        logo: studyPrograms.logo,
        facultyId: studyPrograms.facultyId,
        facultyName: faculties.name,
        isPublished: studyPrograms.isPublished
      })
      .from(studyPrograms)
      .leftJoin(faculties, eq(studyPrograms.facultyId, faculties.id))
      .where(eq(studyPrograms.isPublished, true));

    return result;
  } catch (error) {
    console.error('Error fetching published study programs:', error);
    throw new Error('Failed to fetch study programs');
  }
}

/**
 * Fungsi untuk mengambil organisasi mahasiswa yang dipublikasikan
 */
export async function getPublishedStudentOrganizations() {
  try {
    const result = await db
      .select()
      .from(studentOrganizations)
      .where(eq(studentOrganizations.isPublished, true));

    return result;
  } catch (error) {
    console.error('Error fetching published student organizations:', error);
    throw new Error('Failed to fetch student organizations');
  }
}

/**
 * Fungsi untuk mengambil prestasi mahasiswa yang dipublikasikan
 */
export async function getPublishedStudentAchievements() {
  try {
    const result = await db
      .select({
        id: studentAchievements.id,
        studentId: studentAchievements.studentId,
        studentName: studentAchievements.studentName, // Updated from user.name
        studyProgramName: studyPrograms.name,
        title: studentAchievements.title,
        description: studentAchievements.description,
        achievementType: studentAchievements.achievementType,
        achievementLevel: studentAchievements.achievementLevel,
        achievementCategory: studentAchievements.achievementCategory,
        eventName: studentAchievements.eventName,
        eventDate: studentAchievements.eventDate,
        organizer: studentAchievements.organizer,
        certificateUrl: studentAchievements.certificateUrl,
        supportingDocuments: studentAchievements.supportingDocuments,
        isPublished: studentAchievements.isPublished,
        createdAt: studentAchievements.createdAt,
        updatedAt: studentAchievements.updatedAt
      })
      .from(studentAchievements)
      .leftJoin(studyPrograms, eq(studentAchievements.studyProgramId, studyPrograms.id))
      .where(eq(studentAchievements.isPublished, true))
      .orderBy(sql`${studentAchievements.eventDate} DESC`);

    return result;
  } catch (error) {
    console.error('Error fetching published student achievements:', error);
    throw new Error('Failed to fetch student achievements');
  }
}


/**
 * Fungsi untuk mengambil statistik kampus yang dipublikasikan
 * Mengembalikan data statistik diurutkan berdasarkan tahun terbaru
 */
export async function getCampusStatistics(limit: number = 5) {
  try {
    const result = await db
      .select()
      .from(campusStatistics)
      .where(eq(campusStatistics.isPublished, true))
      .orderBy(sql`${campusStatistics.year} DESC`)
      .limit(limit);

    return result;
  } catch (error) {
    console.error('Error fetching campus statistics:', error);
    throw new Error('Failed to fetch campus statistics');
  }
}

/**
 * Fungsi untuk mengambil statistik kampus berdasarkan tahun
 */
export async function getCampusStatisticsByYear(year: number) {
  try {
    const result = await db
      .select()
      .from(campusStatistics)
      .where(
        and(
          eq(campusStatistics.isPublished, true),
          eq(campusStatistics.year, year)
        )
      )
      .limit(1);

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Error fetching campus statistics by year:', error);
    throw new Error('Failed to fetch campus statistics by year');
  }
}

/**
 * Fungsi untuk mengambil berita terbaru dengan detail kategori
 */
export async function getLatestNewsWithCategory(limit: number = 5) {
  try {
    const result = await db
      .select({
        id: news.id,
        title: news.title,
        slug: news.slug,
        content: news.content,
        excerpt: news.excerpt,
        featuredImage: news.featuredImage,
        viewCount: news.viewCount,
        isPublished: news.isPublished,
        publishedAt: news.publishedAt,
        categoryId: news.categoryId,
        categoryName: newsCategories.name,
        categorySlug: newsCategories.slug,
        createdAt: news.createdAt,
        updatedAt: news.updatedAt
      })
      .from(news)
      .leftJoin(newsCategories, eq(news.categoryId, newsCategories.id))
      .where(eq(news.isPublished, true))
      .orderBy(sql`${news.publishedAt} DESC`)
      .limit(limit);

    return result;
  } catch (error) {
    console.error('Error fetching latest news with category:', error);
    throw new Error('Failed to fetch latest news with category');
  }
}

/**
 * Fungsi untuk mengambil events mendatang dengan detail kategori
 */
export async function getUpcomingEventsWithCategory(limit: number = 5) {
  try {
    const result = await db
      .select({
        id: events.id,
        title: events.title,
        slug: events.slug,
        description: events.description,
        content: events.content,
        poster: events.poster,
        banner: events.banner,
        startDate: events.startDate,
        endDate: events.endDate,
        startTime: events.startTime,
        endTime: events.endTime,
        location: events.location,
        venue: events.venue,
        organizer: events.organizer,
        maxParticipants: events.maxParticipants,
        registrationStart: events.registrationStart,
        registrationEnd: events.registrationEnd,
        registrationUrl: events.registrationUrl,
        registrationFee: events.registrationFee,
        speaker: events.speaker,
        status: events.status,
        isFeatured: events.isFeatured,
        isPublished: events.isPublished,
        categoryId: events.categoryId,
        categoryName: eventCategories.name,
        categorySlug: eventCategories.slug,
        createdAt: events.createdAt,
        updatedAt: events.updatedAt
      })
      .from(events)
      .leftJoin(eventCategories, eq(events.categoryId, eventCategories.id))
      .where(
        and(
          eq(events.isPublished, true),
          eq(events.status, 'upcoming')
        )
      )
      .orderBy(sql`${events.startDate} ASC`)
      .limit(limit);

    return result;
  } catch (error) {
    console.error('Error fetching upcoming events with category:', error);
    throw new Error('Failed to fetch upcoming events with category');
  }
}

/**
 * Fungsi untuk mengambil program studi berdasarkan fakultas
 */
export async function getStudyProgramsByFaculty(facultyId: string) {
  try {
    const result = await db
      .select()
      .from(studyPrograms)
      .where(
        and(
          eq(studyPrograms.isPublished, true),
          eq(studyPrograms.facultyId, facultyId)
        )
      )
      .orderBy(sql`${studyPrograms.name} ASC`);

    return result;
  } catch (error) {
    console.error('Error fetching study programs by faculty:', error);
    throw new Error('Failed to fetch study programs by faculty');
  }
}

/**
 * Fungsi untuk mengambil detail single news berdasarkan slug
 */
export async function getNewsBySlug(slug: string) {
  try {
    const result = await db
      .select({
        id: news.id,
        title: news.title,
        slug: news.slug,
        content: news.content,
        excerpt: news.excerpt,
        featuredImage: news.featuredImage,
        viewCount: news.viewCount,
        isPublished: news.isPublished,
        publishedAt: news.publishedAt,
        categoryId: news.categoryId,
        categoryName: newsCategories.name,
        categorySlug: newsCategories.slug,
        createdAt: news.createdAt,
        updatedAt: news.updatedAt
      })
      .from(news)
      .leftJoin(newsCategories, eq(news.categoryId, newsCategories.id))
      .where(
        and(
          eq(news.isPublished, true),
          eq(news.slug, slug)
        )
      )
      .limit(1);

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Error fetching news by slug:', error);
    throw new Error('Failed to fetch news by slug');
  }
}

/**
 * Fungsi untuk mengambil detail single event berdasarkan slug
 */
export async function getEventBySlug(slug: string) {
  try {
    const result = await db
      .select({
        id: events.id,
        title: events.title,
        slug: events.slug,
        description: events.description,
        content: events.content,
        poster: events.poster,
        banner: events.banner,
        startDate: events.startDate,
        endDate: events.endDate,
        startTime: events.startTime,
        endTime: events.endTime,
        location: events.location,
        venue: events.venue,
        address: events.address,
        mapUrl: events.mapUrl,
        maxParticipants: events.maxParticipants,
        registrationStart: events.registrationStart,
        registrationEnd: events.registrationEnd,
        registrationUrl: events.registrationUrl,
        registrationFee: events.registrationFee,
        organizer: events.organizer,
        speaker: events.speaker,
        targetAudience: events.targetAudience,
        status: events.status,
        isFeatured: events.isFeatured,
        isPublished: events.isPublished,
        categoryId: events.categoryId,
        categoryName: eventCategories.name,
        categorySlug: eventCategories.slug,
        createdAt: events.createdAt,
        updatedAt: events.updatedAt
      })
      .from(events)
      .leftJoin(eventCategories, eq(events.categoryId, eventCategories.id))
      .where(
        and(
          eq(events.isPublished, true),
          eq(events.slug, slug)
        )
      )
      .limit(1);

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Error fetching event by slug:', error);
    throw new Error('Failed to fetch event by slug');
  }
}

/**
 * Fungsi untuk mengambil fasilitas kampus yang dipublikasikan
 */
export async function getPublishedCampusFacilities() {
  try {
    const result = await db
      .select()
      .from(campusFacilities)
      .where(eq(campusFacilities.isPublished, true))
      .orderBy(sql`${campusFacilities.name} ASC`);

    return result;
  } catch (error) {
    console.error('Error fetching published campus facilities:', error);
    throw new Error('Failed to fetch campus facilities');
  }
}

/**
 * Fungsi untuk mengambil kalender akademik yang dipublikasikan
 */
export async function getPublishedAcademicCalendar() {
  try {
    const result = await db
      .select()
      .from(academicCalendar)
      .where(eq(academicCalendar.isPublished, true))
      .orderBy(sql`${academicCalendar.startDate} ASC`);

    return result;
  } catch (error) {
    console.error('Error fetching published academic calendar:', error);
    throw new Error('Failed to fetch academic calendar');
  }
}

/**
 * Fungsi untuk mengambil layanan mahasiswa yang dipublikasikan
 */
export async function getPublishedStudentServices() {
  try {
    const result = await db
      .select()
      .from(studentServices)
      .where(eq(studentServices.isPublished, true))
      .orderBy(sql`${studentServices.name} ASC`);

    return result;
  } catch (error) {
    console.error('Error fetching published student services:', error);
    throw new Error('Failed to fetch student services');
  }
}

/**
 * Fungsi untuk mengambil album galeri yang dipublikasikan (publik)
 */
export async function getPublishedGalleryAlbums(limit: number = 10) {
  try {
    const result = await db
      .select()
      .from(galleryAlbums)
      .where(eq(galleryAlbums.isPublic, true))
      .orderBy(sql`${galleryAlbums.createdAt} DESC`)
      .limit(limit);

    return result;
  } catch (error) {
    console.error('Error fetching published gallery albums:', error);
    throw new Error('Failed to fetch gallery albums');
  }
}

/**
 * Fungsi untuk mengambil biaya pendidikan yang dipublikasikan
 */
export async function getPublishedEducationCosts() {
  try {
    const result = await db
      .select({
        id: educationCosts.id,
        studyProgramId: educationCosts.studyProgramId,
        studyProgramName: studyPrograms.name,
        classId: educationCosts.classId,
        costType: sql<string>`CASE 
          WHEN ${educationCosts.costType} = 'tuition' THEN 'UKT (Uang Kuliah Tunggal)'
          WHEN ${educationCosts.costType} = 'registration' THEN 'Biaya Pendaftaran'
          ELSE 'Biaya Lainnya'
        END`.as('cost_type'),
        year: educationCosts.year,
        semester: educationCosts.semester,
        amount: educationCosts.amount,
        description: educationCosts.description,
        isPublished: educationCosts.isPublished,
        createdAt: educationCosts.createdAt,
        updatedAt: educationCosts.updatedAt
      })
      .from(educationCosts)
      .leftJoin(studyPrograms, eq(educationCosts.studyProgramId, studyPrograms.id))
      .where(eq(educationCosts.isPublished, true))
      .orderBy(sql`${educationCosts.year} DESC`);

    return result;
  } catch (error) {
    console.error('Error fetching published education costs:', error);
    throw new Error('Failed to fetch education costs');
  }
}


/**
 * Fungsi untuk mengambil kerjasama yang dipublikasikan
 */
export async function getPublishedPartnerships() {
  try {
    const result = await db
      .select({
        id: partnerships.id,
        title: partnerships.title,
        slug: partnerships.slug,
        description: partnerships.description,
        partnerId: partnerships.partnerId,
        partnerName: partners.name,
        partnerLogo: partners.logo,
        partnershipTypeId: partnerships.partnershipTypeId,
        startDate: partnerships.startDate,
        endDate: partnerships.endDate,
        isActive: partnerships.isActive,
        agreementNumber: partnerships.agreementNumber,
        agreementDate: partnerships.agreementDate,
        agreementFile: partnerships.agreementFile,
        objectives: partnerships.objectives,
        activities: partnerships.activities,
        benefits: partnerships.benefits,
        coordinator: partnerships.coordinator,
        status: partnerships.status,
        isPublished: partnerships.isPublished,
        createdAt: partnerships.createdAt,
        updatedAt: partnerships.updatedAt
      })
      .from(partnerships)
      .leftJoin(partners, eq(partnerships.partnerId, partners.id))
      .where(eq(partnerships.isPublished, true))
      .orderBy(sql`${partnerships.startDate} DESC`);

    return result;
  } catch (error) {
    console.error('Error fetching published partnerships:', error);
    throw new Error('Failed to fetch partnerships');
  }
}

/**
 * Fungsi untuk mengambil profil universitas yang dipublikasikan
 */
export async function getPublishedUniversityProfile() {
  try {
    const result = await db
      .select()
      .from(universityProfiles)
      .where(eq(universityProfiles.isPublished, true))
      .limit(1);

    return result;
  } catch (error) {
    console.error('Error fetching published university profile:', error);
    throw new Error('Failed to fetch university profile');
  }
}

/**
 * Fungsi untuk mengambil kelas pendaftaran yang dipublikasikan
 */
export async function getPublishedAdmissionClasses() {
  try {
    const result = await db
      .select()
      .from(admissionClasses)
      .where(eq(admissionClasses.isPublished, true))
      .orderBy(sql`${admissionClasses.name} ASC`);

    return result;
  } catch (error) {
    console.error('Error fetching published admission classes:', error);
    throw new Error('Failed to fetch admission classes');
  }
}

/**
 * Fungsi untuk mengambil jalur pendaftaran yang dipublikasikan
 */
export async function getPublishedAdmissionPathways() {
  try {
    const result = await db
      .select()
      .from(admissionPathways)
      .where(eq(admissionPathways.isPublished, true))
      .orderBy(sql`${admissionPathways.registrationStart} ASC`);

    return result;
  } catch (error) {
    console.error('Error fetching published admission pathways:', error);
    throw new Error('Failed to fetch admission pathways');
  }
}



/**
 * Fungsi untuk mengambil struktur organisasi yang sedang berlaku
 */
export async function getCurrentOrganizationalStructure() {
  try {
    const result = await db
      .select()
      .from(organizationalStructures)
      .where(
        and(
          eq(organizationalStructures.isPublished, true),
          eq(organizationalStructures.isCurrent, true)
        )
      )
      .limit(1);

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Error fetching current organizational structure:', error);
    throw new Error('Failed to fetch current organizational structure');
  }
}

/**
 * Fungsi untuk mengambil pegawai berdasarkan struktur organisasi
 */
export async function getOrganizationalEmployeesByStructure(structureId: string) {
  try {
    const result = await db
      .select()
      .from(organizationalEmployees)
      .where(
        and(
          eq(organizationalEmployees.structureId, structureId),
          eq(organizationalEmployees.isPublished, true)
        )
      )
      .orderBy(sql`${organizationalEmployees.positionLevel} ASC`, sql`${organizationalEmployees.positionOrder} ASC`);

    return result;
  } catch (error) {
    console.error('Error fetching organizational employees:', error);
    throw new Error('Failed to fetch organizational employees');
  }
}

/**
 * Fungsi untuk mengambil akreditasi universitas yang dipublikasikan
 */
export async function getPublishedUniversityAccreditations() {
  try {
    const result = await db
      .select()
      .from(universityAccreditations)
      .where(eq(universityAccreditations.isPublished, true))
      .orderBy(sql`${universityAccreditations.accreditationDate} DESC`);

    return result;
  } catch (error) {
    console.error('Error fetching published university accreditations:', error);
    throw new Error('Failed to fetch university accreditations');
  }
}

/**
 * Fungsi untuk mengambil informasi kontak yang dipublikasikan
 */
export async function getPublishedContactInformation() {
  try {
    const result = await db
      .select()
      .from(contactInformation)
      .where(eq(contactInformation.isPublished, true))
      .orderBy(sql`${contactInformation.type} ASC`);

    return result;
  } catch (error) {
    console.error('Error fetching published contact information:', error);
    throw new Error('Failed to fetch contact information');
  }
}

/**
 * Fungsi untuk mengambil testimoni yang dipublikasikan
 */
export async function getPublishedTestimonials(limit: number = 6) {
  try {
    return await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.isPublished, true))
      .limit(limit);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}
/**
 * Fungsi untuk mengambil mitra yang dipublikasikan
 */
export async function getPublishedPartners(limit: number = 8) {
  try {
    return await db
      .select({
        id: partners.id,
        name: partners.name,
        logo: partners.logo,
      })
      .from(partners)
      .where(eq(partners.isPublished, true))
      .limit(limit);
  } catch (error) {
    console.error('Error fetching partners:', error);
    return [];
  }
}

/**
 * Fungsi untuk mengambil pesan rektor yang dipublikasikan (terbaru)
 */
export async function getPublishedRectorMessage() {
  try {
    const result = await db
      .select()
      .from(rectorMessages)
      .where(eq(rectorMessages.isPublished, true))
      .orderBy(sql`${rectorMessages.createdAt} DESC`)
      .limit(1);

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Error fetching rector message:', error);
    return null;
  }
}

/**
 * Fungsi untuk mengambil statistik halaman beranda
 */
export async function getHomepageStatistics() {
  try {
    const result = await db
      .select()
      .from(homepageStatistics)
      .where(eq(homepageStatistics.isPublished, true))
      .orderBy(sql`${homepageStatistics.updatedAt} DESC`)
      .limit(1);

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Error fetching homepage statistics:', error);
    return null;
  }
}

/**
 * Fungsi untuk mengambil data hero section halaman beranda
 */
export async function getHeroSection() {
  try {
    const result = await db
      .select()
      .from(heroSections)
      .where(eq(heroSections.isPublished, true))
      .orderBy(sql`${heroSections.updatedAt} DESC`)
      .limit(1);

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Error fetching hero section:', error);
    return null;
  }
}

/**
 * Fungsi untuk mengambil statistik kampus yang dipublikasikan (terbaru)
 */
export async function getPublishedCampusStatistics() {
  try {
    const result = await db
      .select()
      .from(campusStatistics)
      .where(eq(campusStatistics.isPublished, true))
      .orderBy(sql`${campusStatistics.year} DESC, ${campusStatistics.updatedAt} DESC`)
      .limit(1);

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error('Error fetching campus statistics:', error);
    return null;
  }
}


/**
 * Fungsi untuk mengambil makna logo universitas yang dipublikasikan
 */
export async function getPublishedLogoMeanings() {
  try {
    const result = await db
      .select()
      .from(universityLogoMeanings)
      .where(eq(universityLogoMeanings.isPublished, true))
      .orderBy(sql`${universityLogoMeanings.order} ASC`);

    return result;
  } catch (error) {
    console.error('Error fetching university logo meanings:', error);
    return [];
  }
}
/**
 * Fungsi untuk mengambil semua penghargaan universitas yang dipublikasikan
 */
export async function getPublishedUniversityAwards() {
  try {
    const result = await db
      .select()
      .from(universityAwards)
      .where(eq(universityAwards.isPublished, true))
      .orderBy(sql`${universityAwards.year} DESC, ${universityAwards.order} ASC`);

    return result;
  } catch (error) {
    console.error('Error fetching university awards:', error);
    return [];
  }
}

/**
 * Fungsi untuk mengambil semua aksesibilitas kampus yang dipublikasikan
 */
export async function getPublishedCampusAccessibilities() {
  try {
    const result = await db
      .select()
      .from(campusAccessibilities)
      .where(eq(campusAccessibilities.isPublished, true))
      .orderBy(sql`${campusAccessibilities.order} ASC`);

    return result;
  } catch (error) {
    console.error('Error fetching campus accessibilities:', error);
    return [];
  }
}

/**
 * Fungsi untuk mengambil semua tautan media sosial yang dipublikasikan
 */
export async function getPublishedSocialMediaLinks() {
  try {
    const result = await db
      .select()
      .from(socialMediaLinks)
      .where(eq(socialMediaLinks.isPublished, true))
      .orderBy(sql`${socialMediaLinks.order} ASC`);

    return result;
  } catch (error) {
    console.error('Error fetching social media links:', error);
    return [];
  }
}

/**
 * Fungsi untuk mengambil semua prospek karir yang dipublikasikan
 */
export async function getPublishedCareerProspects() {
  try {
    const result = await db
      .select()
      .from(careerProspects)
      .where(eq(careerProspects.isPublished, true))
      .orderBy(sql`${careerProspects.order} ASC`);

    return result;
  } catch (error) {
    console.error('Error fetching career prospects:', error);
    return [];
  }
}
