import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve, sep } from 'node:path';

// Vérifie les liens Markdown locaux des documents contractuels L0.
// Les URL externes sont hors périmètre : leur disponibilité n'est pas attestée.
const documents = [
  'README.md',
  'docs/CAHIER_DES_CHARGES.md',
  'docs/ARCHITECTURE.md',
  'docs/L0_PROCEDURE_VALIDATION.md',
];
for (const file of documents) {
  test(`Liens internes du document ${file}`, () => {
    assert.ok(existsSync(file), `Document absent : ${file}`);
    const content = readFileSync(file, 'utf8');
    const links = [...content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map(m => m[1]);
    for (const href of links) {
      if (/^(https?:|mailto:|#)/i.test(href)) continue;
      const pathname = decodeURIComponent(href.split('#')[0].split('?')[0]);
      if (!pathname) continue;
      const target = resolve(dirname(file), pathname);
      assert.ok(target.startsWith(resolve('.') + sep), `Lien hors dépôt dans ${file} : ${href}`);
      assert.ok(existsSync(target), `Lien local cassé dans ${file} : ${href}`);
    }
  });
}
