// Parcours navigateur M01 : données fictives uniquement, aucun appel à Albert.
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const host = 'http://127.0.0.1:4173';
// Démarrer Vite directement : le wrapper npm laisse des processus enfants actifs en CI.
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], { stdio: 'ignore' });
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
  // Vérification automatisée partielle des trois modes et d'un écran étroit.
  // Ne remplace ni une inspection visuelle, ni un audit RGAA, ni la recette humaine.
  await mkdir('artifacts/recette-m01', { recursive: true });
  const light = page.getByRole('button', { name: 'Clair' });
  await light.focus();
  await page.keyboard.press('Enter');
  assert.equal(await light.getAttribute('aria-pressed'), 'true');
  assert.equal(await page.locator('main').getAttribute('data-mode'), 'clair');
  assert.equal(await light.evaluate(el => el === document.activeElement), true);
  await page.screenshot({ path: 'artifacts/recette-m01/clair-desktop.png', fullPage: true });
  const dark = page.getByRole('button', { name: 'Sombre' });
  await dark.focus();
  await page.keyboard.press('Enter');
  assert.equal(await dark.getAttribute('aria-pressed'), 'true');
  assert.equal(await page.locator('main').getAttribute('data-mode'), 'sombre');
  assert.equal(await dark.evaluate(el => el === document.activeElement), true);
  await page.screenshot({ path: 'artifacts/recette-m01/sombre-desktop.png', fullPage: true });
  const projector = page.getByRole('button', { name: 'Projecteur' });
  await projector.focus();
  await page.keyboard.press('Space');
  assert.equal(await projector.getAttribute('aria-pressed'), 'true');
  assert.equal(await page.locator('main').getAttribute('data-mode'), 'projecteur');
  assert.equal(await projector.evaluate(el => el === document.activeElement), true);
  await page.screenshot({ path: 'artifacts/recette-m01/projecteur-desktop.png', fullPage: true });
  await page.setViewportSize({ width: 375, height: 812 });
  assert.equal(await projector.isVisible(), true, 'Bouton projecteur invisible sur écran étroit');
  assert.equal(await page.locator('h1').isVisible(), true, 'Titre invisible sur écran étroit');
  // Un élément visible ne garantit pas l'absence de défilement horizontal.
  const mobileOverflow = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: document.documentElement.clientWidth,
  }));
  assert.ok(
    mobileOverflow.documentWidth <= mobileOverflow.viewportWidth + 1,
    `Débordement horizontal sur écran étroit : ${mobileOverflow.documentWidth}px > ${mobileOverflow.viewportWidth}px`,
  );
  await page.screenshot({ path: 'artifacts/recette-m01/projecteur-mobile-375.png', fullPage: true });
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
