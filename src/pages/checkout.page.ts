import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameField = '[data-test="firstName"]';
  readonly lastNameField = '[data-test="lastName"]';
  readonly postalCodeField = '[data-test="postalCode"]';
  readonly continueButton = '[data-test="continue"]';
  readonly finishButton = '[data-test="finish"]';
  readonly orderConfirmation: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderConfirmation = this.page.locator('.complete-header');
  }

  async fillContactInformation(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill(this.firstNameField, firstName);
    await this.page.fill(this.lastNameField, lastName);
    await this.page.fill(this.postalCodeField, postalCode);
    await this.page.click(this.continueButton);
    await expect(this.page).toHaveURL(/checkout-step-two.html/);
  }

  async finishPurchase() {
    await this.page.click(this.finishButton);
    await expect(this.page).toHaveURL(/checkout-complete.html/);
  }
}
