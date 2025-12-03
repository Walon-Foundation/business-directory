CREATE TYPE "public"."source" AS ENUM('web', 'whatsapp');--> statement-breakpoint
CREATE TABLE "complaints" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"business_id" uuid NOT NULL,
	"username" varchar(100),
	"type" varchar(50) NOT NULL,
	"description" text,
	"evidence_url" text,
	"user_phone" varchar(20),
	"source" "source" DEFAULT 'web',
	"status" varchar(20) DEFAULT 'pending',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "complaint_business_idx" ON "complaints" USING btree ("business_id");--> statement-breakpoint
CREATE INDEX "complaint_created_idx" ON "complaints" USING btree ("created_at" DESC NULLS LAST);