import { readFile, writeFile } from 'node:fs/promises';
import { basename, join } from 'node:path';

const [sourcePath, outputDir = 'textos'] = process.argv.slice(2);
if (!sourcePath) throw new Error('Uso: node scripts/import-2-enoc.mjs <fuente-wikisource.txt> [directorio-salida]');

const raw = await readFile(sourcePath, 'utf8');
const sections = [...raw.matchAll(/^==Chapter (\d+)==$([\s\S]*?)(?=^==Chapter \d+==$|(?![\s\S]))/gm)];
if (sections.length !== 68) throw new Error(`Se esperaban 68 capítulos y se detectaron ${sections.length}.`);

const chapters = sections.map(([, number, content]) => {
  const verses = [];
  for (const sourceLine of content.split('\n')) {
    const line = sourceLine.trim();
    if (!line || line.startsWith('{{') || line.startsWith('}}') || line.startsWith('[[')) continue;
    const match = line.match(/^(\d+)\s+(.+)$/);
    if (match) {
      verses.push({ number: match[1], text: match[2].trim() });
    } else if (verses.length) {
      verses.at(-1).text += ` ${line}`;
    }
  }
  return { number: Number(number), verses };
});

if (chapters.some(chapter => !chapter.verses.length)) throw new Error('Hay capítulos sin versículos.');

const work = {
  id: '2-enoc',
  title: '2 Enoch (Book of the Secrets of Enoch)',
  language: 'en',
  sourceLanguage: 'Church Slavonic',
  translator: 'Rutherford H. Platt, Jr. (1928 edition)',
  publication: 'The Forgotten Books of Eden, 1928',
  license: 'Public-domain edition transcribed by Wikisource; retain attribution and verify local status before redistribution.',
  sourceUrl: 'https://en.wikisource.org/wiki/The_Forgotten_Books_of_Eden/The_Book_of_the_Secrets_of_Enoch',
  sourceFile: basename(sourcePath),
  chapters
};

await writeFile(join(outputDir, '2-enoc.en.json'), `${JSON.stringify(work, null, 2)}\n`);
console.log(`Importado ${work.title}: ${chapters.length} capítulos; ${chapters.reduce((total, chapter) => total + chapter.verses.length, 0)} versículos.`);
