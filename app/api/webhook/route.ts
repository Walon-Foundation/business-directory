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
*👋 Hello, ${userName}! I am the Business Verification Bot.*

I can instantly check the registration status and provide key details for any company in our database.

*How to use me:*
Just type the **full company name** or its **registration number**.
_Example: "Acme Corp Ltd" or "RC12345"_

What company would you like to verify?
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
      // Build location string from available fields
      const locationParts: string[] = [];

      if (company.address) {
        locationParts.push(company.address);
      }
      if (company.city) {
        locationParts.push(company.city);
      }
      if (company.district && company.district !== company.city) {
        locationParts.push(company.district);
      }

      const locationString =
        locationParts.length > 0
          ? locationParts.join(", ")
          : company.location || "Location not specified";

      response_text = `
*✅ Company Found: ${company.name}*

*Status:* ${company.status}
*Registration:* ${company.registrationNumber}
*Industry:* ${company.industry}
*Verification:* ${company.verificationLevel}
*Location:* ${locationString}

${company.description || company.businessType}
            `.trim();
    } else {
      response_text = `
*❌ Company Not Found*

The identifier *"${companyIdentifier}"* is **not valid** or could not be matched to a registered business in our database.

Please double-check the spelling or try using the full **Registration Number**.
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
