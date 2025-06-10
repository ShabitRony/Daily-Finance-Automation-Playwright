import { test, expect } from "@playwright/test";
import { faker } from '@faker-js/faker';
import jsonData from "../Utils/userData.json";
import fs from "fs";
import RegistrationPage from "../pages/RegistrationPage.js";
import { generateRandomId } from "../Utils/utils.js";
import path from "path";
import dotenv from 'dotenv';
dotenv.config();


const baseURL = "https://gmail.googleapis.com";
const token = process.env.GMAIL_API_TOKEN;
test("User Registration with Gmail Congratulations Assertion", async ({ page, request }) => {
  await page.goto("/");

  const reg = new RegistrationPage(page);
  const userModel = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: "shabitalahi123+642@gmail.com",
    password: "1234",
    phoneNumber: `014${generateRandomId(10000000, 99999999)}`,
    address: faker.location.city()
  };

  await reg.registerUser(userModel);

  const toastLocator = page.locator(".Toastify__toast");
  await toastLocator.waitFor({ timeout: 30000 });
  const msg = await toastLocator.textContent();
  expect(msg).toContain("registered successfully!");

  jsonData.push(userModel);
  fs.writeFileSync("./Utils/userData.json", JSON.stringify(jsonData, null, 2));

  const response1 = await request.get(baseURL + "/gmail/v1/users/me/messages/", {
    headers: {
      "Accept": "application/json",
      "Authorization": "Bearer " + token,
    }
  });

  const data = await response1.json();
  const emailId = data.messages[0].id;

  const response2 = await request.get(baseURL + "/gmail/v1/users/me/messages/" + emailId, {
    headers: {
      "Accept": "application/json",
      "Authorization": "Bearer " + token,
    }
  });

   const emailDetails = await response2.json();

  // Extract subject from headers
  const subjectHeader = emailDetails.payload.headers.find(
    (header) => header.name === "Subject"
  );
  const subject = subjectHeader?.value || "";
  console.log("Email Subject:", subject);

  expect(subject).toContain("Congratulations on Registering!");
},60000);
