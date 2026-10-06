import { test, expect } from '@playwright/test';

test('registro, correo SMTP, verificación y cierre de sesión', async ({ page, request }) => {
  const email = `e2e-${Date.now()}@example.com`;
  await page.goto('/');
  await page.getByLabel('Tu nombre').fill('Estudiante E2E');
  await page.getByLabel('Correo electrónico').fill(email);
  await page.getByLabel('Contraseña', { exact: true }).fill('Una frase segura para probar');
  await page.getByRole('button', { name: 'Crear mi cuenta' }).click();
  await expect(page.getByRole('heading', { name: 'Revisa tu correo.' })).toBeVisible({ timeout: 15000 });
  await expect.poll(async () => {
    const response = await request.get('http://localhost:8025/api/v1/messages');
    const result = await response.json();
    return result.messages.some((m: { To: { Address: string }[] }) => m.To.some(t => t.Address === email));
  }).toBe(true);
  const messages = await (await request.get('http://localhost:8025/api/v1/messages')).json();
  const message = messages.messages.find((m: { To: { Address: string }[] }) => m.To.some(t => t.Address === email));
  const detail = await (await request.get(`http://localhost:8025/api/v1/message/${message.ID}`)).json();
  const link = detail.Text.match(/http:\/\/localhost:3000\/verificar#token=[a-f0-9]{64}/)?.[0];
  expect(link).toBeTruthy();
  expect((await page.request.get('/api/pvp/access')).status()).toBe(403);
  await page.goto(link);
  await page.getByRole('button', { name: 'Verificar mi correo' }).click();
  await expect(page.getByRole('heading', { name: 'Ya eres parte.' })).toBeVisible();
  await page.getByRole('link', { name: 'Continuar a mi cuenta' }).click();
  await expect(page.getByRole('heading', { name: 'Bienvenido, Estudiante.' })).toBeVisible();
  await page.getByRole('button', { name: 'Comprobar acceso a duelos' }).click();
  await expect(page.getByRole('status')).toContainText('Cuenta verificada');
  await page.getByRole('button', { name: 'Cerrar sesión' }).click();
  await expect(page.getByRole('heading', { name: 'Qué bueno verte.' })).toBeVisible();
});

test('rechaza una solicitud de origen ajeno', async ({ request }) => {
  const response = await request.post('/api/auth/register', { headers: { Origin: 'https://otro.example' }, data: { name: 'Intruso', email: 'intruso@example.com', password: 'Una contraseña muy larga' } });
  expect(response.status()).toBe(403);
});

test('interfaz accesible por teclado y sin desbordamiento en escritorio y móvil', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const [name, width, height] of [['desktop', 1440, 960], ['mobile', 390, 844]] as const) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await expect(page.getByLabel('Tu nombre')).toBeVisible();
    await page.getByLabel('Tu nombre').focus();
    await page.keyboard.press('Tab');
    await expect(page.getByLabel('Correo electrónico')).toBeFocused();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath(`${name}.png`), fullPage: true });
  }
  expect(errors).toEqual([]);
});
