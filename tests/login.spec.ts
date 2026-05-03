import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('SauceDemo Login - Smoke and Regression Tests', () => {
    test('TC-01: Login with valid credentials → user lands on inventory page', async ({ page }) => {
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);
  
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');
      
      await expect(page).toHaveURL(/inventory.html/);
      await inventoryPage.isLoaded();
      await expect(inventoryPage.title).toHaveText('Products');
      await expect(inventoryPage.inventoryList).toBeVisible();
    });
  
    test('TC-02: Login with locked out user → error message displayed → remain on login page', async ({ page }) => {
      const loginPage = new LoginPage(page);
  
      await loginPage.goto();
      await loginPage.login('locked_out_user', 'secret_sauce');
  
      await expect(loginPage.errorMessage).toContainText('locked out');
      await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
  
    test('TC-03: Login with invalid password → error message displayed → remain on login page', async ({ page }) => {
      const loginPage = new LoginPage(page);
  
      await loginPage.goto();
      await loginPage.login('standard_user', 'wrong_password');
  
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
  });

test.describe('SauceDemo Session and Navigation Tests', () => {
    test('TC-06: Access inventory without login → redirect to login page → error message displayed', async ({ page }) => {
      await page.goto('https://www.saucedemo.com/inventory.html');
  
      await expect(page).toHaveURL(/saucedemo.com/);
      await expect(page.locator('[data-test="error"]')).toContainText(
        'You can only access'
      );
    });
});
