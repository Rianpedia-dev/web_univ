import { pgTable, text, timestamp, integer, boolean, uuid, decimal } from "drizzle-orm/pg-core";

// Tabel kategori event
export const eventCategories = pgTable("event_categories", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel events
export const events = pgTable("events", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").unique(),
    description: text("description").notNull(),
    content: text("content"),
    poster: text("poster"), // URL gambar poster event
    banner: text("banner"), // URL gambar banner event
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date"),
    startTime: text("start_time"), // format: "HH:MM"
    endTime: text("end_time"), // format: "HH:MM"
    location: text("location").notNull(),
    venue: text("venue"), // nama tempat spesifik di dalam lokasi
    address: text("address"), // alamat lengkap
    mapUrl: text("map_url"), // URL Google Maps
    maxParticipants: integer("max_participants"),
    registrationStart: timestamp("registration_start"),
    registrationEnd: timestamp("registration_end"),
    registrationUrl: text("registration_url"), // URL eksternal untuk pendaftaran
    registrationFee: text("registration_fee").default('0'),
    organizer: text("organizer").notNull(),
    speaker: text("speaker"), // narasumber/pembicara
    targetAudience: text("target_audience"), // sasaran peserta
    status: text("status", { enum: ['upcoming', 'ongoing', 'completed', 'cancelled'] }).default('upcoming').notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),
    isPublished: boolean("is_published").default(false).notNull(),
    publishedAt: timestamp("published_at"),
    authorName: text("author_name"), // Nama penulis event
    categoryId: uuid("category_id").references(() => eventCategories.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
