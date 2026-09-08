import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const outputDir = process.argv[2] || 'textos';
async function findJsonFiles(dir, relative = '') {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const rel = join(relative, entry.name);
    if (entry.isDirectory()) files.push(...await findJsonFiles(join(dir, entry.name), rel));
    else if (entry.name.endsWith('.json') && entry.name !== 'search-index.json' && entry.name !== 'catalog.json') files.push(rel);
  }
  return files;
}
const files = await findJsonFiles(outputDir);
const works = (await Promise.all(files.map(async file => JSON.parse(await readFile(join(outputDir, file), 'utf8')))))
  .filter(work => Array.isArray(work.chapters));

const index = works.flatMap(work => work.chapters.flatMap(chapter => {
  const verses = chapter.verses || (chapter.paragraphs || []).map((text, position) => ({ number: String(position + 1), text, editorialNumber: true }));
  return verses.map((verse, position) => ({
    id: `${work.id}-${chapter.number}-${position + 1}`,
    documentId: work.id,
    title: work.title,
    language: work.language,
    chapter: chapter.number,
    verse: verse.number,
    editorialNumber: verse.editorialNumber === true,
    text: verse.text
  }));
}));

await writeFile(join(outputDir, 'search-index.json'), `${JSON.stringify(index)}\n`);
console.log(`Índice actualizado: ${works.length} obras, ${index.length} pasajes.`);
