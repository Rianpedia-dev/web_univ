import { pgTable, text, timestamp, integer, boolean, uuid, decimal } from "drizzle-orm/pg-core";

// Tabel mitra kerja sama
export const partners = pgTable("partners", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(), // nama institusi/mitra
    slug: text("slug").notNull().unique(),
    description: text("description"),
    type: text("type", {
        enum: ['domestic', 'international']
    }).notNull(), // jenis mitra
    category: text("category", {
        enum: [
            'technology', 'business', 'health', 'education',
            'industry', 'government', 'other'
        ]
    }).notNull(), // kategori bidang
    country: text("country").default('Indonesia').notNull(), // negara asal mitra
    city: text("city"), // kota
    address: text("address"), // alamat lengkap
    contactPerson: text("contact_person"), // kontak person
    contactEmail: text("contact_email"), // email kontak
    contactPhone: text("contact_phone"), // telepon kontak
    website: text("website"), // website mitra
    logo: text("logo"), // URL logo mitra
    partnershipStatus: text("partnership_status", {
        enum: ['active', 'inactive', 'expired', 'pending']
    }).default('pending').notNull(),
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel jenis kerja sama
export const partnershipTypes = pgTable("partnership_types", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(), // nama jenis kerja sama
    slug: text("slug").notNull().unique(),
    description: text("description"),
    type: text("type", {
        enum: [
            'joint_research', 'student_exchange', 'faculty_exchange',
            'academic_collaboration', 'internship', 'employment',
            'technology_transfer', 'other'
        ]
    }).notNull(),
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel kerja sama
export const partnerships = pgTable("partnerships_table", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(), // judul kerja sama
    slug: text("slug").notNull().unique(),
    description: text("description"),
    partnerId: uuid("partner_id").notNull().references(() => partners.id, { onDelete: "cascade" }),
    partnershipTypeId: uuid("partnership_type_id").notNull().references(() => partnershipTypes.id, { onDelete: "cascade" }),
    startDate: timestamp("start_date").notNull(), // tanggal mulai
    endDate: timestamp("end_date"), // tanggal berakhir
    isActive: boolean("is_active").default(false).notNull(), // apakah masih aktif
    agreementNumber: text("agreement_number"), // nomor MOU/MOA
    agreementDate: timestamp("agreement_date"), // tanggal penandatanganan
    agreementFile: text("agreement_file"), // file MOU/MOA
    objectives: text("objectives"), // tujuan kerja sama
    activities: text("activities"), // kegiatan yang akan dilakukan
    benefits: text("benefits"), // manfaat bagi kedua belah pihak
    funding: decimal("funding", { precision: 15, scale: 2 }), // dana kerja sama (jika ada)
    coordinator: text("coordinator"), // koordinator dari universitas
    partnerCoordinator: text("partner_coordinator"), // koordinator dari mitra
    status: text("status", {
        enum: ['draft', 'proposed', 'approved', 'active', 'completed', 'terminated']
    }).default('draft').notNull(),
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel kegiatan kerja sama
export const partnershipActivities = pgTable("partnership_activities", {
    id: uuid("id").defaultRandom().primaryKey(),
    partnershipId: uuid("partnership_id").notNull().references(() => partnerships.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    startDate: timestamp("start_date"),
    endDate: timestamp("end_date"),
    status: text("status", {
        enum: ['planning', 'ongoing', 'completed', 'cancelled']
    }).default('planning').notNull(),
    budget: decimal("budget", { precision: 12, scale: 2 }), // anggaran kegiatan
    outcome: text("outcome"), // hasil kegiatan
    reportFile: text("report_file"), // file laporan
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel dokumen kerja sama
export const partnershipDocuments = pgTable("partnership_documents", {
    id: uuid("id").defaultRandom().primaryKey(),
    partnershipId: uuid("partnership_id").notNull().references(() => partnerships.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    documentType: text("document_type", {
        enum: ['agreement', 'report', 'certificate', 'proposal', 'other']
    }).notNull(),
    fileName: text("file_name").notNull(),
    filePath: text("file_path").notNull(),
    fileSize: integer("file_size"), // dalam bytes
    mimeType: text("mime_type"),
    uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
});


