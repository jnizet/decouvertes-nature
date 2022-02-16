import { expect, Page } from '@playwright/test';
import * as crypto from 'crypto';

export async function login(page: Page) {
  await page.goto('http://localhost:4201');
  await page.locator('text=Identification').first().click();
  await page.fill('text=Adresse email', 'jnizet@gmail.com');
  await page.fill('text=Mot de passe', 'password');
  await page.click(`text=S'identifier`);
  await expect(page.locator('#user-dropdown')).toHaveText('Admin');
}

const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function randomString(length = 10) {
  const rb = crypto.randomBytes(length);
  let result = '';
  for (let i = 0; i < length; i++) {
    result += ALPHABET[rb[i] % ALPHABET.length];
  }

  return result;
}
