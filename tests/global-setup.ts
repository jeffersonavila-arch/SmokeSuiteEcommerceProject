import fs from 'fs';
import path from 'path';
import { chromium, type FullConfig } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';

const STORAGE_STATE_PATH = path.join(__dirname, 'storageState', 'auth.state.json');

const credentials = {
  username: 'standard_user',
  password: 'secret_sauce'
};

async function globalSetup(config: FullConfig) {
  fs.mkdirSync(path.dirname(STORAGE_STATE_PATH), { recursive: true });

  const context = await chromium.launchPersistentContext('', {
    baseURL: 'https://www.saucedemo.com',
    headless: true
  });
  const page = context.pages()[0] || await context.newPage();
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(credentials.username, credentials.password);
  await context.storageState({ path: STORAGE_STATE_PATH });

  await context.close();
}

export default globalSetup;
