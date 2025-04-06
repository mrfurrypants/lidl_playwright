import 'dotenv/config';
import { test as setup, expect } from '@playwright/test';
import {AccountPage} from "../../pages/account.page.js";
import {NavBar} from "../../pages/nav.bar.js";
import {HomePage} from "../../pages/home.page.js";

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

setup('authenticate', async ({ page }) => {
    const navBar = new NavBar(page);
    const accountPage = new AccountPage(page);
    const homePage = new HomePage(page);

    await page.goto("/");

    await homePage.clickAllowPersonalDataProcessingButton();
    await navBar.clickAccountButton();
    await accountPage.fillInEmail(email);
    await accountPage.fillInPassword(password);
    await accountPage.clickLoginButton();
    // await expect(accountPage.logoutButton,"logout button should be visible").toBeVisible();
    await page.context().storageState({ path: '.auth/auth.json' });
});