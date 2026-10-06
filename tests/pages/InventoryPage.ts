import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  // 1. DECLARACIÓN: Definimos las variables y su tipo
  readonly page: Page;
  readonly backpackAddToCartButton: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  // 2. CONSTRUCTOR: Asociamos cada variable a su selector real en la web
  constructor(page: Page) {
    this.page = page;
    this.backpackAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  // 3. MÉTODOS DE ACCIÓN: Lo que la prueba puede HACER en esta página
  
  // Acción: Añadir la mochila al carrito
  async addBackpackToCart() {
    await this.backpackAddToCartButton.click();
  }

  // Acción: Hacer clic en el icono del carrito para ir a la pantalla del carrito
  async goToCart() {
    await this.cartLink.click();
  }

  // Acción / Validación: Comprobar que el número en el icono del carrito es el esperado
  async verifyCartCount(expectedCount: string) {
    await expect(this.cartBadge).toHaveText(expectedCount);
  }
}