import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, stat } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { buildSite, renderMarkdown } from './build-site.mjs';

const repoRoot = path.resolve(import.meta.dirname, '..');

async function withTempDir(fn) {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'awesome-gui-md-site-'));
  try {
    await fn(dir);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

test('buildSite writes allowlisted documentation pages only', async () => {
  await withTempDir(async (outDir) => {
    const result = await buildSite({ rootDir: repoRoot, outDir });

    assert.equal(result.pages.length > 8, true);
    assert.equal(result.pages.some((page) => page.includes('docs/superpowers')), false);
    await stat(path.join(outDir, 'index.html'));
    await stat(path.join(outDir, 'docs', 'schema.html'));
    await stat(path.join(outDir, 'gui-md', 'command-palette', 'GUI.html'));
    await stat(path.join(outDir, 'assets', 'site.css'));

    const index = await readFile(path.join(outDir, 'index.html'), 'utf8');
    const collectionIndex = await readFile(path.join(outDir, 'docs', 'index.html'), 'utf8');
    const commandPaletteGui = await readFile(
      path.join(outDir, 'gui-md', 'command-palette', 'GUI.html'),
      'utf8',
    );

    assert.match(index, /Awesome GUI\.md/);
    assert.match(index, /Command Palette/);
    assert.doesNotMatch(index, /docs\/superpowers/);
    assert.match(collectionIndex, /href="\.\.\/gui-md\/command-palette\/README\.html"/);
    assert.doesNotMatch(collectionIndex, /href="\.\.\/gui-md\/command-palette\/"/);
    assert.doesNotMatch(commandPaletteGui, /schema: gui\.md\/v1/);
  });
});

test('renderMarkdown escapes raw HTML while preserving links and code blocks', () => {
  const html = renderMarkdown([
    '# Title',
    '',
    'A [safe link](docs/schema.md) and <script>alert(1)</script>.',
    '',
    '```text',
    '<button>literal</button>',
    '```',
  ].join('\n'));

  assert.match(html, /<h1 id="title">Title<\/h1>/);
  assert.match(html, /<a href="docs\/schema\.html">safe link<\/a>/);
  assert.match(
    renderMarkdown('[Command Palette](../gui-md/command-palette/)'),
    /href="\.\.\/gui-md\/command-palette\/README\.html"/,
  );
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(html, /&lt;button&gt;literal&lt;\/button&gt;/);
});
