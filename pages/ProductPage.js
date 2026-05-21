const BasePage = require('./BasePage');

class ProductPage extends BasePage {
    /**
     * @param{import('@playwright/test').Page} page
     */

    constructor(page) {
        super(page);
        //locator
        this.pageTitle = this.page.locator(".title");
        this.sortDropdown = this.page.locator(".product_sort_container");
        this.cartIcon = this.page.locator(".shopping_cart_link");
        this.badgeCount = this.page.locator(".shopping_cart_badge");
        this.burgerMenu = this.page.locator("#react-burger-menu-btn");
        //this.allItems = this.page.getByRole("link", { name: "All Items" });
        //this.about = this.page.getByRole("link", { name: "About" });
        //this.logOut = this.page.getByRole("link", { name: "Logout" });
        //this.restAppState = this.page.getByRole("link", { name: "Reset App State" });
        this.logout = this.page.locator("#logout_sidebar_link");
        this.itemsList = this.page.locator(".inventory_item");
    }

    getAddToCartButton(productId) {
        return this.page.locator(`[data-test='add-to-cart-${productId}']`);
    }

    getRemoveToCartButton(productId) {
        return this.page.locator(`[data-test='remove-${productId}']`);
    }

    getPriceOfProduct(productName) {
        return this.page.locator(".inventory_item").filter({ hasText: productName }).locator(".inventory_item_price");
    }

    async clickAddToCartButton(productId) {
        await this.clickElement(this.getAddToCartButton(productId));
    }

    async clickRemoveButton(productId) {
        await this.clickElement(this.getRemoveToCartButton(productId));
    }

    async logOut() {
        await this.clickElement(this.burgerMenu);
        //await this.page.waitForSelector("#logout_sidebar_link", { state: 'visible' });
        await this.logout.waitFor({ state: 'visible' });
        await this.clickElement(this.logOut);

    }

    async selectSortOption(sortOption) {
        await this.sortDropdown.selectOption(sortOption);
    }

    async getTotalProductCount() {
        return this.itemsList.count();
    }

    async getPageTitle() {
        return this.getText(this.pageTitle);
    }

    async getPriceOfAllProduct() {
        const prices = this.page.locator(".inventory_item").allTextContents();
        return prices.map(p => parseFloat(p.replace('$', '')));
    }
}

module.exports = ProductPage;