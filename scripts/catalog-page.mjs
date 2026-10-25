import { findTextSearchMatches, normalizeSearchText } from './search-utils.mjs';

const root = document.querySelector('#catalogo-view');
const search = root.querySelector('#search');
const body = root.querySelector('#tbody');
const empty = root.querySelector('#empty');
const textResults = root.querySelector('#text-results');
const textResultsContent = root.querySelector('#text-results-content');
const [dataResponse, worksResponse] = await Promise.all([fetch('data.json?v=53'), fetch('textos/catalog.json?v=53')]);
if (!dataResponse.ok || !worksResponse.ok) throw new Error('No se pudo cargar el catálogo');
const rows = await dataResponse.json();
const works = await worksResponse.json();
const bookName = row => [row.BIBLIOTECA, row.Tanaj, row['Biblia Católica'], row['Biblia Etíope']].filter(Boolean).filter((value, index, all) => all.indexOf(value) === index).join(' / ');
for (const row of rows) {
  if (bookName(row).includes('Manuscritos de Nag Hammadi') || bookName(row).includes('Textos de Qumrán')) row._hidden = true;
  if (!row['Tipo de entrada']) row['Tipo de entrada'] = ['Torá / Antiguo Testamento', 'Antiguo Testamento', 'Nuevo Testamento'].includes(row.Grupo) ? 'obra canónica' : 'obra independiente';
}
rows.push(
  {
    Grupo: 'Apócrifos del Nuevo Testamento', BIBLIOTECA: 'Evangelio Árabe de la Infancia',
    'Fecha aproximada': 'siglo V–VI d. C.', 'Idioma original': 'Siríaco / árabe',
    Resumen: 'Relatos de nacimiento, huida a Egipto y milagros de Jesús niño. Edición independiente basada en una recopilación de textos apócrifos.',
    _archivo: 'pdfs/evangelio-arabe-infancia.pdf', _tipo: 'pdf', _texto: 'arabic-infancy-es', _propio: true, 'Tipo de entrada': 'obra independiente'
  },
  {
    Grupo: 'Apócrifos del Nuevo Testamento', BIBLIOTECA: 'Evangelio del Pseudo-Mateo',
    'Fecha aproximada': 'siglo VII–VIII d. C.', 'Idioma original': 'Latín',
    Resumen: 'Evangelio latino de infancia y natividad que combina tradiciones marianas, nacimiento de Jesús y milagros de infancia.',
    _archivo: 'pdfs/evangelio-pseudo-mateo.pdf', _tipo: 'pdf', _texto: 'pseudo-mateo-es', _propio: true, 'Tipo de entrada': 'obra independiente'
  },
  {
    Grupo: 'Apócrifos del Nuevo Testamento', BIBLIOTECA: 'Historia de José el Carpintero',
    'Fecha aproximada': 'siglo VI d. C.', 'Idioma original': 'Copto',
    Resumen: 'Relato apócrifo sobre la vida y muerte de José el Carpintero, transmitido en tradición copta.',
    _archivo: 'pdfs/historia-copta-jose-carpintero.pdf', _tipo: 'pdf', _texto: 'jose-carpintero-es', _propio: true, 'Tipo de entrada': 'obra independiente'
  }
);

const normalizeWorkTitle = value => String(value || '')
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('es')
  .replace(/\s*\([^)]*\)\s*/g, ' ')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim()
  .replace(/ traduccion de trabajo.*$/, '');
const workByTitle = new Map();
for (const work of works) workByTitle.set(normalizeWorkTitle(work.title), work.id);
const workAliases = new Map(Object.entries({
  ageo: 'rvr1909-hageo',
  'hechos de los apostoles': 'rvr1909-hechos',
  'octateuco de clemente': 'octateuco-clemente-es',
  'evangelio de los egipcios': 'gospel-egyptians-es',
  'proto evangelio de santiago': 'proto-james-es',
  'carta de bernabe': 'barnabas-es',
  'libro de adan y eva': 'apocalypse-moses-es',
  'genesis apocrifo': 'rollo-lamec-es',
  'guerra de los hijos de la luz contra los hijos de las tinieblas': 'guerra-hijos-luz-es'
}));
for (const row of rows) {
  if (row._texto) continue;
  for (const name of [row.BIBLIOTECA, row.Tanaj, row['Biblia Católica'], row['Biblia Etíope']].filter(Boolean)) {
    const normalizedName = normalizeWorkTitle(name);
    const workId = workAliases.get(normalizedName) || workByTitle.get(normalizedName);
    if (workId) { row._texto = workId; break; }
  }
}

let query = '';
let sortBy = '';
let ascending = true;
let searchIndex = [];
let searchIndexLoaded = false;
let searchIndexPromise;

const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const nameOf = row => bookName(row) || '—';
const normalize = normalizeSearchText;

function excerptFor(text, searchQuery) {
  const source = String(text || '').replace(/\s+/g, ' ').trim();
  const matchAt = normalize(source).indexOf(normalize(searchQuery));
  const start = Math.max(0, matchAt < 0 ? 0 : matchAt - 75);
  const excerpt = source.slice(start, start + 210);
  return `${start ? '…' : ''}${escapeHtml(excerpt)}${source.length > start + 210 ? '…' : ''}`;
}

function renderTextSearch() {
  const normalizedQuery = normalize(query).trim();
  if (normalizedQuery.length < 3) {
    textResults.hidden = true;
    textResultsContent.innerHTML = '';
    return;
  }
  textResults.hidden = false;
  if (!searchIndexLoaded) {
    textResultsContent.innerHTML = '<p class="text-search-note">Buscando también dentro de los textos…</p>';
    return;
  }
  const matches = findTextSearchMatches(searchIndex, normalizedQuery).slice(0, 12);
  textResultsContent.innerHTML = matches.length ? `<div class="text-result-list">${matches.map(item => `
    <a class="text-result" href="lectura/?obra=${encodeURIComponent(item.documentId)}&capitulo=${encodeURIComponent(item.chapter)}#pasaje-${encodeURIComponent(item.chapter)}-${encodeURIComponent(item.verse)}">
      <span class="text-result-meta">${escapeHtml(item.title)} · capítulo ${escapeHtml(item.chapter)}, versículo ${escapeHtml(item.verse)}</span>
      <span class="text-result-excerpt">${excerptFor(item.text, normalizedQuery)}</span>
    </a>`).join('')}</div>` : '<p class="text-search-note">No encontramos coincidencias dentro de los textos.</p>';
}

function loadSearchIndex() {
  if (searchIndexPromise) return searchIndexPromise;
  searchIndexPromise = fetch('textos/search-index.json')
    .then(response => {
      if (!response.ok) throw new Error('No se pudo cargar el índice de búsqueda');
      return response.json();
    })
    .then(index => { searchIndex = index; })
    .catch(error => { console.error(error); searchIndex = []; })
    .finally(() => { searchIndexLoaded = true; renderTextSearch(); });
  return searchIndexPromise;
}

function romanToNumber(value) {
  const numerals = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  return [...value.toUpperCase()].reduce((total, numeral, index, all) => {
    const amount = numerals[numeral] || 0;
    return total + (amount < (numerals[all[index + 1]] || 0) ? -amount : amount);
  }, 0);
}

function dateInterval(dateText) {
  const value = String(dateText || '');
  const mixedCenturies = value.match(/siglo\s+([ivxlcdm]+)\s*a\.?\s*c\.?\s*[–-]\s*([ivxlcdm]+)\s*d\.?\s*c\.?/i);
  if (mixedCenturies) return [-romanToNumber(mixedCenturies[1]) * 100, romanToNumber(mixedCenturies[2]) * 100];

  const centuries = value.match(/siglos?\s+([ivxlcdm]+)(?:\s*[–-]\s*([ivxlcdm]+))?\s*(a\.?\s*c\.?|d\.?\s*c\.?)/i);
  if (centuries) {
    const first = romanToNumber(centuries[1]);
    const second = romanToNumber(centuries[2] || centuries[1]);
    const era = /^a/i.test(centuries[3]) ? -1 : 1;
    const endpoints = [first, second].flatMap(century => era < 0
      ? [-century * 100, -((century - 1) * 100 + 1)]
      : [(century - 1) * 100 + 1, century * 100]);
    return [Math.min(...endpoints), Math.max(...endpoints)];
  }

  const yearMatches = [...value.matchAll(/(\d{1,4})(?:\s*[–-]\s*(\d{1,4}))?\s*(a\.?\s*c\.?|d\.?\s*c\.?)/gi)];
  if (!yearMatches.length) return null;
  const endpoints = yearMatches.flatMap(match => {
    const era = /^a/i.test(match[3]) ? -1 : 1;
    return [Number(match[1]) * era, Number(match[2] || match[1]) * era];
  });
  return [Math.min(...endpoints), Math.max(...endpoints)];
}

function renderDate(dateText) {
  const date = String(dateText || '');
  const interval = dateInterval(date);
  if (!interval) return escapeHtml(date);
  const center = (interval[0] + interval[1]) / 2;
  const oldest = -1000;
  const newest = 800;
  const progress = Math.min(1, Math.max(0, (center - oldest) / (newest - oldest)));
  const hue = Math.round(120 * (1 - progress));
  return `<span class="catalog-date" style="--date-hue:${hue}">${escapeHtml(date)}</span>`;
}

function canonBoundaries(row) {
  const boundaries = [];
  const name = nameOf(row);
  if (row.Grupo === 'Antiguo Testamento' && row.Tanaj === 'Malaquías') boundaries.push('Hasta acá llega el Tanaj.');
  if (row.Grupo === 'Deuterocanónicos / Antiguo Testamento' && name === 'Baruc') boundaries.push('Hasta acá llega el Antiguo Testamento.');
  if (row.Grupo === 'Nuevo Testamento' && name.includes('Apocalipsis')) {
    boundaries.push('Hasta acá llega el Nuevo Testamento.');
    boundaries.push('Hasta acá llega la Biblia católica.');
  }
  if (row.Grupo === 'Antiguo Testamento Etíope' && name.includes('3 Meqabyan')) boundaries.push('Hasta acá llega el Antiguo Testamento etíope.');
  if (row.Grupo === 'Nuevo Testamento Etíope' && name.includes('Testamentum Domini')) boundaries.push('Hasta acá llega la Biblia etíope.');
  return boundaries;
}

function renderRow(row) {
  const readerHref = row._texto ? `lectura/?obra=${encodeURIComponent(row._texto)}` : '';
  const rowHtml = `<tr${readerHref ? ` class="catalog-reader-row" data-reader-href="${escapeHtml(readerHref)}" tabindex="0" role="link" aria-label="Abrir ${escapeHtml(nameOf(row))}"` : ''}>
    <td class="catalog-name">${readerHref ? `<a href="${escapeHtml(readerHref)}">${escapeHtml(nameOf(row))}</a>` : escapeHtml(nameOf(row))}${row._estado_texto ? `<small class="text-status">${escapeHtml(row._estado_texto)}</small>` : ''}</td>
    <td>${escapeHtml(row.Resumen || '')}</td>
    <td>${escapeHtml(row.Grupo || '')}</td>
    <td>${renderDate(row['Fecha aproximada'])}</td>
    <td>${escapeHtml(row['Idioma original'] || '')}</td>
  </tr>`;
  if (sortBy) return rowHtml;
  return rowHtml + canonBoundaries(row).map(text => `<tr class="canon-boundary"><td colspan="5">${escapeHtml(text)}</td></tr>`).join('');
}

function render() {
  let visible = rows.filter(row => {
    if (row._hidden) return false;
    const searchable = normalize([nameOf(row), row.Grupo, row.Resumen, row['Fecha aproximada'], row['Idioma original']].join(' '));
    return !query || searchable.includes(normalize(query));
  });
  if (sortBy) visible.sort((a, b) => {
    const aValue = sortBy === 'Nombre' ? nameOf(a) : String(a[sortBy] ?? '');
    const bValue = sortBy === 'Nombre' ? nameOf(b) : String(b[sortBy] ?? '');
    return aValue.localeCompare(bValue, 'es', { numeric: true }) * (ascending ? 1 : -1);
  });
  body.innerHTML = visible.map(renderRow).join('');
  empty.style.display = visible.length ? 'none' : 'block';
  renderTextSearch();
}

search.addEventListener('input', () => {
  query = search.value.trim();
  if (normalize(query).length >= 3) loadSearchIndex();
  render();
});
body.addEventListener('click', event => {
  const row = event.target.closest('.catalog-reader-row');
  if (!row || event.target.closest('a, button, input, select')) return;
  location.href = row.dataset.readerHref;
});
body.addEventListener('keydown', event => {
  const row = event.target.closest('.catalog-reader-row');
  if (!row || !['Enter', ' '].includes(event.key)) return;
  event.preventDefault();
  location.href = row.dataset.readerHref;
});
root.querySelectorAll('thead th[data-col]').forEach(heading => heading.addEventListener('click', () => {
  const column = heading.dataset.col;
  if (sortBy === column) ascending = !ascending;
  else { sortBy = column; ascending = true; }
  root.querySelectorAll('.sort-arrow').forEach(arrow => { arrow.textContent = arrow.closest('th') === heading ? (ascending ? '↑' : '↓') : '↕'; });
  render();
}));
render();
