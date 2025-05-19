import {test,expect} from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import jsonData from "../Utils/userData.json";
import { ProfilePage } from "../pages/ProfilePage";

test("User Login and Upload User Picture", async ({page})=>{
    await page.goto("/");

    const latestUser = jsonData[jsonData.length-1];
    const login = new LoginPage(page);
    await login.doLogin(latestUser.email, latestUser.password);

     const profile = new ProfilePage(page);
     const imagePath = 'E:\\Playwright-B14-Class2\\images\\pp.jpg';
     await profile.uploadProfilePicture(imagePath);
     
    await login.doLogout();
});