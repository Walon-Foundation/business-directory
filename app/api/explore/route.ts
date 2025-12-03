import { errorResponse } from "@/lib/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { business, Business } from "@/db/schema";
import { sql, and, or, like, ilike, desc, asc, eq, inArray, between } from "drizzle-orm";
import { z } from "zod";

// Validation schema for query parameters
const querySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
  status: z.enum(["active", "pending", "suspended", "inactive"]).optional(),
  industry: z.enum([
    "technology", "banking_finance", "agriculture", "mining", "healthcare",
    "telecommunications", "logistics_shipping", "fisheries", "construction",
    "manufacturing", "retail", "tourism_hospitality", "education",
    "energy_utilities", "real_estate", "transportation", "media_entertainment",
    "professional_services", "other"
  ]).optional(),
  businessType: z.enum([
    "private_limited", "public_limited", "sole_proprietorship",
    "partnership", "government_agency", "ngo", "cooperative",
    "foreign_branch", "other"
  ]).optional(),
  ownership: z.enum(["local", "foreign", "joint_venture", "government", "mixed"]).optional(),
  location: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  maxRating: z.coerce.number().min(0).max(5).optional(),
  minCompliance: z.coerce.number().min(0).max(100).optional(),
  maxCompliance: z.coerce.number().min(0).max(100).optional(),
  sortBy: z.enum(["name", "rating", "complianceScore", "createdAt", "foundedYear", "revenue"]).default("name"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
  tags: z.string().optional(), // comma-separated tags
  verificationLevel: z.enum(["verified", "pending", "unverified"]).optional(),
});

export async function GET(req: NextRequest) {
  try {
    // Parse query parameters
    const searchParams = req.nextUrl.searchParams;
    const queryParams = Object.fromEntries(searchParams.entries());
    
    // Validate query parameters
    const validated = querySchema.safeParse(queryParams);
    if (!validated.success) {
      return errorResponse(400, validated.error.flatten, "Invalid query parameters");
    }

    const {
      page,
      limit,
      search,
      status,
      industry,
      businessType,
      ownership,
      location,
      city,
      province,
      minRating,
      maxRating,
      minCompliance,
      maxCompliance,
      sortBy,
      sortOrder,
      tags,
      verificationLevel,
    } = validated.data;

    // Calculate pagination
    const offset = (page - 1) * limit;

    // Build where conditions
    const conditions = [];

    // Search condition (search across multiple fields)
    if (search) {
      const searchTerm = `%${search}%`;
      conditions.push(
        or(
          ilike(business.name, searchTerm),
          ilike(business.tradingName, searchTerm),
          ilike(business.description, searchTerm),
          ilike(business.location, searchTerm),
          ilike(business.registrationNumber, searchTerm)
        )
      );
    }

    // Filter conditions
    if (status) conditions.push(eq(business.status, status));
    if (industry) conditions.push(eq(business.industry, industry));
    if (businessType) conditions.push(eq(business.businessType, businessType));
    if (ownership) conditions.push(eq(business.ownership, ownership));
    if (location) conditions.push(ilike(business.location, `%${location}%`));
    if (city) conditions.push(ilike(business.city, `%${city}%`));
    if (province) conditions.push(ilike(business.province, `%${province}%`));
    if (verificationLevel) conditions.push(eq(business.verificationLevel, verificationLevel));

    // Rating range filter
    if (minRating !== undefined || maxRating !== undefined) {
      const minRatingValue = minRating !== undefined ? minRating.toString() : "0";
      const maxRatingValue = maxRating !== undefined ? maxRating.toString() : "5";
      conditions.push(
        and(
          sql`${business.rating} >= ${minRatingValue}`,
          sql`${business.rating} <= ${maxRatingValue}`
        )
      );
    }

    // Compliance score range filter
    if (minCompliance !== undefined || maxCompliance !== undefined) {
      const minComplianceValue = minCompliance !== undefined ? minCompliance : 0;
      const maxComplianceValue = maxCompliance !== undefined ? maxCompliance : 100;
      conditions.push(
        between(business.complianceScore, minComplianceValue, maxComplianceValue)
      );
    }

    // Tags filter
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      conditions.push(
        sql`${business.tags} @> ${JSON.stringify(tagArray)}::jsonb`
      );
    }

    // Build where clause
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Build order by clause
    let orderByClause;
    switch (sortBy) {
      case 'rating':
        orderByClause = sortOrder === 'desc' ? desc(business.rating) : asc(business.rating);
        break;
      case 'complianceScore':
        orderByClause = sortOrder === 'desc' ? desc(business.complianceScore) : asc(business.complianceScore);
        break;
      case 'createdAt':
        orderByClause = sortOrder === 'desc' ? desc(business.createdAt) : asc(business.createdAt);
        break;
      case 'foundedYear':
        orderByClause = sortOrder === 'desc' ? desc(business.foundedYear) : asc(business.foundedYear);
        break;
      case 'revenue':
        // Assuming revenue is stored as string, we need to parse it
        // This is a simplified approach - you might need a better solution for revenue sorting
        orderByClause = sortOrder === 'desc' ? desc(sql`${business.revenue}`) : asc(sql`${business.revenue}`);
        break;
      case 'name':
      default:
        orderByClause = sortOrder === 'desc' ? desc(business.name) : asc(business.name);
    }

    // Get total count for pagination
    const totalCountResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(business)
      .where(whereClause);

    const totalCount = totalCountResult[0]?.count || 0;
    const totalPages = Math.ceil(totalCount / limit);

    // Get paginated businesses
    const businesses = await db
      .select()
      .from(business)
      .where(whereClause)
      .orderBy(orderByClause)
      .limit(limit)
      .offset(offset);

    // Transform data for frontend (optional)
    const transformedBusinesses = businesses.map(biz => ({
      ...biz,
      // Add computed fields
      yearsOperating: new Date().getFullYear() - biz.foundedYear,
      // Ensure JSON fields are properly typed
      tags: biz.tags || [],
      services: biz.services || [],
      directors: biz.directors || [],
      // Add a summary field for search
      summary: `${biz.name} - ${biz.industry} - ${biz.location}`,
    }));

    // Get aggregation data for filters (optional - can be cached)
    const aggregations = await db
      .select({
        status: business.status,
        count: sql<number>`count(*)`,
      })
      .from(business)
      .groupBy(business.status);

    const industryStats = await db
      .select({
        industry: business.industry,
        count: sql<number>`count(*)`,
      })
      .from(business)
      .groupBy(business.industry)
      .orderBy(desc(sql`count(*)`))
      .limit(10);

    // Build response with pagination metadata
    const response = {
      success: true,
      data: {
        businesses: transformedBusinesses,
        pagination: {
          page,
          limit,
          total: totalCount,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
        filters: {
          availableStatuses: aggregations.reduce((acc, curr) => {
            acc[curr.status] = curr.count;
            return acc;
          }, {} as Record<string, number>),
          topIndustries: industryStats,
        },
        currentFilters: {
          search,
          status,
          industry,
          businessType,
          ownership,
          location,
          city,
          province,
          minRating,
          maxRating,
          minCompliance,
          maxCompliance,
          sortBy,
          sortOrder,
          tags,
          verificationLevel,
        },
      },
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error("Error fetching businesses:", error);
    return errorResponse(500, error, "Internal Server Error");
  }
}