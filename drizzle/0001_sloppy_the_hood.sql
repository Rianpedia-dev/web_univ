CREATE TABLE "career_prospects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"field" text NOT NULL,
	"min_salary" text NOT NULL,
	"max_salary" text NOT NULL,
	"unit" text DEFAULT 'juta' NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "campus_accessibilities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"icon" text NOT NULL,
	"description" text NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"is_published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hero_sections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text DEFAULT 'Selamat Datang di Universitas' NOT NULL,
	"subtitle" text DEFAULT 'Membangun generasi unggul dan berdaya saing global melalui pendidikan berkualitas tinggi' NOT NULL,
	"video_url" text,
	"image_url" text,
	"button_text" text,
	"button_link" text,
	"is_published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "homepage_statistics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"established_year" text DEFAULT '50+' NOT NULL,
	"total_students" text DEFAULT '15.000+' NOT NULL,
	"accreditation" text DEFAULT 'Unggul' NOT NULL,
	"total_lecturers" text DEFAULT '500+' NOT NULL,
	"is_published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rector_messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"position" text NOT NULL,
	"message" text NOT NULL,
	"photo" text,
	"is_published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "social_media_links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"platform" text NOT NULL,
	"icon" text NOT NULL,
	"url" text NOT NULL,
	"username" text,
	"order" integer DEFAULT 0 NOT NULL,
	"is_published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"role" text NOT NULL,
	"content" text NOT NULL,
	"image" text,
	"rating" integer DEFAULT 5 NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "university_awards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"year" text NOT NULL,
	"title" text NOT NULL,
	"provider" text NOT NULL,
	"level" text NOT NULL,
	"icon" text,
	"order" integer DEFAULT 0 NOT NULL,
	"is_published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "university_logo_meanings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"element" text NOT NULL,
	"meaning" text NOT NULL,
	"image" text,
	"order" integer DEFAULT 0 NOT NULL,
	"is_published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "faculty_study_programs" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "lecturers" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "admission_pathway_study_programs" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "counseling_appointments" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "counseling_schedules" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "organization_activities" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "organization_leaderships" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "organization_registrations" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "joint_publications" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "partnership_activities" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "partnership_requests" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "partnership_types" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "partnerships_table" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "organizational_positions" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "study_program_accreditations" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "university_achievements" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "faculty_study_programs" CASCADE;--> statement-breakpoint
DROP TABLE "lecturers" CASCADE;--> statement-breakpoint
DROP TABLE "admission_pathway_study_programs" CASCADE;--> statement-breakpoint
DROP TABLE "counseling_appointments" CASCADE;--> statement-breakpoint
DROP TABLE "counseling_schedules" CASCADE;--> statement-breakpoint
DROP TABLE "organization_activities" CASCADE;--> statement-breakpoint
DROP TABLE "organization_leaderships" CASCADE;--> statement-breakpoint
DROP TABLE "organization_registrations" CASCADE;--> statement-breakpoint
DROP TABLE "joint_publications" CASCADE;--> statement-breakpoint
DROP TABLE "partnership_activities" CASCADE;--> statement-breakpoint
DROP TABLE "partnership_requests" CASCADE;--> statement-breakpoint
DROP TABLE "partnership_types" CASCADE;--> statement-breakpoint
DROP TABLE "partnerships_table" CASCADE;--> statement-breakpoint
DROP TABLE "organizational_positions" CASCADE;--> statement-breakpoint
DROP TABLE "study_program_accreditations" CASCADE;--> statement-breakpoint
DROP TABLE "university_achievements" CASCADE;--> statement-breakpoint
ALTER TABLE "study_programs" DROP CONSTRAINT "study_programs_code_unique";--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "account_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "session_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "partnership_documents" DROP CONSTRAINT "partnership_documents_partnership_id_partnerships_table_id_fk";
--> statement-breakpoint
ALTER TABLE "organizational_employees" DROP CONSTRAINT "organizational_employees_position_id_organizational_positions_id_fk";
--> statement-breakpoint
ALTER TABLE "partners" ALTER COLUMN "partnership_status" SET DEFAULT 'active';--> statement-breakpoint
ALTER TABLE "faculties" ADD COLUMN "accreditation" text;--> statement-breakpoint
ALTER TABLE "study_programs" ADD COLUMN "contact_email" text;--> statement-breakpoint
ALTER TABLE "study_programs" ADD COLUMN "contact_phone" text;--> statement-breakpoint
ALTER TABLE "study_programs" ADD COLUMN "total_students" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "partners" ADD COLUMN "agreement_number" text;--> statement-breakpoint
ALTER TABLE "partners" ADD COLUMN "agreement_file" text;--> statement-breakpoint
ALTER TABLE "partners" ADD COLUMN "start_date" timestamp;--> statement-breakpoint
ALTER TABLE "partners" ADD COLUMN "end_date" timestamp;--> statement-breakpoint
ALTER TABLE "partners" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "partners" ADD COLUMN "objectives" text;--> statement-breakpoint
ALTER TABLE "partners" ADD COLUMN "coordinator" text;--> statement-breakpoint
ALTER TABLE "partnership_documents" ADD COLUMN "partner_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "campus_statistics" ADD COLUMN "accreditation" text;--> statement-breakpoint
ALTER TABLE "organizational_employees" ADD COLUMN "structure_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "organizational_employees" ADD COLUMN "parent_id" uuid;--> statement-breakpoint
ALTER TABLE "organizational_employees" ADD COLUMN "position_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "organizational_employees" ADD COLUMN "position_level" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "organizational_employees" ADD COLUMN "position_order" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "organizational_employees" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "organizational_employees" ADD COLUMN "responsibilities" text;--> statement-breakpoint
ALTER TABLE "organizational_employees" ADD COLUMN "authority" text;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "partnership_documents" ADD CONSTRAINT "partnership_documents_partner_id_partners_id_fk" FOREIGN KEY ("partner_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organizational_employees" ADD CONSTRAINT "organizational_employees_structure_id_organizational_structures_id_fk" FOREIGN KEY ("structure_id") REFERENCES "public"."organizational_structures"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organizational_employees" ADD CONSTRAINT "organizational_employees_parent_id_organizational_employees_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."organizational_employees"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "study_programs" DROP COLUMN "code";--> statement-breakpoint
ALTER TABLE "study_programs" DROP COLUMN "duration";--> statement-breakpoint
ALTER TABLE "study_programs" DROP COLUMN "degree_title";--> statement-breakpoint
ALTER TABLE "study_programs" DROP COLUMN "accreditation_date";--> statement-breakpoint
ALTER TABLE "study_programs" DROP COLUMN "accreditation_expired";--> statement-breakpoint
ALTER TABLE "study_programs" DROP COLUMN "vision";--> statement-breakpoint
ALTER TABLE "study_programs" DROP COLUMN "mission";--> statement-breakpoint
ALTER TABLE "study_programs" DROP COLUMN "objectives";--> statement-breakpoint
ALTER TABLE "study_programs" DROP COLUMN "curriculum_url";--> statement-breakpoint
ALTER TABLE "partnership_documents" DROP COLUMN "partnership_id";--> statement-breakpoint
ALTER TABLE "campus_statistics" DROP COLUMN "total_lecturers";--> statement-breakpoint
ALTER TABLE "organizational_employees" DROP COLUMN "position_id";--> statement-breakpoint
ALTER TABLE "organizational_employees" DROP COLUMN "position";--> statement-breakpoint
ALTER TABLE "organizational_employees" DROP COLUMN "start_date";--> statement-breakpoint
ALTER TABLE "organizational_employees" DROP COLUMN "end_date";