import { pgTable, text, timestamp, integer, uuid } from "drizzle-orm/pg-core";

// Tabel percakapan chatbot
export const chatConversations = pgTable("chat_conversations", {
    id: uuid("id").defaultRandom().primaryKey(),
    sessionId: text("session_id").notNull(), // untuk melacak sesi browser
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Tabel pesan chatbot
export const chatMessages = pgTable("chat_messages", {
    id: uuid("id").defaultRandom().primaryKey(),
    conversationId: uuid("conversation_id").references(() => chatConversations.id, { onDelete: "cascade" }),
    role: text("role", { enum: ['user', 'assistant'] }).notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Tabel pertanyaan umum (untuk analisis dan pelatihan model)
export const chatFrequentQuestions = pgTable("chat_frequent_questions", {
    id: uuid("id").defaultRandom().primaryKey(),
    question: text("question").notNull(),
    category: text("category"), // kategori pertanyaan (pmb, akademik, dll)
    count: integer("count").default(1).notNull(), // jumlah kali ditanyakan
    lastAskedAt: timestamp("last_asked_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Tabel feedback pengguna
export const chatFeedback = pgTable("chat_feedback", {
    id: uuid("id").defaultRandom().primaryKey(),
    sessionId: text("session_id"), // session browser untuk tracking
    messageId: text("message_id"), // ID pesan dari AI SDK (bukan foreign key)
    userQuestion: text("user_question"), // pertanyaan user yang di-feedback
    rating: integer("rating"), // 1 = thumbs down, 2 = thumbs up
    comment: text("comment"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
