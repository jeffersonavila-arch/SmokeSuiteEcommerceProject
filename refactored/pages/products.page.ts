import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async addProductToCart(productName: string) {
    await this.page.click(`.inventory_item:has-text("${productName}") button`);
  }

  async goToCart() {
    await this.cartLink.click();
  }
}
