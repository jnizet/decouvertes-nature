import { test } from '@playwright/test';
import { login } from './utils';

test.describe('Login', () => {
  test('should login', async ({ page }) => {
    await login(page);
  });
});
