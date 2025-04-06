// @ts-check
import { test, expect } from '@playwright/test';
import {NavBar} from "../../pages/nav.bar";
import {SideBar} from "../../pages/side.bar";
import {DiscountsPage} from "../../pages/discounts.page";

test('Test 1: parse products amount - apply filters - parse products amount - reset filters - parse products amount - Expected Result: products amount becomes the same as before filters were applied', { tag: '@low-priority' }, async ({ page }) => {
  const navBar = new NavBar(page);
  const sideBar = new SideBar(page);
  const discountsPage = new DiscountsPage(page);

  /* Going to discounts page. */
  await page.goto('/');
  await navBar.clickMenuButton();
  await sideBar.clickOnlineShopButton()
  await sideBar.clickDiscountsButton();

  /* Parsing overall amount of products before sorting and filtering. */
  const amountOfProducts1 = await discountsPage.getAmountOfProducts();

  /* Selecting specific filtering types to be sure that buttons are clickable. */
  await discountsPage.selectFilteringCategory('Domácnosť');
  await discountsPage.fillInMinimalPrice('10');
  await discountsPage.fillInMaximalPrice('200');
  await discountsPage.selectFilteringRating('1 a viac');
  await discountsPage.clickShowOnlyAvailableProductsButton();
  await discountsPage.selectFilteringColor('biela');

  /* Parsing amount of products after applying filters. */
  await page.waitForTimeout(1000);
  const amountOfProducts2 = await discountsPage.getAmountOfProducts();

  /* Resetting filters. */
  await discountsPage.clickResetFiltersButton();

  /* Parsing amount of products after resetting filters. */
  await page.waitForTimeout(1000);
  const amountOfProducts3 = await discountsPage.getAmountOfProducts();

  /* Checking if the amount of products is the same after applying and resetting filters. */
  expect(amountOfProducts1).toBe(amountOfProducts3);
  expect(amountOfProducts2).toBeLessThan(amountOfProducts1);
  expect(amountOfProducts2).toBeLessThan(amountOfProducts3);
});

test('Test 2: apply filters - parse products amount - changing sorting (ByLowestCurrentPrice) - change filters (modify min price) - parse products amount - Expected Result: sorting persisted and products amount changed', { tag: '@low-priority' }, async ({ page }) => {
  const discountsPage = new DiscountsPage(page);

  /* Going to discounts page. */
  await page.goto('/q/query/zlavy?availabilityIndicator=3.0&availabilityIndicator=3.01&color=biela&price=200&price=10&discountFlag=1&category=Dom%C3%A1cnos%C5%A5&ratingAverage=5.01&ratingAverage=1.0');

  /* Parsing overall amount of products after filtering. */
  const amountOfProductsBeforeChangingSortingAndFiltering = await discountsPage.getAmountOfProducts();

  /* Change sorting type */
  await discountsPage.selectSortingOption('Najnižšej ceny');

  /* Change filtering */
  await discountsPage.fillInMinimalPrice('40');

  /* Parsing amount of products after changing sorting type. */
  await page.waitForTimeout(1000);
  const amountOfProductsAfterChangingSortingAndFiltering = await discountsPage.getAmountOfProducts();

  /* Parse products details */
  const listOfFoundProductsDetails = await discountsPage.getListOfFoundProductsDetails();

  expect(discountsPage.isSortedByHighestCurrentPrice(listOfFoundProductsDetails), "Sorting by Lowest Current Price isn't correct").toBe(true);
  expect(amountOfProductsAfterChangingSortingAndFiltering).toBeLessThanOrEqual(amountOfProductsBeforeChangingSortingAndFiltering);
});

test('Test 3: apply filters through link - parse products amount - changing sorting (ByHighestCurrentPrice) - parse products amount - Expected Result: sorting is correct, filters persisted and products amount persisted', { tag: '@low-priority' }, async ({ page }) => {
  const discountsPage = new DiscountsPage(page);

  /* Going to discounts page. */
  await page.goto('/q/query/zlavy?availabilityIndicator=3.0&availabilityIndicator=3.01&color=biela&price=200&price=10&discountFlag=1&category=Dom%C3%A1cnos%C5%A5&ratingAverage=5.01&ratingAverage=1.0');

  /* Parsing overall amount of products after filtering. */
  const amountOfProductsBeforeChangingSorting = await discountsPage.getAmountOfProducts();

  /* Change sorting type */
  await discountsPage.selectSortingOption('Najvyššej ceny');

  /* Parsing amount of products after changing sorting type. */
  await page.waitForTimeout(1000);
  const amountOfProductsAfterChangingSorting = await discountsPage.getAmountOfProducts();

  /* Parse products details */
  const listOfAppliedFilters = await discountsPage.appliedFilters.all();
  const listOfFoundProductsDetails = await discountsPage.getListOfFoundProductsDetails();

  expect(discountsPage.isSortedByHighestCurrentPrice(listOfFoundProductsDetails), "Sorting by Highest Current Price isn't correct").toBe(true);
  expect(amountOfProductsBeforeChangingSorting).toBe(amountOfProductsAfterChangingSorting);
  expect(listOfAppliedFilters).toHaveLength(5);
  for (const filter of listOfAppliedFilters) {
    await expect(filter).toBeVisible();
  }
});

test('Test 4: apply filters through link - parse products amount - changing sorting (ByLowestCurrentPrice) - parse products amount - Expected Result: sorting is correct, filters persisted and products amount persisted', { tag: '@low-priority' }, async ({ page }) => {
  const discountsPage = new DiscountsPage(page);

  /* Going to discounts page. */
  await page.goto('/q/query/zlavy?availabilityIndicator=3.0&availabilityIndicator=3.01&color=biela&price=200&price=10&discountFlag=1&category=Dom%C3%A1cnos%C5%A5&ratingAverage=5.01&ratingAverage=1.0');

  /* Parsing overall amount of products after filtering. */
  const amountOfProductsBeforeChangingSorting = await discountsPage.getAmountOfProducts();

  /* Change sorting type */
  await discountsPage.selectSortingOption('Najnižšej ceny');

  /* Parsing amount of products after changing sorting type. */
  await page.waitForTimeout(1000);
  const amountOfProductsAfterChangingSorting = await discountsPage.getAmountOfProducts();

  /* Parse products details */
  const listOfAppliedFilters = await discountsPage.appliedFilters.all();
  const listOfFoundProductsDetails = await discountsPage.getListOfFoundProductsDetails();

  expect(discountsPage.isSortedByLowestCurrentPrice(listOfFoundProductsDetails), "Sorting by Lowest Current Price isn't correct").toBe(true);
  expect(amountOfProductsBeforeChangingSorting).toBe(amountOfProductsAfterChangingSorting);
  expect(listOfAppliedFilters).toHaveLength(5);
  for (const filter of listOfAppliedFilters) {
    await expect(filter).toBeVisible();
  }
});

test('Test 5: apply filters through link - parse products amount - changing sorting (ByHighestDiscount) - parse products amount - Expected Result: sorting is correct, filters persisted and products amount persisted', { tag: '@low-priority' }, async ({ page }) => {
  const discountsPage = new DiscountsPage(page);

  /* Going to discounts page. */
  await page.goto('/q/query/zlavy?availabilityIndicator=3.0&availabilityIndicator=3.01&color=biela&price=200&price=10&discountFlag=1&category=Dom%C3%A1cnos%C5%A5&ratingAverage=5.01&ratingAverage=1.0');

  /* Parsing overall amount of products after filtering. */
  const amountOfProductsBeforeChangingSorting = await discountsPage.getAmountOfProducts();

  /* Change sorting type */
  await discountsPage.selectSortingOption('Najvyššej zľavy');

  /* Parsing amount of products after changing sorting type. */
  await page.waitForTimeout(1000);
  const amountOfProductsAfterChangingSorting = await discountsPage.getAmountOfProducts();

  /* Parse products details */
  const listOfAppliedFilters = await discountsPage.appliedFilters.all();
  const listOfFoundProductsDetails = await discountsPage.getListOfFoundProductsDetails();

  expect(discountsPage.isSortedByHighestDiscount(listOfFoundProductsDetails), "Sorting by Highest Discount isn't correct").toBe(true);
  expect(amountOfProductsBeforeChangingSorting, "").toBe(amountOfProductsAfterChangingSorting);
  expect(listOfAppliedFilters).toHaveLength(5);
  for (const filter of listOfAppliedFilters) {
    await expect(filter).toBeVisible();
  }
});