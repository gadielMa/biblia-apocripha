import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const dir = join(process.cwd(), 'textos');
const files = (await readdir(dir, { recursive: true }))
  .filter((name) => name.endsWith('.json') && !name.endsWith('search-index.json') && !name.endsWith('catalog.json'));
const issues = [];
const warnings = [];
let passages = 0;
for (const name of files) {
  const path = join(dir, name);
  let doc;
  try { doc = JSON.parse(await readFile(path, 'utf8')); } catch (error) {
    issues.push(`${name}: JSON inválido (${error.message})`); continue;
  }
  if (!doc.id || !doc.title || !doc.language) issues.push(`${name}: faltan campos de identidad`);
  if (!Array.isArray(doc.chapters) || doc.chapters.length === 0) issues.push(`${name}: sin capítulos`);
  for (const chapter of doc.chapters ?? []) {
    const verses = chapter.verses ?? [];
    passages += verses.length;
    const nums = verses.map((verse) => String(verse.number));
    if (new Set(nums).size !== nums.length) warnings.push(`${name}: etiquetas editoriales repetidas en capítulo ${chapter.number}`);
    if (verses.some((verse) => !verse.text || !String(verse.text).trim())) warnings.push(`${name}: pasaje vacío en capítulo ${chapter.number}`);
  }
}
console.log(`Archivos auditados: ${files.length}`);
console.log(`Pasajes auditados: ${passages}`);
console.log(`Incidencias estructurales: ${issues.length}`);
for (const issue of issues) console.log(`- ${issue}`);
console.log(`Advertencias editoriales: ${warnings.length}`);
for (const warning of warnings) console.log(`- ${warning}`);
