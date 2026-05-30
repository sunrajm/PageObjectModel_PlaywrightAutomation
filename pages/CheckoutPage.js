const BasePage = require('./BasePage');

class CheckoutPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page; 
     */
    constructor(page) {
        super(page);
        //Step1 Locator
        this.firstNameField = page.locator("[placeholder='First Name']");
        this.lastNameField = page.locator("[placeholder='Last Name']");
        this.postalField = page.locator("[placeholder='Zip/Postal Code']");
        this.continueButton = page.locator("#continue");
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.errorMessage = page.locator("[data-test='error']");
        //Step2 Locator
        this.itemTotalLabel = page.locator(".summary_subtotal_label");
        this.taxLabel = page.locator(".summary_tax_label");
        this.totalLabel = page.locator(".summary_total_label");
        this.finishButton = page.locator("#finish");
        //confirmation Locator
        this.confirmHeader = page.locator(".complete-header");
        this.backHomeButton = page.locator("#back-to-products");
    }

    //---Step one Actions -----------
    async fillShippingInfo(firstName, lastName, postalCode) {
        this.typeText(this.firstNameField, firstName);
        this.typeText(this.lastNameField, lastName);
        this.typeText(this.postalField, postalCode);
    }

    async clickContinue() {
        await this.clickElement(this.continueButton);
    }

    async clickCancel() {
        await this.clickElement(this.cancelButton);
    }

    async getErrorMessage() {
        return await this.getText(this.errorMessage);
    }

    async isErrorVisible() {
        return await this.isVisible(this.errorMessage);
    }

    //--Step two actions ---
    async getItemTotal() {
        const text = await this.getText(this.itemTotalLabel);
        return parseFloat(text.replace("Item total: $", ""));
    }

    async getTax() {
        const text = await this.getText(this.taxLabel);
        return parseFloat(text.replace('Tax: $', ''));
    }

    async getOrderTotal() {
        const text = await this.getText(this.totalLabel);
        return parseFloat(text.replace("Total: $", ""));
    }

    async clickFinish() {
        await this.clickElement(this.finishButton);
    }

    //-- Confirmation Actions --
    async getConfirmationHeader(){
        return await this.getText(this.confirmHeader);
    }

    async clickBackToHome(){
        await this.clickElement(this.backHomeButton);
    }
}

module.exports = CheckoutPage;