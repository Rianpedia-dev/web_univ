import { pgTable, text, timestamp, integer, boolean, uuid, decimal } from "drizzle-orm/pg-core";

// Tabel mitra kerja sama (Sekarang mencakup data kerjasama utama)
export const partners = pgTable("partners", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(), // nama institusi/mitra
    slug: text("slug").notNull().unique(),
    description: text("description"),
    type: text("type", {
        enum: ['domestic', 'international']
    }).notNull(), // jenis mitra (Luar Negeri / Dalam Negeri)
    category: text("category", {
        enum: [
            'technology', 'business', 'health', 'education',
            'industry', 'government', 'other'
        ]
    }).notNull(), // kategori bidang
    country: text("country").default('Indonesia').notNull(),
    city: text("city"),
    address: text("address"),
    contactPerson: text("contact_person"),
    contactEmail: text("contact_email"),
    contactPhone: text("contact_phone"),
    website: text("website"),
    logo: text("logo"), // URL logo mitra

    // Data Kerjasama (Dipindahkan dari partnership_table)
    agreementNumber: text("agreement_number"),
    agreementFile: text("agreement_file"),
    startDate: timestamp("start_date"),
    endDate: timestamp("end_date"),
    isActive: boolean("is_active").default(true).notNull(),
    objectives: text("objectives"),
    coordinator: text("coordinator"),

    partnershipStatus: text("partnership_status", {
        enum: ['active', 'inactive', 'expired', 'pending']
    }).default('active').notNull(),

    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel dokumen kerja sama
export const partnershipDocuments = pgTable("partnership_documents", {
    id: uuid("id").defaultRandom().primaryKey(),
    partnerId: uuid("partner_id").notNull().references(() => partners.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    documentType: text("document_type", {
        enum: ['agreement', 'report', 'certificate', 'proposal', 'other']
    }).notNull(),
    fileName: text("file_name").notNull(),
    filePath: text("file_path").notNull(),
    fileSize: integer("file_size"),
    mimeType: text("mime_type"),
    uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
});
