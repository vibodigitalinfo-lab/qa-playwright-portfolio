import { test } from '@playwright/test';
import { FormPage } from './pages/FormPage';

test('Debe rellenar y enviar el formulario correctamente', async ({ page }) => { 
    const formPage = new FormPage(page);

    await formPage.goto();
    await formPage.submitForm('nombre', 'user@correo.com', 'dirección', 'dirección');
    await formPage.verifyOutput('nombre');
})