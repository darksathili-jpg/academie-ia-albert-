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
