const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductPage = require('../pages/ProductPage');
const CartPage = require('../pages/CartPage');
const { users, productNames, products } = require('../utils/testData');

test.describe('Cart Page Tests', () => {
    /**@type{CartPage} */
    let cartPage;
    /**@type{ProductPage} */
    let productPage;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
    });

    //TC01 - Cart page title
    test('TC01- Cart page title should be Your Cart', async () => {
        await productPage.clickAddToCartButton(productNames.backpack);
        await productPage.clickElement(productPage.cartIcon);
        const title = await cartPage.getPageTitle();
        expect(title).toBe('Your Cart');
    })

    //TC02 - Added products appear in cart
    test('TC02 - Added products should appear in cart', async () => {
        await productPage.clickAddToCartButton(productNames.bikeLight);
        await productPage.clickElement(productPage.cartIcon);
        const isInCart = await cartPage.isItemInCart(products.bikeLight);
        expect(isInCart).toBeTruthy();
    })

    //TC03 - Cart shows correct item count
    test('TC03 - Cart should show correct item count', async () => {
        await productPage.clickAddToCartButton(productNames.backpack);
        await productPage.clickAddToCartButton(productNames.bikeLight);
        await productPage.clickElement(productPage.cartIcon);
        const count =  await cartPage.getCartItemCount();
        expect(count).toBe(2);
    })

    //TC04 - Remove item from cart
    test('TC04 - Remove item from cart',async({page})=>{
        await productPage.clickAddToCartButton(productNames.backpack);
        await productPage.clickAddToCartButton(productNames.bikeLight);
        await productPage.clickElement(productPage.cartIcon);
        await cartPage.removeItemFromCart(productNames.backpack);
        //await page.locator("[data-test='remove-sauce-labs-backpack']").click();
        const count = await cartPage.getCartItemCount();
        expect(count).toBe(1);
    })

    //TC05 - Continue shopping goes back to product
    test('TC05 - Continue shopping should go back to products',async({page})=>{
        await productPage.clickElement(productPage.cartIcon);
        await cartPage.continueShopping();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })

    //TC06 - Checkout button navigates to checkout
    test('TC06 - Checkout button should go to checkout page',async({page})=>{
        await productPage.clickAddToCartButton(productNames.bikeLight);
        await productPage.clickElement(productPage.cartIcon);
        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    })

});