import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const outputDir = process.argv[2] || 'textos';
const files = (await readdir(outputDir)).filter(file => file.endsWith('.json') && file !== 'search-index.json' && file !== 'catalog.json');
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
