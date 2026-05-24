import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ignoredDirs = new Set(['.git', 'node_modules', 'dist', 'docs/superpowers']);
const ignoredFiles = new Set(['LICENSE']);
const ignoredBasenames = new Set(['meta.json']);

const patterns = [
  ['GitHub token', new RegExp(`gh${'p_'}[A-Za-z0-9_]{20,}`)],
  ['GitHub fine-grained token', new RegExp(`github_${'pat_'}[A-Za-z0-9_]+`)],
  ['Private key marker', new RegExp(`-----BEGIN [A-Z ]*${'PRIVATE'} KEY-----`)],
  ['OpenAI key assignment', new RegExp(`OPENAI_${'API'}_KEY\\s*=`)],
  ['Anthropic key assignment', new RegExp(`ANTHROPIC_${'API'}_KEY\\s*=`)],
];

async function walk(dir, rootDir, files) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name);
    const relativePath = path.relative(rootDir, absolutePath).replaceAll(path.sep, '/');

    if (entry.isDirectory()) {
      if (ignoredDirs.has(relativePath) || ignoredDirs.has(entry.name)) {
        continue;
      }
      await walk(absolutePath, rootDir, files);
      continue;
    }

    if (ignoredFiles.has(relativePath) || ignoredBasenames.has(entry.name)) {
      continue;
    }

    files.push({ absolutePath, relativePath });
  }
}

export async function scanSecrets({ rootDir = path.resolve(import.meta.dirname, '..') } = {}) {
  const files = [];
  const findings = [];
  await walk(rootDir, rootDir, files);

  for (const file of files) {
    let text;
    try {
      text = await readFile(file.absolutePath, 'utf8');
    } catch {
      continue;
    }

    const lines = text.split(/\r?\n/);
    for (let index = 0; index < lines.length; index += 1) {
      for (const [label, pattern] of patterns) {
        if (pattern.test(lines[index])) {
          findings.push({
            file: file.relativePath,
            line: index + 1,
            label,
          });
        }
      }
    }
  }

  return findings;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const findings = await scanSecrets();
  for (const finding of findings) {
    console.error(`${finding.file}:${finding.line}: ${finding.label}`);
  }

  if (findings.length > 0) {
    process.exitCode = 1;
  }
}
