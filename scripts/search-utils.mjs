export function normalizeSearchText(value) {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es');
}

export function searchTermVariants(query) {
  const normalized = normalizeSearchText(query).trim();
  const variants = { gadiel: ['gadiel', 'gaddiel'], gaddiel: ['gaddiel', 'gadiel'] };
  return variants[normalized] || [normalized];
}

export function findTextSearchMatches(index, query) {
  const terms = searchTermVariants(query);
  return index.filter(item => terms.some(term => normalizeSearchText(item.text).includes(term)));
}
