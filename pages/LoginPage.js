const BasePage = require('./BasePage');
class LoginPage extends BasePage{
    /**
     * @param{import('@playwright/test).Page} page
     */
    constructor(page){
        super(page);

        //Locators
        this.userNameField = page.locator("#user-name");
        this.passwordField = page.locator("#password");
        this.loginButton=page.locator("#login-button");
        this.errorMessage=page.locator("[data-test='error']");
        this.errorCloseButton=page.locator("[data-test='error-button']");
    }

    //------------------Actions-------------
    async goto(){
        await this.navigateTo('/');
    }

    async login(username,password){
        await this.typeText(this.userNameField,username);
        await this.typeText(this.passwordField,password);
        await this.clickElement(this.loginButton);
    }

    async getErrorMessage(){
        return await this.getText(this.errorMessage);
    }

    async closeErrorMessage(){
        await this.clickElement(this.errorCloseButton);
    }

    async isErrorMessageVisible(){
        return await this.isVisible(this.errorMessage);
    }
}

module.exports = LoginPage;