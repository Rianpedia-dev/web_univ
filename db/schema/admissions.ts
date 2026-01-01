import { pgTable, text, timestamp, integer, boolean, uuid, decimal } from "drizzle-orm/pg-core";
import { studyPrograms } from "./academic";

// Tabel jalur masuk (pendaftaran PMB)
export const admissionPathways = pgTable("admission_pathways", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(), // nama jalur masuk
    slug: text("slug").notNull().unique(),
    description: text("description"),
    requirements: text("requirements"), // persyaratan
    registrationStart: timestamp("registration_start").notNull(),
    registrationEnd: timestamp("registration_end").notNull(),
    testDate: timestamp("test_date"), // tanggal tes
    announcementDate: timestamp("announcement_date"), // tanggal pengumuman
    registrationFee: decimal("registration_fee", { precision: 10, scale: 2 }).default('0'),
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel kelas (reguler, karyawan, dll)
export const admissionClasses = pgTable("admission_classes", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(), // nama kelas
    slug: text("slug").notNull().unique(),
    description: text("description"),
    type: text("type", { enum: ['reguler', 'executive', 'online', 'part_time', 'full_time'] }).notNull(),
    schedule: text("schedule"), // jadwal kelas
    requirements: text("requirements"), // persyaratan khusus
    quota: integer("quota"), // kuota kelas
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel biaya pendidikan
export const educationCosts = pgTable("education_costs", {
    id: uuid("id").defaultRandom().primaryKey(),
    studyProgramId: uuid("study_program_id").references(() => studyPrograms.id, { onDelete: "set null" }),
    classId: uuid("class_id").references(() => admissionClasses.id, { onDelete: "set null" }),
    pathwayId: uuid("pathway_id").references(() => admissionPathways.id, { onDelete: "set null" }),
    costType: text("cost_type", { enum: ['registration', 'tuition', 'other'] }).notNull(),
    year: text("year").notNull(), // tahun akademik
    semester: text("semester", { enum: ['Ganjil', 'Genap'] }), // semester (opsional)
    amount: decimal("amount", { precision: 12, scale: 2 }).notNull(), // jumlah biaya
    description: text("description"), // deskripsi biaya
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel beasiswa
export const scholarships = pgTable("scholarships", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    eligibility: text("eligibility"), // kriteria penerima
    benefits: text("benefits"), // manfaat beasiswa
    requirements: text("requirements"), // persyaratan
    applicationStart: timestamp("application_start").notNull(),
    applicationEnd: timestamp("application_end").notNull(),
    announcementDate: timestamp("announcement_date"), // tanggal pengumuman
    quota: integer("quota"), // kuota beasiswa
    amount: decimal("amount", { precision: 12, scale: 2 }), // jumlah bantuan (jika tetap)
    coverage: text("coverage", { enum: ['full', 'partial', 'specific'] }), // cakupan beasiswa
    provider: text("provider"), // penyedia beasiswa
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});



// Tabel gelombang pendaftaran
export const admissionWaves = pgTable("admission_waves", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(), // nama gelombang (e.g. Gelombang 1, Gelombang 2)
    startDate: timestamp("start_date").notNull(), // tanggal mulai
    endDate: timestamp("end_date").notNull(), // tanggal berakhir
    notes: text("notes"), // catatan khusus (e.g. "Termasuk seleksi beasiswa")
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


