import fs from 'node:fs/promises';

const ROOT = 'https://garovartabedian.com';
const EDITION = `${ROOT}/early/library/secret-book-john`;
const OUTPUT = new URL('../textos/apocryphon-juan.es.json', import.meta.url);
const CACHE = '/private/tmp/apocryphon-john-es-cache.json';
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
let translationCache = {};
try {
  translationCache = JSON.parse(await fs.readFile(CACHE, 'utf8'));
} catch {
  // La caché es opcional y permite reanudar una importación interrumpida.
}

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
  .map((paragraph) => paragraph.replace(/^\d+\.\s*/, ''));

const translateChunk = async (text) => {
  if (translationCache[text]) return translationCache[text];
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    try {
      const response = await fetch('https://translate.terraprint.co/translate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ q: text, source: 'en', target: 'es', format: 'text' }),
        signal: AbortSignal.timeout(45000),
      });
      if (response.ok) {
        const payload = await response.json();
        const translated = payload.translatedText.replace(/\s+/g, ' ').trim();
        translationCache[text] = translated;
        await fs.writeFile(CACHE, JSON.stringify(translationCache));
        return translated;
      }
      if (attempt === 6) throw new Error(`${response.status} al traducir un fragmento`);
    } catch (error) {
      if (attempt === 6) throw error;
    }
    await delay(attempt * 1500);
  }
};

const translate = async (text) => {
  const sentences = text.match(/[^.!?]+(?:[.!?]+[”’"']?|$)/g) || [text];
  const chunks = [];
  for (const sentence of sentences) {
    const clean = sentence.trim();
    const previous = chunks.at(-1);
    if (previous && `${previous} ${clean}`.length <= 750) chunks[chunks.length - 1] = `${previous} ${clean}`;
    else chunks.push(clean);
  }
  const translated = [];
  for (const chunk of chunks) translated.push(await translateChunk(chunk));
  return translated.join(' ');
};

const landing = await fetchText(EDITION);
const urls = chooseCodexIiUrls(landing);
const chapters = [];

for (let index = 0; index < urls.length; index += 1) {
  const sourcePath = urls[index];
  const html = await fetchText(`${ROOT}${sourcePath}`);
  const sourceParagraphs = extractParagraphs(html);
  if (!sourceParagraphs.length) throw new Error(`El capítulo ${index + 1} quedó vacío`);

  const verses = [];
  for (let position = 0; position < sourceParagraphs.length; position += 1) {
    const text = await translate(sourceParagraphs[position]);
    verses.push({ number: String(position + 1), text, editorialNumber: true });
  }

  chapters.push({
    number: index + 1,
    title: `División ${index + 1}`,
    sourceWitness: sourcePath.split('/').at(-1).replace(`chapter-${index + 1}-`, '').replaceAll('-', ' '),
    verses,
  });
  console.log(`Capítulo ${index + 1}: ${verses.length} párrafos`);
}

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
  externalTextLanguage: 'inglés',
  externalTextLabel: 'The Secret Book of John · edición y testimonios',
  externalTextNote: 'La página fuente separa los cuatro testimonios manuscritos. Esta edición sigue el Códice II y señala su carácter de traducción de trabajo.',
  notes: 'Texto completo organizado según las 21 divisiones de lectura de la fuente. Los números de párrafo son editoriales y no forman parte del manuscrito. Los corchetes reflejan lagunas o reconstrucciones de la traducción fuente. No es una edición crítica.',
  chapters,
};

await fs.writeFile(OUTPUT, `${JSON.stringify(document, null, 2)}\n`);
console.log(`Escrito ${OUTPUT.pathname}`);
