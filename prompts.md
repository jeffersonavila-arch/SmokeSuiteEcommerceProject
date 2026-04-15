# prompts.md

## Prompt used for migration

Task: Migrate a legacy Playwright test script to the Page Object Model (POM) pattern.

Provide a legacy Playwright test script that uses hardcoded selectors and request the creation of Page Object classes plus a refactored test script.

Example prompt:

```
I have a Playwright smoke test script for SauceDemo that uses hardcoded selectors.
Please generate a refactored version using Page Object Model classes.
Create separate page objects for Login, Products, Cart, and Checkout.
Include the refactored test script that uses those page objects and preserve the original flow:
- login
- add two products to cart
- verify cart contents
- complete checkout
- verify order confirmation
```

## Example commands used

Run the legacy script:
```bash
npx playwright test legacy/legacy.spec.ts
```

Run the refactored script:
```bash
npx playwright test refactored/tests/smoke.spec.ts
```

If you want to run only the refactored smoke flow:
```bash
npx playwright test refactored/tests/smoke.spec.ts --project=chromium
```
