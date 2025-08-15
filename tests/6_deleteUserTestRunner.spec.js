import { test } from "@playwright/test";
import { getLatestUser, removeLatestUserFromFile } from "../Utils/userUtils.js";
import DeleteUser from "../pages/DeleteUser.js";

test("Delete the latest registered user", async ({ request }) => {
  // 1️⃣ Get latest user
  const latestUser = getLatestUser();

  // 2️⃣ Create DeleteUser page object
  const apiPage = new DeleteUser(request);

  // 3️⃣ Delete user & assert
  await apiPage.deleteUserById(latestUser.userId);

  // 4️⃣ Remove user from local file only after successful delete
  removeLatestUserFromFile();
});
