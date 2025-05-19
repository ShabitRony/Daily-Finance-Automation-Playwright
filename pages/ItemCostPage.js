class ItemCostPage{
    constructor(page) {
        this.page = page;

        this.addCostBtn = page.getByRole("button",{name:"Add Cost"});
        this.itemNameTxt = page.getByRole("textbox",{name:"Item Name"});
        this.quantityBtn = page.getByRole("spinbutton");
        this.amountTxt = page.getByRole("spinbutton",{name:"Amount"});
        // this.dateTxt = page.getByRole("Date",{name:"Purchase Date"});
        this.month = page.locator("#month");
        this.remarksTxt = page.getByRole("textbox",{name:"Remarks"});
        this.submitBtn = page.getByRole("button",{name:"Submit"});

    }
    async itemCost(itemModel){
       await this.addCostBtn.click();
       await this.itemNameTxt.fill(itemModel.itemName);
       await this.quantityBtn.last().click();
       await this.amountTxt.fill(itemModel.amount);
    //    await this.dateTxt.fill(itemModel.purchaseDate);
       await this.month.selectOption(itemModel.month);
       await this.remarksTxt.fill(itemModel.remarks);
       await this.submitBtn.click();
    }
}
export {ItemCostPage}