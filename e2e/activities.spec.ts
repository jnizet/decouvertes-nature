import { test } from '@playwright/test';
import { login } from './login.spec';

test.describe('Activities', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('should display, create and modify activities', async ({ page }) => {
    await page.click('text=Activités');

    const firstCard = page.locator('.card').first();
    await test.expect(firstCard.locator('h3')).toHaveText('Romimine');

    await page.click('text=Romimine');

    await test.expect(page.locator('h1')).toHaveText('Romimine');

    await page.click('text=Activités');
    await page.click('text=Créer une activité');

    await page.fill('text=Titre', 'Test activity');
    await page.selectOption(`text=Type d'activité`, { label: 'Atelier' });
    await page.fill('text=Description', 'Learn to write tests');
    await page.fill('text=Animateur / Organisateur', 'Adama Doumbouya');
    await page.fill(`text=Commune du lieu de l'activité`, 'Api');
    await page.locator('button.dropdown-item', { hasText: 'Apinac' }).click();
    await page.fill(`text=Début de l'activité`, '2023-10-01');
    await page.fill(`text=Heure de rendez-vous`, '10:00');
    await page.fill(`text=Heure de fin de l'activité`, '15:00');
    await page.click('text=Enregistrer');

    await test.expect(page.locator('h1')).toHaveText('Test activity');
    await page.click('text=Modifier');

    await page.fill('text=Titre', 'Test activity 2');
    await page.click('text=Enregistrer');

    await page.click('text=Activités');
    await test.expect(page.locator('.card')).toHaveCount(2);
    await test.expect(firstCard.locator('h3')).toHaveText('Test activity 2');

    await page.click('text=Mes activités');
    await test.expect(firstCard.locator('h3')).toHaveText('Test activity 2');

    await page.click('text=Test activity 2');
    await page.click('text=Supprimer');
    await page.click('text=Oui');

    await test.expect(page.locator('.card')).toHaveCount(1);
    await test.expect(firstCard.locator('h3')).toHaveText('Romimine');
  });
});
