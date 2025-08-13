import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import RegistrationPage from "../pages/RegistrationPage.js";
import { getLatestEmailDetails } from "../Utils/gmailUtils";
import jsonData from "../Utils/userData.json";
import fs from "fs";
import { generateRandomId } from "../Utils/utils.js";
import { userInfo } from "os";


test("Registration Email Assertion - Congratulations on Registering!", async ({ page, request }) => {
  await page.goto("/");

  // 1️⃣ Create new user model
  const userModel = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email:`shabitalahi123+regtest${Date.now()}@gmail.com`, // Change if needed
    password: "1234",
    phoneNumber: `014${generateRandomId(10000000, 99999999)}`,
    address: faker.location.city(),
    // userId: Response.id,
  };

  // 2️⃣ Register user
  const reg = new RegistrationPage(page);
  await reg.registerUser(userModel);

  // 3️⃣ Wait for toast and assert registration success
  const toastLocator = page.locator(".Toastify__toast");
  await toastLocator.waitFor({ timeout: 30000 });
  const msg = await toastLocator.textContent();
  expect(msg).toContain("registered successfully!");
  console.log(msg);


  // 4️⃣ Save new user for reference
  jsonData.push(userModel);
  fs.writeFileSync("./Utils/userData.json", JSON.stringify(jsonData, null, 2));
  console.log("User saved with ID:", userModel.userId);

  // 5️⃣ Wait briefly (better to replace with retry loop later)
  await page.waitForTimeout(30000);

  // 6️⃣ Fetch registration email with subject filter
  const { subject, link, body } = await getLatestEmailDetails(
    request,
    "Congratulations on Registering!"
  );

  console.log("📧 Registration Email Subject:", subject);
  console.log("📄 Email Body:", body);

  // 7️⃣ Assert subject contains expected phrase
  expect(subject).toContain("Congratulations on Registering!");
});
