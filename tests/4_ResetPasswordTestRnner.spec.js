import {test,expect} from "@playwright/test";
import jsonData from "../Utils/userData.json";
import { ResetPasswordPage } from "../pages/ResetPasswordPage";
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();


const baseURL= "https://gmail.googleapis.com";
const token = process.env.GMAIL_API_TOKEN;

test("Reset Password",async({page , request})=>{
    await page.goto("/");

    const latestUser = jsonData[jsonData.length-1];
    const resetPassword = new ResetPasswordPage(page);
    await resetPassword.resetPassword(latestUser.email);
    await page.waitForTimeout(5000);


    const response1 = await request.get(baseURL+"/gmail/v1/users/me/messages/" , {


        headers:{
            "Accept":"application/json",
            "Authorization":"Bearer "+token,
        }
    })

    const data = await response1.json();
    // console.log(data);
    const emailId = data.messages[0].id;

     const response2 = await request.get(baseURL+"/gmail/v1/users/me/messages/"+emailId , {


        headers:{
            "Accept":"application/json",
            "Authorization":"Bearer "+token,
        }
    })
    const resJson = await response2.json();
    console.log(resJson.snippet);
    const snippet = resJson.snippet;
    const linkMatch = snippet.match(/https?:\/\/[^\s]+/);
    if (linkMatch) {
    const resetLink = linkMatch[0];
    console.log("Reset Link:", resetLink);
        
  // Navigate to the reset link
  await page.goto(resetLink);
}
    const newpass = "12345";
    const setPassword = new ResetPasswordPage(page);
    await setPassword.newPassword(newpass);

    const filePath = path.resolve("Utils/userData.json");
    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    users[users.length - 1].password =newpass;

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
    console.log("Password updated in userData.json for last registered user");


    // await page.pause();

});
