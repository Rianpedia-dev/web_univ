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

// Tabel album galeri
export const galleryAlbums = pgTable("gallery_albums", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    coverImage: text("cover_image"), // URL gambar sampul album
    isPublic: boolean("is_public").default(true).notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),
    authorName: text("author_name"), // Nama penulis album
    categoryId: uuid("category_id").references(() => galleryCategories.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel media galeri (gambar dan video)
export const galleryMedia = pgTable("gallery_media", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    fileName: text("file_name").notNull(),
    filePath: text("file_path").notNull(),
    fileSize: integer("file_size"), // dalam bytes
    mimeType: text("mime_type").notNull(), // misalnya: image/jpeg, video/mp4
    mediaType: text("media_type", { enum: ['image', 'video'] }).notNull(),
    thumbnailPath: text("thumbnail_path"), // path thumbnail untuk video
    duration: integer("duration"), // durasi dalam detik untuk video
    width: integer("width"), // lebar untuk gambar
    height: integer("height"), // tinggi untuk gambar
    isPublic: boolean("is_public").default(true).notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),
    authorName: text("author_name"), // Nama pengunggah media
    albumId: uuid("album_id").references(() => galleryAlbums.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel relasi media galeri dengan album (many-to-many)
export const galleryAlbumMediaRel = pgTable("gallery_album_media_rel", {
    id: uuid("id").defaultRandom().primaryKey(),
    albumId: uuid("album_id").notNull().references(() => galleryAlbums.id, { onDelete: "cascade" }),
    mediaId: uuid("media_id").notNull().references(() => galleryMedia.id, { onDelete: "cascade" }),
    sortOrder: integer("sort_order").default(0).notNull(), // urutan media dalam album
    createdAt: timestamp("created_at").defaultNow().notNull(),
});