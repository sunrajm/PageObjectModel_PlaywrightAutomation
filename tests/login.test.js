const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const { users, errorMessage } = require('../utils/testData');

test.describe('Login Test', () => {
    /**@type {LoginPage} */

    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    //Positive test
    test('TC01 - Valid login with standard user', async ({ page }) => {
        await loginPage.login(users.standard.username, users.standard.password);
        await expect(page).toHaveURL('/inventory.html');
    });

    //Negative test for locked user
    test('TC02 - Locked User should see error', async () => {
        await loginPage.login(users.locked.username, users.locked.password);
        let errorMsg = await loginPage.getErrorMessage();
        await expect(errorMsg).toContain(errorMessage.lockedUser);
    });

    //Negative test for invalid credentials
    test("TC03 - Invalid credentials should see error", async () => {
        await loginPage.login(users.invalid.username, users.invalid.password);
        let error = await loginPage.getErrorMessage();
        await expect(error).toContain(errorMessage.invalidUser);
    });

    test("TC04 - Empty username should see error", async () => {
        await loginPage.login("", users.standard.password);
        let error = await loginPage.getErrorMessage();
        await expect(error).toContain(errorMessage.emptyUsername);
    });

    test("TC05 - Empty password should see error", async () => {
        await loginPage.login(users.standard.username, "");
        let error = await loginPage.getErrorMessage();
        //console.log(error);
        await expect(error).toContain(errorMessage.emptyPassword);
    });

});