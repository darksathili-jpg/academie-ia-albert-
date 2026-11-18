import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const app = readFileSync(new URL('../src/main.tsx', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

// Contrôles statiques ciblés : ils ne prouvent pas l'absence de requêtes réseau
// à l'exécution ni une conformité RGPD/RGAA.
test('Le brouillon M01 est stocké localement et son effacement est prévu', () => {
  assert.match(app, /window\.localStorage\.setItem\(STORAGE_KEY,verificationPlan\)/);
  assert.match(app, /window\.localStorage\.removeItem\(STORAGE_KEY\)/);
  assert.match(app, /window\.localStorage\.getItem\(STORAGE_KEY\)/);
});

test('L’export M01 utilise un Blob local sans appel réseau explicite', () => {
  assert.match(app, /new Blob\(/);
  assert.match(app, /URL\.createObjectURL\(blob\)/);
  assert.match(app, /URL\.revokeObjectURL\(url\)/);
  assert.doesNotMatch(app, /\bfetch\s*\(|\bXMLHttpRequest\b|\bsendBeacon\s*\(/);
});

test('Aucune clé API ni ressource distante déclarée dans l’interface pilote', () => {
  assert.doesNotMatch(app, /\b(?:sk-[A-Za-z0-9_-]{16,}|Bearer\s+[A-Za-z0-9_.-]{16,})\b/);
  assert.doesNotMatch(html, /<(?:script|iframe)[^>]+src=["']https?:\/\//i);
  assert.doesNotMatch(html, /<link[^>]+href=["']https?:\/\//i);
});
