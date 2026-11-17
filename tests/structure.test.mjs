import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const read = path => readFileSync(path, 'utf8');
const app = read('src/main.tsx');
const workflow = read('.github/workflows/ci.yml');

test('Le prototype annonce explicitement ses limites', () => {
  assert.match(app, /Aucun appel réel à Albert/);
  assert.match(app, /validation pédagogique/);
});
test('La base GitHub Pages correspond au dépôt', () => {
  assert.match(read('vite.config.ts'), /base:\s*['"]\/academie-ia-albert-\/['"]/);
});
test('Le prototype ne déclenche aucun appel réseau ni ne demande de secret', () => {
  assert.doesNotMatch(app, /\bfetch\s*\(|\bXMLHttpRequest\b|\bWebSocket\s*\(/);
  assert.doesNotMatch(app, /import\.meta\.env|process\.env|api[_-]?key|bearer\s+/i);
});
test('Les modes de projection et les réponses accessibles existent', () => {
  for (const mode of ['clair', 'sombre', 'projecteur']) assert.match(app, new RegExp(mode));
  assert.match(app, /role="status"/);
  assert.match(app, /<fieldset>/);
});
test('La CI bloque en cas d’échec des tests ou de la compilation', () => {
  assert.match(workflow, /npm test/);
  assert.match(workflow, /npm run build/);
  assert.doesNotMatch(workflow, /continue-on-error:\s*true/);
});

test('Le cahier des charges bloque les secrets et les données réelles d’élèves', () => {
  const cahier = read('docs/CAHIER_DES_CHARGES.md');
  assert.match(cahier, /Pas de données personnelles réelles d'élèves/);
  assert.match(cahier, /Pas de clé API dans le code client/);
  assert.match(cahier, /audit pédagogique humain/);
  assert.match(cahier, /sans Albert/);
});

test('La frontière statique interdit les appels Albert directs', () => {
  const architecture = read('docs/ARCHITECTURE_L0.md');
  assert.match(architecture, /Aucun appel direct depuis le navigateur/);
  assert.match(architecture, /données fictives/);
  assert.match(architecture, /Web Worker isolé/);
  assert.match(architecture, /aucune décision automatique sur la note/);
});

test('La CI conserve un blocage effectif et ne publie pas', () => {
  assert.match(workflow, /timeout-minutes:\s*10/);
  assert.match(workflow, /npm ci --ignore-scripts --no-audit --no-fund/);
  assert.match(workflow, /npm test/);
  assert.match(workflow, /npm run build/);
  assert.doesNotMatch(workflow, /actions\/deploy-pages|peaceiris\/actions-gh-pages|npm run deploy/);
});

/*
 * Contrôle de frontière statique : parcourir tous les fichiers sources,
 * et pas seulement main.tsx. Ce test n'est pas un audit de sécurité complet.
 */
test('Tous les fichiers applicatifs restent sans accès réseau direct ni secret', () => {
  const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return walk(path);
    return /\.(?:[cm]?[jt]sx?)$/.test(entry.name) ? [path] : [];
  });
  const files = walk('src');
  assert.ok(files.length > 0, 'Aucun fichier source contrôlé');
  for (const file of files) {
    const source = read(file);
    assert.doesNotMatch(source, /\b(?:fetch|XMLHttpRequest|WebSocket|EventSource|sendBeacon)\s*\(/, file);
    assert.doesNotMatch(source, /\b(?:window|globalThis|self)\s*\.\s*(?:fetch|XMLHttpRequest|WebSocket|EventSource)\b/, file);
    assert.doesNotMatch(source, /\b(?:axios|ky|superagent)\s*(?:\.|\()/, file);
    assert.doesNotMatch(source, /\bimport\s*(?:\(|[^;\n]*\bfrom\s*)['"](?:axios|ky|superagent)['"]/, file);
    assert.doesNotMatch(source, /\b(?:new\s+WebSocket|new\s+EventSource|navigator\.sendBeacon)\b/, file);
    assert.doesNotMatch(source, /\b(?:import\.meta\.env|process\.env)\b/, file);
    assert.doesNotMatch(source, /(?:api[_-]?key|authorization\s*:\s*['"]bearer|sk-[A-Za-z0-9_-]{16,})/i, file);
  }
});

test('La CI est limitée à main et aux permissions de lecture', () => {
  assert.match(workflow, /push:\s*\n\s*branches:\s*\[main\]/);
  assert.match(workflow, /permissions:\s*\n\s*contents:\s*read/);
  assert.doesNotMatch(workflow, /\b(?:contents|pages|id-token|actions):\s*write\b/);
  assert.doesNotMatch(workflow, /\bpull_request_target\s*:/);
  assert.match(workflow, /actions\/checkout@v4/);
  assert.match(workflow, /actions\/setup-node@v4/);
  assert.match(workflow, /node-version:\s*['"]22['"]/);
  const scripts = JSON.parse(read('package.json')).scripts;
  assert.match(scripts.test, /node --test/);
  assert.match(scripts.build, /tsc --noEmit/);
  assert.match(scripts.build, /vite build/);
});

test('La page statique ne charge aucune ressource distante ni traceur tiers', () => {
  const html = read('index.html');
  const css = read('src/style.css');
  // Contrôle conservateur : aucun script, iframe, image ou feuille de style distante.
  // Les liens de référence vers des sites officiels restent autorisés dans les contenus.
  assert.doesNotMatch(html, /<(?:script|iframe|img|link)\\b[^>]*\\b(?:src|href)\\s*=\\s*["']\\s*(?:https?:)?\\/\\//i);
  assert.doesNotMatch(html, /\\b(?:srcset|ping)\\s*=/i);
  assert.doesNotMatch(css, /@import\\b|url\\(\\s*["']?\\s*(?:https?:)?\\/\\//i);
});
