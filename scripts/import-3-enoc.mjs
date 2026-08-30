import { readFile, writeFile } from 'node:fs/promises';
import { basename, join } from 'node:path';

const [sourcePath, outputDir = 'textos'] = process.argv.slice(2);
if (!sourcePath) throw new Error('Uso: node scripts/import-3-enoc.mjs <fuente-odeberg.txt> [directorio-salida]');

const romanValues = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
const romanToInt = value => [...value.replace(/\s/g, '')].reduce((total, char, index, chars) => {
  const current = romanValues[char];
  return total + (current < (romanValues[chars[index + 1]] || 0) ? -current : current);
}, 0);

const raw = await readFile(sourcePath, 'utf8');
const heading = /^CHAPTER\s+([IVXLCDM\s]+)(?:\s+\d+)?(?:\s+\(cont\.\))?\s*(?:\(([A-Da-d])\)|\s+([a-d]))?\s*$/gm;
const markers = [...raw.matchAll(heading)];
if (markers.length < 48) throw new Error(`Se esperaban al menos 48 secciones y se detectaron ${markers.length}.`);

const chapters = markers.map((match, index) => {
  const numeral = romanToInt(match[1]);
  const suffix = (match[2] || match[3] || '').toUpperCase();
  const number = `${numeral}${suffix}`;
  const content = raw.slice(match.index + match[0].length, markers[index + 1]?.index);
  const verses = [];
  for (const sourceLine of content.split('\n')) {
    const line = sourceLine.replace(/\s+/g, ' ').trim();
    if (!line) continue;
    const verse = line.match(/^\((\d+)\)\s*(.*)$/);
    if (verse) {
      verses.push({ number: verse[1], text: verse[2] });
    } else if (verses.length) {
      verses.at(-1).text += ` ${line}`;
    }
  }
  if (!verses.length) return { number, verses: [{ number: '1', text: content.replace(/\s+/g, ' ').trim(), editorialNumber: true }] };
  return { number, verses };
});

const unique = new Set(chapters.map(chapter => chapter.number));
if (unique.size !== chapters.length) throw new Error('Se detectaron encabezados de capítulo duplicados.');

const work = {
  id: '3-enoc',
  title: '3 Enoch (Hebrew Book of Enoch / Sefer Hekhalot)',
  language: 'en',
  sourceLanguage: 'Hebrew',
  translator: 'Hugo Odeberg',
  publication: '3 Enoch or The Hebrew Book of Enoch, 1928',
  license: 'Public domain in the United States due to its 1928 publication; verify local status before redistribution.',
  sourceUrl: 'https://archive.org/details/HebrewBookOfEnochenoch3',
  sourceFile: basename(sourcePath),
  chapters
};

await writeFile(join(outputDir, '3-enoc.en.json'), `${JSON.stringify(work, null, 2)}\n`);
console.log(`Importado ${work.title}: ${chapters.length} secciones; ${chapters.reduce((total, chapter) => total + chapter.verses.length, 0)} versículos.`);
