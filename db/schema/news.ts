import { pgTable, text, timestamp, integer, boolean, json, uuid } from "drizzle-orm/pg-core";

// Tabel kategori berita
export const newsCategories = pgTable("news_categories", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel berita
export const news = pgTable("news", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    content: text("content").notNull(),
    excerpt: text("excerpt"),
    featuredImage: text("featured_image"),
    viewCount: integer("view_count").default(0).notNull(),
    isPublished: boolean("is_published").default(false).notNull(),
    publishedAt: timestamp("published_at"),
    authorName: text("author_name"), // Nama penulis berita
    categoryId: uuid("category_id").references(() => newsCategories.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel komentar berita
export const newsComments = pgTable("news_comments", {
    id: uuid("id").defaultRandom().primaryKey(),
    newsId: uuid("news_id").notNull().references(() => news.id, { onDelete: "cascade" }),
    authorName: text("author_name").notNull(),
    content: text("content").notNull(),
    isApproved: boolean("is_approved").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabel tag berita
export const newsTags = pgTable("news_tags", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Tabel relasi berita-tag
export const newsTagsRel = pgTable("news_tags_rel", {
    id: uuid("id").defaultRandom().primaryKey(),
    newsId: uuid("news_id").notNull().references(() => news.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id").notNull().references(() => newsTags.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});