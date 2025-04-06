import {test} from '@playwright/test';

export class NavBar {
    constructor(page) {
        this.page = page;
        this.homeButton = page.locator("//nav[@class='n-navigation__top-menu']//span[text()='Domov']");
        this.onlineShopButton = page.locator("//nav[@class='n-navigation__top-menu']//span[text()='Online Shop']");
        this.menuButton = page.locator("//nav[@class='n-navigation__top-menu']//span[text()='Menu']");
        this.accountButton = page.locator("//nav[@class='n-navigation__top-menu']//span[@class='m-icon m-icon--user']");
    }

    async clickOnlineShopButton() {
        await test.step("User clicks", async () => {
            await this.onlineShopButton.click();
        });
    }

    async clickMenuButton() {
        await test.step("User clicks", async () => {
            await this.menuButton.click();
        });
    }

    async clickAccountButton() {
        await test.step("User clicks", async () => {
            await this.accountButton.click();
        });
    }

    async clickHomeButton() {
        await test.step("User clicks", async () => {
            await this.homeButton.click();
        });
    }
}