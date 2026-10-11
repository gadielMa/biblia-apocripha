/**
 * Sincroniza las ediciones españolas de trabajo desde /Users/gadiel/BIBLIA.
 *
 * No reemplaza las ediciones canónicas RVR1909: esa operación requiere una
 * fuente RVR1960 con permiso explícito de redistribución.
 */
import { copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, basename } from 'node:path';

const workRoot = process.env.BIBLIA_WORK_ROOT || '/Users/gadiel/BIBLIA/textos';
const repoRoot = new URL('../textos/', import.meta.url).pathname;

const sourceGroups = ['deuterocanonicos', 'etiope'];
const copied = [];

async function copySource(relative, targetRelative = relative) {
  const source = join(workRoot, relative);
  const target = join(repoRoot, targetRelative);
  await mkdir(join(target, '..'), { recursive: true });
  await copyFile(source, target);
  copied.push(targetRelative);
}

for (const group of sourceGroups) {
  const names = await readdir(join(workRoot, group));
  for (const name of names.filter(name => name.endsWith('.es.json') && !(group === 'etiope' && name === 'octateuco-clemente.es.json'))) {
    await copySource(join(group, name));
  }
}

// Estas fichas ya tenían nombres/IDs históricos en el sitio: conservamos las
// rutas públicas y sólo sincronizamos su contenido de trabajo más reciente.
for (const [source, target] of [
  ['qumran/rollo-templo.es.json', 'rollo-templo-es.json'],
  ['etiope/octateuco-clemente.es.json', 'octateuco-clemente-es.json']
]) {
  const work = JSON.parse(await readFile(join(workRoot, source), 'utf8'));
  work.id = target.replace(/\.json$/, '');
  await writeFile(join(repoRoot, target), `${JSON.stringify(work, null, 2)}\n`);
  copied.push(target);
}

const catalogPath = join(repoRoot, 'catalog.json');
const catalog = JSON.parse(await readFile(catalogPath, 'utf8'));
// El Octateuco ya tenía una ruta pública histórica en la raíz.
const duplicateOctateuco = catalog.findIndex(entry => entry.id === 'etiope-octateuco-clemente');
if (duplicateOctateuco >= 0) catalog.splice(duplicateOctateuco, 1);
const known = new Set(catalog.map(entry => entry.id));
const workCatalog = JSON.parse(await readFile(join('/Users/gadiel/BIBLIA', 'catalog.json'), 'utf8'));
for (const entry of workCatalog) {
  if (entry.id === 'etiope-octateuco-clemente') continue;
  if (known.has(entry.id)) continue;
  if (!entry.file.startsWith('textos/')) continue;
  const sourceRelative = entry.file.replace(/^textos\//, '');
  if (!sourceGroups.some(group => sourceRelative.startsWith(`${group}/`))) continue;
  catalog.push({ ...entry, file: sourceRelative });
  known.add(entry.id);
}
await writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);

// El catálogo visual tiene algunas obras etíopes/deuterocanónicas que antes
// eran sólo fichas. Les agregamos el enlace al lector y las cuatro fichas que
// no tenían fila propia.
const dataPath = new URL('../data.json', import.meta.url).pathname;
const data = JSON.parse(await readFile(dataPath, 'utf8'));
const additions = [
  {
    Grupo: 'Deuterocanónicos / Antiguo Testamento', Tanaj: '', 'Biblia Católica': 'Carta de Jeremías', 'Biblia Etíope': 'Carta de Jeremías', BIBLIOTECA: '', 'Fecha aproximada': 'siglo II–I a.C.', 'Idioma original': 'Griego', Resumen: 'Carta profética contra la idolatría, transmitida como Baruc 6.', _archivo: null, _tipo: null
  },
  {
    Grupo: 'Deuterocanónicos / Antiguo Testamento', Tanaj: '', 'Biblia Católica': 'Susana', 'Biblia Etíope': 'Susana', BIBLIOTECA: '', 'Fecha aproximada': 'siglo II–I a.C.', 'Idioma original': 'Griego', Resumen: 'Relato judicial de Susana, acusada injustamente y defendida por Daniel.', _archivo: null, _tipo: null
  },
  {
    Grupo: 'Deuterocanónicos / Antiguo Testamento', Tanaj: '', 'Biblia Católica': 'Bel y el Dragón', 'Biblia Etíope': 'Bel y el Dragón', BIBLIOTECA: '', 'Fecha aproximada': 'siglo II–I a.C.', 'Idioma original': 'Griego', Resumen: 'Relatos de Daniel contra la idolatría de Bel y el culto al dragón.', _archivo: null, _tipo: null
  },
  {
    Grupo: 'Nuevo Testamento Etíope', Tanaj: '', 'Biblia Católica': '', 'Biblia Etíope': 'Constituciones Apostólicas', BIBLIOTECA: '', 'Fecha aproximada': 'siglo IV d.C.', 'Idioma original': 'Griego', Resumen: 'Colección de instrucciones litúrgicas, disciplina eclesial y vida comunitaria.', _archivo: null, _tipo: null
  }
];
const existingNames = new Set(data.flatMap(row => [row.Tanaj, row['Biblia Católica'], row['Biblia Etíope'], row.BIBLIOTECA]).filter(Boolean));
for (const row of additions) if (!existingNames.has(row['Biblia Católica'] || row['Biblia Etíope'])) data.push(row);
await writeFile(dataPath, `${JSON.stringify(data, null, 2)}\n`);
const csvColumns = ['Grupo', 'Tanaj', 'Biblia Católica', 'Biblia Etíope', 'BIBLIOTECA', 'Fecha aproximada', 'Idioma original', 'Resumen'];
const csvEscape = value => {
  const text = String(value ?? '');
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};
await writeFile(new URL('../data.csv', import.meta.url), `${csvColumns.join(',')}\n${data.map(row => csvColumns.map(column => csvEscape(row[column])).join(',')).join('\n')}\n`);

const indexPath = new URL('../index.html', import.meta.url).pathname;
const indexHtml = await readFile(indexPath, 'utf8');
const dataStart = indexHtml.indexOf('const DATA = ');
const dataEnd = indexHtml.indexOf('\n\n// ── Data cleanup', dataStart);
if (dataStart >= 0 && dataEnd >= 0) {
  const updated = `${indexHtml.slice(0, dataStart)}const DATA = ${JSON.stringify(data)};${indexHtml.slice(dataEnd)}`;
  await writeFile(indexPath, updated);
}

console.log(`Sincronizados ${copied.length} archivos españoles; catálogo: ${catalog.length} entradas.`);
