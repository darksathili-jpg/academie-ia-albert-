// Parcours navigateur M01 : données fictives uniquement, aucun appel à Albert.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const host = 'http://127.0.0.1:4173';
const server = spawn('npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], { stdio: 'pipe' });
let browser;
const waitForServer = async () => {
  for (let i = 0; i < 60; i++) {
    if (server.exitCode !== null) throw new Error('Serveur Vite arrêté avant la recette');
    try { const response = await fetch(host); if (response.ok) return; } catch {}
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  throw new Error('Serveur Vite indisponible après 30 secondes');
};
try {
  await waitForServer();
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const outbound = [];
  page.on('request', request => {
    if (!request.url().startsWith(host + '/')) outbound.push(request.url());
  });
  await page.goto(host);
  await assert.equal(await page.locator('h1').count(), 1);
  const dark = page.getByRole('button', { name: 'Sombre' });
  await dark.focus();
  await page.keyboard.press('Enter');
  assert.equal(await dark.getAttribute('aria-pressed'), 'true');
  assert.equal(await page.locator('main').getAttribute('data-mode'), 'sombre');
  assert.equal(await dark.evaluate(el => el === document.activeElement), true);
  const projector = page.getByRole('button', { name: 'Projecteur' });
  await projector.focus();
  await page.keyboard.press('Space');
  assert.equal(await projector.getAttribute('aria-pressed'), 'true');
  await page.getByLabel('Votre discipline').selectOption({ label: 'NSI' });
  await page.getByRole('radio', { name: /Vérifier la référence/ }).check();
  assert.match(await page.getByRole('status').first().innerText(), /Bonne démarche/);
  const draft = 'Vérifier la source officielle et sa date avant toute diffusion.';
  await page.getByLabel(/Votre procédure/).fill(draft);
  const toggle = page.locator('button[aria-controls="verification-checklist"]');
  await toggle.focus();
  await page.keyboard.press('Enter');
  assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
  assert.equal(await page.locator('#verification-checklist').isVisible(), true);
  await page.getByRole('button', { name: /Enregistrer sur cet appareil/ }).click();
  await page.reload();
  assert.equal(await page.getByLabel(/Votre procédure/).inputValue(), draft);
  await page.getByRole('button', { name: /Effacer le brouillon local/ }).click();
  await page.reload();
  assert.equal(await page.getByLabel(/Votre procédure/).inputValue(), '');
  assert.deepEqual(outbound, [], 'Requêtes externes inattendues dans le parcours M01');
  console.log('PASS navigateur M01 : clavier, modes, réponse, autoévaluation, brouillon local et réseau');
} finally {
  await browser?.close();
  server.kill('SIGTERM');
}
