import { expect, test } from '@playwright/test';
import { checkAccessibility, login } from './utils';

test.describe('Login', () => {
  test('should login', async ({ page }) => {
    await login(page);
    await expect(page.locator('#user-dropdown')).toHaveText('Admin');
    await checkAccessibility(page);
  });
});
