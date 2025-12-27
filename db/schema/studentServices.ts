import { pgTable, text, timestamp, integer, boolean, uuid, decimal } from "drizzle-orm/pg-core";
import { studyPrograms } from "./academic";

// Tabel layanan mahasiswa
export const studentServices = pgTable("student_services", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(), // nama layanan
    slug: text("slug").notNull().unique(),
    description: text("description"),
    type: text("type", {
        enum: ['administrative', 'counseling', 'career', 'digital', 'satisfaction']
    }).notNull(),
    requirements: text("requirements"), // persyaratan layanan
    procedure: text("procedure"), // prosedur pengajuan
    processingTime: text("processing_time"), // waktu penyelesaian
    fee: decimal("fee", { precision: 10, scale: 2 }).default('0'), // biaya layanan (jika ada)
    isOnline: boolean("is_online").default(false).notNull(), // apakah layanan online
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel pengajuan layanan mahasiswa
export const studentServiceRequests = pgTable("student_service_requests", {
    id: uuid("id").defaultRandom().primaryKey(),
    serviceId: uuid("service_id").notNull().references(() => studentServices.id, { onDelete: "cascade" }),
    studentName: text("student_name").notNull(), // Nama pemohon
    studentEmail: text("student_email").notNull(), // Email pemohon
    studentId: text("student_id"), // NIM mahasiswa
    requestDate: timestamp("request_date").defaultNow().notNull(),
    status: text("status", {
        enum: ['pending', 'in_progress', 'completed', 'rejected', 'cancelled']
    }).default('pending').notNull(),
    priority: integer("priority").default(0).notNull(), // 0: normal, 1: high, 2: urgent
    notes: text("notes"), // catatan tambahan
    completedAt: timestamp("completed_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel dokumen layanan mahasiswa
export const studentServiceDocuments = pgTable("student_service_documents", {
    id: uuid("id").defaultRandom().primaryKey(),
    requestId: uuid("request_id").notNull().references(() => studentServiceRequests.id, { onDelete: "cascade" }),
    documentType: text("document_type").notNull(), // jenis dokumen
    fileName: text("file_name").notNull(),
    filePath: text("file_path").notNull(),
    fileSize: integer("file_size"), // dalam bytes
    mimeType: text("mime_type"),
    uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
});

// Tabel konselor
export const counselors = pgTable("counselors", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    nip: text("nip"), // nomor induk pegawai
    email: text("email").notNull().unique(),
    phone: text("phone"),
    specialization: text("specialization"), // spesialisasi konseling
    qualifications: text("qualifications"), // kualifikasi
    photo: text("photo"), // URL foto konselor
    isAvailable: boolean("is_available").default(true).notNull(),
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});



// Tabel UKM/organisasi
export const studentOrganizations = pgTable("student_organizations", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    type: text("type", {
        enum: ['academic', 'non_academic', 'religious', 'journalism', 'language', 'entrepreneurship']
    }).notNull(),
    category: text("category", {
        enum: ['bem', 'dpm', 'hmj', 'uko', 'uksb', 'other']
    }).notNull(),
    vision: text("vision"), // visi organisasi
    mission: text("mission"), // misi organisasi
    logo: text("logo"), // URL logo organisasi
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});



// Tabel prestasi mahasiswa
export const studentAchievements = pgTable("student_achievements", {
    id: uuid("id").defaultRandom().primaryKey(),
    studentName: text("student_name").notNull(),
    studentId: text("student_id").notNull(), // NIM mahasiswa
    studyProgramId: uuid("study_program_id").references(() => studyPrograms.id, { onDelete: "set null" }),
    title: text("title").notNull(), // judul prestasi
    description: text("description"),
    achievementType: text("achievement_type", {
        enum: ['academic', 'non_academic', 'competition', 'research', 'community_service', 'other']
    }).notNull(),
    achievementLevel: text("achievement_level", {
        enum: ['local', 'regional', 'national', 'international']
    }).notNull(),
    achievementCategory: text("achievement_category", {
        enum: ['first', 'second', 'third', 'champion', 'participation', 'other']
    }).notNull(),
    eventName: text("event_name").notNull(), // nama kegiatan/lomba
    eventDate: timestamp("event_date").notNull(),
    organizer: text("organizer").notNull(), // penyelenggara
    certificateUrl: text("certificate_url"), // URL sertifikat
    supportingDocuments: text("supporting_documents"), // dokumen pendukung lainnya
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});