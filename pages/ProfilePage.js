class ProfilePage {
    constructor(page) {
        this.page = page;

        this.iconBtn = page.getByRole("button", { name: "account of current user" });
        this.profileBtn = page.getByRole("menuitem", { name: "Profile" });
        this.editBtn = page.getByRole("button", { name: "EDIT" });
        this.fileInput = page.locator('input[type="file"]');
        this.imgBtn =page.getByRole("button",{name:"UPLOAD IMAGE"});
        this.updateBtn = page.getByRole("button", { name: "UPDATE" });
    }

    async uploadProfilePicture(filePath) {
        await this.iconBtn.click();
        await this.profileBtn.click();
        await this.editBtn.click();

        // Upload the image file
        await this.fileInput.setInputFiles(filePath);
        await this.imgBtn.click();

         await this.updateBtn.click();
        // Handle alert dialog BEFORE triggering it
        this.page.once('dialog', async (dialog) => {
            console.log("Alert message:", dialog.message());
            await dialog.accept();
        });

       
    }
}

export { ProfilePage };
