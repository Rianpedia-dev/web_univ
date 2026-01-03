import { pgTable, text, integer, timestamp, uuid } from "drizzle-orm/pg-core";

export const siteAnalytics = pgTable("site_analytics", {
    id: uuid("id").primaryKey().defaultRandom(),
    metricName: text("metric_name").notNull().unique(), // e.g., 'total_visitors'
    metricValue: integer("metric_value").notNull().default(0),
    updatedAt: timestamp("updated_at").defaultNow(),
});
