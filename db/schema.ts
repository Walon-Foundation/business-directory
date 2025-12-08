// schema/business.ts
import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  decimal,
  integer,
  jsonb,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";

// Enums
export const businessStatusEnum = pgEnum("business_status", [
  "active",
  "pending",
  "suspended",
  "inactive",
]);

export const verificationLevelEnum = pgEnum("verification_level", [
  "verified",
  "pending",
  "unverified",
]);

export const industryEnum = pgEnum("industry", [
  "technology",
  "banking_finance",
  "agriculture",
  "mining",
  "healthcare",
  "telecommunications",
  "logistics_shipping",
  "fisheries",
  "construction",
  "manufacturing",
  "retail",
  "tourism_hospitality",
  "education",
  "energy_utilities",
  "real_estate",
  "transportation",
  "media_entertainment",
  "professional_services",
  "other",
]);

export const businessTypeEnum = pgEnum("business_type", [
  "private_limited",
  "public_limited",
  "sole_proprietorship",
  "partnership",
  "government_agency",
  "ngo",
  "cooperative",
  "foreign_branch",
  "other",
]);

export const ownershipTypeEnum = pgEnum("ownership_type", [
  "local",
  "foreign",
  "joint_venture",
  "government",
  "mixed",
]);

// Main Business Table - Everything in one table
export const business = pgTable(
  "business",
  {
    // ========== IDENTIFICATION ==========
    id: uuid("id").primaryKey().defaultRandom(),
    registrationNumber: varchar("registration_number", {
      length: 50,
    }).notNull(),
    taxId: varchar("tax_id", { length: 50 }),

    // ========== BASIC INFO ==========
    name: varchar("name", { length: 255 }).notNull(),
    tradingName: varchar("trading_name", { length: 255 }),
    description: text("description"),
    status: businessStatusEnum("status").default("active").notNull(),
    verificationLevel: verificationLevelEnum("verification_level")
      .default("pending")
      .notNull(),
    industry: industryEnum("industry").notNull(),
    businessType: businessTypeEnum("business_type").notNull(),
    ownership: ownershipTypeEnum("ownership").notNull(),

    // ========== LOCATION ==========
    location: varchar("location", { length: 100 }).notNull(),
    address: text("address"),
    city: varchar("city", { length: 100 }),
    district: varchar("district", { length: 100 }),
    province: varchar("province", { length: 100 }),
    postalCode: varchar("postal_code", { length: 20 }),
    country: varchar("country", { length: 100 }).default("Sierra Leone"),
    latitude: decimal("latitude", { precision: 10, scale: 8 }),
    longitude: decimal("longitude", { precision: 11, scale: 8 }),

    // ========== CONTACT INFO ==========
    contactEmail: varchar("contact_email", { length: 255 }),
    contactPhone: varchar("contact_phone", { length: 50 }),
    website: varchar("website", { length: 255 }),
    ceo: varchar("ceo", { length: 255 }),

    // ========== FINANCIAL INFO ==========
    foundedYear: integer("founded_year").notNull(),
    yearEnd: varchar("year_end", { length: 50 }),
    employees: varchar("employees", { length: 50 }),
    revenue: varchar("revenue", { length: 50 }),
    capitalInvestment: decimal("capital_investment", {
      precision: 15,
      scale: 2,
    }),
    annualRevenueRange: varchar("annual_revenue_range", { length: 50 }),
    financialSummary: text("financial_summary"),

    // ========== RATINGS & SCORES ==========
    rating: decimal("rating", { precision: 3, scale: 2 }).default("0.0"),
    complianceScore: integer("compliance_score"),
    trustScore: integer("trust_score"),

    // ========== REGISTRATION DETAILS ==========
    cacRegistrationDate: date("cac_registration_date"),
    cacExpiryDate: date("cac_expiry_date"),
    lastVerifiedAt: timestamp("last_verified_at"),

    // ========== OPERATIONAL DETAILS ==========
    operationalDetails: text("operational_details"),
    marketPosition: varchar("market_position", { length: 255 }),
    customerBase: varchar("customer_base", { length: 255 }),

    // ========== JSON FIELDS (Arrays and Complex Data) ==========

    // Tags for categorization
    tags: jsonb("tags").$type<string[]>().default([]),

    // Services and offerings
    services: jsonb("services").$type<string[]>().default([]),

    // Certifications and memberships
    certifications: jsonb("certifications").$type<string[]>().default([]),

    // Subsidiaries and affiliates
    subsidiaries: jsonb("subsidiaries").$type<string[]>().default([]),

    // Recent news and updates
    recentNews: jsonb("recent_news")
      .$type<
        Array<{
          title: string;
          date: string;
          source: string;
          link?: string;
        }>
      >()
      .default([]),

    // Directors/Management team
    directors: jsonb("directors")
      .$type<
        Array<{
          name: string;
          position: string;
          nationality?: string;
          identificationNumber?: string;
          isPrimary?: boolean;
          sharePercentage?: number;
        }>
      >()
      .default([]),

    // Compliance records
    complianceRecords: jsonb("compliance_records")
      .$type<
        Array<{
          type: string;
          status: string;
          dueDate?: string;
          completedDate?: string;
          score?: number;
        }>
      >()
      .default([]),

    // Revenue growth history
    revenueGrowth: jsonb("revenue_growth")
      .$type<
        Array<{
          year: number;
          growth: number;
          amount: string;
        }>
      >()
      .default([]),

    // Market coverage by region
    marketCoverage: jsonb("market_coverage")
      .$type<
        Array<{
          region: string;
          percentage: number;
          notes?: string;
        }>
      >()
      .default([]),

    // Major clients/partners
    majorClients: jsonb("major_clients").$type<string[]>().default([]),

    // Awards and recognitions
    awards: jsonb("awards")
      .$type<
        Array<{
          name: string;
          year: number;
          issuer: string;
        }>
      >()
      .default([]),

    // Social media links
    socialMedia: jsonb("social_media")
      .$type<Record<string, string>>()
      .default({}),

    // Bank details (for verified partners)
    bankDetails: jsonb("bank_details")
      .$type<{
        bankName?: string;
        accountNumber?: string;
        accountName?: string;
        branch?: string;
      }>()
      .default({}),

    // Environmental, Social, Governance (ESG) scores
    esgScores: jsonb("esg_scores")
      .$type<{
        environmental: number;
        social: number;
        governance: number;
        overall: number;
      }>()
      .default({ environmental: 0, social: 0, governance: 0, overall: 0 }),

    // Risk assessment
    riskAssessment: jsonb("risk_assessment")
      .$type<{
        financialRisk: number;
        operationalRisk: number;
        complianceRisk: number;
        marketRisk: number;
        overallRisk: number;
      }>()
      .default({
        financialRisk: 0,
        operationalRisk: 0,
        complianceRisk: 0,
        marketRisk: 0,
        overallRisk: 0,
      }),

    // Audit information
    auditInfo: jsonb("audit_info")
      .$type<{
        lastAuditDate?: string;
        auditor?: string;
        auditOpinion?: string;
        nextAuditDate?: string;
      }>()
      .default({}),

    // Regulatory filings
    regulatoryFilings: jsonb("regulatory_filings")
      .$type<
        Array<{
          type: string;
          filingDate: string;
          status: string;
          documentUrl?: string;
        }>
      >()
      .default([]),

    // ========== TIMESTAMPS ==========
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    lastUpdated: timestamp("last_updated"),
  },
  (table) => [
    // Indexes for performance
    index("business_name_idx").on(table.name),
    index("business_registration_idx").on(table.registrationNumber),
    index("business_status_idx").on(table.status),
    index("business_industry_idx").on(table.industry),
    index("business_location_idx").on(table.location),
    index("business_verification_idx").on(table.verificationLevel),
    index("business_city_idx").on(table.city),
    index("business_created_idx").on(table.createdAt.desc()),
    index("business_rating_idx").on(table.rating.desc()),
    index("business_compliance_idx").on(table.complianceScore.desc()),
  ],
);

// Helper function to create date type (Drizzle doesn't have date type built-in)
function date(name: string) {
  return varchar(name, { length: 50 }); // Store as ISO string or use timestamp
}

// Export types for TypeScript
export type Business = typeof business.$inferSelect;
export type NewBusiness = typeof business.$inferInsert;

// Type for the detailed page data
export type DetailedBusiness = Business & {
  // Additional computed fields if needed
  yearsOperating?: number;
  serviceCoverage?: string;
};

export const sourceEnum = pgEnum("source", ["web", "whatsapp"]);

export const complaints = pgTable(
  "complaints",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    businessId: uuid("business_id").notNull(),
    username: varchar("username", { length: 100 }),
    type: varchar("type", { length: 50 }).notNull(),
    description: text("description"),
    evidenceUrl: text("evidence_url"),
    userPhone: varchar("user_phone", { length: 20 }),
    source: sourceEnum("source").default("web"),
    status: varchar("status", { length: 20 }).default("pending"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("complaint_business_idx").on(table.businessId),
    index("complaint_created_idx").on(table.createdAt.desc()),
  ],
);

export type Complaint = typeof complaints.$inferSelect;
export type NewComplaint = typeof complaints.$inferInsert;
