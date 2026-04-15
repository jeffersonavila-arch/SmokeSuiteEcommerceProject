import { test, expect } from '@playwright/test';

test('Legacy SauceDemo smoke flow', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();

  await page.click('.inventory_item:has-text("Sauce Labs Backpack") button');
  await page.click('.inventory_item:has-text("Sauce Labs Bike Light") button');

  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  await page.click('.shopping_cart_link');

  await expect(page.locator('.cart_item')).toHaveCount(2);
  await page.click('[data-test="checkout"]');

  await page.fill('[data-test="firstName"]', 'Smoke');
  await page.fill('[data-test="lastName"]', 'Suite');
  await page.fill('[data-test="postalCode"]', '90210');
  await page.click('[data-test="continue"]');
  await page.click('[data-test="finish"]');

  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});
