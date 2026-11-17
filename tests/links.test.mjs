import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, extname } from 'node:path';

const root = process.cwd();
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const app = readFileSync(resolve(root, 'src/main.tsx'), 'utf8');

test('Les ressources locales déclarées dans index.html existent', () => {
  const attributes = [...html.matchAll(/\b(?:src|href)\s*=\s*["']([^"']+)["']/gi)];
  for (const [, url] of attributes) {
    if (/^(?:https?:|mailto:|tel:|data:|#|\/\/)/i.test(url)) continue;
    const pathname = url.split(/[?#]/, 1)[0];
    if (!pathname) continue;
    const target = pathname.startsWith('/')
      ? resolve(root, '.' + pathname)
      : resolve(dirname(resolve(root, 'index.html')), pathname);
    assert.ok(target.startsWith(root + '/') || target === root, 'Chemin hors du dépôt : ' + url);
    assert.ok(existsSync(target), 'Ressource locale introuvable : ' + url);
  }
});

test('Les liens internes statiques de l’application ciblent des identifiants existants', () => {
  const ids = new Set([...app.matchAll(/\bid\s*=\s*["']([^"']+)["']/g)].map(m => m[1]));
  const targets = [...app.matchAll(/\bhref\s*=\s*["']#([^"']+)["']/g)].map(m => m[1]);
  for (const target of targets) assert.ok(ids.has(target), 'Ancre interne introuvable : #' + target);
});

test('Les attributs aria-controls statiques ciblent des identifiants existants', () => {
  const ids = new Set([...app.matchAll(/\bid\s*=\s*["']([^"']+)["']/g)].map(m => m[1]));
  const targets = [...app.matchAll(/\baria-controls\s*=\s*["']([^"']+)["']/g)].map(m => m[1]);
  for (const target of targets) assert.ok(ids.has(target), 'Cible aria-controls introuvable : ' + target);
});
