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
    contactName: text("contact_name"), // nama kontak person
    contactEmail: text("contact_email"), // email kontak person
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel kontak layanan mahasiswa
export const studentServiceContacts = pgTable("student_service_contacts", {
    id: uuid("id").defaultRandom().primaryKey(),
    type: text("type", {
        enum: ['phone', 'email', 'location']
    }).notNull(),
    icon: text("icon").notNull(), // nama ikon Lucide (misal: "Phone", "Mail", "MapPin")
    title: text("title").notNull(), // Judul (misal: "Telepon", "Email", "Lokasi")
    value: text("value").notNull(), // Nilai utama (misal: nomor telepon, alamat email)
    description: text("description"), // Keterangan tambahan (misal: jam operasional)
    order: integer("order").default(0).notNull(),
    isPublished: boolean("is_published").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel UKM/organisasi
export const studentOrganizations = pgTable("student_organizations", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").unique(),
    description: text("description"),
    objectives: text("objectives"), // tujuan organisasi
    leader: text("leader"), // ketua organisasi
    memberCount: text("member_count"), // jumlah anggota
    contactEmail: text("contact_email"), // email kontak
    contactPhone: text("contact_phone"), // whatsapp/telepon kontak
    registrationLink: text("registration_link"), // link pendaftaran/bergabung
    isRegistrationOpen: boolean("is_registration_open").default(true).notNull(), // status buka/tutup pendaftaran
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
        enum: ['non_academic', 'competition', 'community_service', 'other']
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
    image: text("image"), // URL foto mahasiswa/prestasi
    supportingDocuments: text("supporting_documents"), // dokumen pendukung lainnya
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});