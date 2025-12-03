import { errorResponse } from "@/lib/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { business } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Await the params promise
    const { id } = await params;

    // Get the business by ID
    const [businessDetail] = await db
      .select()
      .from(business)
      .where(eq(business.id, id));

    // Check if business exists
    if (!businessDetail) {
      return errorResponse(404, null, "Business not found");
    }

    // Add computed fields
    const yearsOperating =
      new Date().getFullYear() - businessDetail.foundedYear;

    // Prepare response with all fields
    const responseData = {
      ...businessDetail,
      yearsOperating,

      // Ensure all JSON fields are properly initialized
      tags: businessDetail.tags || [],
      services: businessDetail.services || [],
      certifications: businessDetail.certifications || [],
      subsidiaries: businessDetail.subsidiaries || [],
      recentNews: businessDetail.recentNews || [],
      directors: businessDetail.directors || [],
      complianceRecords: businessDetail.complianceRecords || [],
      revenueGrowth: businessDetail.revenueGrowth || [],
      marketCoverage: businessDetail.marketCoverage || [],
      majorClients: businessDetail.majorClients || [],
      awards: businessDetail.awards || [],
      socialMedia: businessDetail.socialMedia || {},
      bankDetails: businessDetail.bankDetails || {},
      esgScores: businessDetail.esgScores || {
        environmental: 0,
        social: 0,
        governance: 0,
        overall: 0,
      },
      riskAssessment: businessDetail.riskAssessment || {
        financialRisk: 0,
        operationalRisk: 0,
        complianceRisk: 0,
        marketRisk: 0,
        overallRisk: 0,
      },
      auditInfo: businessDetail.auditInfo || {},
      regulatoryFilings: businessDetail.regulatoryFilings || [],

      // Timestamps
      createdAt: businessDetail.createdAt,
      updatedAt: businessDetail.updatedAt,
      lastUpdated: businessDetail.lastUpdated,
      lastVerifiedAt: businessDetail.lastVerifiedAt,
    };

    return NextResponse.json(
      {
        success: true,
        data: responseData,
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching business detail:", error);
    return errorResponse(500, error, "Internal Server Error");
  }
}
