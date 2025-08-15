import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import fs from "fs";
import RegistrationPage from "../pages/RegistrationPage.js";
import { getLatestEmailDetails } from "../Utils/gmailUtils";
import jsonData from "../Utils/userData.json";
import { generateRandomId } from "../Utils/utils.js";
import {
  captureRegistrationResponse,
  fetchIdFromMe,
  idFromWebStorage,
  idFromCookiesJWT,
  idFromUrlOrDom,
  pickAnyId,
  decodeJwtId
} from "../Utils/registrationHelper.js";

test("Registration Email Assertion - Congratulations on Registering!", async ({ page, request }) => {
  test.setTimeout(120000);

  await page.goto("/");

  const userModel = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: `shabitalahi123+regtest${Date.now()}@gmail.com`,
    password: "12345",
    phoneNumber: `014${generateRandomId(10000000, 99999999)}`,
    address: faker.location.city(),
  };

  const reg = new RegistrationPage(page);

  const { response: regResp, data: regData } = await captureRegistrationResponse(
    page,
    async () => { await reg.registerUser(userModel); }
  );

  const toastLocator = page.locator(".Toastify__toast");
  await toastLocator.waitFor({ timeout: 30000 });
  expect(await toastLocator.textContent()).toContain("registered successfully!");

  let userId = regData ? pickAnyId(regData) || decodeJwtId(regData.token || "") : null;
  if (!userId) userId = await fetchIdFromMe(page, "/api/me");
  if (!userId) userId = await idFromWebStorage(page);
  if (!userId) userId = await idFromCookiesJWT(page);
  if (!userId) userId = await idFromUrlOrDom(page);

  expect.soft(userId).toBeTruthy();

  userModel.userId = userId || "UNKNOWN";
  jsonData.push(userModel);
  fs.writeFileSync("./Utils/userData.json", JSON.stringify(jsonData, null, 2));

// 6) Email assertion (you can replace this wait with polling inside getLatestEmailDetails)
  await page.waitForTimeout(5000);
  const { subject, link, body } = await getLatestEmailDetails(
    request,
    "Congratulations on Registering!"
  );
  console.log("📧 Email subject:", subject);
  console.log("📄 Email body:", body?.slice?.(0, 200) || "(body omitted)");
  expect(subject).toContain("Congratulations on Registering!");
});
