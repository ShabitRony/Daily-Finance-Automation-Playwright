import {test,expect} from "@playwright/test";
// import { faker } from '@faker-js/faker';
import jsonData from "../Utils/userData.json";
import LoginPage from "../pages/LoginPage";

test("User Login With New Password", async ({page})=>{
    await page.goto("/");

    const latestUser = jsonData[jsonData.length-1];
    const login = new LoginPage(page);
    await page.waitForTimeout(5000);
    await login.doLogin(latestUser.email, latestUser.password);

    await expect(page.getByText("Dashboard")).toBeVisible({timeout:20000});



    // await page.pause();
})
