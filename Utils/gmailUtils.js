import dotenv from "dotenv";
dotenv.config();

const baseURL = "https://gmail.googleapis.com";
const token = process.env.GMAIL_API_TOKEN;

/**
 * Fetch the latest Gmail email's subject, body text, and first link (if any).
 * Works for both Registration & Reset Password tests.
 * @param {import('@playwright/test').APIRequestContext} request - Playwright API request context
 * @returns {Promise<{subject: string, body: string, link: string | null}>}
 */
export async function getLatestEmailDetails(request) {
  // 1️⃣ Get list of messages
  const res1 = await request.get(`${baseURL}/gmail/v1/users/me/messages`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res1.json();
  if (!data.messages || data.messages.length === 0) {
    throw new Error("No emails found");
  }

  // 2️⃣ Fetch latest email details
  const latestEmailId = data.messages[0].id;
  const res2 = await request.get(`${baseURL}/gmail/v1/users/me/messages/${latestEmailId}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const emailData = await res2.json();

  // ✅ Extract Subject
  const subjectHeader = emailData.payload.headers.find(
    (header) => header.name.toLowerCase() === "subject"
  );
  const subject = subjectHeader?.value || "";

  // ✅ Extract Body (from parts if available, else snippet)
  let body = "";
  if (emailData.payload.parts && emailData.payload.parts.length > 0) {
    const textPart = emailData.payload.parts.find(
      (part) => part.mimeType === "text/plain"
    );
    if (textPart && textPart.body && textPart.body.data) {
      body = Buffer.from(textPart.body.data, "base64").toString("utf-8");
    }
  }
  if (!body) {
    body = emailData.snippet || "";
  }

  // ✅ Extract first link
  const linkMatch = body.match(/https?:\/\/[^\s]+/);
  const link = linkMatch ? linkMatch[0] : null;

  return { subject, body, link };
}

