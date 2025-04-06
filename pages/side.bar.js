import {test} from '@playwright/test';

export class SideBar {
    constructor(page) {
        this.page = page;
        this.onlineShopButton = page.locator("//a[@data-ga-label='Online Shop']/span[text()='Online Shop']");
        this.discountsButton = page.locator("//a[@data-ga-label='Zľavy']/span[text()='Zľavy']");
    }

    async clickOnlineShopButton() {
        await test.step("User clicks", async () => {
            await this.onlineShopButton.click();
        });
    }

    async clickDiscountsButton() {
        await test.step("User clicks", async () => {
            await this.discountsButton.click();
        });
    }
}