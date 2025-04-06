import {test} from '@playwright/test';

export class AccountPage {
    constructor(page) {
        this.page = page;
        /* logged-out state */
        this.emailInput = page.locator("//span[text()='E-mailová adresa']/following-sibling::input");
        this.passwordInput = page.locator("//span[text()='Heslo']/following-sibling::input");
        this.loginButton = page.locator("//span[text()='Prihlásiť sa']/parent::button");
        this.errorMessage = page.locator("//div[@data-testid='input-email-error-message']");
        /* logged-in state */
        this.logoutButton = page.locator("//button[text()='Odhlásiť sa']");
    }

    async fillInEmail(email) {
        await test.step("User clicks", async () => {
            await this.emailInput.fill(email);
        });
    }

    async fillInPassword(password) {
        await test.step("User clicks", async () => {
            await this.passwordInput.fill(password);
        });
    }

    async clickLoginButton() {
        await test.step("User clicks", async () => {
            await this.loginButton.click();
        });
    }
}