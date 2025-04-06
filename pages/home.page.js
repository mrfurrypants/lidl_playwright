import {test} from '@playwright/test';

export class HomePage {
    constructor(page) {
        this.page = page;
        this.discountsButton = page.locator("//div[@class='ux-base-slider']/descendant::span[text()='Zľavy']");
        this.allowPersonalDataProcessingButton = page.locator("//button[text()='POVOLIŤ']");
    }

    async clickDiscountsButton() {
        await test.step("User clicks", async () => {
            await this.discountsButton.click();
        });
    }

    async clickAllowPersonalDataProcessingButton() {
        await test.step("User clicks", async () => {
            await this.allowPersonalDataProcessingButton.click();
        });
    }
}