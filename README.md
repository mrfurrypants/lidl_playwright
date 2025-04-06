Before running tests create lidl account and create .env file and add these properties:
  DEV_URL=https://www.lidl.sk/
  EMAIL=...
  PASSWORD=...

Commands to run tests:
  npx playwright test tests/tests_without_storageState/login.spec.js --workers=1 --headed
  npx playwright test tests/tests_with_storageState/discounts.spec.js --workers=1 --headed
