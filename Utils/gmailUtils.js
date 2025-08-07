// import dotenv from 'dotenv';
// dotenv.config();

// const baseURL = "https://gmail.googleapis.com";
// const token = process.env.GMAIL_API_TOKEN;

// export async function getLatestEmail(request) {
//     const res1 = await request.get(`${baseURL}/gmail/v1/users/me/messages/`, {
//         headers: {
//             "Accept": "application/json",
//             "Authorization": `Bearer ${token}`,
//         }
//     });

//     const data = await res1.json();
//     const latestEmailId = data.messages[0].id;

//     const res2 = await request.get(`${baseURL}/gmail/v1/users/me/messages/${latestEmailId}`, {
//         headers: {
//             "Accept": "application/json",
//             "Authorization": `Bearer ${token}`,
//         }
//     });

//     const emailData = await res2.json();
//     const snippet = emailData.snippet;
//     const match = snippet.match(/https?:\/\/[^\s]+/);
//     return match ? match[0] : null;
// }

// utils/gmailUtils.js
import dotenv from 'dotenv';
dotenv.config();

const baseURL = "https://gmail.googleapis.com";
const token = process.env.GMAIL_API_TOKEN;

/**
 * Fetches the latest Gmail email's subject and any link (if found)
 * @param {import('@playwright/test').APIRequestContext} request - Playwright's API request context
 * @returns {Promise<{subject: string, link: string | null}>}
 */
export async function getLatestEmailDetails(request) {
  const res1 = await request.get(`${baseURL}/gmail/v1/users/me/messages`, {
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  });

  const data = await res1.json();

  if (!data.messages || data.messages.length === 0) {
    throw new Error("No emails found");
  }

  const latestEmailId = data.messages[0].id;

  const res2 = await request.get(`${baseURL}/gmail/v1/users/me/messages/${latestEmailId}`, {
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  });

  const emailData = await res2.json();

  // ✅ Extract subject
  const subjectHeader = emailData.payload.headers.find(
    (header) => header.name === "Subject"
  );
  const subject = subjectHeader?.value || "";

  // ✅ Extract first link from email snippet
  const snippet = emailData.snippet;
  const linkMatch = snippet.match(/https?:\/\/[^\s]+/);
  const link = linkMatch ? linkMatch[0] : null;

  return { subject, link };
}

