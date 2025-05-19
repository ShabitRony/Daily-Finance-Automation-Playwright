# 💰 Daily Finance Functional Automation Testing with Playwright
- This project contains a **functional test suite** built using **[Playwright](https://playwright.dev/)** for the website:  
🔗 [https://dailyfinance.roadtocareer.net/](https://dailyfinance.roadtocareer.net/)
# Test Case Link
https://docs.google.com/spreadsheets/d/1vlXPo2bhN1QYtVtxZ0dIKUfTl3vpGA-Lm_EZjI2u4Xw/edit?usp=sharing
## 📌 Project Overview

This test simulates a user journey through key features of the Daily Finance platform:

- ✅ **User Registration**
- 📬 **Email Verification (Congratulations Mail)**
- 🔔 **Toast Message Assertion**
- 🔐 **User Login**
- 🛒 **Add Random 2 Items to Item List**
- 📋 **Verify Item Count**
- 👤 **Update Profile Picture**
- 🚪 **Logout**
- 🔁 **Reset Password**
- 🔓 **Login with New Password and Validate**

📝 Test Scenario Summary
- 📝 Register User & Verify Email
- Register a new user with unique credentials

**Assert that:

✅ A "Congratulations" email is received

✅ A toast notification appears confirming success

- 🔐 Login & Add Items
- Login with the new user

- Add 2 random items

- Assert that 2 items are shown on the list

- 👤 Update Profile Picture
- Go to profile settings

- Upload a profile photo

- 🚪 Logout
- 🔁 Reset Password Flow
- Click on "Reset it here" from login page

- Get reset link from Gmail

- Set a new password

- 🔓 Login with New Password
- Login using the updated credentials

- Verify successful login
# Allure Report OverView
![plywrightallure9](https://github.com/user-attachments/assets/5fbc0ce6-38f6-40c2-a7e8-9702aab1ec66)
# Allure Report Behaviors
![plywrightallurer19](https://github.com/user-attachments/assets/d9e468b7-b0d4-4ee8-a9cf-a39f5910ece1)

# Recorded Video of the Automation Process


https://github.com/user-attachments/assets/25c7a03a-a889-4219-a5c1-1e5f2bdf5df7


    

 ## 🧪 Tech Stack

- 🎭 [Playwright](https://playwright.dev/)
- 🧪 Playwright Test Runner
- 📄 JavaScript 
- 📧 Gmail API (OAuth 2.0) for email verification
- 💾 JSON (for storing test user data)

## 🧰 Prerequisites

- Node.js (v18 or higher)
- Playwright (`npx playwright install`)
## 🚦 How to Run the Tests

```bash
# Install dependencies
npm install

# Run all tests
npx playwright test

# To run a specific test file
npx playwright test tests/YourTestFile.spec.js

# Optional: generate and view Allure report
npx allure generate ./allure-results --clean -o ./allure-report
npx allure open ./allure-report
- Gmail API token setup (for mail reading)
- `userData.json` file to manage test users

  
