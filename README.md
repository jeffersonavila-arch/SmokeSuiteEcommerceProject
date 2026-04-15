# E-Commerce Smoke Suite

This repository contains a Playwright smoke test suite for a virtual e-commerce website. The suite is built with TypeScript and follows a Page Object Model structure.

## Features

- Page Object Model (POM) architecture in TypeScript
- Shared authentication state using Playwright `storageState`
- Core smoke tests for:
  - successful login
  - adding products to the cart
  - completing checkout
- Parallel execution across Chromium, Firefox, and WebKit
- HTML reporting with Playwright trace support for failure investigation
- GitHub Actions workflow for continuous integration

## Installation

From the project root:

```bash
npm install
npx playwright install --with-deps
```

## Run tests

```bash
npm test
```

## View results

After the suite runs, open the generated report with:

```bash
npm run test:report
```

## Continuous integration

A workflow is included at `.github/workflows/playwright.yml` to run the suite on GitHub Actions.

## Project structure

- `src/pages/` contains the Page Object Model classes
- `tests/` contains the smoke test suite and global setup script
- `playwright.config.ts` configures cross-browser execution and reporting
- `tests/storageState/` stores the authenticated session state

## Notes

- The tests target `https://www.saucedemo.com`
- Authentication state is saved once in global setup to avoid repeated login steps
- The login test uses a fresh browser context to validate authentication independently
