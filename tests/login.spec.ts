import { test, expect } from '@playwright/test';

test('TC-01: Login with valid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await expect(page).toHaveURL(/inventory/);
});

test('TC-03: Login with invalid password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'wrong_password');
  await page.click('#login-button');

  await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('TC-06: Access inventory without login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');

  await expect(page).toHaveURL('https://www.saucedemo.com/');
});
