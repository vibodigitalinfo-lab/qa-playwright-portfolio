import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';

test.describe('Flujo de Inventario usando Page Object Model', () => {

  test('Debe añadir un producto al carrito correctamente', async ({ page }) => {
    // Instanciamos ambas páginas pasándoles la `page` de Playwright
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // PASO 1: Ir al login y loguearse con usuario standard_user y secret_sauce
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // PASO 2: Añadir la mochila al carrito usando tu nueva InventoryPage
    await inventoryPage.addBackpackToCart();

    // PASO 3: Verificar que el badge del carrito marca "1"
    await inventoryPage.verifyCartCount('1');

    // PASO 4: Ir al carrito
    await inventoryPage.goToCart();
  });

});