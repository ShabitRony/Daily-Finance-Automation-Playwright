import {test,expect} from "@playwright/test";
import { ItemCostPage } from "../pages/ItemCostPage";
import LoginPage from "../pages/LoginPage";
import jsonData from "../Utils/userData.json";
import { ProfilePage } from "../pages/ProfilePage";

test("User Login and Add Item Cost", async ({page})=>{
    await page.goto("/");

    const latestUser = jsonData[jsonData.length-1];
    const login = new LoginPage(page);
    await login.doLogin(latestUser.email, latestUser.password);

    const cost = new ItemCostPage(page);
     const firstItem = {
    itemName: "Shirt",
    amount: "500",
    month: "May",
    remarks: "Good",
  };
  await cost.itemCost(firstItem);

  // Second item
  const secondItem = {
    itemName: "Pants",
    amount: "700",
    month: "May",
    remarks: "Very Good",
  };
  await cost.itemCost(secondItem);

    await page.locator("table tbody tr").first().waitFor({timeout:50000});
    const firstRow = await page.locator("table tbody tr").first();
    const cells = await firstRow.locator("th").allTextContents();
    
    const secondRow = await page.locator("table tbody tr ").nth(0);
    const data = await secondRow.locator("td").allTextContents();
  
    
    const thirdRow = await page.locator("table tbody tr ").nth(1);
    const details = await thirdRow.locator("td").allTextContents();
    console.log(cells);
    console.log(data);
    console.log(details);
    
    
    // await page.pause();
});