import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';

const siteRoot = path.resolve('GoodTab');
function localUrls(html, tagName, attribute) {
  const tags = [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, 'gi'))].map(match => match[0]);
  const regex = new RegExp(`\\b${attribute}=["']([^"']+)["']`, 'i');
  return tags.map(tag => tag.match(regex)?.[1]).filter(Boolean)
    .filter(url => !/^(https?:|data:|#|mailto:|tel:|\/\/)/i.test(url))
    .map(url => url.split(/[?#]/)[0]);
}
test('GOODTAB homepage has essential structure', async () => {
  const html = await readFile(path.join(siteRoot, 'index.html'), 'utf8');
  assert.match(html, /<!doctype\s+html>/i);
  assert.match(html, /<title>[^<]+<\/title>/i);
  assert.match(html, /<main\b/i);
  assert.match(html, /<nav\b/i);
});
test('GOODTAB referenced local CSS and JS exist', async () => {
  const html = await readFile(path.join(siteRoot, 'index.html'), 'utf8');
  const paths = [...localUrls(html, 'link', 'href').filter(p => p.endsWith('.css')), ...localUrls(html, 'script', 'src')];
  assert.ok(paths.length > 0);
  for (const asset of paths) {
    assert.ok(!asset.includes('..'), 'Unsafe path: ' + asset);
    await access(path.join(siteRoot, asset));
  }
});
