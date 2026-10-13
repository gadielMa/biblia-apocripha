import fs from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const ROOT = 'https://garovartabedian.com';
const EDITION = `${ROOT}/early/library/secret-book-john`;
const OUTPUT = new URL('../textos/apocryphon-juan.es.json', import.meta.url);
const SOURCE_CACHE = '/private/tmp/apocryphon-john-en.json';
const TRANSLATION_CACHE = '/private/tmp/apocryphon-john-es.json';
const run = promisify(execFile);

const decodeHtml = (value) => value
  .replace(/<br\s*\/?>/gi, '\n')
  .replace(/<[^>]+>/g, '')
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'")
  .replace(/&mdash;/g, '—')
  .replace(/&ndash;/g, '–')
  .replace(/&hellip;/g, '…')
  .replace(/&ldquo;|&rdquo;/g, '“')
  .replace(/&lsquo;|&rsquo;/g, '’')
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
  .replace(/\s+/g, ' ')
  .trim();

const fetchText = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} al descargar ${url}`);
  return response.text();
};

const chooseCodexIiUrls = (landing) => {
  const hrefs = [...landing.matchAll(/href="(\/early\/library\/secret-book-john\/chapter-(\d+)-[^"]+)"/g)]
    .map(([, href, chapter]) => ({ href, chapter: Number(chapter) }));

  return Array.from({ length: 21 }, (_, index) => {
    const chapter = index + 1;
    const candidates = hrefs.filter((item) => item.chapter === chapter && /codex-ii(?:-|$)/.test(item.href));
    if (!candidates.length) throw new Error(`No se encontró Códice II para el capítulo ${chapter}`);
    candidates.sort((a, b) => a.href.length - b.href.length);
    return candidates[0].href;
  });
};

const extractParagraphs = (html) => [...html.matchAll(/<p id="p\d+-r\d+"[^>]*>([\s\S]*?)<\/p>/g)]
  .map(([, paragraph]) => decodeHtml(paragraph))
  .filter(Boolean)
  .map((paragraph) => paragraph
    .replace(/^\d+\.\s*/, '')
    .replace(/⟦page \d+⟧/gi, '')
    .replace(/[\[\]‹›]/g, '')
    .replace(/\s+/g, ' ')
    .trim());

const landing = await fetchText(EDITION);
const urls = chooseCodexIiUrls(landing);
const sourceChapters = [];

for (let index = 0; index < urls.length; index += 1) {
  const sourcePath = urls[index];
  const html = await fetchText(`${ROOT}${sourcePath}`);
  const sourceParagraphs = extractParagraphs(html);
  if (!sourceParagraphs.length) throw new Error(`El capítulo ${index + 1} quedó vacío`);

  sourceChapters.push({
    number: index + 1,
    sourceWitness: sourcePath.split('/').at(-1).replace(`chapter-${index + 1}-`, '').replaceAll('-', ' '),
    paragraphs: sourceParagraphs,
  });
  console.log(`Fuente ${index + 1}: ${sourceParagraphs.length} párrafos`);
}

await fs.writeFile(SOURCE_CACHE, JSON.stringify(sourceChapters));
const python = process.env.ARGOS_PYTHON || 'python3';
const translationProgram = [
  'import json, sys',
  'from argostranslate import translate',
  'source=json.load(open(sys.argv[1]))',
  'for chapter in source:',
  "    chapter['paragraphs']=[translate.translate(text, 'en', 'es') for text in chapter['paragraphs']]",
  "json.dump(source, open(sys.argv[2], 'w'), ensure_ascii=False)",
].join('\n');
await run(python, ['-c', translationProgram, SOURCE_CACHE, TRANSLATION_CACHE], { maxBuffer: 1024 * 1024 * 4 });
const translatedChapters = JSON.parse(await fs.readFile(TRANSLATION_CACHE, 'utf8'));
const polish = (text) => text
  .replace(/\b[Ss]ophia\b/g, (match) => (match[0] === 'S' ? 'Sofía' : 'sofía'))
  .replace(/\bmonada\b/gi, 'Mónada')
  .replace(/\baeon\b/gi, 'eón')
  .replace(/\bY(?:altabaoth|altabaot|aldabaoth)\b/g, 'Yaldabaot')
  .replace(/\barción principal\b/gi, 'arconte principal')
  .replace(/\barción mayor\b/gi, 'arconte principal')
  .replace(/\barción\b/gi, 'arconte')
  .replace(/\barcón principal\b/gi, 'arconte principal')
  .replace(/\barcón\b/gi, 'arconte')
  .replace(/\barcónicos\b/gi, 'arcontes')
  .replace(/\bExtolló\b/g, 'Ensalzó')
  .replace(/\bextolló\b/g, 'ensalzó')
  .replace(/\bextollándolo\b/g, 'ensalzándolo')
  .replace(/\bPrimal\b/g, 'primordial')
  .replace(/\bentraron en ser\b/g, 'llegaron a existir')
  .replace(/\bentrado en ser\b/g, 'llegado a existir')
  .replace(/\bemitió\b/g, 'surgió')
  .replace(/\bemitir\b/g, 'surgir')
  .replace(/\bconcogió una trama\b/gi, 'tramó una conspiración')
  .replace(/\bconcogieron una parcela\b/gi, 'tramaron un plan')
  .replace(/\bincontante\b/gi, 'inconstante')
  .replace(/\bdurable\b/gi, 'duradera')
  .replace(/\s+/g, ' ')
  .trim();
const chapterTitles = [
  'Prólogo y pregunta de Juan',
  'La aparición del Salvador',
  'La Mónada, Espíritu invisible',
  'La plenitud incognoscible',
  'Barbelo, el primer Pensamiento',
  'El Hijo autogenerado',
  'Los eones y las luminarias',
  'El Hombre perfecto y su descendencia',
  'Sofía y el nacimiento de Yaltabaot',
  'Yaltabaot crea sus autoridades',
  'Los gobernantes y sus poderes',
  'La voz y la imagen celestial',
  'La formación de Adán',
  'El cuerpo permanece inmóvil',
  'El aliento y el despertar de Adán',
  'La ayuda luminosa y Eva',
  'El árbol del conocimiento y la expulsión',
  'El destino de las almas',
  'El espíritu falso y el diluvio',
  'El himno de la Providencia',
  'Encargo final a Juan',
];
const chapters = translatedChapters.map((chapter) => ({
  number: chapter.number,
  title: chapterTitles[chapter.number - 1],
  sourceWitness: chapter.sourceWitness,
  verses: chapter.paragraphs.map((text, index) => ({
    number: String(index + 1),
    text: polish(text),
    editorialNumber: true,
  })),
}));

const document = {
  id: 'apocryphon-john-es',
  title: 'Apócrifo de Juan (Libro Secreto de Juan)',
  language: 'es',
  sourceLanguage: 'Copto (traducción de trabajo desde el inglés)',
  translator: 'Traducción de trabajo al español basada en Samuel Zinner; edición inglesa de Mark M. Mattison',
  publication: 'Recensión larga del Códice II de Nag Hammadi, con pasajes compartidos II/IV',
  license: 'La traducción inglesa de Zinner/Mattison fue dedicada al dominio público. Esta traducción de trabajo puede reutilizarse con atribución de la fuente.',
  sourceUrl: 'https://www.luminescence-llc.net/nag-hammadi',
  externalTextUrl: EDITION,
  externalTextKind: 'full',
  localTextKind: 'full',
  externalTextLanguage: 'inglés',
  externalTextLabel: 'The Secret Book of John · edición y testimonios',
  externalTextNote: 'La página fuente separa los cuatro testimonios manuscritos. Esta edición sigue el Códice II y señala su carácter de traducción de trabajo.',
  notes: 'Texto completo organizado según las 21 divisiones de lectura de la fuente. Los títulos y números de párrafo son editoriales y no forman parte del manuscrito. Para facilitar la lectura se omitieron las marcas de página y los corchetes de reconstrucción de la traducción fuente. No es una edición crítica.',
  chapters,
};

await fs.writeFile(OUTPUT, `${JSON.stringify(document, null, 2)}\n`);
console.log(`Escrito ${OUTPUT.pathname}`);
