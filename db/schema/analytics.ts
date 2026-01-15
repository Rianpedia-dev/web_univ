import { pgTable, text, integer, timestamp, uuid, uniqueIndex } from "drizzle-orm/pg-core";

export const siteAnalytics = pgTable("site_analytics", {
    id: uuid("id").primaryKey().defaultRandom(),
    metricName: text("metric_name").notNull().unique(), // e.g., 'total_visitors'
    metricValue: integer("metric_value").notNull().default(0),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const visitorStats = pgTable("visitor_stats", {
    id: uuid("id").primaryKey().defaultRandom(),
    month: integer("month").notNull(), // 1-12
    year: integer("year").notNull(),
    count: integer("count").notNull().default(0),
    updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ({
    monthYearIdx: uniqueIndex("month_year_idx").on(table.month, table.year),
}));
