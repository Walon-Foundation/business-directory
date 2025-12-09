// app/api/webhook/route.ts

import { errorResponse } from "@/lib/errorHandler";
import { NextRequest, NextResponse } from "next/server";
// Drizzle Imports
import { business } from "@/db/schema";
// Import 'sql' for using database functions like 'lower()'
import { eq, like, or, sql } from "drizzle-orm";
import { db } from "@/db/db";
// Utility Imports
import { env } from "@/lib/env";
import axios from "axios";

// const ONE_MINUTE = 60 * 1000

// =========================================================================
// === 📞 OUTBOUND WASENDER MESSAGE HELPER (AXIOS) ==========================
// =========================================================================

/**
 * Sends an outbound message to a specific WhatsApp chat ID via the Wasender API.
 * Uses Axios with a timeout for robust error handling.
 * @param chatId The WhatsApp JID of the recipient.
 * @param message The text content to send.
 */
async function sendWasenderMessage(
  chatId: string,
  message: string,
): Promise<any> {
  const wasenderToken = env.WASENDER_API_KEY;
  const wasenderUrl = "https://www.wasenderapi.com/api/send-message";

  try {
    const response = await axios.post(
      wasenderUrl,
      { to: chatId, text: message },
      {
        headers: {
          Authorization: `Bearer ${wasenderToken}`,
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10 seconds timeout
      },
    );
    console.log("Wasender message sent successfully.");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
        console.error("Wasender API Timeout/Connection Error:", error.message);
        throw new Error(
          `Failed to send Wasender message: Connection Timed Out.`,
        );
      }
      const status = error.response?.status;
      const errorText = JSON.stringify(
        error.response?.data || { message: error.message },
      );
      console.error(
        "Wasender API Response Error (Status:",
        status,
        "):",
        errorText,
      );
      throw new Error(
        `Failed to send Wasender message: ${status} - ${errorText}.`,
      );
    }
    console.error("Wasender API Unknown Error:", error);
    throw new Error(`Failed to send Wasender message: Unknown API error.`);
  }
}

// =========================================================================
// === 🤝 BUSINESS LOGIC HELPERS ============================================
// =========================================================================

/**
 * Checks if the message is a simple greeting (hi, hello, hey, etc.).
 */
function isSimpleGreeting(text: string): boolean {
  const lowerText = text.toLowerCase().trim();
  const greetings = [
    "hi",
    "hello",
    "hey",
    "hola",
    "gm",
    "good morning",
    "ge",
    "good evening",
    "ga",
    "good afternoon",
    "hii",
    "hellloo",
    "afternoon",
  ];
  // Check if the message exactly matches one of the greetings
  return greetings.includes(lowerText);
}

/**
 * Extracts the user's text message from the complex Wasender webhook payload.
 * We assume the company identifier is in the 'messageBody' field.
 */
function extractCompanyIdentifier(body: any): string | null {
  const identifier = body?.data?.messages?.messageBody;

  if (typeof identifier === "string" && identifier.trim().length > 0) {
    return identifier.trim();
  }
  return null;
}

// =========================================================================
// === 🚪 NEXT.JS API ENTRY POINT ==========================================
// =========================================================================

export async function POST(req: NextRequest) {
  let companyIdentifier: string | null = null;
  let recipientId: string | undefined;

  try {
    const body = await req.json();

    // 1. Webhook Validation & Extraction
    if (
      body.event !== "messages.received" ||
      !body.data ||
      !body.data.messages
    ) {
      return NextResponse.json(
        {
          status: "ignored",
          reason: `Not a messages.received event or missing data`,
        },
        { status: 200 },
      );
    }

    const messageData = body.data.messages;
    const pushName: string | undefined = messageData.pushName;
    recipientId = messageData.key?.remoteJid || messageData.remoteJid;

    // Skip if no recipient or if it's a group/self-message
    if (
      !recipientId ||
      messageData.key?.fromMe === true ||
      recipientId.endsWith("@g.us")
    ) {
      return NextResponse.json(
        { status: "ignored", reason: "Ignored sender/recipient" },
        { status: 200 },
      );
    }

    companyIdentifier = extractCompanyIdentifier(body);

    if (!companyIdentifier) {
      return NextResponse.json(
        { status: "ignored", reason: "Non-text or empty message type" },
        { status: 200 },
      );
    }

    let response_text: string;

    // 2. Greeting Logic
    if (isSimpleGreeting(companyIdentifier)) {
      const userName = pushName || "there";
      response_text = `
👋 *Hello, ${userName}!*
*Welcome to the Business Verification Bot.* 🤖

I can help you instantly verify registered businesses in Sierra Leone.

*Here is what I can do:*
✅ Check Registration Status
✅ Provide Business Details
✅ Verify Official Address

*How to search:*
Simply reply with the **Business Name** or **Registration Number**.

_Example: "Acme Corp" or "RC12345"_
            `.trim();

      await sendWasenderMessage(recipientId, response_text);

      return NextResponse.json(
        { status: "success", message: "Welcome message sent" },
        { status: 200 },
      );
    }

    // 3. Database Query (Enhanced Case-Insensitive Search)
    console.log(`Searching for company identifier: ${companyIdentifier}`);

    // Convert the search term to lowercase once
    const lowerCaseIdentifier = companyIdentifier.toLowerCase();
    // Use wildcards for partial matching on lowercase
    const searchPattern = `%${lowerCaseIdentifier}%`;

    const companyRecord = await db
      .select()
      .from(business)
      .where(
        or(
          // 1. Exact Match on Registration Number (Highest Priority)
          eq(business.registrationNumber, companyIdentifier),

          // 2. Case-Insensitive Partial Match on Name
          // We use 'lower()' on the DB column and 'like' with the lower-cased pattern.
          like(sql<string>`lower(${business.name})`, searchPattern),

          // 3. Case-Insensitive Partial Match on Trading Name
          like(sql<string>`lower(${business.tradingName})`, searchPattern),
        ),
      )
      .limit(1);

    const company = companyRecord[0];

    // 4. Construct Response Text
    if (company) {
      // Build location string
      const locationParts: string[] = [];
      if (company.address) locationParts.push(company.address);
      if (company.city) locationParts.push(company.city);
      if (company.district && company.district !== company.city) {
        locationParts.push(company.district);
      }
      const locationString =
        locationParts.length > 0
          ? locationParts.join(", ")
          : company.location || "Not specified";

      // Build Services string
      let servicesString = "";
      if (Array.isArray(company.services) && company.services.length > 0) {
        servicesString = company.services.slice(0, 3).join(", ");
        if (company.services.length > 3) servicesString += ", ...";
      }

      // Build Response Sections
      const sections: string[] = [];

      // --- Header ---
      sections.push(`🏢 *${company.name}*`);
      if (company.tradingName) {
        sections.push(`_Trading as: ${company.tradingName}_`);
      }
      sections.push(""); // Spacer

      // --- Core Status ---
      const statusIcon = company.status === "active" ? "✅" : "⚠️";
      sections.push(`*Status:* ${statusIcon} ${company.status.toUpperCase()}`);
      sections.push(
        `*Verification:* ${
          company.verificationLevel === "verified" ? "🔵 Verified" : "⚪ " + company.verificationLevel
        }`,
      );

      // --- Trust & Rating ---
      const ratingParts: string[] = [];
      if (company.rating && Number(company.rating) > 0) {
        ratingParts.push(`⭐ ${company.rating}/5.0`);
      }
      if (company.trustScore) {
        ratingParts.push(`🛡️ Trust Score: ${company.trustScore}/100`);
      }
      if (ratingParts.length > 0) {
        sections.push(ratingParts.join("  |  "));
      }

      sections.push(`*Reg. Number:* ${company.registrationNumber}`);
      sections.push("");

      // --- Business Details ---
      sections.push(`*Industry:* ${company.industry}`);
      sections.push(`*Type:* ${company.businessType.replace(/_/g, " ")}`);
      if (company.foundedYear) {
        sections.push(`*Est:* ${company.foundedYear}`);
      }
      sections.push("");

      // --- Location ---
      sections.push(`📍 *Location:* ${locationString}`);
      sections.push("");

      // --- Contact Info (if available) ---
      const contacts: string[] = [];
      if (company.contactPhone) contacts.push(`📞 ${company.contactPhone}`);
      if (company.contactEmail) contacts.push(`📧 ${company.contactEmail}`);
      if (company.website) contacts.push(`🌐 ${company.website}`);

      if (contacts.length > 0) {
        sections.push("*Contact Details:*");
        sections.push(contacts.join("\n"));
        sections.push("");
      }

      // --- Services (if available) ---
      if (servicesString) {
        sections.push(`*Services:* ${servicesString}`);
        sections.push("");
      }

      // --- Description Snippet ---
      if (company.description) {
        const descSnippet =
          company.description.length > 100
            ? company.description.substring(0, 97) + "..."
            : company.description;
        sections.push(`_${descSnippet}_`);
        sections.push("");
      }

      // --- Links ---
      const profileUrl = `${env.APP_URL}/explore/${company.id}`;
      sections.push(`🔗 *View Full Profile:*`);
      sections.push(profileUrl);
      sections.push("");

      // --- Footer ---
      sections.push("🔍 _Reply with another name to search again._");

      response_text = sections.join("\n").trim();
    } else {
      response_text = `
❌ *Company Not Found*

We couldn't find a match for *"${companyIdentifier}"*.

*Suggestions:*
1. Check the spelling.
2. Try the **Registration Number** (e.g., RC12345).
3. Try a simpler keyword.

_Reply with a new name to try again._
            `.trim();
    }

    // 5. Send the final response via Wasender API

    await sendWasenderMessage(recipientId, response_text);

    // 6. Return 200 OK to the webhook provider (Wasender) to acknowledge receipt
    return NextResponse.json(
      {
        status: "success",
        message: "Company verification and response message sent.",
      },
      { status: 200 },
    );
  } catch (error) {
    // 7. Global Error Handling
    console.error("Webhook processing error:", error);

    // Attempt to send a generic error message to the user
    const genericErrorMessage =
      "A system error occurred while checking the company. Please try again shortly.";
    if (recipientId) {
      try {
        await sendWasenderMessage(recipientId, genericErrorMessage);
      } catch (e) {
        console.error("Failed to send error message to user:", e);
      }
    }

    // Use the custom error handler for internal issues
    return errorResponse(
      500,
      error,
      `Internal server error occurred while processing the webhook.`,
    );
  }
}
