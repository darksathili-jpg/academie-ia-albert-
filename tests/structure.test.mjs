import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

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
