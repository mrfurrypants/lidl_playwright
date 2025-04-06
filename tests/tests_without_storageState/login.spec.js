// @ts-check
import { test, expect } from '@playwright/test';
import {NavBar} from "../../pages/nav.bar";
import {HomePage} from "../../pages/home.page";
import {AccountPage} from "../../pages/account.page";
import 'dotenv/config';

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

test('Test 1: positive login', { tag: '@high-priority' }, async ({ page }) => {
    const navBar = new NavBar(page);
    const accountPage = new AccountPage(page);
    const homePage = new HomePage(page);

    await page.goto("/");

    await homePage.clickAllowPersonalDataProcessingButton();
    await navBar.clickAccountButton();
    await accountPage.fillInEmail(email);
    await accountPage.fillInPassword(password);
    await accountPage.clickLoginButton();
    await page.waitForTimeout(1500);
    await expect(accountPage.logoutButton,"logout button should be visible").toBeVisible();
});

test('Test 2: negative login', { tag: '@high-priority' }, async ({ page }) => {
    const navBar = new NavBar(page);
    const accountPage = new AccountPage(page);
    const homePage = new HomePage(page);

    await page.goto("/");

    await homePage.clickAllowPersonalDataProcessingButton();
    await navBar.clickAccountButton();
    await accountPage.fillInEmail(email);
    await accountPage.fillInPassword("password");
    await accountPage.clickLoginButton();
    await page.waitForTimeout(1500);
    await expect(accountPage.errorMessage, "error message should be visible").toHaveText(`Neplatný email alebo nesprávne heslo. Skús to znova alebo vyber možnosť "Nepamätáš si heslo?"`);
});