import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, join } from 'node:path';

const [sourcePath, outputDir = 'textos'] = process.argv.slice(2);

if (!sourcePath) {
  throw new Error('Uso: node scripts/import-1-enoc.mjs <fuente-gutenberg.txt> [directorio-salida]');
}

const romanValues = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
function romanToInt(value) {
  return [...value].reduce((total, char, index, chars) => {
    const current = romanValues[char];
    return total + (current < (romanValues[chars[index + 1]] || 0) ? -current : current);
  }, 0);
}

function cleanText(value) {
  return value
    .replace(/\r/g, '')
    .replace(/\n\s*/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function toVerses(paragraphs) {
  let lastVerse = 0;
  let continuation = 0;
  const verses = [];

  for (let paragraph of paragraphs) {
    paragraph = paragraph.replace(/^[IVXLCDM]+\.\s+/, '');
    const markers = [...paragraph.matchAll(/(?:^|\s)(\d{1,3})\.\s+/g)];
    if (!markers.length) {
      continuation += 1;
      const number = lastVerse
        ? `${lastVerse}${String.fromCharCode(96 + continuation)}`
        : String(++lastVerse);
      verses.push({ number, text: paragraph, editorialNumber: true });
      continue;
    }
    markers.forEach((marker, index) => {
      const start = marker.index + marker[0].length;
      const end = index + 1 < markers.length ? markers[index + 1].index : paragraph.length;
      const text = paragraph.slice(start, end).trim();
      if (!text) return;
      lastVerse = Number(marker[1]);
      continuation = 0;
      verses.push({ number: String(lastVerse), text });
    });
  }
  return verses;
}

const raw = await readFile(sourcePath, 'utf8');
const start = raw.indexOf('THE BOOK OF ENOCH\r\n                                I-XXXVI.');
const end = raw.indexOf('PRINTED IN GREAT BRITAIN', start);
if (start < 0 || end < 0) throw new Error('No se pudo delimitar el texto de 1 Enoc.');

const paragraphs = raw.slice(start, end).replace(/\r/g, '').split(/\n\s*\n/);
const chapters = new Map();
let chapter = null;

for (const sourceParagraph of paragraphs) {
  const paragraph = cleanText(sourceParagraph);
  if (!paragraph || paragraph === 'THE BOOK OF ENOCH I-XXXVI.') continue;

  const match = paragraph.match(/^([IVXLCDM]+)\.\s+(?:\d+\.\s+)?/);
  if (match) {
    const number = romanToInt(match[1]);
    if (number >= 1 && number <= 108) {
      chapter = number;
      if (!chapters.has(chapter)) chapters.set(chapter, []);
    }
  }
  if (chapter) chapters.get(chapter).push(paragraph);
}

if (chapters.size !== 108) {
  throw new Error(`Se esperaban 108 capítulos y se detectaron ${chapters.size}.`);
}

const document = {
  id: '1-enoc',
  title: '1 Enoch',
  language: 'en',
  sourceLanguage: "Ge'ez (translation from Ethiopic)",
  translator: 'R. H. Charles',
  publication: 'The Book of Enoch, 1917',
  license: 'Public domain in the United States; verify local public-domain status before redistribution.',
  sourceUrl: 'https://www.gutenberg.org/ebooks/77935',
  sourceFile: basename(sourcePath),
  chapters: [...chapters.entries()].map(([number, content]) => ({ number, verses: toVerses(content) }))
};

await mkdir(outputDir, { recursive: true });
await writeFile(join(outputDir, '1-enoc.en.json'), `${JSON.stringify(document, null, 2)}\n`);

console.log(`Importado ${document.title}: ${document.chapters.length} capítulos.`);
