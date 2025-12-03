CREATE TYPE "public"."business_status" AS ENUM('active', 'pending', 'suspended', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."business_type" AS ENUM('private_limited', 'public_limited', 'sole_proprietorship', 'partnership', 'government_agency', 'ngo', 'cooperative', 'foreign_branch', 'other');--> statement-breakpoint
CREATE TYPE "public"."industry" AS ENUM('technology', 'banking_finance', 'agriculture', 'mining', 'healthcare', 'telecommunications', 'logistics_shipping', 'fisheries', 'construction', 'manufacturing', 'retail', 'tourism_hospitality', 'education', 'energy_utilities', 'real_estate', 'transportation', 'media_entertainment', 'professional_services', 'other');--> statement-breakpoint
CREATE TYPE "public"."ownership_type" AS ENUM('local', 'foreign', 'joint_venture', 'government', 'mixed');--> statement-breakpoint
CREATE TYPE "public"."verification_level" AS ENUM('verified', 'pending', 'unverified');--> statement-breakpoint
CREATE TABLE "business" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"registration_number" varchar(50) NOT NULL,
	"tax_id" varchar(50),
	"name" varchar(255) NOT NULL,
	"trading_name" varchar(255),
	"description" text,
	"status" "business_status" DEFAULT 'active' NOT NULL,
	"verification_level" "verification_level" DEFAULT 'pending' NOT NULL,
	"industry" "industry" NOT NULL,
	"business_type" "business_type" NOT NULL,
	"ownership" "ownership_type" NOT NULL,
	"location" varchar(100) NOT NULL,
	"address" text,
	"city" varchar(100),
	"district" varchar(100),
	"province" varchar(100),
	"postal_code" varchar(20),
	"country" varchar(100) DEFAULT 'Sierra Leone',
	"latitude" numeric(10, 8),
	"longitude" numeric(11, 8),
	"contact_email" varchar(255),
	"contact_phone" varchar(50),
	"website" varchar(255),
	"ceo" varchar(255),
	"founded_year" integer NOT NULL,
	"year_end" varchar(50),
	"employees" varchar(50),
	"revenue" varchar(50),
	"capital_investment" numeric(15, 2),
	"annual_revenue_range" varchar(50),
	"financial_summary" text,
	"rating" numeric(3, 2) DEFAULT '0.0',
	"compliance_score" integer,
	"trust_score" integer,
	"cac_registration_date" varchar(50),
	"cac_expiry_date" varchar(50),
	"last_verified_at" timestamp,
	"operational_details" text,
	"market_position" varchar(255),
	"customer_base" varchar(255),
	"tags" jsonb DEFAULT '[]'::jsonb,
	"services" jsonb DEFAULT '[]'::jsonb,
	"certifications" jsonb DEFAULT '[]'::jsonb,
	"subsidiaries" jsonb DEFAULT '[]'::jsonb,
	"recent_news" jsonb DEFAULT '[]'::jsonb,
	"directors" jsonb DEFAULT '[]'::jsonb,
	"compliance_records" jsonb DEFAULT '[]'::jsonb,
	"revenue_growth" jsonb DEFAULT '[]'::jsonb,
	"market_coverage" jsonb DEFAULT '[]'::jsonb,
	"major_clients" jsonb DEFAULT '[]'::jsonb,
	"awards" jsonb DEFAULT '[]'::jsonb,
	"social_media" jsonb DEFAULT '{}'::jsonb,
	"bank_details" jsonb DEFAULT '{}'::jsonb,
	"esg_scores" jsonb DEFAULT '{"environmental":0,"social":0,"governance":0,"overall":0}'::jsonb,
	"risk_assessment" jsonb DEFAULT '{"financialRisk":0,"operationalRisk":0,"complianceRisk":0,"marketRisk":0,"overallRisk":0}'::jsonb,
	"audit_info" jsonb DEFAULT '{}'::jsonb,
	"regulatory_filings" jsonb DEFAULT '[]'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"last_updated" timestamp,
	CONSTRAINT "business_registration_number_unique" UNIQUE("registration_number")
);
--> statement-breakpoint
CREATE INDEX "business_name_idx" ON "business" USING btree ("name");--> statement-breakpoint
CREATE INDEX "business_registration_idx" ON "business" USING btree ("registration_number");--> statement-breakpoint
CREATE INDEX "business_status_idx" ON "business" USING btree ("status");--> statement-breakpoint
CREATE INDEX "business_industry_idx" ON "business" USING btree ("industry");--> statement-breakpoint
CREATE INDEX "business_location_idx" ON "business" USING btree ("location");--> statement-breakpoint
CREATE INDEX "business_verification_idx" ON "business" USING btree ("verification_level");--> statement-breakpoint
CREATE INDEX "business_city_idx" ON "business" USING btree ("city");--> statement-breakpoint
CREATE INDEX "business_created_idx" ON "business" USING btree ("created_at" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "business_rating_idx" ON "business" USING btree ("rating" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "business_compliance_idx" ON "business" USING btree ("compliance_score" DESC NULLS LAST);