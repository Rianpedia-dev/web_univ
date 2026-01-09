CREATE TABLE "admission_brochures" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"file_url" text NOT NULL,
	"is_published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "admission_faqs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "admission_requirements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" text DEFAULT 'murni' NOT NULL,
	"content" text NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "admission_staff" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"position" text NOT NULL,
	"image" text,
	"whatsapp" text,
	"email" text,
	"order" integer DEFAULT 0 NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "admission_timelines" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event" text NOT NULL,
	"status_label" text NOT NULL,
	"icon_name" text DEFAULT 'Clock',
	"order" integer DEFAULT 0 NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_analytics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"metric_name" text NOT NULL,
	"metric_value" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "site_analytics_metric_name_unique" UNIQUE("metric_name")
);
--> statement-breakpoint
CREATE TABLE "journals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"image_url" text,
	"title" text NOT NULL,
	"authors" text,
	"journal_name" text,
	"journal_abbr" text,
	"year" text,
	"volume" text,
	"number" text,
	"keywords" text,
	"link" text,
	"pdf_url" text,
	"is_published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "admission_documents" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "admission_registrations" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "admission_documents" CASCADE;--> statement-breakpoint
DROP TABLE "admission_registrations" CASCADE;--> statement-breakpoint
ALTER TABLE "academic_calendar" ALTER COLUMN "event_type" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "university_profiles" ADD COLUMN "objectives" text;--> statement-breakpoint
ALTER TABLE "admission_pathways" DROP COLUMN "requirements";--> statement-breakpoint
ALTER TABLE "admission_pathways" DROP COLUMN "registration_start";--> statement-breakpoint
ALTER TABLE "admission_pathways" DROP COLUMN "registration_end";--> statement-breakpoint
ALTER TABLE "admission_pathways" DROP COLUMN "test_date";--> statement-breakpoint
ALTER TABLE "admission_pathways" DROP COLUMN "announcement_date";--> statement-breakpoint
ALTER TABLE "admission_pathways" DROP COLUMN "registration_fee";--> statement-breakpoint
ALTER TABLE "organizational_employees" DROP COLUMN "nip";--> statement-breakpoint
ALTER TABLE "organizational_employees" DROP COLUMN "period";--> statement-breakpoint
ALTER TABLE "organizational_employees" DROP COLUMN "responsibilities";--> statement-breakpoint
ALTER TABLE "organizational_employees" DROP COLUMN "authority";