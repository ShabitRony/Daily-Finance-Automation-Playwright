import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import jsonData from "../Utils/userData.json";
import fs from "fs";
import dotenv from "dotenv";
import RegistrationPage from "../pages/RegistrationPage.js";
import { generateRandomId } from "../Utils/utils.js";
import { getLatestEmailDetails } from "../Utils/gmailUtils.js";

dotenv.config();

test("User Registration with Gmail Congratulations Assertion", async ({ page, request }) => {
  try {
    await page.goto("/");

    const reg = new RegistrationPage(page);
    const userModel = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: "shabitalahi123+714@gmail.com",
      password: "1234",
      phoneNumber: `014${generateRandomId(10000000, 99999999)}`,
      address: faker.location.city(),
    };

    await reg.registerUser(userModel);

    const toastLocator = page.locator(".Toastify__toast");
    await toastLocator.waitFor({ timeout: 30000 });
    const msg = await toastLocator.textContent();
    expect(msg).toContain("registered successfully!");

    jsonData.push(userModel);
    fs.writeFileSync("./Utils/userData.json", JSON.stringify(jsonData, null, 2));

    // ⏳ Wait for email to arrive
    await page.waitForTimeout(60000);

    const { subject, link } = await getLatestEmailDetails(request);
    console.log("✅ Email Subject:", subject);
    console.log("🔗 Email Link:", link || "No link found in email");

    expect(subject).toContain("Congratulations on Registering!");
  } catch (error) {
    console.error("❌ Test failed due to an error:", error);
    throw error;
  }
}, 120000); // ✅ Increased timeout to 2 minutes

