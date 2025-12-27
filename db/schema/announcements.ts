import { pgTable, text, timestamp, integer, boolean, uuid } from "drizzle-orm/pg-core";

// Tabel kategori pengumuman
export const announcementCategories = pgTable("announcement_categories", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel pengumuman
export const announcements = pgTable("announcements", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    content: text("content").notNull(),
    excerpt: text("excerpt"),
    featuredImage: text("featured_image"),
    priority: integer("priority").default(0).notNull(), // 0: normal, 1: penting, 2: urgent
    isPublished: boolean("is_published").default(false).notNull(),
    publishedAt: timestamp("published_at"),
    expiresAt: timestamp("expires_at"),
    authorName: text("author_name"), // Nama penulis pengumuman
    categoryId: uuid("category_id").references(() => announcementCategories.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel lampiran pengumuman
export const announcementAttachments = pgTable("announcement_attachments", {
    id: uuid("id").defaultRandom().primaryKey(),
    announcementId: uuid("announcement_id").notNull().references(() => announcements.id, { onDelete: "cascade" }),
    fileName: text("file_name").notNull(),
    filePath: text("file_path").notNull(),
    fileSize: integer("file_size"), // dalam bytes
    mimeType: text("mime_type"),
    downloadCount: integer("download_count").default(0).notNull(),
    uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
});