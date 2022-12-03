import { test } from '@playwright/test';
import { deleteAllActivitiesExceptRomimine, login } from './utils';

/**
 * Makes a screenshot of the map generated by leaflet on the map page, and compares it to the screenshot
 * stored in activities-map.spec.ts-snapshots.
 * To regenerate them locally (darwin files), delete the files and run locally.
 * To regenerate them on CI (-linux files), delete the files, push, and download the artifacts of the job,
 * which will contain the generated screenshots.
 */
test.describe('Activities map', () => {
  test.beforeEach(async ({ page}) => {
    await deleteAllActivitiesExceptRomimine();
    await login(page);
  });

  test('should display activities on a map', async ({ page }) => {
    await page.click('text=Carte');
    await page.waitForTimeout(3000);
    await test.expect(page.locator('dn-map')).toHaveScreenshot('map.png', { maxDiffPixelRatio: 0.05 });
  });
});