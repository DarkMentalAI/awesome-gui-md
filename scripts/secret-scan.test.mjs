import assert from 'node:assert/strict';
import { mkdir, mkdtemp, writeFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { scanSecrets } from './secret-scan.mjs';

async function withTempRepo(fn) {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'awesome-gui-md-secret-scan-'));
  try {
    await fn(dir);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

test('scanSecrets reports token-looking values in tracked content', async () => {
  await withTempRepo(async (rootDir) => {
    await writeFile(path.join(rootDir, 'README.md'), `token ghp_${'A'.repeat(24)}\n`);

    const findings = await scanSecrets({ rootDir });

    assert.deepEqual(findings, [
      {
        file: 'README.md',
        line: 1,
        label: 'GitHub token',
      },
    ]);
  });
});

test('scanSecrets ignores generated and local-only directories', async () => {
  await withTempRepo(async (rootDir) => {
    await mkdir(path.join(rootDir, 'dist'), { recursive: true });
    await mkdir(path.join(rootDir, 'docs', 'superpowers'), { recursive: true });
    await writeFile(path.join(rootDir, 'dist', 'index.html'), `ghp_${'A'.repeat(24)}\n`);
    await writeFile(path.join(rootDir, 'docs', 'superpowers', 'draft.md'), `ghp_${'A'.repeat(24)}\n`);

    const findings = await scanSecrets({ rootDir });

    assert.deepEqual(findings, []);
  });
});
