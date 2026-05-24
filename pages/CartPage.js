const BasePage = require('./BasePage');

class CartPage extends BasePage {
    /**
     * @param{import('@playwright/test').Page} page
     */

    constructor(page) {
        super(page);
        //Locators
        this.pageTitle = page.locator('.title');
        this.cartItems = page.locator('.cart_item');
        this.itemNames = page.locator(".inventory_item_name");
        this.itemPrices = page.locator(".inventory_item_price");
        this.checkoutButton = page.locator("#checkout");
        this.continueShoppingButton = page.locator('#continue-shopping');
    }

    async getRemoveButton(productId) {
        //this.page.waitForEvent()
        //await this.page.locator(`[data-test="remove-${productId}"]`).waitFor({state:'visible'});
        return await this.page.locator(`#remove-${productId}`);
    }

    async getPageTitle() {
        return await this.getText(this.pageTitle);
    }

    async getCartItemCount() {
        return await this.cartItems.count();
    }

    async getCartItemNames() {
        return await this.itemNames.allTextContents();
    }

    async getCartItemPrices() {
        const prices = await this.itemPrices.allTextContents();
        return prices.map(p => parseFloat(p.replace('$', '')));
    }

    async removeItemFromCart(productId) {
        await this.clickElement(this.page.locator(`[data-test="remove-${productId}"]`));
    }

    async isItemInCart(productName) {
        const names = await this.getCartItemNames();
        return names.includes(productName);
    }

    async proceedToCheckout() {
        await this.clickElement(this.checkoutButton);
    }

    async continueShopping() {
        await this.clickElement(this.continueShoppingButton);
    }
}

module.exports = CartPage;