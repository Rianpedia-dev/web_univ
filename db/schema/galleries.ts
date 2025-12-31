import { pgTable, text, timestamp, integer, boolean, uuid } from "drizzle-orm/pg-core";

// Tabel kategori galeri
export const galleryCategories = pgTable("gallery_categories", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel media galeri (gambar dan video)
export const galleryMedia = pgTable("gallery_media", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    filePath: text("file_path").notNull(),
    fileSize: integer("file_size"), // dalam bytes
    mediaType: text("media_type", { enum: ['image', 'video'] }).notNull(),
    thumbnailPath: text("thumbnail_path"), // path thumbnail untuk video
    duration: integer("duration"), // durasi dalam detik untuk video
    width: integer("width"), // lebar untuk gambar
    height: integer("height"), // tinggi untuk gambar
    isPublic: boolean("is_public").default(true).notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),
    categoryId: uuid("category_id").references(() => galleryCategories.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});