const aliasesByBook = {
  'proto-james': ['Proto-evangelio de Santiago'],
  barnabas: ['Carta de Bernabé'],
  'apocalypse-moses': ['Libro de Adán y Eva (Vida de Adán y Eva)'],
  'rvr1909-hageo': ['Ageo'],
  'rvr1909-hechos': ['Hechos de los Apóstoles'],
  'octateuco-clemente': ['Octateuco de Clemente']
};

const summariesByBook = {
  'acts-paul': 'Narración apócrifa del siglo II sobre la misión y el martirio de Pablo. Se conserva fragmentariamente en varias unidades, entre ellas los Hechos de Pablo y Tecla y una correspondencia apócrifa con los corintios; esta guía las sitúa dentro de la obra sin confundirlas con el canon.',
  'apocalypse-elijah': 'Apocalipsis cristiano conservado principalmente en copto. Combina exhortaciones a la oración y el ayuno con una visión de persecución, el adversario final y la intervención de Elías, Enoc y Cristo. La fecha y las posibles capas judías y cristianas son discutidas.',
  'oraculos-sibilinos': 'Colección de poemas proféticos griegos de composición judía y cristiana en distintas épocas. Sus oráculos reinterpretan la historia, critican la idolatría y anuncian juicio y renovación; no forman un libro unitario ni comparten una sola fecha o autoría.',
  'documento-damasco': 'El Documento de Damasco combina una exhortación histórica sobre la infidelidad de Israel con normas para una comunidad que se considera fiel a la alianza. Regula la vida común, el sábado, la pureza y la interpretación de la Ley.',
  'himnos-accion-gracias': 'Colección de plegarias poéticas de Qumrán que alaban a Dios por su conocimiento, su protección y la revelación concedida al orante. Los himnos expresan también fragilidad humana y oposición entre fidelidad y maldad.',
  'rvr1909-abdias': 'Abdías anuncia juicio contra Edom por su violencia contra Judá y presenta la restauración de Sion, donde el pueblo volverá a habitar su tierra.',
  'rvr1909-nahum': 'Nahúm proclama la caída de Nínive, capital del poder asirio, como respuesta a su violencia. El anuncio de juicio ofrece consuelo a Judá, aunque también describe con dureza la destrucción de la ciudad.',
  'rvr1909-sofonias': 'Sofonías advierte sobre el día del Señor y el juicio contra Judá y las naciones; concluye con esperanza de purificación, reunión de los dispersos y restauración de Jerusalén.',
  'rvr1909-hageo': 'Hageo anima a los repatriados a reanudar la reconstrucción del Templo de Jerusalén. Vincula la renovación del santuario con la esperanza de bendición y con el liderazgo de Zorobabel y Josué.',
  'rvr1909-zacarias': 'Zacarías reúne visiones sobre la reconstrucción de Jerusalén y el Templo, exhortaciones a la justicia y esperanzas de renovación. Sus imágenes de un rey humilde y un pastor herido influyeron en lecturas mesiánicas posteriores.',
  'rvr1909-malaquias': 'Malaquías denuncia abusos en el culto y la infidelidad social, y exhorta al pueblo a volver a Dios. Anuncia un mensajero que preparará el día del Señor.',
  'rvr1909-colosenses': 'Colosenses presenta la primacía de Cristo sobre toda autoridad y exhorta a la comunidad a vivir en unidad, abandonar antiguas prácticas destructivas y obrar con justicia en sus relaciones.',
  'rvr1909-1-tesalonicenses': 'Pablo agradece la fidelidad de la comunidad de Tesalónica, la anima ante la persecución y responde preguntas sobre los creyentes muertos y la venida del Señor; cierra con exhortaciones a una vida santa.',
  'rvr1909-2-tesalonicenses': 'La carta fortalece a una comunidad perseguida, corrige confusiones sobre el día del Señor y exhorta a perseverar y trabajar, en lugar de vivir desordenadamente esperando el fin.',
  'rvr1909-filemon': 'Pablo escribe a Filemón acerca de Onésimo y le pide recibirlo no solo como siervo, sino como hermano. La breve carta apela a la reconciliación dentro de la comunidad cristiana.',
  'rvr1909-1-pedro': 'Primera de Pedro alienta a comunidades de Asia Menor que sufren hostilidad. Las llama a mantener la esperanza, practicar la santidad y responder al sufrimiento siguiendo el ejemplo de Cristo.',
  'rvr1909-2-pedro': 'Segunda de Pedro combate a falsos maestros y responde a quienes dudan de la venida del Señor. Recuerda el juicio, defiende la esperanza futura y exhorta a crecer en virtud y conocimiento.',
  'rvr1909-1-juan': 'Primera de Juan afirma que Dios es luz y amor, llama a vivir en fraternidad y advierte contra quienes niegan a Jesús. Invita a discernir las enseñanzas y a permanecer en la vida recibida de Dios.',
  'rvr1909-judas': 'Judas advierte a la comunidad contra maestros que pervierten la fe y recuerda ejemplos antiguos de juicio. Exhorta a mantenerse firme, cuidar a quienes dudan y esperar la misericordia de Dios.',
  'gospel-egyptians': 'Tratado gnóstico copto de Nag Hammadi, distinto del perdido Evangelio griego de los Egipcios. Presenta revelaciones sobre el origen y destino de las almas, figuras celestiales y prácticas ascéticas dentro de una compleja visión cosmológica.',
  'arabic-infancy': 'Compilación de relatos sobre la infancia de Jesús transmitida en árabe. Reúne episodios de la niñez, viajes y milagros atribuidos al niño Jesús, combinando tradiciones cristianas de distintos orígenes.',
  'pseudo-mateo': 'Evangelio latino de infancia que amplía los relatos del nacimiento de Jesús y la vida temprana de María. Incluye la huida a Egipto y episodios milagrosos durante el viaje de la Sagrada Familia.',
  'jose-carpintero': 'Relato apócrifo, conservado en copto y árabe, en el que Jesús cuenta la vida y la muerte de José. Combina una semblanza del patriarca con una narración de sus últimas horas y consuelo ante la muerte.'
};

const normalizeTitle = value => String(value || '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase()
  .replace(/\s*[·|—].*$/, '')
  .replace(/\([^)]*\)/g, '')
  .replace(/\s+(?:traduccion|guia|edicion|recension)\b.*$/, '')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

export function findBookSummary({ entry, work, catalog, rows }) {
  const baseId = entry.id.replace(/-es$/, '');
  if (summariesByBook[baseId]) return summariesByBook[baseId];
  const candidates = [entry.title, work.title, ...(aliasesByBook[baseId] || [])];
  const spanishVariant = catalog.find(item => item.id === `${baseId}-es`);
  if (spanishVariant && spanishVariant.id !== entry.id) {
    candidates.push(spanishVariant.title);
    candidates.push(aliasesByBook[baseId] || []);
  }

  const candidateTitles = new Set(candidates.flat(Infinity).map(normalizeTitle).filter(Boolean));
  const summaryForLabel = row => row?.Resumen?.trim() || '';
  const bibliothecaRow = rows.find(row => candidateTitles.has(normalizeTitle(row.BIBLIOTECA)) && summaryForLabel(row));
  if (bibliothecaRow) return summaryForLabel(bibliothecaRow);

  const canonicalRow = rows.find(row => [row.Tanaj, row['Biblia Católica'], row['Biblia Etíope']]
    .some(label => candidateTitles.has(normalizeTitle(label))) && summaryForLabel(row));
  if (canonicalRow) return summaryForLabel(canonicalRow);

  return summariesByBook[baseId] || '';
}

export function getManualBookSummary(bookId) {
  return summariesByBook[String(bookId || '').replace(/-es$/, '')] || '';
}
