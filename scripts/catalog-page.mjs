const root = document.querySelector('#catalogo-view');
const search = root.querySelector('#search');
const filterHost = root.querySelector('#filters');
const body = root.querySelector('#tbody');
const count = root.querySelector('#row-count');
const empty = root.querySelector('#empty');
const select = root.querySelector('#show-select');
const dataResponse = await fetch('data.json');
if (!dataResponse.ok) throw new Error('No se pudo cargar el catálogo');
const rows = await dataResponse.json();
const bookName = row => [row.BIBLIOTECA, row.Tanaj, row['Biblia Católica'], row['Biblia Etíope']].filter(Boolean).filter((value, index, all) => all.indexOf(value) === index).join(' / ');
for (const row of rows) {
  if (bookName(row).includes('Manuscritos de Nag Hammadi') || bookName(row).includes('Textos de Qumrán')) row._hidden = true;
  if (!row['Tipo de entrada']) row['Tipo de entrada'] = ['Torá / Antiguo Testamento', 'Antiguo Testamento', 'Nuevo Testamento'].includes(row.Grupo) ? 'obra canónica' : 'obra independiente';
}
rows.push(
  {
    Grupo: 'Apócrifos del Nuevo Testamento', BIBLIOTECA: 'Evangelio árabe de la Infancia',
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
    Grupo: 'Apócrifos del Nuevo Testamento', BIBLIOTECA: 'Historia copta de José el Carpintero',
    'Fecha aproximada': 'siglo IV–VII d. C.', 'Idioma original': 'Copto',
    Resumen: 'Relato apócrifo sobre la vida y muerte de José el Carpintero, transmitido en tradición copta.',
    _archivo: 'pdfs/historia-copta-jose-carpintero.pdf', _tipo: 'pdf', _texto: 'jose-carpintero-es', _propio: true, 'Tipo de entrada': 'obra independiente'
  }
);
const groups = [...new Set(rows.map(row => row.Grupo).filter(Boolean))];
let activeGroup = '';
let query = '';
let sortBy = '';
let ascending = true;

const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const nameOf = row => bookName(row) || '—';
const normalize = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es');

filterHost.innerHTML = `<button class="filter-btn active" type="button" data-group="">Todos</button>${groups.map(group => `<button class="filter-btn" type="button" data-group="${escapeHtml(group)}">${escapeHtml(group)}</button>`).join('')}`;

function render() {
  let visible = rows.filter(row => {
    if (row._hidden || (activeGroup && row.Grupo !== activeGroup)) return false;
    const searchable = normalize([nameOf(row), row.Grupo, row.Resumen, row['Fecha aproximada'], row['Idioma original']].join(' '));
    return !query || searchable.includes(normalize(query));
  });
  if (sortBy) visible.sort((a, b) => {
    const aValue = sortBy === 'Nombre' ? nameOf(a) : String(a[sortBy] ?? '');
    const bValue = sortBy === 'Nombre' ? nameOf(b) : String(b[sortBy] ?? '');
    return aValue.localeCompare(bValue, 'es', { numeric: true }) * (ascending ? 1 : -1);
  });
  body.innerHTML = visible.map(row => `<tr>
    <td class="catalog-name">${escapeHtml(nameOf(row))}${row._estado_texto ? `<small class="text-status">${escapeHtml(row._estado_texto)}</small>` : ''}</td>
    <td>${escapeHtml(row.Resumen || '')}</td>
    <td>${[
      row._archivo ? `<a href="${escapeHtml(row._archivo)}">${row._tipo === 'pdf' ? 'PDF' : 'Abrir'}</a>` : '',
      row._texto ? `<a href="lectura/?obra=${encodeURIComponent(row._texto)}">Leer</a>` : ''
    ].filter(Boolean).join(' · ') || '—'}</td>
    <td>${escapeHtml(row.Grupo || '')}</td>
    <td>${escapeHtml(row['Fecha aproximada'] || '')}</td>
    <td>${escapeHtml(row['Idioma original'] || '')}</td>
    <td>${escapeHtml(row['Tipo de entrada'] || 'obra independiente')}</td>
  </tr>`).join('');
  count.textContent = `Mostrando ${visible.length} de ${rows.filter(row => !row._hidden).length} textos`;
  empty.style.display = visible.length ? 'none' : 'block';
}

search.addEventListener('input', () => { query = search.value.trim(); render(); });
filterHost.addEventListener('click', event => {
  const button = event.target.closest('.filter-btn');
  if (!button) return;
  activeGroup = button.dataset.group;
  filterHost.querySelectorAll('.filter-btn').forEach(item => item.classList.toggle('active', item === button));
  render();
});
root.querySelectorAll('thead th[data-col]').forEach(heading => heading.addEventListener('click', () => {
  const column = heading.dataset.col;
  if (sortBy === column) ascending = !ascending;
  else { sortBy = column; ascending = true; }
  root.querySelectorAll('.sort-arrow').forEach(arrow => { arrow.textContent = arrow.closest('th') === heading ? (ascending ? '↑' : '↓') : '↕'; });
  render();
}));
select.addEventListener('change', () => document.body.classList.toggle('compact', select.value === 'compact'));
render();
