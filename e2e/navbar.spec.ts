import { test } from '@playwright/test';
import { login } from './utils';

test.describe('Navbar and permissions', () => {
  test.afterEach(async ({ page }) => {
    await page.locator('a:has-text("Déconnexion")').last().click();
  });

  test('should have export and users links when admin', async ({ page }) => {
    await login(page);
    await test.expect(page.locator('#navbar a:has-text("Exports")')).toHaveCount(1);
    await test.expect(page.locator('#navbar a:has-text("Utilisateurs")')).toHaveCount(1);
  });

  test('should have export link when claire', async ({ page }) => {
    await login(page, 'clairebrucy@gmail.com');
    await test.expect(page.locator('#navbar a:has-text("Exports")')).toHaveCount(1);
    await test.expect(page.locator('#navbar a:has-text("Utilisateurs")')).toHaveCount(0);
  });

  test('should not have export link when lansana', async ({ page }) => {
    await login(page, 'lansana@gmail.com');
    await test.expect(page.locator('#navbar a:has-text("Exports")')).toHaveCount(0);
    await test.expect(page.locator('#navbar a:has-text("Utilisateurs")')).toHaveCount(0);
  });
});
