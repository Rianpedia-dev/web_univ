import { pgTable, text, timestamp, integer, boolean, uuid, json, AnyPgColumn } from "drizzle-orm/pg-core";
import { studyPrograms } from "./academic";


// Tabel profil universitas
export const universityProfiles = pgTable("university_profiles", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(), // nama universitas
    slug: text("slug").notNull().unique(),
    shortName: text("short_name"), // nama singkat
    vision: text("vision"), // visi universitas
    mission: text("mission"), // misi universitas
    objectives: text("objectives"), // tujuan universitas
    values: text("values"), // nilai-nilai universitas
    history: text("history"), // sejarah universitas
    logo: text("logo"), // URL logo universitas
    establishedYear: integer("established_year"), // tahun berdiri
    motto: text("motto"), // moto universitas
    colors: json("colors"), // warna resmi universitas (dalam format JSON)
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel statistik kampus
export const campusStatistics = pgTable("campus_statistics", {
    id: uuid("id").defaultRandom().primaryKey(),
    year: integer("year").notNull(), // tahun data
    totalStudents: integer("total_students"), // jumlah mahasiswa
    totalUndergraduate: integer("total_undergraduate"), // jumlah mahasiswa sarjana
    totalGraduate: integer("total_graduate"), // jumlah mahasiswa pascasarjana

    totalEmployees: integer("total_employees"), // jumlah pegawai
    totalStudyPrograms: integer("total_study_programs"), // jumlah program studi
    totalFaculties: integer("total_faculties"), // jumlah fakultas
    totalFacilities: integer("total_facilities"), // jumlah fasilitas
    internationalPartners: integer("international_partners"), // jumlah mitra internasional
    researchProjects: integer("research_projects"), // jumlah penelitian
    patents: integer("patents"), // jumlah paten
    accreditation: text("accreditation"), // akreditasi kampus
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel akreditasi universitas
export const universityAccreditations = pgTable("university_accreditations", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(), // nama institusi yang mengakreditasi
    accreditationNumber: text("accreditation_number"), // nomor sertifikat akreditasi
    accreditationLevel: text("accreditation_level", {
        enum: ['A', 'B', 'C', 'Unggul', 'Baik', 'Baik Sekali']
    }).notNull(), // tingkat akreditasi
    accreditationDate: timestamp("accreditation_date"), // tanggal akreditasi
    accreditationExpired: timestamp("accreditation_expired"), // tanggal kadaluarsa
    documentFile: text("document_file"), // file sertifikat
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});



// Tabel informasi kontak
export const contactInformation = pgTable("contact_information", {
    id: uuid("id").defaultRandom().primaryKey(),
    type: text("type", {
        enum: ['main_campus', 'branch_campus', 'administrative_office', 'other']
    }).notNull(), // jenis kantor
    name: text("name"), // nama kampus/kantor
    address: text("address").notNull(), // alamat lengkap
    city: text("city").notNull(), // kota
    province: text("province").notNull(), // provinsi
    postalCode: text("postal_code"), // kode pos
    country: text("country").default('Indonesia').notNull(), // negara
    phone: text("phone"), // nomor telepon
    fax: text("fax"), // nomor fax
    email: text("email"), // email kantor
    website: text("website"), // website kantor
    operatingHours: text("operating_hours"), // jam operasional
    mapUrl: text("map_url"), // URL Google Maps
    latitude: text("latitude"), // koordinat lintang
    longitude: text("longitude"), // koordinat bujur
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel struktur organisasi
export const organizationalStructures = pgTable("organizational_structures", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(), // judul struktur (misalnya: "Struktur Organisasi 2023")
    slug: text("slug").notNull().unique(),
    description: text("description"), // deskripsi struktur
    structureFile: text("structure_file"), // file struktur organisasi (PDF, PNG, dll)
    effectiveDate: timestamp("effective_date"), // tanggal berlaku struktur
    isCurrent: boolean("is_current").default(false).notNull(), // apakah struktur saat ini
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel pegawai & jabatan dalam struktur organisasi (Combined for simplicity)
export const organizationalEmployees = pgTable("organizational_employees", {
    id: uuid("id").defaultRandom().primaryKey(),
    structureId: uuid("structure_id").notNull().references(() => organizationalStructures.id, { onDelete: "cascade" }),
    parentId: uuid("parent_id").references((): AnyPgColumn => organizationalEmployees.id, { onDelete: "set null" }), // jabatan atasan
    name: text("name").notNull(), // nama pegawai

    nidn: text("nidn"), // nomor induk dosen nasional (jika dosen)
    positionName: text("position_name").notNull(), // nama jabatan (misal: Rektor)
    positionLevel: integer("position_level").notNull(), // tingkat jabatan
    positionOrder: integer("position_order").default(0).notNull(), // urutan jabatan

    photo: text("photo"), // URL foto pegawai
    description: text("description"), // deskripsi jabatan

    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel testimoni alumni/mahasiswa
export const testimonials = pgTable("testimonials", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    role: text("role").notNull(), // misal: Alumni Teknik Informatika 2020
    content: text("content").notNull(),
    image: text("image"), // URL foto
    rating: integer("rating").default(5).notNull(),
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel hero section halaman beranda
export const heroSections = pgTable("hero_sections", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull().default("Selamat Datang di Universitas"),
    subtitle: text("subtitle").notNull().default("Membangun generasi unggul dan berdaya saing global melalui pendidikan berkualitas tinggi"),
    videoUrl: text("video_url"),
    imageUrl: text("image_url"),
    buttonText: text("button_text"),
    buttonLink: text("button_link"),
    isPublished: boolean("is_published").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel statistik khusus halaman beranda
export const homepageStatistics = pgTable("homepage_statistics", {
    id: uuid("id").defaultRandom().primaryKey(),
    establishedYear: text("established_year").notNull().default("50+"),
    totalStudents: text("total_students").notNull().default("15.000+"),
    accreditation: text("accreditation").notNull().default("Unggul"),
    totalLecturers: text("total_lecturers").notNull().default("500+"),
    isPublished: boolean("is_published").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel pesan rektor/sambutan
export const rectorMessages = pgTable("rector_messages", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    position: text("position").notNull(), // misal: Rektor Universitas
    message: text("message").notNull(),
    photo: text("photo"), // URL foto
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


// Tabel makna logo universitas
export const universityLogoMeanings = pgTable("university_logo_meanings", {
    id: uuid("id").defaultRandom().primaryKey(),
    element: text("element").notNull(), // elemen logo (misal: "Bentuk Lingkaran")
    meaning: text("meaning").notNull(), // makna elemen tersebut
    image: text("image"), // URL gambar/ikon untuk elemen ini
    order: integer("order").default(0).notNull(), // urutan tampilan
    isPublished: boolean("is_published").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
// Tabel penghargaan dan rekognisi universitas
export const universityAwards = pgTable("university_awards", {
    id: uuid("id").defaultRandom().primaryKey(),
    year: text("year").notNull(), // tahun penghargaan (misal: "2023")
    title: text("title").notNull(), // nama penghargaan
    provider: text("provider").notNull(), // lembaga pemberi penghargaan
    level: text("level").notNull(), // tingkat (Nasional/Internasional)
    icon: text("icon"), // nama ikon Lucide (opsional)
    order: integer("order").default(0).notNull(), // urutan tampilan
    isPublished: boolean("is_published").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel aksesibilitas kampus
export const campusAccessibilities = pgTable("campus_accessibilities", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(), // misal: "Transportasi Umum"
    icon: text("icon").notNull(), // nama ikon Lucide (misal: "Bus")
    description: text("description").notNull(),
    order: integer("order").default(0).notNull(),
    isPublished: boolean("is_published").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel media sosial universitas
export const socialMediaLinks = pgTable("social_media_links", {
    id: uuid("id").defaultRandom().primaryKey(),
    platform: text("platform").notNull(), // misal: "Instagram"
    icon: text("icon").notNull(), // nama ikon Lucide (misal: "Instagram")
    url: text("url").notNull(),
    username: text("username"), // misal: "@university"
    order: integer("order").default(0).notNull(),
    isPublished: boolean("is_published").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
