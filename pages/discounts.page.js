import {test, expect} from '@playwright/test';

export class DiscountsPage {
    constructor(page) {
        this.page = page;
        this.minimalPriceInput = page.locator("//input[@id='Cena-filter-input-min']");
        this.maximalPriceInput = page.locator("//input[@id='Cena-filter-input-max']");
        this.sortByDropdown = page.locator("//button[contains(text(), 'Zoradené podľa:')]");
        this.sortByDropdownOptions = page.locator("//div[@aria-label='dropdown']");

        this.resetFiltersButton = page.locator("//span[text()=' Zrušiť filtre ']"); /* //li[@class='s-selections__reset'] */
        this.appliedFilters = page.locator("//li[@class='s-selection']");
        /*Filter options*/
        this.showOnlyAvailableProductsButton = page.locator("//span[text()='zobraziť len dostupné produkty']");
        this.amountOfProducts = page.locator("//h1[contains(text(), 'Zľavy')]/following-sibling::span");
        /**/
        this.foundProducts = page.locator("//ol[@id='s-results']//li[@class='s-grid__item']");
    }

    async fillInMinimalPrice(minimalPrice) {
        await test.step("User clicks", async () => {
            await this.minimalPriceInput.clear();
            await this.minimalPriceInput.fill(minimalPrice);
            await this.minimalPriceInput.press('Enter');
        });
    }

    async fillInMaximalPrice(maximalPrice) {
        await test.step("User clicks", async () => {
            await this.maximalPriceInput.clear();
            await this.maximalPriceInput.fill(maximalPrice);
            await this.maximalPriceInput.press('Enter');
        });
    }

    async selectSortingOption(optionName) {
        await test.step("User hover", async () => {
            await this.sortByDropdown.hover();
            await expect(this.sortByDropdownOptions).toBeVisible();
            await this.sortByDropdownOptions.locator(`//a[@data-label='${optionName}']`).click();
        });
    }

    async selectFilteringCategory(categoryName) {
        await test.step("User clicks", async () => {
            await this.page.locator(`//li[@class='s-facet__item']//span[contains(text(), '${categoryName}')]`).click();
        });
    }

    async selectFilteringBrand(brandName) {
        await test.step("User clicks", async () => {
            await this.page.locator(`//li[@class='s-facet__item']//span[text()='${brandName}']`).click();
        });
    }

    async selectFilteringColor(colorName) {
        await test.step("User clicks", async () => {
            await this.page.locator(`//li[@class='s-facet__item']//span[contains(text(), '${colorName}')]`).click();
        });
    }

    async selectFilteringRating(ratingName) {
        await test.step("User clicks", async () => {
            await this.page.locator(`//li[@class='s-facet__item']//span[text()='${ratingName}']`).click();
        });
    }

    async selectFilteringSize(sizeValue) {
        await test.step("User clicks", async () => {
            await this.page.locator(`//li[contains(@class, 's-facet__item')]//span[text()='${sizeValue}']`).click();
        });
    }

    async selectFilteringMaterial(materialName) {
        await test.step("User clicks", async () => {
            await this.page.locator(`//li[@class='s-facet__item']//span[text()='${materialName}']`).click();
        });
    }

    async clickShowOnlyAvailableProductsButton() {
        await test.step("User clicks", async () => {
            await this.showOnlyAvailableProductsButton.click();
        });
    }

    async getAmountOfProducts() {
        return await test.step("", async () => {
            let str = await this.amountOfProducts.textContent();
            let match = str.match(/-?\d+/);
            str = match ? parseInt(match[0], 10) : null;
            console.log(`Amount of products is: ${str}`);
            return str;
        });
    }

    async clickResetFiltersButton() {
        await test.step("User clicks", async () => {
            await this.resetFiltersButton.click();
        });
    }

    async getListOfFoundProductsDetails() {
        return await test.step("Get details of all found products", async () => {
            const listOfFoundProducts = await this.foundProducts.all();
            const productsDetails = [];

            for (const product of listOfFoundProducts) {
                await product.scrollIntoViewIfNeeded({ timeout: 15000 });

                const productSequentialNumber = this.extractNumber(await product.getAttribute('id'));
                console.log(`productSequentialNumber: ${productSequentialNumber}`);
                const productCurrentPrice = this.extractNumber(await product.locator("//div[@class='m-price__bottom']").textContent());
                const productInitialPrice = this.extractNumber(await product.locator("//div[@class='m-price__top']").textContent());
                const productDiscount = this.extractNumber(await product.locator("//div[@class='m-price__label']").textContent());

                productsDetails.push({
                    productSequentialNumber,
                    productCurrentPrice,
                    productInitialPrice,
                    productDiscount
                });
            }
            return productsDetails;
        });
    }

    extractNumber(str) {
        if (!str) return null;
        const match = str.match(/-?\d+(\.\d+)?/);
        return match ? parseFloat(match[0]) : null;
    }

    checkSortOrder(array, compareFn) {
        return array.every((item, index) =>
            index === 0 || compareFn(array[index - 1], item)
        );
    }

    isSortedByHighestDiscount(array) {
        const filteredArray = array.filter(product => product.productDiscount !== null);
        return this.checkSortOrder(filteredArray, (previous, current) =>
            previous.productDiscount <= current.productDiscount
        );
    }

    isSortedByLowestCurrentPrice(array) {
        return this.checkSortOrder(array, (previous, current) =>
            previous.productCurrentPrice <= current.productCurrentPrice
        );
    }

    isSortedByHighestCurrentPrice(array) {
        return this.checkSortOrder(array, (previous, current) =>
            previous.productCurrentPrice >= current.productCurrentPrice
        );
    }
}