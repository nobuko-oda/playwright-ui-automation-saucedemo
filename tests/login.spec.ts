import { test, expect, Page } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com/';

async function login(page: Page, username: string, password: string) {
  await page.goto(BASE_URL);
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');
}

test.describe('SauceDemo Login - Smoke and Regression Tests', () => {
  test('TC-01: Login with valid credentials', async ({ page }) => {
    await login(page, 'standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.title')).toHaveText('Products');
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('TC-02: Login with locked out user', async ({ page }) => {
    await login(page, 'locked_out_user', 'secret_sauce');

    await expect(page.locator('[data-test="error"]')).toContainText('locked out');
    await expect(page).toHaveURL(BASE_URL);
  });

  test('TC-03: Login with invalid password', async ({ page }) => {
    await login(page, 'standard_user', 'wrong_password');

    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page).toHaveURL(BASE_URL);
  });
});

test.describe('SauceDemo Session and Navigation Tests', () => {
  test('TC-06: Access inventory without login', async ({ page }) => {
    await page.goto(`${BASE_URL}inventory.html`);

    await expect(page).toHaveURL(BASE_URL);
    await expect(page.locator('[data-test="error"]')).toContainText('You can only access');
  });
});
