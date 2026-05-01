import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('SauceDemo Login - Smoke and Regression Tests', () => {
    test('TC-01: Login with valid credentials', async ({ page }) => {
      const loginPage = new LoginPage(page);
  
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');
  
      await expect(page).toHaveURL(/inventory.html/);
      await expect(page.locator('.title')).toHaveText('Products');
      await expect(page.locator('.inventory_list')).toBeVisible();
    });
  
    test('TC-02: Login with locked out user', async ({ page }) => {
      const loginPage = new LoginPage(page);
  
      await loginPage.goto();
      await loginPage.login('locked_out_user', 'secret_sauce');
  
      await expect(loginPage.errorMessage).toContainText('locked out');
      await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
  
    test('TC-03: Login with invalid password', async ({ page }) => {
      const loginPage = new LoginPage(page);
  
      await loginPage.goto();
      await loginPage.login('standard_user', 'wrong_password');
  
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
  });

test.describe('SauceDemo Session and Navigation Tests', () => {
    test('TC-06: Access inventory without login', async ({ page }) => {
      await page.goto('https://www.saucedemo.com/inventory.html');
  
      await expect(page).toHaveURL(/saucedemo.com/);
      await expect(page.locator('[data-test="error"]')).toContainText(
        'You can only access'
      );
    });
});
