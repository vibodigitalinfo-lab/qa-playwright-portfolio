import { test } from '@playwright/test';
import { FormPage } from './pages/FormPage';
import formData from '../data/formData.json';

test('Debe rellenar y enviar el formulario correctamente', async ({ page }) => { 
    const formPage = new FormPage(page);

    await formPage.goto();
    
    // Pasamos los datos del JSON al método de la página
    await formPage.submitForm(
        formData.validUser.fullName,
        formData.validUser.email,
        formData.validUser.currentAddress,
        formData.validUser.permanentAddress
    );

    // Validamos que la salida contenga el nombre que venía en el JSON
    await formPage.verifyOutput(formData.validUser.fullName);
});