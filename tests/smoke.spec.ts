import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { ProductsPage } from '../src/pages/products.page';
import { CartPage } from '../src/pages/cart.page';
import { CheckoutPage } from '../src/pages/checkout.page';
import { credentials, selectedProducts } from './test-data';

test.describe('E-Commerce Smoke Suite', () => {
  test('Successful login for a valid user', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(credentials.username, credentials.password);

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();

    await context.close();
  });

  test('Add products to cart using persisted authentication', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.goto();
    await expect(productsPage.cartBadge).toHaveCount(0);

    for (const product of selectedProducts) {
      await productsPage.addProductToCart(product);
    }

    await expect(productsPage.cartBadge).toHaveText('2');

    await productsPage.goToCart();
    const cartPage = new CartPage(page);
    await expect(cartPage.cartItems).toHaveCount(2);
  });

  test('Complete checkout end-to-end', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await productsPage.goto();
    await productsPage.addProductToCart(selectedProducts[0]);
    await productsPage.goToCart();

    await cartPage.proceedToCheckout();
    await checkoutPage.fillContactInformation('Smoke', 'Suite', '90210');
    await checkoutPage.finishPurchase();

    await expect(checkoutPage.orderConfirmation).toHaveText('Thank you for your order!');
  });
});
