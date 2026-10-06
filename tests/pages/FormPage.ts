import { Page, Locator, expect } from '@playwright/test';

export class FormPage {
  readonly page: Page;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly currentAddressInput: Locator;
  readonly permanentAddressInput: Locator;
  readonly submitButton: Locator;
  readonly outputName: Locator; // Añadido para la validación del resultado

  constructor(page: Page) {
    this.page = page; // Asignamos la página recibida
    this.fullNameInput = page.locator('#userName');
    this.emailInput = page.locator('#userEmail');
    this.currentAddressInput = page.locator('#currentAddress');
    this.permanentAddressInput = page.locator('#permanentAddress');
    this.submitButton = page.locator('#submit');
    this.outputName = page.locator('#name'); // Selector del resultado
  }

  async goto() {
    // URL limpia sin marcas de formato
    await this.page.goto('https://demoqa.com/text-box');
  }

  async submitForm(fullName: string, email: string, currentAddr: string, permAddr: string) {
    await this.fullNameInput.fill(fullName);
    await this.emailInput.fill(email);
    await this.currentAddressInput.fill(currentAddr);
    await this.permanentAddressInput.fill(permAddr);
    await this.submitButton.click(); // Añadido el click en Submit
  }

  async verifyOutput(expectedName: string) {
    // Aserción correcta sobre el elemento de salida
    await expect(this.outputName).toContainText(expectedName);
  }
}