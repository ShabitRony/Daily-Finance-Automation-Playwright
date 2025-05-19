import {test,expect} from "@playwright/test";
import { faker } from '@faker-js/faker';
import jsonData from "../Utils/userData.json";
import fs from "fs";
import RegistrationPage from "../pages/RegistrationPage.js";
import {generateRandomId} from "../Utils/utils.js";

test("User Registration",async({page})=>{
    await page.goto("/");

    const reg = new RegistrationPage(page);
    const userModel ={
        firstName : faker.person.firstName(),
        lastName : faker.person.lastName(),
        email : "shabitalahi123+623@gmail.com",
        password:"1234",
        phoneNumber:`014${generateRandomId(10000000,99999999)}`,
        address:faker.location.city()
    }

    await reg.registerUser(userModel);
    const toastLocator = page.locator(".Toastify__toast");
    toastLocator.waitFor({timeout:20000});
    const msg = await toastLocator.textContent();
    expect(msg).toContain("registered successfully!");

    jsonData.push(userModel);
    fs.writeFileSync("./Utils/userData.json",JSON.stringify(jsonData,null,2));
    // await page.pause();
});