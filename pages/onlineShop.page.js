import {test} from '@playwright/test';

export class OnlineShopPage {
    constructor(page) {
        this.page = page;
        this.discountsButton = page.locator("//div[@class='ux-base-slider']/descendant::span[text()='Zľavy']");
    }

    async clickDiscountsButton() {
        await test.step("User clicks", async () => {
            await this.discountsButton.click();
        });
    }
}