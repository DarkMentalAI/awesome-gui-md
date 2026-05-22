#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const rootDir = process.cwd();
const entryRoot = path.join(rootDir, 'gui-md');

const requiredEntryFiles = ['GUI.md', 'HTML.md', 'README.md', 'meta.json'];
const requiredGuiFields = [
  'schema',
  'name',
  'version',
  'status',
  'audience',
  'target_surfaces',
  'source_refs',
  'adapters',
  'accessibility.baseline',
];
const requiredHtmlFields = [
  'schema',
  'name',
  'version',
  'status',
  'depends_on.gui',
  'target',
];
const requiredMetaFields = [
  'title',
  'slug',
  'category',
  'tags',
  'platform',
  'files',
  'status_coverage',
  'accessibility_notes',
  'entry_status',
  'last_reviewed',
];
const requiredMetaFiles = ['README.md', 'GUI.md', 'HTML.md'];
const entryStatuses = new Set(['draft', 'reviewed', 'stable', 'deprecated']);
const forbiddenTagAliases = new Map([
  ['forms', 'form'],
  ['destructive-actions', 'destructive-action'],
  ['modal', 'dialog'],
  ['commands', 'command'],
]);
const tagPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

const issues = [];

function toPosixPath(filePath) {
  return path.relative(rootDir, filePath).split(path.sep).join('/');
}

function addIssue(filePath, message) {
  issues.push(`${toPosixPath(filePath)}: ${message}`);
}

function formatValue(value) {
  return JSON.stringify(value);
}

async function readText(filePath) {
  const text = await fs.readFile(filePath, 'utf8');
  return text.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
}

function parseScalar(rawValue) {
  const value = rawValue.trim();

  if (value === '[]') {
    return [];
  }

  if (value.startsWith('[') && value.endsWith(']')) {
    const inner = value.slice(1, -1).trim();
    return inner ? inner.split(',').map((item) => parseScalar(item)) : [];
  }

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function parseSimpleYaml(lines, filePath) {
  const data = {};
  let currentKey = null;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    if (/^\s/.test(line)) {
      if (!currentKey) {
        addIssue(filePath, `unsupported frontmatter indentation on line ${index + 2}`);
        continue;
      }

      if (trimmed.startsWith('- ')) {
        if (!Array.isArray(data[currentKey])) {
          data[currentKey] = [];
        }
        data[currentKey].push(parseScalar(trimmed.slice(2)));
        continue;
      }

      const childMatch = trimmed.match(/^([A-Za-z0-9_-]+):(?:\s*(.*))?$/);
      if (!childMatch) {
        addIssue(filePath, `unsupported frontmatter line ${index + 2}`);
        continue;
      }

      if (
        data[currentKey] === null ||
        Array.isArray(data[currentKey]) ||
        typeof data[currentKey] !== 'object'
      ) {
        data[currentKey] = {};
      }

      data[currentKey][childMatch[1]] = parseScalar(childMatch[2] ?? '');
      continue;
    }

    const topMatch = trimmed.match(/^([A-Za-z0-9_-]+):(?:\s*(.*))?$/);
    if (!topMatch) {
      addIssue(filePath, `unsupported frontmatter line ${index + 2}`);
      continue;
    }

    currentKey = topMatch[1];
    data[currentKey] = topMatch[2] ? parseScalar(topMatch[2]) : null;
  }

  return data;
}

function parseFrontmatter(markdown, filePath) {
  const lines = markdown.split('\n');

  if (lines[0]?.trim() !== '---') {
    addIssue(filePath, 'missing frontmatter');
    return null;
  }

  const endIndex = lines.findIndex((line, index) => index > 0 && line.trim() === '---');
  if (endIndex === -1) {
    addIssue(filePath, 'frontmatter is not closed');
    return null;
  }

  return {
    data: parseSimpleYaml(lines.slice(1, endIndex), filePath),
    body: lines.slice(endIndex + 1).join('\n'),
  };
}

function getPathValue(value, dottedPath) {
  return dottedPath.split('.').reduce((current, part) => {
    if (
      current === null ||
      typeof current !== 'object' ||
      !Object.prototype.hasOwnProperty.call(current, part)
    ) {
      return undefined;
    }
    return current[part];
  }, value);
}

function hasRequiredPath(value, dottedPath) {
  const found = getPathValue(value, dottedPath);
  return found !== undefined && found !== null && !(typeof found === 'string' && found.trim() === '');
}

function validateFields(filePath, data, requiredFields) {
  for (const field of requiredFields) {
    if (!hasRequiredPath(data, field)) {
      addIssue(filePath, `missing frontmatter field ${field}`);
    }
  }
}

function validateTags(filePath, tags) {
  if (!Array.isArray(tags)) {
    addIssue(filePath, 'tags must be an array');
    return;
  }

  for (const tag of tags) {
    if (typeof tag !== 'string' || tag.trim() === '') {
      addIssue(filePath, 'tags must contain non-empty strings');
      continue;
    }

    if (!tagPattern.test(tag)) {
      addIssue(filePath, `tag ${formatValue(tag)} must be lowercase hyphenated`);
      continue;
    }

    const canonicalTag = forbiddenTagAliases.get(tag);
    if (canonicalTag) {
      addIssue(filePath, `tag ${formatValue(tag)} should be ${canonicalTag}`);
    }
  }
}

function isValidIsoDate(value) {
  if (typeof value !== 'string' || !isoDatePattern.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function extractH2Sections(markdown) {
  return markdown
    .split('\n')
    .map((line) => line.match(/^##\s+(.+?)\s*$/)?.[1])
    .filter(Boolean);
}

function validateSections(filePath, body, requiredSections) {
  const actualSections = new Set(extractH2Sections(body));

  for (const section of requiredSections) {
    if (!actualSections.has(section)) {
      addIssue(filePath, `missing section ${section}`);
    }
  }
}

function validateGui(filePath, markdown, requiredSections) {
  const parsed = parseFrontmatter(markdown, filePath);
  if (!parsed) {
    return;
  }

  validateFields(filePath, parsed.data, requiredGuiFields);

  if (hasRequiredPath(parsed.data, 'schema') && parsed.data.schema !== 'gui.md/v1') {
    addIssue(filePath, 'schema must be gui.md/v1');
  }

  validateSections(filePath, parsed.body, requiredSections);
}

function validateHtml(filePath, markdown, requiredSections) {
  const parsed = parseFrontmatter(markdown, filePath);
  if (!parsed) {
    return;
  }

  validateFields(filePath, parsed.data, requiredHtmlFields);

  if (hasRequiredPath(parsed.data, 'schema') && parsed.data.schema !== 'html.md/v1') {
    addIssue(filePath, 'schema must be html.md/v1');
  }

  if (
    hasRequiredPath(parsed.data, 'depends_on.gui') &&
    getPathValue(parsed.data, 'depends_on.gui') !== './GUI.md'
  ) {
    addIssue(filePath, 'depends_on.gui must be ./GUI.md');
  }

  if (hasRequiredPath(parsed.data, 'target') && parsed.data.target !== 'web') {
    addIssue(filePath, 'target must be web');
  }

  validateSections(filePath, parsed.body, requiredSections);
}

function validateMeta(filePath, text, categories, entryDir, seenSlugs) {
  let data;

  try {
    data = JSON.parse(text);
  } catch (error) {
    addIssue(filePath, `invalid JSON: ${error.message}`);
    return;
  }

  for (const field of requiredMetaFields) {
    if (!Object.prototype.hasOwnProperty.call(data, field)) {
      addIssue(filePath, `missing field ${field}`);
    }
  }

  if (
    Object.prototype.hasOwnProperty.call(data, 'category') &&
    !categories.has(data.category)
  ) {
    addIssue(filePath, 'category must match a primary taxonomy category');
  }

  if (
    Object.prototype.hasOwnProperty.call(data, 'entry_status') &&
    !entryStatuses.has(data.entry_status)
  ) {
    addIssue(filePath, 'entry_status must be draft, reviewed, stable, or deprecated');
  }

  if (Object.prototype.hasOwnProperty.call(data, 'tags')) {
    validateTags(filePath, data.tags);
  }

  if (Object.prototype.hasOwnProperty.call(data, 'slug')) {
    const entrySlug = path.basename(entryDir);

    if (typeof data.slug !== 'string' || data.slug.trim() === '') {
      addIssue(filePath, 'slug must be a non-empty string');
    } else {
      if (!tagPattern.test(data.slug)) {
        addIssue(filePath, 'slug must be lowercase hyphenated');
      }

      if (data.slug !== entrySlug) {
        addIssue(filePath, `slug must match entry directory ${entrySlug}`);
      }

      const previousSlugPath = seenSlugs.get(data.slug);
      if (previousSlugPath) {
        addIssue(filePath, `slug duplicates ${toPosixPath(previousSlugPath)}`);
      } else {
        seenSlugs.set(data.slug, filePath);
      }
    }
  }

  if (
    Object.prototype.hasOwnProperty.call(data, 'last_reviewed') &&
    !isValidIsoDate(data.last_reviewed)
  ) {
    addIssue(filePath, 'last_reviewed must be a valid ISO date in YYYY-MM-DD format');
  }

  if (Object.prototype.hasOwnProperty.call(data, 'files')) {
    if (!Array.isArray(data.files)) {
      addIssue(filePath, 'files must be an array');
      return;
    }

    for (const requiredFile of requiredMetaFiles) {
      if (!data.files.includes(requiredFile)) {
        addIssue(filePath, `files must include ${requiredFile}`);
      }
    }
  }
}

function extractTaxonomyCategories(markdown) {
  const categories = [];

  for (const line of markdown.split('\n')) {
    const match = line.match(/^##\s+(.+?)\s*$/);
    if (!match) {
      continue;
    }

    if (match[1] === 'Tag Strategy') {
      break;
    }

    categories.push(match[1]);
  }

  return new Set(categories);
}

async function fileExists(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return stats.isFile();
  } catch {
    return false;
  }
}

async function listEntryDirs() {
  let dirents;

  try {
    dirents = await fs.readdir(entryRoot, { withFileTypes: true });
  } catch (error) {
    addIssue(entryRoot, `cannot read entries: ${error.message}`);
    return [];
  }

  return dirents
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => path.join(entryRoot, dirent.name))
    .sort((left, right) => left.localeCompare(right));
}

async function validateEntry(entryDir, guiSections, htmlSections, categories, seenSlugs) {
  for (const fileName of requiredEntryFiles) {
    const filePath = path.join(entryDir, fileName);
    if (!(await fileExists(filePath))) {
      addIssue(filePath, 'missing required file');
    }
  }

  const guiPath = path.join(entryDir, 'GUI.md');
  if (await fileExists(guiPath)) {
    validateGui(guiPath, await readText(guiPath), guiSections);
  }

  const htmlPath = path.join(entryDir, 'HTML.md');
  if (await fileExists(htmlPath)) {
    validateHtml(htmlPath, await readText(htmlPath), htmlSections);
  }

  const metaPath = path.join(entryDir, 'meta.json');
  if (await fileExists(metaPath)) {
    validateMeta(metaPath, await readText(metaPath), categories, entryDir, seenSlugs);
  }
}

async function main() {
  const guiTemplatePath = path.join(rootDir, 'templates', 'GUI.md');
  const htmlTemplatePath = path.join(rootDir, 'templates', 'HTML.md');
  const taxonomyPath = path.join(rootDir, 'docs', 'collection-taxonomy.md');

  const guiSections = extractH2Sections(await readText(guiTemplatePath));
  const htmlSections = extractH2Sections(await readText(htmlTemplatePath));
  const categories = extractTaxonomyCategories(await readText(taxonomyPath));
  const entryDirs = await listEntryDirs();
  const seenSlugs = new Map();

  for (const entryDir of entryDirs) {
    await validateEntry(entryDir, guiSections, htmlSections, categories, seenSlugs);
  }

  if (issues.length > 0) {
    for (const issue of issues) {
      console.error(issue);
    }
    console.error(`Validation failed: ${issues.length} issue(s).`);
    process.exitCode = 1;
    return;
  }

  console.log(`Validation passed: ${entryDirs.length} entries checked.`);
}

main().catch((error) => {
  console.error(`scripts/validate.mjs: ${error.message}`);
  process.exitCode = 1;
});
