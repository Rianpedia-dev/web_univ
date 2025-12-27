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

// Tabel pendaftaran mahasiswa baru
export const admissionRegistrations = pgTable("admission_registrations", {
    id: uuid("id").defaultRandom().primaryKey(),
    registrationNumber: text("registration_number").notNull().unique(), // nomor pendaftaran
    firstName: text("first_name").notNull(),
    lastName: text("last_name"),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    dateOfBirth: timestamp("date_of_birth").notNull(),
    placeOfBirth: text("place_of_birth").notNull(),
    gender: text("gender", { enum: ['male', 'female'] }),
    nationality: text("nationality").default('Indonesian').notNull(),
    address: text("address"),
    city: text("city"),
    province: text("province"),
    postalCode: text("postal_code"),
    highSchool: text("high_school"), // nama sekolah
    highSchoolMajor: text("high_school_major"), // jurusan SMA
    graduationYear: text("graduation_year"), // tahun lulus
    studyProgramId: uuid("study_program_id").references(() => studyPrograms.id, { onDelete: "set null" }),
    classId: uuid("class_id").references(() => admissionClasses.id, { onDelete: "set null" }),
    pathwayId: uuid("pathway_id").references(() => admissionPathways.id, { onDelete: "set null" }),
    status: text("status", {
        enum: ['registered', 'paid', 'document_submitted', 'verified', 'accepted', 'rejected', 'enrolled']
    }).default('registered').notNull(),
    registrationDate: timestamp("registration_date").defaultNow().notNull(),
    paymentDate: timestamp("payment_date"), // tanggal pembayaran
    verificationDate: timestamp("verification_date"), // tanggal verifikasi
    acceptanceDate: timestamp("acceptance_date"), // tanggal diterima
    documentStatus: text("document_status", {
        enum: ['pending', 'submitted', 'verified', 'rejected']
    }).default('pending').notNull(),
    documentNotes: text("document_notes"), // catatan verifikasi dokumen
    notes: text("notes"), // catatan tambahan
    isVerified: boolean("is_verified").default(false).notNull(),
    isAccepted: boolean("is_accepted").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel dokumen pendaftaran
export const admissionDocuments = pgTable("admission_documents", {
    id: uuid("id").defaultRandom().primaryKey(),
    registrationId: uuid("registration_id").notNull().references(() => admissionRegistrations.id, { onDelete: "cascade" }),
    documentType: text("document_type", {
        enum: [
            'identity_card', 'birth_certificate', 'high_school_diploma',
            'high_school_transcript', 'photo', 'payment_proof', 'other'
        ]
    }).notNull(),
    fileName: text("file_name").notNull(),
    filePath: text("file_path").notNull(),
    fileSize: integer("file_size"), // dalam bytes
    mimeType: text("mime_type"),
    isVerified: boolean("is_verified").default(false).notNull(),
    verifiedAt: timestamp("verified_at"),
    notes: text("notes"), // catatan verifikasi
    uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
});
