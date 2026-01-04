import { pgTable, text, timestamp, integer, boolean, uuid, decimal } from "drizzle-orm/pg-core";
import { studyPrograms } from "./academic";

// Tabel jalur masuk (pendaftaran PMB)
export const admissionPathways = pgTable("admission_pathways", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(), // nama jalur masuk
    slug: text("slug").notNull().unique(),
    description: text("description"),
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

// Tabel Tim PMB
export const admissionStaff = pgTable("admission_staff", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    position: text("position").notNull(),
    image: text("image"),
    whatsapp: text("whatsapp"),
    email: text("email"),
    order: integer("order").default(0).notNull(),
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

// Tabel syarat umum pendaftaran
export const admissionRequirements = pgTable("admission_requirements", {
    id: uuid("id").defaultRandom().primaryKey(),
    type: text("type", { enum: ['murni', 'transisi'] }).default('murni').notNull(), // Jenis: mahasiswa murni atau transisi (pindahan)
    content: text("content").notNull(),
    order: integer("order").default(0).notNull(),
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel FAQ pendaftaran
export const admissionFaqs = pgTable("admission_faqs", {
    id: uuid("id").defaultRandom().primaryKey(),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    order: integer("order").default(0).notNull(),
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel timeline pendaftaran
export const admissionTimelines = pgTable("admission_timelines", {
    id: uuid("id").defaultRandom().primaryKey(),
    event: text("event").notNull(),
    statusLabel: text("status_label").notNull(),
    iconName: text("icon_name").default('Clock'),
    order: integer("order").default(0).notNull(),
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


