import { Page, Locator, expect } from '@playwright/test';

export class FormPage {
  readonly page: Page;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly currentAddressInput: Locator;
  readonly permanentAddressInput: Locator;
  readonly submitButton: Locator;
  readonly outputContainer: Locator;
  readonly outputName: Locator;

  constructor(page: Page) {
    this.page = page;
    // Locadores basados en buenas prácticas de Playwright
    this.fullNameInput = page.getByPlaceholder('Full Name');
    this.emailInput = page.getByPlaceholder('name@example.com');
    this.currentAddressInput = page.getByPlaceholder('Current Address');
    this.permanentAddressInput = page.locator('#permanentAddress');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.outputContainer = page.locator('#output');
    this.outputName = page.locator('#name');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/text-box');
  }

  async submitForm(fullName: string, email: string, currentAddr: string, permAddr: string) {
    await this.fullNameInput.fill(fullName);
    await this.emailInput.fill(email);
    await this.currentAddressInput.fill(currentAddr);
    await this.permanentAddressInput.fill(permAddr);

    // Ocultar/eliminar anuncios y footers fijos que obstruyen el botón de envío
    await this.page.evaluate(() => {
      const fixedBan = document.querySelector('#fixedban');
      const footer = document.querySelector('footer');
      if (fixedBan) fixedBan.remove();
      if (footer) footer.remove();
    });

    // Scroll y click limpio (sin force: true)
    await this.submitButton.scrollIntoViewIfNeeded();
    await this.submitButton.click();
  }

  async verifyOutput(expectedName: string) {
    await expect(this.outputContainer).toBeVisible();
    await expect(this.outputName).toContainText(expectedName);
  }
}