import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test.describe('Pruebas de Error en Login de SauceDemo', () => {

  test('Debe mostrar error con usuario bloqueado', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.checkErrorMessage('Epic sadface: Sorry, this user has been locked out.');
  });

  test('Debe mostrar error con credenciales incorrectas', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('usuario_inventado', 'clave_falsa');
    await loginPage.checkErrorMessage('Username and password do not match any user in this service');
  });

});