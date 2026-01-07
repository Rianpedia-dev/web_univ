import { pgTable, text, timestamp, boolean, uuid } from "drizzle-orm/pg-core";

// Tabel publikasi jurnal
export const journals = pgTable("journals", {
    id: uuid("id").defaultRandom().primaryKey(),
    imageUrl: text("image_url"),
    title: text("title").notNull(),
    authors: text("authors"),
    journalName: text("journal_name"),
    journalAbbr: text("journal_abbr"),
    year: text("year"),
    volume: text("volume"),
    number: text("number"),
    keywords: text("keywords"), // Disimpan sebagai string koma-terpisah atau teks bebas
    link: text("link"),
    pdfUrl: text("pdf_url"),
    isPublished: boolean("is_published").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
