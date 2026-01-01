CREATE TABLE "admission_waves" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"notes" text,
	"is_published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "student_service_contacts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" text NOT NULL,
	"icon" text NOT NULL,
	"title" text NOT NULL,
	"value" text NOT NULL,
	"description" text,
	"order" integer DEFAULT 0 NOT NULL,
	"is_published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "announcement_attachments" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "announcement_categories" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "announcements" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "event_documents" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "event_registrants" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "gallery_album_media_rel" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "gallery_albums" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "news_comments" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "news_tags" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "news_tags_rel" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "counselors" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "student_service_documents" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "student_service_requests" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "announcement_attachments" CASCADE;--> statement-breakpoint
DROP TABLE "announcement_categories" CASCADE;--> statement-breakpoint
DROP TABLE "announcements" CASCADE;--> statement-breakpoint
DROP TABLE "event_documents" CASCADE;--> statement-breakpoint
DROP TABLE "event_registrants" CASCADE;--> statement-breakpoint
DROP TABLE "gallery_album_media_rel" CASCADE;--> statement-breakpoint
DROP TABLE "gallery_albums" CASCADE;--> statement-breakpoint
DROP TABLE "news_comments" CASCADE;--> statement-breakpoint
DROP TABLE "news_tags" CASCADE;--> statement-breakpoint
DROP TABLE "news_tags_rel" CASCADE;--> statement-breakpoint
DROP TABLE "counselors" CASCADE;--> statement-breakpoint
DROP TABLE "student_service_documents" CASCADE;--> statement-breakpoint
DROP TABLE "student_service_requests" CASCADE;--> statement-breakpoint
ALTER TABLE "gallery_media" DROP CONSTRAINT "gallery_media_album_id_gallery_albums_id_fk";
--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "slug" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "registration_fee" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "registration_fee" SET DEFAULT '0';--> statement-breakpoint
ALTER TABLE "student_organizations" ALTER COLUMN "slug" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "gallery_media" ADD COLUMN "category_id" uuid;--> statement-breakpoint
ALTER TABLE "student_achievements" ADD COLUMN "image" text;--> statement-breakpoint
ALTER TABLE "student_organizations" ADD COLUMN "objectives" text;--> statement-breakpoint
ALTER TABLE "student_organizations" ADD COLUMN "leader" text;--> statement-breakpoint
ALTER TABLE "student_organizations" ADD COLUMN "member_count" text;--> statement-breakpoint
ALTER TABLE "student_organizations" ADD COLUMN "contact_email" text;--> statement-breakpoint
ALTER TABLE "student_organizations" ADD COLUMN "contact_phone" text;--> statement-breakpoint
ALTER TABLE "student_organizations" ADD COLUMN "registration_link" text;--> statement-breakpoint
ALTER TABLE "student_organizations" ADD COLUMN "is_registration_open" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "student_services" ADD COLUMN "contact_name" text;--> statement-breakpoint
ALTER TABLE "student_services" ADD COLUMN "contact_email" text;--> statement-breakpoint
ALTER TABLE "gallery_media" ADD CONSTRAINT "gallery_media_category_id_gallery_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."gallery_categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gallery_media" DROP COLUMN "file_name";--> statement-breakpoint
ALTER TABLE "gallery_media" DROP COLUMN "mime_type";--> statement-breakpoint
ALTER TABLE "gallery_media" DROP COLUMN "author_name";--> statement-breakpoint
ALTER TABLE "gallery_media" DROP COLUMN "album_id";--> statement-breakpoint
ALTER TABLE "student_achievements" DROP COLUMN "certificate_url";--> statement-breakpoint
ALTER TABLE "student_organizations" DROP COLUMN "type";--> statement-breakpoint
ALTER TABLE "student_organizations" DROP COLUMN "category";--> statement-breakpoint
ALTER TABLE "student_organizations" DROP COLUMN "vision";--> statement-breakpoint
ALTER TABLE "student_organizations" DROP COLUMN "mission";--> statement-breakpoint
ALTER TABLE "university_profiles" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "university_profiles" DROP COLUMN "banner";