const { test, expect } = require('@playwright/test')
const LoginPage = require('../pages/LoginPage');
const ProductPage = require('../pages/ProductPage');
const { users, productNames } = require('../utils/testData');

test.describe('Product Page Tests', () => {
    /**@type {ProductPage} */
    let productPage;

    test.beforeEach(async ({ page }) => {
        //Login before every test
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);
        productPage = new ProductPage(page);
    });

    //TC01 - Verify page title
    test('TC01 - Product page title should be Products', async () => {
        const title = await productPage.getPageTitle();
        expect(title).toBe('Products');
    });

    //TC02 - Verify total product count
    test('TC02 - Should display 6 products', async () => {
        const count = await productPage.getTotalProductCount();
        expect(count).toBe(6);
    });

    //TC03 - Add Single product to cart
    test('TC03 - Add backpack to cart', async () => {
        await productPage.clickAddToCartButton(productNames.backpack);
        const count = await productPage.getCartCount();
        expect(count).toBe('1');
    });

    //TC04 - Add multiple products to cart
    test('TC04 - Add two products to cart', async () => {
        await productPage.clickAddToCartButton(productNames.backpack);
        await productPage.clickAddToCartButton(productNames.bikeLight);
        const count = await productPage.getCartCount();
        await expect(count).toBe('2');
    });

    //TC05 - Remove product from cart
    test('TC05 - Remove product from cart', async () => {
        await productPage.clickAddToCartButton(productNames.backpack);
        await productPage.clickRemoveButton(productNames.backpack);
        const count = await productPage.getCartCount();
        await expect(count).toBe('0');
    });

    //TC06 - Sort by price low to high
    test('TC06 - Sort products price low to high', async () => {
        await productPage.selectSortOption('lohi');
        const prices = await productPage.getPriceOfAllProduct();
        const sorted = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sorted);
    })

    //TC07 - Sort by price high to low
    test('TC07 - Sort products price high to low', async () => {
        await productPage.selectSortOption('hilo');
        const prices = await productPage.getPriceOfAllProduct();
        const sorted = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sorted);
    });

    //TC08 - Logout from product page
    test('TC08 - Logout should redirect to login page', async ({ page }) => {
        await productPage.logOut();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

})