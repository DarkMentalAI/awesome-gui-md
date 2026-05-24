import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const defaultPages = [
  'README.md',
  'CONTRIBUTING.md',
  'docs/authoring-guide.md',
  'docs/boundaries.md',
  'docs/collection-taxonomy.md',
  'docs/evaluation.md',
  'docs/index.md',
  'docs/roadmap.md',
  'docs/schema.md',
  'docs/v1-readiness.md',
];

const siteCss = `
:root {
  color-scheme: light;
  --bg: #f8fafc;
  --panel: #ffffff;
  --text: #172033;
  --muted: #5c667a;
  --line: #d8dee8;
  --accent: #0f766e;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.6;
}

a { color: var(--accent); }

.shell {
  display: grid;
  grid-template-columns: minmax(220px, 280px) minmax(0, 1fr);
  min-height: 100vh;
}

.sidebar {
  border-right: 1px solid var(--line);
  background: #eef3f7;
  padding: 24px;
}

.brand {
  display: block;
  color: var(--text);
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 20px;
  text-decoration: none;
}

.sidebar nav {
  display: grid;
  gap: 8px;
}

.sidebar a {
  border-radius: 6px;
  color: var(--muted);
  padding: 6px 8px;
  text-decoration: none;
}

.sidebar a:hover {
  background: #dfe8ef;
  color: var(--text);
}

main {
  max-width: 920px;
  padding: 48px 40px 72px;
}

h1, h2, h3 {
  line-height: 1.25;
  margin: 1.7em 0 0.55em;
}

h1 {
  font-size: 34px;
  margin-top: 0;
}

h2 { font-size: 24px; }
h3 { font-size: 18px; }

p, ul, ol, table, pre, blockquote { margin: 0 0 16px; }

table {
  border-collapse: collapse;
  display: block;
  overflow-x: auto;
}

th, td {
  border: 1px solid var(--line);
  padding: 8px 10px;
  text-align: left;
  vertical-align: top;
}

th { background: #eef3f7; }

code {
  background: #edf2f6;
  border-radius: 4px;
  padding: 2px 4px;
}

pre {
  background: #101827;
  border-radius: 8px;
  color: #edf2f6;
  overflow-x: auto;
  padding: 16px;
}

pre code {
  background: transparent;
  padding: 0;
}

blockquote {
  border-left: 4px solid var(--accent);
  color: var(--muted);
  padding-left: 16px;
}

@media (max-width: 760px) {
  .shell { display: block; }
  .sidebar { border-bottom: 1px solid var(--line); border-right: 0; }
  main { padding: 32px 20px 56px; }
}
`;

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/`([^`]+)`/g, '$1')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function rewriteHref(href) {
  if (/^(https?:|mailto:|#)/.test(href)) {
    return href;
  }

  if (/\/$/.test(href)) {
    return `${href}README.html`;
  }

  return href.replace(/\.md(#.*)?$/, (_match, hash = '') => `.html${hash}`);
}

function renderInline(text) {
  const tokens = [];
  let value = text.replace(/`([^`]+)`/g, (_match, code) => {
    const token = `\u0000${tokens.length}\u0000`;
    tokens.push(`<code>${escapeHtml(code)}</code>`);
    return token;
  });

  value = escapeHtml(value)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, href) => {
      return `<a href="${escapeHtml(rewriteHref(href))}">${escapeHtml(label)}</a>`;
    })
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  for (let index = 0; index < tokens.length; index += 1) {
    value = value.replaceAll(`\u0000${index}\u0000`, tokens[index]);
  }

  return value;
}

function flushParagraph(blocks, paragraph) {
  if (paragraph.length === 0) {
    return;
  }

  blocks.push(`<p>${renderInline(paragraph.join(' '))}</p>`);
  paragraph.length = 0;
}

function renderTable(rows) {
  const cells = rows.map((row) => row.trim().slice(1, -1).split('|').map((cell) => cell.trim()));
  const header = cells[0] ?? [];
  const body = cells.slice(2);

  return [
    '<table>',
    '<thead><tr>',
    ...header.map((cell) => `<th>${renderInline(cell)}</th>`),
    '</tr></thead>',
    '<tbody>',
    ...body.map((row) => [
      '<tr>',
      ...row.map((cell) => `<td>${renderInline(cell)}</td>`),
      '</tr>',
    ].join('')),
    '</tbody>',
    '</table>',
  ].join('');
}

export function renderMarkdown(markdown) {
  const body = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const blocks = [];
  const paragraph = [];
  let list = null;
  let table = null;
  let code = null;

  const closeList = () => {
    if (!list) {
      return;
    }
    blocks.push(`<${list.type}>${list.items.map((item) => `<li>${renderInline(item)}</li>`).join('')}</${list.type}>`);
    list = null;
  };

  const closeTable = () => {
    if (!table) {
      return;
    }
    blocks.push(renderTable(table));
    table = null;
  };

  for (const line of body.replace(/\r\n/g, '\n').split('\n')) {
    if (code) {
      if (line.startsWith('```')) {
        blocks.push(`<pre><code>${escapeHtml(code.lines.join('\n'))}</code></pre>`);
        code = null;
      } else {
        code.lines.push(line);
      }
      continue;
    }

    if (line.startsWith('```')) {
      flushParagraph(blocks, paragraph);
      closeList();
      closeTable();
      code = { lines: [] };
      continue;
    }

    if (line.trim() === '') {
      flushParagraph(blocks, paragraph);
      closeList();
      closeTable();
      continue;
    }

    if (line.trim().startsWith('|')) {
      flushParagraph(blocks, paragraph);
      closeList();
      table ??= [];
      table.push(line);
      continue;
    }

    closeTable();

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph(blocks, paragraph);
      closeList();
      const level = heading[1].length;
      const text = heading[2].trim();
      blocks.push(`<h${level} id="${slugify(text)}">${renderInline(text)}</h${level}>`);
      continue;
    }

    const unordered = line.match(/^\s*-\s+(.+)$/);
    const ordered = line.match(/^\s*\d+\.\s+(.+)$/);
    if (unordered || ordered) {
      flushParagraph(blocks, paragraph);
      const type = unordered ? 'ul' : 'ol';
      if (list && list.type !== type) {
        closeList();
      }
      list ??= { type, items: [] };
      list.items.push((unordered ?? ordered)[1]);
      continue;
    }

    closeList();
    paragraph.push(line.trim());
  }

  if (code) {
    blocks.push(`<pre><code>${escapeHtml(code.lines.join('\n'))}</code></pre>`);
  }
  flushParagraph(blocks, paragraph);
  closeList();
  closeTable();

  return blocks.join('\n');
}

function pageTitle(markdown, fallback) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].replace(/`/g, '') : fallback;
}

function outputPathFor(markdownPath) {
  if (markdownPath === 'README.md') {
    return 'index.html';
  }

  return markdownPath.replace(/\.md$/, '.html');
}

async function discoverEntryPages(rootDir) {
  const entryRoot = path.join(rootDir, 'gui-md');
  const entries = await readdir(entryRoot, { withFileTypes: true });
  const pages = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }
    for (const name of ['README.md', 'GUI.md', 'HTML.md']) {
      pages.push(path.posix.join('gui-md', entry.name, name));
    }
  }

  return pages.sort();
}

function layout({ title, body, nav }) {
  const navItems = nav
    .map((item) => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.title)}</a>`)
    .join('\n');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} - Awesome GUI.md</title>
  <link rel="stylesheet" href="/assets/site.css">
</head>
<body>
  <div class="shell">
    <aside class="sidebar">
      <a class="brand" href="/index.html">Awesome GUI.md</a>
      <nav>${navItems}</nav>
    </aside>
    <main>${body}</main>
  </div>
</body>
</html>
`;
}

export async function buildSite({
  rootDir = path.resolve(import.meta.dirname, '..'),
  outDir = path.join(rootDir, 'dist'),
} = {}) {
  const pages = [...defaultPages, ...(await discoverEntryPages(rootDir))];
  const pageData = [];

  for (const markdownPath of pages) {
    const source = await readFile(path.join(rootDir, markdownPath), 'utf8');
    pageData.push({
      markdownPath,
      outputPath: outputPathFor(markdownPath),
      title: pageTitle(source, markdownPath),
      body: renderMarkdown(source),
    });
  }

  await rm(outDir, { recursive: true, force: true });
  await mkdir(path.join(outDir, 'assets'), { recursive: true });
  await writeFile(path.join(outDir, 'assets', 'site.css'), siteCss.trimStart());

  const nav = pageData.map((page) => ({
    title: page.title,
    href: `/${page.outputPath.replaceAll(path.sep, '/')}`,
  }));

  for (const page of pageData) {
    const destination = path.join(outDir, ...page.outputPath.split('/'));
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, layout({ title: page.title, body: page.body, nav }));
  }

  return { outDir, pages };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const outArg = process.argv.find((arg) => arg.startsWith('--out-dir='));
  const outDir = outArg ? path.resolve(outArg.slice('--out-dir='.length)) : undefined;
  const result = await buildSite({ outDir });
  console.log(`Built ${result.pages.length} pages into ${path.relative(process.cwd(), result.outDir) || result.outDir}`);
}
