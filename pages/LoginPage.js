class LoginPage{

    constructor(page){
        this.page = page;

        this.emailTxt = page.getByRole("textbox",{name:"Email"})
        this.passwordTxt = page.getByRole("textbox",{name:"Password"})
        this.loginBtn = page.getByRole("button",{name:"LOGIN"});
        this.iconBtn = page.getByRole("button",{name:"account of current user"});
        this.logoutBtn = page.getByRole("menuitem",{name:"Logout"});

    }
    async doLogin(email , password){
        await this.emailTxt.fill(email)
        await this.passwordTxt.fill(password)
        await this.loginBtn.click()
    }
    async doLogout(){
        await this.iconBtn.click();
        await this.logoutBtn.click();
    }
}
export default LoginPage;