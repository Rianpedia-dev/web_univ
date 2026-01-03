import { pgTable, text, timestamp, integer, boolean, uuid, decimal } from "drizzle-orm/pg-core";

// Tabel fakultas
export const faculties = pgTable("faculties", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    dean: text("dean"), // nama dekan
    viceDean: text("vice_dean"), // nama wakil dekan
    contactEmail: text("contact_email"),
    contactPhone: text("contact_phone"),
    address: text("address"),
    accreditation: text("accreditation", { enum: ['A', 'B', 'C', 'Unggul', 'Baik'] }), // status akreditasi fakultas
    logo: text("logo"), // URL logo fakultas
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const studyPrograms = pgTable("study_programs", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    level: text("level", { enum: ['D3', 'S1', 'S2', 'S3'] }).notNull(), // jenjang pendidikan
    accreditation: text("accreditation", { enum: ['A', 'B', 'C', 'Unggul', 'Baik'] }), // status akreditasi
    facultyId: uuid("faculty_id").references(() => faculties.id, { onDelete: "set null" }),
    headOfProgram: text("head_of_program"), // ketua program studi
    contactEmail: text("contact_email"), // email prodi
    contactPhone: text("contact_phone"), // nomor telepon/whatsapp prodi
    logo: text("logo"), // URL logo prodi
    totalStudents: integer("total_students").default(0).notNull(), // jumlah mahasiswa aktif
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});



// Tabel kalender akademik
export const academicCalendar = pgTable("academic_calendar", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date").notNull(),
    eventType: text("event_type", {
        enum: [
            'registration', 'orientation', 'classes_start', 'midterm',
            'finalterm', 'holiday', 'break', 'thesis_deadline',
            'graduation', 'other'
        ]
    }),
    academicYear: text("academic_year").notNull(), // misalnya: 2023/2024
    semester: text("semester", { enum: ['Ganjil', 'Genap'] }).notNull(),
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel fasilitas kampus
export const campusFacilities = pgTable("campus_facilities", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    type: text("type", {
        enum: [
            'laboratory', 'library', 'classroom', 'sports',
            'dormitory', 'health', 'other'
        ]
    }).notNull(),
    location: text("location"), // lokasi fasilitas
    capacity: integer("capacity"), // kapasitas
    facilities: text("facilities"), // fasilitas pendukung
    operatingHours: text("operating_hours"), // jam operasional
    contactPerson: text("contact_person"),
    contactPhone: text("contact_phone"),
    image: text("image"), // URL gambar fasilitas
    isAvailable: boolean("is_available").default(true).notNull(),
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel prospek karir
export const careerProspects = pgTable("career_prospects", {
    id: uuid("id").defaultRandom().primaryKey(),
    field: text("field").notNull(), // Bidang pekerjaan
    minSalary: text("min_salary").notNull(), // Gaji minimal (teks agar fleksibel)
    maxSalary: text("max_salary").notNull(), // Gaji maksimal
    unit: text("unit").default("juta").notNull(), // Satuan gaji
    order: integer("order").default(0).notNull(), // Urutan tampilan
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
