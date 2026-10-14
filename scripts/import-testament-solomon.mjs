import fs from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const pagesPath = '/private/tmp/testament-solomon-pages.json';
const sourcePath = '/private/tmp/testament-solomon-source.json';
const translatedPath = '/private/tmp/testament-solomon-es-work.json';
const outputPath = new URL('../textos/testament-solomon-es.json', import.meta.url);
const run = promisify(execFile);

let pages;
try {
  pages = JSON.parse(await fs.readFile(pagesPath, 'utf8'));
} catch {
  pages = await Promise.all(Array.from({ length: 45 }, async (_, index) => {
    const page = index + 1;
    const url = `https://en.wikisource.org/wiki/Page:Testament_of_Solomon.djvu/${page}?action=raw`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${response.status} al descargar la página ${page} de Conybeare`);
    return response.text();
  }));
  await fs.writeFile(pagesPath, JSON.stringify(pages));
}
let source = pages.slice(14).join('\n')
  .replace(/<noinclude>[\s\S]*?<\/noinclude>/g, '\n')
  .replace(/<ref\b[^>]*>[\s\S]*?<\/ref>/g, '')
  .replace(/<ref\b[^>]*\/>/g, '')
  .replace(/<[^>]*>/g, '')
  .replace(/\{\{polytonic\|([^}]+)\}\}/g, '$1')
  .replace(/\{\{[^{}]*\}\}/g, '')
  .replace(/'{2,}/g, '')
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ')
  .replace(/&hellip;/g, '…').replace(/&#8217;|&rsquo;/g, '’').replace(/&mdash;/g, '—').replace(/&ndash;/g, '–')
  .replace(/<section\b[^>]*\/>/g, '');

// Numbered sections are Conybeare's editorial divisions, not manuscript chapter/verse numbers.
const markers = [...source.matchAll(/(?:^|\n)\s*(\d{1,3})[.,]\s/g)];
const sections = markers.map((match, index) => {
  const start = match.index + match[0].length;
  const end = markers[index + 1]?.index ?? source.length;
  const text = source.slice(start, end).replace(/\s+/g, ' ').trim()
    .replace(/\[\s*\]/g, '').replace(/\s+([,.;:!?])/g, '$1');
  return { number: Number(match[1]), text };
}).filter((section) => section.number >= 1 && section.number <= 130 && section.text);

if (sections.length !== 130 || sections.some((section, index) => section.number !== index + 1)) {
  throw new Error(`Se esperaban 130 secciones consecutivas; se extrajeron ${sections.length}`);
}
await fs.writeFile(sourcePath, JSON.stringify(sections));

const python = process.env.ARGOS_PYTHON || '/private/tmp/apjohn-translate-venv/bin/python';
const translateProgram = [
  'import json,sys',
  'from argostranslate import translate',
  'class NoSplit:',
  '    def split_sentences(self,text): return [text]',
  "translation=translate.get_translation_from_codes('en','es')",
  'translation.underlying.sentencizer=NoSplit()',
  'sections=json.load(open(sys.argv[1]))',
  "for s in sections: s['text']=translation.translate(s['text'])",
  'json.dump(sections,open(sys.argv[2],\'w\'),ensure_ascii=False)',
].join('\n');
await run(python, ['-c', translateProgram, sourcePath, translatedPath], { maxBuffer: 1024 * 1024 * 16 });
const translated = JSON.parse(await fs.readFile(translatedPath, 'utf8'));
const titles = [
  'El anillo y Ornias', 'Belcebú y los primeros espíritus', 'Onosquelis y los demonios de las pasiones',
  'Asmodeo y los espíritus de enfermedad', 'Los demonios y sus operaciones', 'Los ángeles que los frustran',
  'Los espíritus sometidos al rey', 'Los obreros del templo', 'El altar y los siete cielos',
  'El príncipe de los demonios y los astros', 'Los espíritus del viento y del zodíaco',
  'El templo concluido', 'La caída de Salomón y su arrepentimiento',
];
const chapters = Array.from({ length: 13 }, (_, index) => {
  const first = index * 10 + 1;
  const last = Math.min(first + 9, 130);
  return {
    number: index + 1,
    title: titles[index],
    sourceSectionRange: `§§ ${first}–${last}`,
    verses: translated.slice(first - 1, last).map((section) => ({
      number: String(section.number - first + 1),
      sourceSection: section.number,
      text: section.text.trim(),
      editorialNumber: true,
    })),
  };
});

const document = {
  id: 'testament-solomon-es',
  title: 'Testamento de Salomón',
  language: 'es',
  sourceLanguage: 'Griego (traducción de trabajo desde el inglés)',
  translator: 'Traducción de trabajo al español basada en F. C. Conybeare (1898)',
  publication: 'Texto completo según la traducción inglesa histórica de Conybeare, §§ 1–130',
  license: 'La traducción inglesa de 1898 es de dominio público en Estados Unidos; esta es una traducción de trabajo al español.',
  sourceUrl: 'https://en.wikisource.org/wiki/The_Testament_of_Solomon',
  externalTextUrl: 'https://www2.esotericarchives.com/solomon/testamen.htm',
  externalTextKind: 'full',
  localTextKind: 'full',
  externalTextLanguage: 'inglés',
  externalTextLabel: 'Testamento de Salomón · F. C. Conybeare (1898)',
  externalTextNote: 'La edición fuente presenta una traducción histórica del griego; esta versión española es de trabajo y no reemplaza una edición crítica.',
  notes: 'Texto completo dividido en 130 secciones numeradas por Conybeare. Para facilitar la navegación, se agrupan aquí en 13 capítulos editoriales de diez secciones. Los títulos y agrupaciones son editoriales; no pertenecen al manuscrito. Se omiten notas al pie del traductor y aparato erudito.',
  chapters,
};

await fs.writeFile(outputPath, `${JSON.stringify(document, null, 2)}\n`);
console.log(`Escrito ${outputPath.pathname}: ${translated.length} secciones, ${translated.reduce((n, s) => n + s.text.split(/\s+/).length, 0)} palabras.`);
