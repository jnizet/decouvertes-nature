import { test } from '@playwright/test';
import { login, randomString } from './utils';

test.describe('Users', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('should display, create and modify users', async ({ page }) => {
    await page.click('text=Utilisateurs');

    await test.expect(page.locator('h2', { hasText: 'Admin' })).toBeVisible();

    await page.click('text=Créer un utilisateur');
    const name = randomString();
    const email = randomString() + '@gmail.com';
    await page.fill('text=Nom', name);
    await page.fill('text=Adresse email', email);
    await page.check('text=Administrateur');
    await page.check('text=Exporteur');
    await page.click('text=Enregistrer');

    await test.expect(page.locator('h2', { hasText: name })).toBeVisible();

    const card = page.locator('.card', { hasText: name });
    await test.expect(card).toContainText('Administrateur');
    await test.expect(card).toContainText('Exporteur');
    await test.expect(card).not.toContainText('désactivé');

    await card.locator('text=Modifier').click();
    await page.check('text=Désactivé');
    await page.click('text=Enregistrer');
    await test.expect(card).toContainText('désactivé');
  });
});
