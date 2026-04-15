import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameField = '#user-name';
  readonly passwordField = '#password';
  readonly loginButton = '#login-button';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameField, username);
    await this.page.fill(this.passwordField, password);
    await this.page.click(this.loginButton);
  }
}
