import { errorResponse } from "@/lib/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db/db";
import { complaints } from "@/db/schema";
import { eq } from "drizzle-orm";

// Validation schema
const complaintSchema = z
  .object({
    type: z
      .string()
      .min(1, "Complaint type is required")
      .max(50, "Complaint type is too long")
      .refine((type) => type.trim().length > 0, {
        message: "Complaint type cannot be empty",
      }),
    description: z
      .string()
      .min(1, "Description is required")
      .max(5000, "Description is too long")
      .refine((desc) => desc.trim().length >= 10, {
        message: "Description must be at least 10 characters",
      }),
    username: z
      .string()
      .max(100, "Username is too long")
      .optional()
      .or(z.literal("")),
    userPhone: z
      .string()
      .max(20, "Phone number is too long")
      .optional()
      .or(z.literal("")),
    evidenceUrl: z.string().optional().or(z.literal("")),
    source: z.enum(["web", "whatsapp"]).default("web"),
    anonymous: z.boolean().default(false),
  })
  .refine(
    (data) => {
      // If anonymous is true, username should be empty or "Anonymous"
      if (data.anonymous) {
        return !data.username || data.username === "Anonymous";
      }
      return true;
    },
    {
      message: "Username should be empty when submitting anonymously",
      path: ["username"],
    },
  );

type ComplaintInput = z.infer<typeof complaintSchema>;

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const body = await req.json();
    const { id: businessId } = await params;

    // Validate businessId format (optional)
    if (!businessId || typeof businessId !== "string") {
      return NextResponse.json(
        {
          ok: false,
          message: "Invalid business ID",
          error: {
            message: "The business ID provided is invalid or missing.",
          },
        },
        { status: 400 },
      );
    }

    // Validate input
    const validationResult = complaintSchema.safeParse(body);

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          ok: false,
          message: "Validation failed",
          error: {
            message: "Please check your input and try again",
            fieldErrors: fieldErrors,
          },
        },
        { status: 400 },
      );
    }

    const validatedData: ComplaintInput = validationResult.data;

    // Sanitize data
    const sanitizedData = {
      businessId,
      type: validatedData.type.trim(),
      description: validatedData.description.trim(),
      source: validatedData.source,
      status: "pending" as const,
      username: validatedData.anonymous
        ? "Anonymous"
        : validatedData.username?.trim() || null,
      userPhone: validatedData.userPhone?.trim().replace(/\s+/g, "") || null,
      evidenceUrl: validatedData.evidenceUrl?.trim() || null,
    };

    // Insert into database with transaction for safety
    const newComplaint = (
      await db.insert(complaints).values(sanitizedData).returning()
    )[0];

    // Send success response
    return NextResponse.json(
      {
        success: true,
        message: "Complaint submitted successfully",
        data: {
          id: newComplaint.id,
          businessId: newComplaint.businessId,
          type: newComplaint.type,
          status: newComplaint.status,
          submittedAt: newComplaint.createdAt,
          referenceNumber: `COMP-${newComplaint.id.substring(0, 8).toUpperCase()}`,
        },
        nextSteps: [
          "Your complaint has been recorded",
          "You will receive an email confirmation if you provided contact information",
          "Our team will review your complaint within 5-7 business days",
          "You can check the status using your reference number",
        ],
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error submitting complaint:", error);

    // Handle specific database errors
    if (error instanceof Error) {
      if (error.message.includes("foreign key constraint")) {
        return NextResponse.json(
          {
            ok: false,
            message: "Business not found",
            error: {
              message:
                "The business you are trying to file a complaint against does not exist in our system.",
            },
          },
          { status: 404 },
        );
      }
      if (error.message.includes("duplicate key")) {
        return NextResponse.json(
          {
            ok: false,
            message: "Duplicate complaint",
            error: {
              message:
                "A similar complaint already exists. Please check your previous submissions.",
            },
          },
          { status: 409 },
        );
      }
    }

    return NextResponse.json(
      {
        ok: false,
        message: "Failed to submit complaint",
        error: {
          message:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred. Please try again later.",
        },
      },
      { status: 500 },
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;

    const value = await db
      .select()
      .from(complaints)
      .where(eq(complaints.businessId, id))
      .execute();
    if (value.length === 0) {
      return NextResponse.json(
        {
          ok: true,
          data: [],
          message: "No complaints at yet",
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        ok: true,
        data: value,
        message: "All business complaints",
      },
      { status: 200 },
    );
  } catch (error) {
    return errorResponse(500, error, "Internal server error");
  }
}
