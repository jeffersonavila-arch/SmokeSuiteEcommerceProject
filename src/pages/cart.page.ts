import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItems = page.locator('.cart_item');
  }

  async proceedToCheckout() {
    await expect(this.page).toHaveURL(/cart.html/);
    await this.checkoutButton.click();
    await this.page.waitForURL(/checkout-step-one.html/);
  }
}
