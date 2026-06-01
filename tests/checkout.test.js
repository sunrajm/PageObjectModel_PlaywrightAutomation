const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductPage = require('../pages/ProductPage');
const CartPage = require('../pages/CartPage');
const { users, productNames, shippingInfo } = require('../utils/testData');
const CheckoutPage = require('../pages/CheckoutPage');

test.describe('Checkout Tests', () => {
    /**@type{CheckoutPage}*/
    let checkoutPage;
    /**@type{ProductPage}*/
    let productPage;
    /**@type{CartPage} */
    let cartPage;

    test.beforeEach(async ({ page }) => {
        //Login
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);

        //Add product and go to checkout
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        await productPage.clickAddToCartButton(productNames.backpack);
        await productPage.clickElement(productPage.cartIcon);
        await cartPage.proceedToCheckout();
    });

    //--TC1--
    test('TC01 - Valid info should go to step two', async ({ page }) => {
        const { firstName, lastName, postalCode } = shippingInfo.valid;
        await checkoutPage.fillShippingInfo(firstName, lastName, postalCode);
        await checkoutPage.clickContinue();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    });

    test('TC02 - Empty first name should show error', async () => {
        const { firstName, lastName, postalCode } = shippingInfo.missingFirstName;
        await checkoutPage.fillShippingInfo(firstName, lastName, postalCode);
        await checkoutPage.clickContinue();
        const error = await checkoutPage.getErrorMessage();
        expect(error).toContain('Error: First Name is required');
    });

    test('TC03 - Empty last name should show error', async () => {
        const { firstName, lastName, postalCode } = shippingInfo.missingLastName;
        await checkoutPage.fillShippingInfo(firstName, lastName, postalCode);
        await checkoutPage.clickContinue();
        const error = await checkoutPage.getErrorMessage();
        expect(error).toContain('Error: Last Name is required');
    });


    test('TC04 - Empty postal code should show error', async () => {
        const { firstName, lastName, postalCode } = shippingInfo.missingPostalCode;
        await checkoutPage.fillShippingInfo(firstName, lastName, postalCode);
        await checkoutPage.clickContinue();
        const error = await checkoutPage.getErrorMessage();
        expect(error).toContain('Error: Postal Code is required');
    });

    //Step-2 test
    test('TC05 - Order total should equal items plus tax', async () => {
        const { firstName, lastName, postalCode } = shippingInfo.valid;
        await checkoutPage.fillShippingInfo(firstName, lastName, postalCode);
        await checkoutPage.clickContinue();
        
        const itemTotal = await checkoutPage.getItemTotal();
        const tax = await checkoutPage.getTax();
        const orderTotal = await checkoutPage.getOrderTotal();

        expect(orderTotal).toBeCloseTo(itemTotal+tax,2);
    });

    test('TC06 - Complete order should show confirmation', async({page})=>{
        const { firstName, lastName, postalCode } = shippingInfo.valid;
        await checkoutPage.fillShippingInfo(firstName,lastName,postalCode);
        await checkoutPage.clickContinue();
        await checkoutPage.clickFinish();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
        const header = await checkoutPage.getConfirmationHeader();
        expect(header).toBe('Thank you for your order!');
    });

    test('TC07 - Back to home after order', async({page})=>{
        const { firstName, lastName, postalCode } = shippingInfo.valid;
        await checkoutPage.fillShippingInfo(firstName,lastName,postalCode);
        await checkoutPage.clickContinue();
        await checkoutPage.clickFinish();
        await checkoutPage.clickBackToHome();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
});