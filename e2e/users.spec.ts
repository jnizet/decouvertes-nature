import { test } from '@playwright/test';
import { login } from './login.spec';

test.describe('Users', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('should display, create and modify users', async ({ page }) => {
    await page.click('text=Utilisateurs');

    const firstCard = page.locator('.card').first();
    await test.expect(firstCard.locator('h2')).toHaveText('Admin');

    await page.click('text=Créer un utilisateur');
    await page.fill('text=Nom', 'Claire');
    await page.fill('text=Adresse email', 'clairebrucy@gmail.com');
    await page.check('text=Administrateur');
    await page.check('text=Exporteur');
    await page.click('text=Enregistrer');

    await test.expect(page.locator('.card')).toHaveCount(2);
    const lastCard = await page.locator('.card').last();
    await test.expect(lastCard.locator('h2')).toHaveText('Claire');

    await test.expect(lastCard).toContainText('Administrateur');
    await test.expect(lastCard).toContainText('Exporteur');
    await test.expect(lastCard).not.toContainText('désactivé');

    await lastCard.locator('text=Modifier').click();
    await page.check('text=Désactivé');
    await test.expect(lastCard).toContainText('désactivé');
  });
});
