import { test, expect } from '@playwright/test';

test.describe('Flujo de Compra en SauceDemo', () => {

  test('Debe permitir iniciar sesión, añadir un producto al carrito y verificar el checkout', async ({ page }) => {
    // 1. Navegar a la página de login
    await page.goto('https://www.saucedemo.com/');

    // 2. Iniciar sesión usando localizadores recomendados por Playwright (Acesibilidad)
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // 3. Validar que hemos entrado a la tienda (Aserción)
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.getByText('Products')).toBeVisible();

    // 4. Añadir el primer producto (Sauce Labs Backpack) al carrito
    const backpackAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    await backpackAddToCartButton.click();

    // 5. Verificar que el badge del carrito muestra '1'
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');

    // 6. Ir al carrito
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

    // 7. Validar que el producto en el carrito es el correcto
    const cartItemName = page.locator('.inventory_item_name');
    await expect(cartItemName).toHaveText('Sauce Labs Backpack');

    // 8. Hacer clic en el botón de Checkout
    await page.locator('[data-test="checkout"]').click();

    // 9. Rellenar los campos del formulario de envío
    await page.getByPlaceholder('First Name').fill('Ivan');
    await page.getByPlaceholder('Last Name').fill('Mi Nombre');
    await page.getByPlaceholder('Zip/Postal Code').fill('33400');

    // 10. Continuar al resumen de la compra
    await page.locator('[data-test="continue"]').click();

    // 11. Verificar que estamos en la pantalla de resumen (Overview)
    await expect(page.getByText('Checkout: Overview')).toBeVisible();
  });

});