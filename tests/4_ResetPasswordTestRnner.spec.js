import { test, expect } from "@playwright/test";
import { ResetPasswordPage } from "../pages/ResetPasswordPage";
import { getLatestEmailDetails } from "../Utils/gmailUtils";
import { getLatestUser, updateLatestUserPassword } from "../Utils/userUtils";

test("Reset Password", async ({ page, request }) => {
    await page.goto("/");

    const user = getLatestUser();
    const resetPage = new ResetPasswordPage(page);
    await resetPage.requestReset(user.email);

    await page.waitForTimeout(30000); // Optional: replace with wait for email logic

     const { link: resetLink, subject } = await getLatestEmailDetails(request);
  console.log("📧 Reset Email Subject:", subject);
  console.log("🔗 Reset Link:", resetLink);

  if (!resetLink) throw new Error("Reset link not found in email");

  await page.goto(resetLink);

  const newPassword = "12345";
  await resetPage.setNewPassword(newPassword);

  updateLatestUserPassword(newPassword);
  console.log("✅ Password updated for user:", user.email);
});

