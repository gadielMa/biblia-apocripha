// Extensión cronológica: 50 hitos posteriores a la resurrección para recorrer también
// la misión apostólica, la transmisión de los textos y las tradiciones tempranas.
const extraTimelineEvents = [
  ['c. 30 d. C.', 'Pentecostés', 'El Espíritu desciende sobre los discípulos y comienza la predicación pública en Jerusalén.', 'Hechos 2:1–41', 'lectura/?obra=rvr1909-hechos&capitulo=2#pasaje-2-1', 'canonical'],
  ['c. 30 d. C.', 'La primera comunidad', 'La comunidad comparte oración, enseñanza, mesa y bienes.', 'Hechos 2:42–47', 'lectura/?obra=rvr1909-hechos&capitulo=2#pasaje-2-42', 'canonical'],
  ['c. 31 d. C.', 'Pedro y Juan en el templo', 'Una curación junto a la puerta Hermosa abre una nueva predicación.', 'Hechos 3:1–10', 'lectura/?obra=rvr1909-hechos&capitulo=3#pasaje-3-1', 'canonical'],
  ['c. 31 d. C.', 'Esteban y su discurso', 'Esteban repasa la historia de Israel antes de su muerte como testigo.', 'Hechos 7', 'lectura/?obra=rvr1909-hechos&capitulo=7', 'canonical'],
  ['c. 31–34 d. C.', 'Felipe en Samaria', 'El anuncio llega a Samaria y a un funcionario etíope.', 'Hechos 8:4–40', 'lectura/?obra=rvr1909-hechos&capitulo=8#pasaje-8-4', 'canonical'],
  ['c. 34 d. C.', 'Conversión de Saulo', 'Saulo encuentra a Cristo camino a Damasco y pasa a ser Pablo.', 'Hechos 9:1–19', 'lectura/?obra=rvr1909-hechos&capitulo=9#pasaje-9-1', 'canonical'],
  ['c. 38 d. C.', 'Pedro y Cornelio', 'La casa de Cornelio marca una apertura decisiva hacia los gentiles.', 'Hechos 10', 'lectura/?obra=rvr1909-hechos&capitulo=10', 'canonical'],
  ['c. 40 d. C.', 'Iglesia de Antioquía', 'En Antioquía los discípulos reciben por primera vez el nombre de cristianos.', 'Hechos 11:19–26', 'lectura/?obra=rvr1909-hechos&capitulo=11#pasaje-11-19', 'canonical'],
  ['c. 44 d. C.', 'Santiago, hijo de Zebedeo', 'Herodes ejecuta a Santiago; Pedro es liberado de prisión según Hechos.', 'Hechos 12:1–17', 'lectura/?obra=rvr1909-hechos&capitulo=12#pasaje-12-1', 'canonical'],
  ['c. 46–48 d. C.', 'Primera misión de Pablo', 'Pablo y Bernabé recorren Chipre y ciudades de Asia Menor.', 'Hechos 13–14', 'lectura/?obra=rvr1909-hechos&capitulo=13', 'canonical'],
  ['c. 49 d. C.', 'Asamblea de Jerusalén', 'La comunidad debate cómo incorporar a los no judíos.', 'Hechos 15:1–35', 'lectura/?obra=rvr1909-hechos&capitulo=15#pasaje-15-1', 'canonical'],
  ['c. 49–52 d. C.', 'Misión a Macedonia', 'Pablo cruza hacia Europa; nacen comunidades en Filipos y Tesalónica.', 'Hechos 16–17', 'lectura/?obra=rvr1909-hechos&capitulo=16', 'canonical'],
  ['c. 50 d. C.', 'Pablo en Atenas', 'El discurso en el Areópago dialoga con oyentes griegos.', 'Hechos 17:16–34', 'lectura/?obra=rvr1909-hechos&capitulo=17#pasaje-17-16', 'canonical'],
  ['c. 50–52 d. C.', 'Comunidad de Corinto', 'Pablo permanece en Corinto y funda una comunidad plural.', 'Hechos 18:1–18', 'lectura/?obra=rvr1909-hechos&capitulo=18#pasaje-18-1', 'canonical'],
  ['c. 53–57 d. C.', 'Éfeso y el camino', 'La predicación en Éfeso provoca adhesiones y resistencia social.', 'Hechos 19', 'lectura/?obra=rvr1909-hechos&capitulo=19', 'canonical'],
  ['c. 55 d. C.', 'Cartas a Corinto', 'Pablo aborda divisiones, la cena, los dones y la resurrección.', '1 Corintios 15', 'lectura/?obra=rvr1909-1-corintios&capitulo=15', 'canonical'],
  ['c. 57 d. C.', 'Arresto en Jerusalén', 'Pablo es arrestado en el templo e inicia un prolongado proceso judicial.', 'Hechos 21–23', 'lectura/?obra=rvr1909-hechos&capitulo=21', 'canonical'],
  ['c. 59–60 d. C.', 'Naufragio camino a Roma', 'Hechos narra la travesía, el naufragio y la llegada a Malta.', 'Hechos 27–28', 'lectura/?obra=rvr1909-hechos&capitulo=27', 'canonical'],
  ['c. 60–62 d. C.', 'Pablo en Roma', 'Pablo anuncia el Reino bajo custodia, según el final de Hechos.', 'Hechos 28:16–31', 'lectura/?obra=rvr1909-hechos&capitulo=28#pasaje-28-16', 'canonical'],
  ['c. 62 d. C.', 'Santiago en Jerusalén', 'La tradición antigua sitúa en este período la muerte de Santiago, hermano de Jesús.', 'Santiago 1', 'lectura/?obra=rvr1909-santiago&capitulo=1', 'context'],
  ['c. 64 d. C.', 'Persecución en Roma', 'Fuentes romanas posteriores asocian a Nerón con violencia contra cristianos tras el incendio.', '1 Pedro 4:12–16', 'lectura/?obra=rvr1909-1-pedro&capitulo=4#pasaje-4-12', 'context'],
  ['c. 64–67 d. C.', 'Pedro y Pablo en la memoria cristiana', 'Tradiciones eclesiales posteriores vinculan sus muertes con Roma bajo Nerón.', '2 Timoteo 4:6–8', 'lectura/?obra=rvr1909-2-timoteo&capitulo=4#pasaje-4-6', 'context'],
  ['c. 66–70 d. C.', 'Guerra judía', 'La revuelta contra Roma transforma profundamente Judea y Jerusalén.', 'Marcos 13', 'lectura/?obra=rvr1909-marcos&capitulo=13', 'context'],
  ['70 d. C.', 'Destrucción del Segundo Templo', 'Roma destruye el templo de Jerusalén; cambia el horizonte judío y cristiano.', 'Lucas 21:20–24', 'lectura/?obra=rvr1909-lucas&capitulo=21#pasaje-21-20', 'context'],
  ['c. 70 d. C.', 'Evangelio según Marcos', 'La tradición suele considerar a Marcos el primer evangelio canónico escrito.', 'Marcos 1:1', 'lectura/?obra=rvr1909-marcos&capitulo=1#pasaje-1-1', 'context'],
  ['c. 80–90 d. C.', 'Evangelio según Mateo', 'Mateo presenta a Jesús en diálogo constante con las Escrituras de Israel.', 'Mateo 1', 'lectura/?obra=rvr1909-mateo&capitulo=1', 'context'],
  ['c. 80–90 d. C.', 'Evangelio según Lucas y Hechos', 'Lucas enlaza el ministerio de Jesús con la expansión apostólica.', 'Lucas 1:1–4', 'lectura/?obra=rvr1909-lucas&capitulo=1#pasaje-1-1', 'context'],
  ['c. 90–100 d. C.', 'Evangelio según Juan', 'Juan organiza signos y discursos alrededor de la identidad de Jesús.', 'Juan 20:30–31', 'lectura/?obra=rvr1909-juan&capitulo=20#pasaje-20-30', 'context'],
  ['c. 95 d. C.', 'Apocalipsis', 'Juan escribe visiones de juicio, resistencia y esperanza para las iglesias.', 'Apocalipsis 1', 'lectura/?obra=rvr1909-apocalipsis&capitulo=1', 'canonical'],
  ['c. 95 d. C.', '1 Clemente', 'La iglesia de Roma escribe a Corinto sobre concordia y orden comunitario.', '1 Clemente', 'lectura/?obra=1-clemente-es&capitulo=1', 'apocryphal'],
  ['c. 100 d. C.', 'Didaché', 'Manual temprano sobre el camino de vida, bautismo, mesa y comunidad.', 'Didaché', 'lectura/?obra=didache-es&capitulo=1', 'apocryphal'],
  ['c. 107 d. C.', 'Cartas de Ignacio', 'Ignacio de Antioquía escribe camino al martirio sobre unidad y eucaristía.', 'Ignacio a los Romanos', 'lectura/?obra=ignacio-romanos-es&capitulo=1', 'apocryphal'],
  ['c. 110 d. C.', 'Cartas de Plinio', 'Plinio describe ante Trajano prácticas de cristianos de Bitinia.', 'Carta a Trajano', 'lectura/?obra=rvr1909-hechos&capitulo=11', 'context'],
  ['c. 120 d. C.', 'Papías y la memoria oral', 'Papías conserva tradiciones tempranas sobre la transmisión de palabras de Jesús.', 'Fragmentos de Papías', 'lectura/?obra=rvr1909-marcos&capitulo=1', 'context'],
  ['c. 125 d. C.', 'Papiro Rylands P52', 'Un pequeño fragmento de Juan se cuenta entre los testimonios manuscritos más tempranos.', 'Juan 18', 'lectura/?obra=rvr1909-juan&capitulo=18', 'context'],
  ['c. 130 d. C.', 'Epístola de Bernabé', 'Texto cristiano temprano que interpreta alegóricamente las Escrituras.', 'Carta de Bernabé', 'lectura/?obra=carta-bernabe-es&capitulo=1', 'apocryphal'],
  ['c. 140 d. C.', 'Marción y su colección', 'Marción propone un canon propio, acelerando debates sobre los escritos recibidos.', 'Gálatas 1:6–9', 'lectura/?obra=rvr1909-galatas&capitulo=1#pasaje-1-6', 'context'],
  ['c. 140–155 d. C.', 'Justino Mártir', 'Justino describe el culto cristiano y defiende la fe ante lectores romanos.', 'Primera Apología', 'lectura/?obra=rvr1909-hechos&capitulo=17', 'context'],
  ['c. 150 d. C.', 'Pastor de Hermas', 'Obra de visiones y parábolas sobre arrepentimiento y vida eclesial.', 'Pastor de Hermas', 'lectura/?obra=pastor-hermas-es&capitulo=1', 'apocryphal'],
  ['siglo II d. C.', 'Protoevangelio de Santiago', 'Relato apócrifo sobre María, Joaquín, Ana y el nacimiento de Jesús.', 'Protoevangelio de Santiago', 'pdfs/protoevangelio-santiago.pdf', 'apocryphal'],
  ['siglo II d. C.', 'Infancia de Tomás', 'Relatos apócrifos de Jesús niño; no son parte de los evangelios canónicos.', 'Infancia de Tomás', 'pdfs/evangelio-infancia-tomas.pdf', 'apocryphal'],
  ['siglo II d. C.', 'Evangelio de Pedro', 'Texto apócrifo sobre pasión y resurrección conservado de forma fragmentaria.', 'Evangelio de Pedro', 'pdfs/evangelio-pedro.pdf', 'apocryphal'],
  ['siglo II d. C.', 'Hechos de Pablo y Tecla', 'Relato apócrifo de misión, conversión y resistencia de Tecla.', 'Hechos de Pablo y Tecla', 'pdfs/hechos-pablo-tecla.pdf', 'apocryphal'],
  ['c. 180 d. C.', 'Ireneo y los cuatro evangelios', 'Ireneo defiende la recepción de cuatro evangelios en la gran Iglesia.', 'Contra las herejías', 'lectura/?obra=rvr1909-juan&capitulo=20#pasaje-20-30', 'context'],
  ['c. 180–200 d. C.', 'Fragmento Muratoriano', 'Lista antigua y parcial de escritos leídos como autorizados en Roma.', 'Canon y lectura', 'lectura/?obra=rvr1909-2-timoteo&capitulo=3#pasaje-3-14', 'context'],
  ['c. 200 d. C.', 'Tertuliano', 'Autor latino que escribe sobre fe, persecución y práctica cristiana.', 'Apologético', 'lectura/?obra=rvr1909-1-pedro&capitulo=3#pasaje-3-13', 'context'],
  ['c. 230 d. C.', 'Orígenes y la exégesis', 'Orígenes compara textos bíblicos y desarrolla una lectura erudita de las Escrituras.', 'Homilías y comentarios', 'lectura/?obra=rvr1909-lucas&capitulo=24#pasaje-24-25', 'context'],
  ['c. 250 d. C.', 'Persecución de Decio', 'La exigencia de sacrificio imperial genera una crisis para muchas comunidades.', 'Apocalipsis 2:10', 'lectura/?obra=rvr1909-apocalipsis&capitulo=2#pasaje-2-10', 'context'],
  ['c. 303 d. C.', 'Gran persecución', 'Diocleciano impulsa la última gran persecución imperial contra cristianos.', 'Mateo 5:10–12', 'lectura/?obra=rvr1909-mateo&capitulo=5#pasaje-5-10', 'context'],
  ['313 d. C.', 'Edicto de Milán', 'Constantino y Licinio conceden tolerancia religiosa en el Imperio romano.', 'Historia de la Iglesia', 'lectura/?obra=rvr1909-romanos&capitulo=13#pasaje-13-1', 'context'],
  ['325 d. C.', 'Concilio de Nicea', 'Obispos debaten el lenguaje sobre Cristo y formulan el Credo niceno.', 'Juan 1:1–18', 'lectura/?obra=rvr1909-juan&capitulo=1#pasaje-1-1', 'context']
];
const timelineTrack = document.querySelector('.timeline-track');
const earlyTimelineEvents = [
  ['orígenes', 'Adán y Eva', 'Dios crea al primer hombre, Adán, y a Eva; viven en el jardín hasta su expulsión.', 'Génesis 1–3', 'lectura/?obra=rvr1909-genesis&capitulo=1', 'canonical', 'assets/timeline/adan-eva.png'],
  ['primeras generaciones', 'Set y Enós', 'La línea de Set continúa tras Adán; en días de Enós se invoca el nombre del Señor.', 'Génesis 4:25–26', 'lectura/?obra=rvr1909-genesis&capitulo=4#pasaje-4-25', 'canonical'],
  ['c. 1330 a. C. · cronología tradicional', 'El nacimiento y rescate de Moisés', 'Moisés nace durante la opresión en Egipto. Su madre lo esconde en una cesta en el Nilo y la hija del faraón lo cría. Deuteronomio dice que murió a los 120 años.', 'Éxodo 2:1–10', 'lectura/?obra=rvr1909-exodo&capitulo=2', 'canonical', 'assets/timeline/nacimiento-moises.png'],
  ['patriarcas', 'Abraham y la promesa', 'La promesa de una descendencia y bendición para las naciones inicia el ciclo patriarcal.', 'Génesis 12:1–3', 'lectura/?obra=rvr1909-genesis&capitulo=12#pasaje-12-1', 'canonical'],
  ['patriarcas', 'Jacob y Judá', 'Jacob bendice a Judá con una imagen real que la tradición cristiana lee mesiánicamente.', 'Génesis 49:10', 'lectura/?obra=rvr1909-genesis&capitulo=49#pasaje-49-10', 'canonical'],
  ['Egipto', 'José y sus hermanos', 'José llega a Egipto y su familia se instala allí, preparando el relato del éxodo.', 'Génesis 37–50', 'lectura/?obra=rvr1909-genesis&capitulo=37', 'canonical'],
  ['éxodo · c. 1300 a. C.', 'Moisés abre el mar Rojo', 'Moisés extiende su vara y Dios abre un camino entre las aguas; el pueblo de Israel cruza el mar y escapa de la persecución egipcia.', 'Éxodo 14:15–31', 'lectura/?obra=rvr1909-exodo&capitulo=14#pasaje-14-15', 'canonical', 'assets/timeline/moises-mar-rojo.png'],
  ['promesa', 'Moisés anuncia un profeta', 'Moisés habla de un profeta semejante a él; Hechos lo aplica a Jesús.', 'Deuteronomio 18:15', 'lectura/?obra=rvr1909-deuteronomio&capitulo=18#pasaje-18-15', 'canonical'],
  ['profecía', 'Isaías y Emanuel', 'Isaías anuncia: “Una virgen concebirá y dará a luz un hijo, y su nombre será Emanuel”.', 'Isaías 7:14', 'lectura/?obra=rvr1909-isaias&capitulo=7#pasaje-7-14', 'canonical']
];
function makeTimelineCard([date, title, description, reference, href, source, image]) {
  const card = document.createElement('article');
  card.className = 'timeline-event';
  const sourceLabel = source === 'canonical' ? 'Canónico' : source === 'apocryphal' ? 'Tradición apócrifa' : source === 'tradition' ? 'Tradición posterior' : source === 'uncertain' ? 'Muerte no documentada' : 'Contexto histórico';
  card.innerHTML = `${image ? `<img class="timeline-image" src="${image}" alt="Ilustración de ${title}">` : ''}<span class="source-badge ${source}">${sourceLabel}</span><div><p class="timeline-date"></p><h3></h3></div><p class="timeline-description"></p><a></a>`;
  card.querySelector('.timeline-date').textContent = date; card.querySelector('h3').textContent = title; card.querySelector('.timeline-description').textContent = description;
  const link = card.querySelector('a'); link.textContent = reference; link.href = href;
  return card;
}
if (timelineTrack) {
  // Las fichas breves de promesa ya cuentan Moisés e Isaías; evitamos repetirlos más adelante.
  ['Moisés y la alianza', 'Isaías y la esperanza', 'El mundo del Segundo Templo'].forEach(title =>
    Array.from(timelineTrack.children).find(card => card.querySelector('h3')?.textContent === title)?.remove()
  );
  Array.from(timelineTrack.children).find(card => card.querySelector('h3')?.textContent === 'Los libros más antiguos')?.remove();
  const simeonCard = Array.from(timelineTrack.children).find(card => card.querySelector('h3')?.textContent === 'Simeón carga al niño Jesús');
  const flightCard = Array.from(timelineTrack.children).find(card => card.querySelector('h3')?.textContent === 'Huida y regreso a Nazaret');
  if (simeonCard && flightCard) timelineTrack.insertBefore(simeonCard, flightCard);
  const enocCard = Array.from(timelineTrack.children).find(card => card.querySelector('h3')?.textContent === 'Enoc y los vigilantes');
  earlyTimelineEvents.slice(0, 2).forEach(event => timelineTrack.insertBefore(makeTimelineCard(event), enocCard));
  const moisesCard = Array.from(timelineTrack.children).find(card => card.querySelector('h3')?.textContent === 'Moisés y la alianza');
  earlyTimelineEvents.slice(2).forEach(event => timelineTrack.insertBefore(makeTimelineCard(event), moisesCard));
  const mosesBirthCard = Array.from(timelineTrack.children).find(card => card.querySelector('h3')?.textContent === 'El nacimiento y rescate de Moisés');
  if (mosesBirthCard) {
    const lifespanLink = document.createElement('a');
    lifespanLink.href = 'lectura/?obra=rvr1909-deuteronomio&capitulo=34#pasaje-34-7';
    lifespanLink.textContent = 'Deuteronomio 34:7 · vivió 120 años';
    mosesBirthCard.append(lifespanLink);
  }
  extraTimelineEvents.forEach(([date, title, description, reference, href, source]) => {
    if (title !== 'Pentecostés') return;
    timelineTrack.append(makeTimelineCard([date, title, description, reference, href, source]));
  });
  const timelineOrder = [
    'Adán y Eva', 'Set y Enós', 'Enoc y los vigilantes', 'Abraham y la promesa', 'Jacob y Judá', 'José y sus hermanos', 'El nacimiento y rescate de Moisés',
    'Moisés abre el mar Rojo', 'La Roca de Moisés', 'Moisés anuncia un profeta', 'Isaías y Emanuel', 'El mundo del Segundo Templo', 'Jesús bebé', 'Simeón carga al niño Jesús',
    'Huida y regreso a Nazaret', 'Relatos del niño Jesús', 'Jesús adolescente en el Templo', 'Ayuno y tentación en el desierto',
    'Jesús adulto', 'Parábolas, signos y discípulos', 'La cena y el arresto', 'Pasión, muerte y sepultura', 'Evangelio de Nicodemo',
    'Jesús resucitado', 'Carino y Leucio, testigos del descenso', 'El Resucitado en María Magdalena y Nag Hammadi',
    'Lo que dijo e hizo resucitado', 'Pentecostés'
  ];
  const timelineDates = {
    'Adán y Eva': [-4000, '4000 años antes de Cristo (cronología tradicional)'],
    'Set y Enós': [-3900, '3900 años antes de Cristo (aprox.)'],
    'Enoc y los vigilantes': [-3000, '3000 años antes de Cristo (aprox.)'],
    'El nacimiento y rescate de Moisés': [-1330, '1330 años antes de Cristo (cronología tradicional)'],
    'Abraham y la promesa': [-2000, '2000 años antes de Cristo (aprox.)'],
    'Jacob y Judá': [-1800, '1800 años antes de Cristo (aprox.)'],
    'José y sus hermanos': [-1700, '1700 años antes de Cristo (aprox.)'],
    'Moisés anuncia un profeta': [-1300, '1300 años antes de Cristo (aprox.)'],
    'Isaías y Emanuel': [-700, '700 años antes de Cristo (aprox.)'],
    'El mundo del Segundo Templo': [-200, '200 años antes de Cristo (aprox.)'],
    'Moisés abre el mar Rojo': [-1300, '1300 años antes de Cristo (aprox.)'],
    'La Roca de Moisés': [-1300, 'después del mar Rojo · antes del Sinaí (Éxodo 17)'],
    'Jesús bebé': [-1, '11 de septiembre de 1 a. C. · hipótesis'],
    'Simeón carga al niño Jesús': [-1, '1 a. C.'],
    'Huida y regreso a Nazaret': [-1, 'infancia de Jesús · relato de Mateo'],
    'Relatos del niño Jesús': [6, 'infancia de Jesús · relato apócrifo'],
    'Jesús adolescente en el Templo': [12, '12 años después de Cristo'],
    'Ayuno y tentación en el desierto': [30, '30 años después de Cristo (aprox.)'],
    'Jesús adulto': [30, '30–33 años después de Cristo'],
    'Parábolas, signos y discípulos': [31, '31–33 años después de Cristo'],
    'La cena y el arresto': [33, '33 años después de Cristo'],
    'Pasión, muerte y sepultura': [33, '33 años después de Cristo'],
    'Evangelio de Nicodemo': [33, 'entre la muerte y la resurrección · relato apócrifo posterior'],
    'Carino y Leucio, testigos del descenso': [33, 'después de la resurrección · relato apócrifo posterior'],
    'Jesús resucitado': [33, '33 años después de Cristo'],
    'El Resucitado en María Magdalena y Nag Hammadi': [33, '33 años después de Cristo (según esos textos)'],
    'Lo que dijo e hizo resucitado': [33, '33 años después de Cristo'],
    'Pentecostés': [33, '33 años después de Cristo (aprox.)']
  };
  const cardsByTitle = new Map(Array.from(timelineTrack.children).map(card => [card.querySelector('h3')?.textContent.trim(), card]));
  timelineOrder.forEach(title => {
    const card = cardsByTitle.get(title);
    if (!card) return;
    const [year, label] = timelineDates[title];
    card.dataset.year = label;
    const date = card.querySelector('.timeline-date');
    if (date) date.textContent = label;
    timelineTrack.append(card);
  });
}

// Hitos bíblicos solicitados: reutilizamos las fichas ilustradas ya existentes y
// generamos solo las que faltan, manteniendo cada acontecimiento una sola vez.
if (timelineTrack) {
  const milestones = [
    ['al principio · Génesis 1:1–2', 'La tierra caótica y el Espíritu sobre las aguas', '«En el principio, cuando Dios creó los cielos y la tierra, reinaba el caos y no había nada en ella. El abismo estaba sumido en la oscuridad, y el Espíritu de Dios aleteaba sobre las aguas.»', 'Génesis 1:1–2', 'lectura/?obra=rvr1909-genesis&capitulo=1#pasaje-1-1', 'origins'],
    ['visión apocalíptica · caída de Satanás', 'Satanás y un tercio de los ángeles caen a la tierra', 'Apocalipsis describe al gran dragón arrastrando la tercera parte de las estrellas y arrojándolas a la tierra; después relata la lucha de Miguel y sus ángeles contra el dragón, que es expulsado junto con sus ángeles. La lectura cristiana tradicional relaciona las estrellas con los ángeles caídos; el capítulo no da una fecha histórica para la visión.', 'Apocalipsis 12:4, 7–9', 'lectura/?obra=rvr1909-apocalipsis&capitulo=12#pasaje-12-4', 'canonical'],
    ['durante la fundación de la tierra · visión poética', 'Los hijos de Dios celebran la fundación de la tierra', 'En la poesía de Job, Dios pregunta dónde estaba Job cuando fundaba la tierra, mientras las estrellas del alba cantaban y los hijos de Dios gritaban de alegría. La escena presenta seres celestiales presentes durante la fundación del mundo.', 'Job 38:4–7', 'lectura/?obra=rvr1909-job&capitulo=38', 'origins'],
    ['cronología tradicional · 4000 a. C.', 'Creación del mundo y del ser humano', 'Génesis abre con la creación de la tierra y de la humanidad.', 'Génesis 1–2', 'lectura/?obra=rvr1909-genesis&capitulo=1', 'origins'],
    ['relato apocalíptico posterior · antes de Adán y Eva (según 3 Baruc)', 'La vid del Edén según 3 Baruc', 'En su recorrido celestial, Baruc pregunta por el árbol que hizo caer a Adán. El ángel responde que era una vid plantada por Sammael. Tras el diluvio, Noé recibe la orden de plantar su brote: el texto afirma que su fruto llegaría a ser «la sangre de Dios» por medio de Jesucristo. Es una explicación propia de 3 Baruc, no de Génesis; su lectura eucarística refleja una interpretación cristiana del pasaje.', '3 Baruc 4:8–16', 'lectura/?obra=3-baruch-es&capitulo=4', 'apocryphal'],
    ['cronología tradicional · 4000 a. C.', 'Adán y Eva en el Edén', 'El relato presenta a la primera pareja en el jardín antes de su expulsión.', 'Génesis 2–3', 'lectura/?obra=rvr1909-genesis&capitulo=2', 'origins'],
    ['cronología tradicional · 4000 a. C.', 'La serpiente habla con Eva', 'La serpiente cuestiona la prohibición de comer del árbol y Eva le responde.', 'Génesis 3:1–5', 'lectura/?obra=rvr1909-genesis&capitulo=3#pasaje-3-1', 'origins'],
    ['cronología tradicional · 4000 a. C.', 'La caída y la expulsión del Edén', 'Eva, incentivada por la serpiente, come del fruto del árbol prohibido; después, la primera pareja sale del jardín de Edén. En Génesis no se identifica la especie del fruto: dice «fruto del árbol». Así que no se puede afirmar que fuera manzana ni uva. 3 Baruc, un texto posterior, sí describe el árbol como una vid; la manzana pertenece a una tradición posterior.', 'Génesis 3:3 · 3 Baruc 4:8', 'lectura/?obra=rvr1909-genesis&capitulo=3#pasaje-3-3', 'origins'],
    ['cronología tradicional · 3900 a. C.', 'Adán, Eva y sus tres hijos', 'Después de la expulsión, Adán y Eva tienen tres hijos: Caín, Abel y Set.', 'Génesis 4:1–26', 'lectura/?obra=rvr1909-genesis&capitulo=4', 'origins'],
    ['cronología tradicional · 3900 a. C.', 'Caín y Abel', 'Caín mata a su hermano Abel, primer homicidio narrado en Génesis.', 'Génesis 4:1–16', 'lectura/?obra=rvr1909-genesis&capitulo=4', 'origins'],
    ['cronología tradicional · 3900 a. C.', 'Caín teme ser hallado', 'Después de matar a Abel, Caín responde: «He aquí, me has arrojado hoy de la faz de la tierra, y de tu presencia me esconderé, y seré vagabundo y errante en la tierra; y sucederá que cualquiera que me halle me matará.» ¿Cómo había más hombres en la tierra si Adán fue el primero? Génesis dice después que Adán tuvo otros hijos e hijas, pero no identifica a quienes Caín temía ni explica de dónde vino su esposa. La lectura tradicional los entiende como descendientes de Adán y Eva.', 'Génesis 4:14–17; 5:4', 'lectura/?obra=rvr1909-genesis&capitulo=4#pasaje-4-14', 'origins'],
    ['cronología tradicional · antes del diluvio', 'Enoc y los vigilantes', 'Enoc tenía 65 años cuando nació Matusalén; vivió otros 300 años y sumó 365. Génesis dice que caminó con Dios y que Dios se lo llevó; Hebreos entiende que fue trasladado sin morir. 1 Enoc amplía su figura con relatos de los Vigilantes.', 'Génesis 5:21–24 · Hebreos 11:5 · Judas 14–15 · 1 Enoc', 'lectura/?obra=rvr1909-hebreos&capitulo=11#pasaje-11-5', 'origins'],
    ['antes del diluvio · relato del Génesis Apócrifo', 'Lamec consulta a Enoc por el nacimiento de Noé', 'Al ver el aspecto extraordinario de su hijo recién nacido, Lamec teme que no sea hijo suyo y que su origen esté relacionado con los seres celestiales. Bathenosh lo niega; Lamec busca a Enoc, quien le explica el papel de Noé en la historia venidera. Este episodio pertenece al Génesis Apócrifo de Qumrán, no al Génesis bíblico.', 'Génesis Apócrifo (1QapGen), columna 2', 'pdfs/rollo-de-lamec.pdf', 'apocryphal'],
    ['tradición de 1 Enoc · antes del diluvio', 'El pacto del monte Hermón', 'Doscientos Vigilantes, liderados por Shemihaza, se reúnen en el monte Hermón y juran unirse a mujeres humanas para engendrar descendencia.', '1 Enoc 6:1–6', 'lectura/?obra=1-enoc-es&capitulo=6', 'origins'],
    ['tradición de 1 Enoc · antes del diluvio', 'El nacimiento de los Nefilim', 'De la unión prohibida nacen gigantes que consumen los recursos, devoran a la humanidad y corrompen la creación.', '1 Enoc 7:1–6', 'lectura/?obra=1-enoc-es&capitulo=7', 'origins'],
    ['tradición de 1 Enoc · antes del diluvio', 'Conocimientos prohibidos de los Vigilantes', 'Azazel enseña metalurgia, armas y adornos; Shemihaza, encantamientos y botánica; otros Vigilantes revelan astrología y secretos del Sol y la Luna.', '1 Enoc 8:1–3', 'lectura/?obra=1-enoc-es&capitulo=8', 'origins'],
    ['tradición de 1 Enoc · antes del diluvio', 'El clamor de la Tierra y los arcángeles', 'La violencia de los Nefilim hace gemir a la Tierra. Miguel, Gabriel, Rafael y Uriel oyen el clamor de las víctimas y presentan su causa ante el Trono de Dios.', '1 Enoc 9:1–11', 'lectura/?obra=1-enoc-es&capitulo=9', 'origins'],
    ['Libro de las Parábolas · tradición de 1 Enoc', 'El Hijo del Hombre y el Anciano de Días', 'Enoc contempla al Hijo del Hombre, también llamado el Elegido, preexistente ante el Anciano de Días y destinado a juzgar a los reyes y defender a los oprimidos.', '1 Enoc 46:1–6; 48:2–7', 'lectura/?obra=1-enoc-es&capitulo=46', 'hope'],
    ['cronología tradicional · 2500 a. C.', 'El diseño exacto del Arca', 'Dios entrega a Noé los planos: madera de gofer, brea por dentro y por fuera, 300 codos de largo, 50 de ancho y 30 de alto, tres pisos, una ventana superior y una puerta lateral.', 'Génesis 6:14–16', 'lectura/?obra=rvr1909-genesis&capitulo=6#pasaje-6-14', 'origins'],
    ['cronología tradicional · antes del diluvio', 'Décadas de trabajo y advertencia', 'Noé construye el Arca durante décadas —la tradición estima cerca de cien años— y advierte a sus contemporáneos como predicador de justicia.', 'Génesis 6:13–22; 2 Pedro 2:5', 'lectura/?obra=rvr1909-2-pedro&capitulo=2#pasaje-2-5', 'origins'],
    ['cronología tradicional · antes del diluvio', 'La recolección de las especies', 'Dios ordena introducir parejas de animales; Génesis distingue siete parejas de animales limpios, una pareja de no limpios y las aves de los cielos.', 'Génesis 7:1–9', 'lectura/?obra=rvr1909-genesis&capitulo=7#pasaje-7-1', 'origins'],
    ['cronología tradicional · 2500 a. C.', 'El ingreso de la familia de Noé', 'A los seiscientos años de Noé entran ocho personas: Noé, su esposa, sus tres hijos —Sem, Cam y Jafet— y las tres esposas de ellos.', 'Génesis 7:6–16', 'lectura/?obra=rvr1909-genesis&capitulo=7#pasaje-7-6', 'origins'],
    ['año 600 de Noé · mes 2, día 17', 'Se abren las fuentes del gran abismo', 'Génesis fecha el comienzo del diluvio: se rompen las fuentes del gran abismo y se abren las compuertas del cielo. Génesis 1:6–8 cuenta que, en el segundo día, Dios creó el firmamento para separar las aguas de abajo de las aguas de arriba y llamó «cielos» al firmamento.', 'Génesis 7:11', 'lectura/?obra=rvr1909-genesis&capitulo=7#pasaje-7-11', 'origins'],
    ['cronología tradicional · 2500 a. C.', 'Cuarenta días y cuarenta noches de tormenta', 'La lluvia cae durante cuarenta días y cuarenta noches; las aguas suben y el Arca se eleva sobre la Tierra.', 'Génesis 7:11–24', 'lectura/?obra=rvr1909-genesis&capitulo=7#pasaje-7-11', 'origins'],
    ['cronología tradicional · 2500 a. C.', 'Ciento cincuenta días de inundación', 'Las aguas prevalecen con fuerza sobre la Tierra durante ciento cincuenta días, mientras el Arca flota sobre el océano global del relato.', 'Génesis 7:17–24; 8:1–5', 'lectura/?obra=rvr1909-genesis&capitulo=8#pasaje-8-1', 'origins'],
    ['cronología tradicional · después del diluvio', 'El primer altar y el pacto del arcoíris', 'Noé edifica un altar y ofrece animales limpios. Dios promete no volver a destruir toda vida con un diluvio y establece el arcoíris como señal eterna del pacto.', 'Génesis 8:20–22; 9:8–17', 'lectura/?obra=rvr1909-genesis&capitulo=9#pasaje-9-8', 'origins'],
    ['tradición apocalíptica posterior · 1 Enoc 15', 'Los espíritus de los gigantes salen de las aguas', 'Enoc explica que los gigantes nacidos de espíritus y seres humanos serían llamados espíritus malignos y permanecerían en la tierra: «Y ahora, los gigantes que han sido engendrados de los espíritus y de la carne, serán llamados espíritus malignos en la tierra, y su morada estará sobre la tierra... Los espíritus de los gigantes oprimen, corrompen, atacan, pelean y causan destrucción en la tierra...» (1 Enoc 15:8–11). Génesis 6:4 dice: «Había gigantes en la tierra en aquellos días, y también después que se llegaron los hijos de Dios a las hijas de los hombres...»', '1 Enoc 15:8–11 · Génesis 6:4', 'lectura/?obra=1-enoc-es&capitulo=15', 'apocryphal'],
    ['cronología tradicional · 2300 a. C.', 'La torre de Babel', 'Génesis cuenta que Dios confundió las lenguas y dispersó a los pueblos.', 'Génesis 11:1–9', 'lectura/?obra=rvr1909-genesis&capitulo=11', 'origins'],
    ['2.º milenio a. C. · fecha tradicional', 'El llamado de Abraham', 'Dios llama a Abraham, promete dar esa tierra a su descendencia y anuncia que por medio de él serán bendecidas todas las familias de la tierra.', 'Génesis 12:1–9; 13:14–17', 'lectura/?obra=rvr1909-genesis&capitulo=12', 'patriarchs'],
    ['2.º milenio a. C. · fecha tradicional', 'Lot recibe a los dos ángeles', 'Dos ángeles llegan a Sodoma al anochecer. Lot los recibe en su casa y les prepara una comida.', 'Génesis 19:1–3', 'lectura/?obra=rvr1909-genesis&capitulo=19#pasaje-19-1', 'patriarchs'],
    ['2.º milenio a. C. · fecha tradicional', 'Los ángeles ciegan a los hombres de Sodoma', 'Cuando los hombres de la ciudad rodean la casa e intentan entrar, los visitantes los hieren con ceguera para proteger a Lot y a su familia.', 'Génesis 19:4–11', 'lectura/?obra=rvr1909-genesis&capitulo=19#pasaje-19-4', 'patriarchs'],
    ['2.º milenio a. C. · fecha tradicional', 'Sodoma y Gomorra', 'Los ángeles anuncian el juicio y Génesis dice que Jehová hizo llover sobre Sodoma y Gomorra azufre y fuego desde los cielos (Génesis 19:24). En la región del mar Muerto se han estudiado nódulos de azufre y un estudio analizó muestras de azufre cerca de Masada.', 'Génesis 19:12–13, 24–28', 'lectura/?obra=rvr1909-genesis&capitulo=19#pasaje-19-12', 'patriarchs'],
    ['2.º milenio a. C. · fecha tradicional', 'La prueba de Abraham e Isaac', 'Dios pone a prueba la fe de Abraham y le pide ofrecer a Isaac en el monte Moriah. Cuando Abraham está a punto de obedecer, un ángel lo detiene y Dios provee un carnero para el sacrificio.', 'Génesis 22:1–19', 'lectura/?obra=rvr1909-genesis&capitulo=22', 'patriarchs'],
    ['2.º milenio a. C. · fecha tradicional', 'Isaac y Rebeca tienen a Jacob y Esaú', 'Isaac y Rebeca tienen gemelos: Jacob y Esaú rivalizan desde el vientre.', 'Génesis 25:19–26', 'lectura/?obra=rvr1909-genesis&capitulo=25#pasaje-25-19', 'patriarchs'],
    ['2.º milenio a. C. · fecha tradicional', 'Jacob lucha y recibe el nombre Israel', 'En Peniel, Jacob pelea con un ángel. Al amanecer, el ángel lo bendice y le da el nombre Israel.', 'Génesis 32:22–32', 'lectura/?obra=rvr1909-genesis&capitulo=32#pasaje-32-22', 'patriarchs'],
    ['2.º milenio a. C. · fecha tradicional', 'José es vendido y asciende en Egipto', 'Sus hermanos venden a José; después, el faraón lo pone a cargo de Egipto.', 'Génesis 37–41', 'lectura/?obra=rvr1909-genesis&capitulo=37', 'patriarchs'],
    ['c. 1330 a. C. · cronología tradicional', 'El nacimiento y rescate de Moisés', 'Moisés nace durante la opresión en Egipto. Su madre lo esconde en una cesta en el Nilo y la hija del faraón lo cría. Deuteronomio dice que murió a los 120 años.', 'Éxodo 2:1–10', 'lectura/?obra=rvr1909-exodo&capitulo=2', 'exodus'],
    ['c. 1250 a. C. · cronología tradicional', 'La zarza ardiente', 'Dios llama a Moisés desde una zarza que arde sin consumirse.', 'Éxodo 3:1–15', 'lectura/?obra=rvr1909-exodo&capitulo=3', 'exodus'],
    ['c. 1250 a. C. · cronología tradicional', 'Moisés y Aarón ante el faraón', 'Moisés y su hermano Aarón se presentan ante el faraón y le exigen: «Deja ir a mi pueblo».', 'Éxodo 5:1–5', 'lectura/?obra=rvr1909-exodo&capitulo=5#pasaje-5-1', 'exodus'],
    ['c. 1250 a. C. · cronología tradicional', 'Las diez plagas de Egipto', 'Éxodo enumera diez plagas: agua convertida en sangre, ranas, piojos, moscas, peste del ganado, úlceras, granizo, langostas, tinieblas y muerte de los primogénitos.', 'Éxodo 7–12', 'lectura/?obra=rvr1909-exodo&capitulo=7', 'exodus'],
    ['c. 1250 a. C. · cronología tradicional', 'Juicio contra los dioses de Egipto', 'Éxodo declara que YHWH ejecutará juicio contra «todos los dioses de Egipto». El pasaje no los identifica con los setenta elohim de Deuteronomio 32.', 'Éxodo 12:12', 'lectura/?obra=rvr1909-exodo&capitulo=12', 'exodus'],
    ['c. 1250 a. C. · cronología tradicional', 'La institución de la Pascua', 'La cena pascual conmemora la liberación de Egipto. Tras la muerte de los primogénitos, el faraón decide expulsar a los israelitas.', 'Éxodo 12:1–32', 'lectura/?obra=rvr1909-exodo&capitulo=12', 'exodus'],
    ['c. 1250 a. C. · cronología tradicional', 'Moisés abre el mar Rojo', 'Israel cruza entre las aguas y escapa de la persecución egipcia.', 'Éxodo 14:15–31', 'lectura/?obra=rvr1909-exodo&capitulo=14', 'exodus'],
    ['c. 1250 a. C. · después del mar Rojo, antes del Sinaí', 'La Roca de Moisés', 'El pueblo protesta por sed; Dios le ordena a Moisés golpear la roca en Horeb (Refidim) y sale agua, saciando la sed de todo el pueblo.', 'Éxodo 17:1–7', 'lectura/?obra=rvr1909-exodo&capitulo=17', 'exodus'],
    ['c. 1250 a. C. · cronología tradicional', 'Los Diez Mandamientos en el Sinaí', 'Moisés recibe las palabras de la alianza en el monte Sinaí.', 'Éxodo 20:1–17', 'lectura/?obra=rvr1909-exodo&capitulo=20', 'exodus'],
    ['c. 1250 a. C. · cronología tradicional', 'El becerro de oro', 'Mientras Moisés pasa cuarenta días en la cumbre, el pueblo fabrica un becerro de oro y comienza a adorarlo como a un dios. Al bajar, Moisés rompe las tablas de la Ley por indignación y destruye el becerro.', 'Éxodo 32:1–20', 'lectura/?obra=rvr1909-exodo&capitulo=32', 'exodus'],
    ['c. 1250 a. C. · cronología tradicional', 'El Tabernáculo', 'Dios escribe las segundas tablas de la Ley y el rostro de Moisés resplandece al bajar del monte. Luego, Israel edifica el santuario móvil según los planos celestiales.', 'Éxodo 34–40', 'lectura/?obra=rvr1909-exodo&capitulo=34', 'exodus'],
    ['c. 1250 a. C. · cronología tradicional', 'El informe de los diez espías', 'Diez espías, entre ellos Gadiel y Ammiel, traen un informe pesimista que atemoriza al pueblo; solo Josué y Caleb confían en Dios. Según Números, los diez que difundieron el mal informe mueren por una plaga.', 'Números 13:1–14:38', 'lectura/?obra=rvr1909-numeros&capitulo=13', 'exodus'],
    ['c. 1250 a. C. · cuarenta años en el desierto', 'Israel vaga por el desierto', 'Por su incredulidad y rechazo a entrar en la tierra, Dios sentencia a esa generación adulta a vagar cuarenta años por el desierto, hasta que muera; Josué y Caleb sí entrarán.', 'Números 14:26–35', 'lectura/?obra=rvr1909-numeros&capitulo=14', 'exodus'],
    ['c. 1230 a. C. · desierto de Zin', 'Moisés golpea la roca en Meribá', 'El pueblo vuelve a quejarse por falta de agua. Dios le ordena a Moisés hablarle a la roca, pero él, frustrado y enojado, la golpea dos veces con su vara. Brota agua en abundancia; Dios comunica a Moisés y Aarón que no conducirán al pueblo a la Tierra Prometida.', 'Números 20:1–13', 'lectura/?obra=rvr1909-numeros&capitulo=20', 'exodus'],
    ['c. 1208 a. C. · año 5 de Merneptah', 'Israel aparece en la estela de Merneptah', 'La estela fue descubierta en Tebas, Egipto, y se erigió durante el reinado de Merneptah. Su inscripción menciona a Israel en el contexto de una campaña en Canaán; no documenta que Israel visitara Egipto en 1208 a. C. Es la referencia extrabíblica más antigua conocida al nombre Israel y suele fecharse en torno a ese año.', 'Estela de Merneptah · texto y contexto', 'https://www.posenlibrary.com/entry/stela-merneptah', 'context'],
    ['c. 1200 a. C. · muerte de Moisés', 'Moisés contempla la Tierra Prometida y muere', 'Dios le muestra a Moisés la Tierra Prometida desde lejos. Moisés muere a los 120 años, y Dios mismo guarda su cuerpo en un lugar secreto; nadie conoce su sepultura.', 'Deuteronomio 34:1–7', 'lectura/?obra=rvr1909-deuteronomio&capitulo=34', 'judges'],
    ['c. 1200 a. C. · cronología tradicional', 'El cruce del río Jordán', 'Tras la muerte de Moisés, Josué asume el liderazgo de Israel. Las aguas del Jordán se detienen cuando los sacerdotes que cargan el Arca del Pacto entran en el río, y el pueblo cruza hacia la Tierra Prometida.', 'Josué 3–4', 'lectura/?obra=rvr1909-josue&capitulo=3', 'judges'],
    ['c. 1200 a. C. · cronología tradicional', 'La caída de Jericó', 'Israel marcha alrededor de Jericó y hace sonar las trompetas; según el relato, las murallas de la ciudad caen.', 'Josué 6', 'lectura/?obra=rvr1909-josue&capitulo=6', 'judges'],
    ['c. 1150 a. C. · cronología tradicional', 'Débora, Gedeón y Jefté', 'Los relatos reúnen líderes que juzgan y liberan a Israel en distintos conflictos.', 'Jueces 4–8; 11–12', 'lectura/?obra=rvr1909-jueces&capitulo=4', 'judges'],
    ['c. 1100 a. C. · cronología tradicional', 'Sansón', 'La historia de Sansón vincula su fuerza extraordinaria con su voto y su conflicto con los filisteos.', 'Jueces 13–16', 'lectura/?obra=rvr1909-jueces&capitulo=13', 'judges'],
    ['c. 1100 a. C. · cronología tradicional', 'Rut y Noemí', 'Rut acompaña a Noemí y se integra en la familia de la que, según la genealogía bíblica, desciende David.', 'Rut 1–4', 'lectura/?obra=rvr1909-rut&capitulo=1', 'judges'],
    ['siglo 11 a. C. · cronología tradicional', 'El llamado de Samuel', 'Samuel oye la llamada de Dios y se convierte en profeta y juez de Israel.', '1 Samuel 3', 'lectura/?obra=rvr1909-1-samuel&capitulo=3', 'judges'],
    ['siglo 11 a. C. · cronología tradicional', 'Saúl es ungido primer rey', 'Samuel unge a Saúl como primer rey de Israel.', '1 Samuel 10:1–24', 'lectura/?obra=rvr1909-1-samuel&capitulo=10', 'kingdom'],
    ['siglo 11 a. C. · cronología tradicional', 'David derrota a Goliat', 'El joven David vence al guerrero filisteo Goliat. Si los Nefilim murieron en el diluvio, ¿de dónde salió Goliat? ¿Sobrevivió? La Biblia no dice que Goliat fuera un Nefilim ni que hubiera sobrevivido al diluvio: lo presenta como un guerrero filisteo de Gat. Génesis 6:4 menciona Nefilim «también después», y otros pasajes hablan de pueblos gigantes y descendientes de Rafá, pero no explican una supervivencia ni vinculan directamente a Goliat con los Nefilim.', '1 Samuel 17:4; Génesis 6:4; 2 Samuel 21:15–22', 'lectura/?obra=rvr1909-1-samuel&capitulo=17#pasaje-17-4', 'kingdom'],
    ['siglo 10 a. C. · cronología tradicional', 'David reina y establece Jerusalén', 'David es proclamado rey y hace de Jerusalén su capital.', '2 Samuel 5:1–12', 'lectura/?obra=rvr1909-2-samuel&capitulo=5', 'kingdom'],
    ['siglo 10 a. C. · cronología tradicional', 'David, Betsabé y Natán', 'El relato de Betsabé y Urías es seguido por el reproche del profeta Natán y el arrepentimiento de David.', '2 Samuel 11–12', 'lectura/?obra=rvr1909-2-samuel&capitulo=11', 'kingdom'],
    ['siglo 10 a. C. · cronología tradicional', 'Salomón pide sabiduría', 'Salomón pide discernimiento para gobernar al pueblo.', '1 Reyes 3:3–15', 'lectura/?obra=rvr1909-1-reyes&capitulo=3', 'kingdom'],
    ['siglo 10 a. C. · cronología tradicional', 'El Primer Templo de Jerusalén', 'Salomón inicia la construcción del templo de Jerusalén.', '1 Reyes 6', 'lectura/?obra=rvr1909-1-reyes&capitulo=6', 'kingdom'],
    ['siglo 10 a. C. · cronología tradicional', 'La división del reino', 'Tras Salomón, el reino se divide en Israel al norte y Judá al sur.', '1 Reyes 12', 'lectura/?obra=rvr1909-1-reyes&capitulo=12', 'kingdom'],
    ['fecha de nacimiento desconocida', 'Nacimiento de Elías', 'La Biblia no narra su nacimiento ni indica cuántos años vivió. Lo presenta como Elías el tisbita de Galaad ante el rey Acab.', '1 Reyes 17:1', 'lectura/?obra=rvr1909-1-reyes&capitulo=17#pasaje-17-1', 'kingdom'],
    ['siglo 9 a. C. · cronología tradicional', 'Elías humilla a los profetas de Baal', 'En el monte Carmelo, Elías ridiculiza la impotencia de Baal ante sus profetas y demuestra, dentro del relato, que YHWH responde con fuego.', '1 Reyes 18', 'lectura/?obra=rvr1909-1-reyes&capitulo=18', 'kingdom'],
    ['siglo 9 a. C. · cronología tradicional', 'Elías es llevado en un carro de fuego', 'Un carro y caballos de fuego separan a Elías de Eliseo; Elías asciende al cielo en un torbellino.', '2 Reyes 2:1–12', 'lectura/?obra=rvr1909-2-reyes&capitulo=2', 'kingdom'],
    ['fecha de nacimiento desconocida', 'Nacimiento de Isaías', 'La Biblia no narra su nacimiento ni indica cuántos años vivió. Lo identifica como hijo de Amoz y sitúa sus visiones en tiempos de los reyes de Judá.', 'Isaías 1:1', 'lectura/?obra=rvr1909-isaias&capitulo=1#pasaje-1-1', 'kingdom'],
    ['siglo 8 a. C.', 'Isaías y Emanuel', 'Isaías anuncia: “Una virgen concebirá y dará a luz un hijo, y su nombre será Emanuel”.', 'Isaías 7:14', 'lectura/?obra=rvr1909-isaias&capitulo=7#pasaje-7-14', 'kingdom'],
    ['722 a. C.', 'Caída del reino del norte ante Asiria', 'Samaria cae ante Asiria y parte de su población es deportada.', '2 Reyes 17:5–23', 'lectura/?obra=rvr1909-2-reyes&capitulo=17', 'exile'],
    ['586 a. C.', 'Jerusalén cae y el Primer Templo es destruido', 'Las fuerzas de Babilonia toman Jerusalén y destruyen el templo.', '2 Reyes 25:1–21', 'lectura/?obra=rvr1909-2-reyes&capitulo=25', 'exile'],
    ['587–582 a. C. · deportaciones babilónicas', 'Judá es llevado al exilio', 'Tras la caída de Jerusalén, Babilonia deporta a parte de la población de Judá en varias campañas; no fue un único traslado de todo el pueblo.', '2 Reyes 24:10–16; 25:8–12', 'lectura/?obra=rvr1909-2-reyes&capitulo=24', 'exile'],
    ['siglo 6 a. C. · vida en el exilio', 'Los desterrados viven en Babilonia', 'Los exiliados se establecen en Babilonia y mantienen su identidad; los libros de Jeremías y Ezequiel conservan voces de ese período.', 'Jeremías 29:1–7; Ezequiel 1:1–3', 'lectura/?obra=rvr1909-jeremias&capitulo=29', 'exile'],
    ['539 a. C. · conquista persa de Babilonia', 'Ciro conquista Babilonia', 'El Imperio persa de Ciro toma Babilonia. Al año siguiente, el decreto real permite a los deportados volver a Jerusalén.', 'Daniel 5:30–31; Esdras 1:1–4', 'lectura/?obra=rvr1909-daniel&capitulo=5', 'exile'],
    ['siglo 6 a. C. · relato de Daniel', 'Sadrac, Mesac y Abed-nego en el horno', 'Daniel cuenta que los tres jóvenes sobreviven al horno ardiente.', 'Daniel 3', 'lectura/?obra=rvr1909-daniel&capitulo=3', 'exile'],
    ['siglo 6 a. C. · relato de Daniel', 'Daniel en el foso de los leones', 'Daniel es arrojado al foso y sale ileso según el relato.', 'Daniel 6', 'lectura/?obra=rvr1909-daniel&capitulo=6', 'exile'],
    ['538 a. C. · cronología tradicional', 'Ciro permite el regreso', 'El decreto atribuido a Ciro permite a los exiliados regresar a Jerusalén.', 'Esdras 1:1–4', 'lectura/?obra=rvr1909-esdras&capitulo=1', 'exile'],
    ['516 a. C. · fecha aproximada', 'Reconstrucción del Segundo Templo', 'La comunidad concluye el Segundo Templo tras el regreso del exilio.', 'Esdras 3–6', 'lectura/?obra=rvr1909-esdras&capitulo=3', 'exile'],
    ['siglo 5 a. C. · 445 a. C.', 'Nehemías reconstruye los muros', 'Nehemías organiza la reconstrucción de las murallas de Jerusalén.', 'Nehemías 1–6', 'lectura/?obra=rvr1909-nehemias&capitulo=1', 'exile'],
    ['entre los siglos 6 y 5 a. C.', 'El mundo del Segundo Templo', 'Judea vive bajo imperios sucesivos; se desarrollan distintas corrientes y textos judíos.', 'Daniel 7 · contexto histórico', 'lectura/?obra=rvr1909-daniel&capitulo=7', 'exile'],
    ['c. 1 a. C. · fecha aproximada', 'La anunciación a María', 'Gabriel anuncia a María el nacimiento de Jesús. 1 Enoc presenta al Hijo del Hombre en una visión anterior: es un paralelo temático, no el relato de la anunciación.', 'Lucas 1:26–38 · paralelo temático: 1 Enoc 48:2–7', 'lectura/?obra=rvr1909-lucas&capitulo=1', 'jesus'],
    ['11 de septiembre de 1 a. C. · hipótesis', 'Jesús bebé', 'Mateo y Lucas sitúan el nacimiento de Jesús en Belén y narran sus primeros años. La fecha exacta es una hipótesis, no una fecha establecida por los Evangelios.', 'Lucas 2:1–20 · Mateo 1:18–25', 'lectura/?obra=rvr1909-lucas&capitulo=2', 'jesus'],
    ['infancia de Jesús · relato de Mateo', 'Huida y regreso a Nazaret', 'Mateo cuenta la huida de la familia a Egipto y el regreso posterior a Nazaret; no precisa el año.', 'Mateo 2:13–23', 'lectura/?obra=rvr1909-mateo&capitulo=2', 'jesus'],
    ['infancia de Jesús · relato apócrifo', 'Relatos del niño Jesús', 'En el cap. 4 un niño muere al chocar con Jesús; en el cap. 9 Jesús revive a Zeno tras una caída. Son episodios distintos del Evangelio de la Infancia de Tomás.', 'Infancia de Tomás 4 y 9', 'lectura/?obra=infancy-thomas-es&capitulo=4', 'jesus'],
    ['infancia de Jesús · relato apócrifo', 'Jacobo es curado de una mordedura de víbora', 'El Evangelio de la infancia de Tomás cuenta que José envió a su hijo Jacobo a recoger leña. Una víbora lo mordió; Jesús sopló sobre la herida, el dolor cesó y Jacobo quedó sano. Es un episodio apócrifo, no narrado en los evangelios canónicos.', 'Evangelio de la infancia de Tomás 16:1–2', 'lectura/?obra=infancy-thomas-es&capitulo=16', 'jesus'],
    ['12 años después de Cristo', 'Jesús adolescente en el Templo', 'Jesús dialoga con los maestros y es encontrado por María y José en el Templo.', 'Lucas 2:41–52', 'lectura/?obra=rvr1909-lucas&capitulo=2#pasaje-2-41', 'jesus'],
    ['c. 30–33 d. C.', 'Bautismo de Jesús', 'Juan el Bautista bautiza a Jesús en el Jordán y comienza su ministerio público.', 'Mateo 3:13–17', 'lectura/?obra=rvr1909-mateo&capitulo=3', 'jesus'],
    ['c. 30–33 d. C. · 40 días', 'Ayuno y tentación en el desierto', 'Después de ayunar cuarenta días, Jesús es tentado por el diablo antes de predicar públicamente.', 'Mateo 4:1–11 · Marcos 1:9–13', 'lectura/?obra=rvr1909-mateo&capitulo=4', 'jesus'],
    ['c. 30–33 d. C.', 'Multiplicación de los panes', 'Jesús bendice y reparte cinco panes y dos peces; la multitud come y quedan canastas con sobras.', 'Marcos 6:30–44', 'lectura/?obra=rvr1909-marcos&capitulo=6', 'jesus'],
    ['c. 30–33 d. C.', 'Jesús sana al ciego', 'Jesús devuelve la vista a un hombre ciego de nacimiento; Juan relata que se lava en el estanque de Siloé.', 'Juan 9:1–7', 'lectura/?obra=rvr1909-juan&capitulo=9#pasaje-9-6', 'jesus'],
    ['c. 30–33 d. C.', 'Jesús calma la tempestad', 'Durante la travesía por el lago, Jesús reprende al viento y las aguas se aquietan.', 'Marcos 4:35–41', 'lectura/?obra=rvr1909-marcos&capitulo=4', 'jesus'],
    ['c. 30–33 d. C.', 'Lázaro vuelve a la vida', 'Jesús llama a Lázaro para que salga del sepulcro, después de cuatro días.', 'Juan 11:1–44', 'lectura/?obra=rvr1909-juan&capitulo=11', 'jesus'],
    ['33 años después de Cristo · cronología tradicional', 'La última cena y el arresto', 'Jesús comparte la cena con sus discípulos y luego es arrestado en Getsemaní.', 'Mateo 26:17–56', 'lectura/?obra=rvr1909-mateo&capitulo=26', 'jesus'],
    ['33 años después de Cristo · cronología tradicional', 'Crucifixión y muerte de Jesús', 'Los evangelios narran el juicio, la crucifixión y la sepultura de Jesús.', 'Lucas 23 · Juan 19', 'lectura/?obra=rvr1909-lucas&capitulo=23', 'jesus'],
    ['33 años después de Cristo · al tercer día', 'Resurrección de Jesús', 'Los evangelios proclaman que Jesús resucitó y se apareció a sus seguidores.', 'Mateo 28 · Lucas 24', 'lectura/?obra=rvr1909-mateo&capitulo=28', 'jesus'],
    ['33 años después de Cristo · cuarenta días después de la resurrección', 'Ascensión de Jesús', 'Después de aparecerse a sus discípulos durante cuarenta días, Jesús fue elevado al cielo ante ellos y una nube lo ocultó de su vista.', 'Hechos 1:3–11', 'lectura/?obra=rvr1909-hechos&capitulo=1#pasaje-1-3', 'church'],
    ['33 años después de Cristo · cronología tradicional', 'Pentecostés', 'El Espíritu desciende sobre los discípulos y comienza su proclamación pública.', 'Hechos 2:1–41', 'lectura/?obra=rvr1909-hechos&capitulo=2', 'church'],
    ['c. 95 d. C. · datación tradicional', 'Juan en Patmos y el Apocalipsis', 'Apocalipsis se presenta como una visión recibida por Juan en Patmos y dirigida a siete iglesias. No se sabe cuándo ni cómo murió Juan: una tradición antigua sitúa sus últimos años en Éfeso, pero no prueba el modo de su muerte. Jesús le dijo a Pedro: «Si quiero que él quede hasta que yo venga, ¿qué a ti?»; la frase alimentó la tradición sobre la permanencia de Juan, pero no afirma que fuera inmortal.', 'Apocalipsis 1:9–20 · Juan 21:20–23 · Eusebio III, 1', 'lectura/?obra=rvr1909-apocalipsis&capitulo=1', 'hope'],
    ['visión apocalíptica', 'El jinete del caballo blanco', 'El jinete llamado Fiel y Verdadero aparece sobre un caballo blanco; sus ojos son como llama de fuego. El texto no dice que el caballo sea de fuego.', 'Apocalipsis 19:11–16', 'lectura/?obra=rvr1909-apocalipsis&capitulo=19', 'hope'],
    ['visión apocalíptica', 'Juicio final y nueva creación', 'Apocalipsis describe la resurrección y el juicio ante el gran trono blanco; después presenta un cielo nuevo y una tierra nueva.', 'Apocalipsis 20:11–15 · 21:1–5', 'lectura/?obra=rvr1909-apocalipsis&capitulo=20', 'hope']
  ];
  // Hitos de la vida pública, pasión y resurrección solicitados para la línea temporal.
  // Cada tarjeta conserva una referencia bíblica y una ilustración independiente.
  const requestedTimelineEvents = [
    ['relato situado en tiempos de Ciro · composición griega posterior', 'Daniel mata al dragón en Babilonia', 'En la adición griega a Daniel, el rey Ciro desafía a Daniel a venerar un gran dragón adorado en Babilonia. Daniel lo mata sin espada y el relato continúa con su estancia en el foso de los leones. La escena pertenece a una narración religiosa posterior, no es evidencia histórica de la existencia de dragones.', 'Bel y el Dragón 23–32 · adición griega a Daniel', 'seccion.html?tema=dragones', 'apocryphal', 'assets/linea-tiempo/daniel-mata-dragon.jpg'],
    ['vida de Jesús · atribución en un texto posterior', 'El beso de María Magdalena a Jesús según el Evangelio de Felipe', 'El Evangelio de Felipe, un texto posterior, llama a María Magdalena «compañera» del Salvador y conserva un pasaje fragmentario que dice que él la amaba más que a los discípulos y la besaba. El manuscrito está dañado en ese punto; «en la boca» es una reconstrucción editorial de algunas traducciones. Aquí se coloca como un episodio atribuido a la vida de Jesús antes de la crucifixión; el pasaje no lo fecha. La imagen es una recreación artística, no evidencia histórica de una relación.', 'Evangelio de Felipe 12 · pasaje fragmentario', 'lectura/?obra=gospel-philip-es&capitulo=12', 'apocryphal'],
    ['33 d. C. · escena de la crucifixión', 'María Magdalena, María y Juan junto a la cruz', 'Los evangelios sitúan a María Magdalena entre quienes observan la crucifixión; Juan menciona a María, madre de Jesús, y al discípulo amado junto a la cruz. Esta recreación muestra el duelo en el suelo mientras se alza la cruz; Juan dice que estaban de pie, así que la postura de la imagen es dramatización artística, no una descripción literal.', 'Juan 19:25–27 · Mateo 27:55–56 · Marcos 15:40–41', 'lectura/?obra=rvr1909-juan&capitulo=19#pasaje-19-25', 'canonical'],
    ['durante la huida a Egipto · Pseudo-Mateo', 'Los leones guían a la Sagrada Familia', 'Durante la huida por el desierto, leones y leopardos acompañan a María, José y Jesús niño, y les muestran el camino. Un episodio maravilloso del Evangelio del Pseudo-Mateo.', 'Pseudo-Mateo 19', 'lectura/?obra=pseudo-mateo-es&capitulo=19', 'apocryphal'],
    ['durante la huida a Egipto · Pseudo-Mateo', 'La palmera ofrece sus frutos a la Sagrada Familia', 'Agotada por el calor, María descansa bajo una palmera. Jesús hace que el árbol se incline para que ella recoja sus dátiles; luego brota agua de sus raíces.', 'Pseudo-Mateo 20–21', 'lectura/?obra=pseudo-mateo-es&capitulo=20', 'apocryphal'],
    ['infancia de Jesús · Evangelio árabe', 'Las figuras de barro cobran vida', 'Jesús niño modela animales y pájaros de barro; al darles una orden, las figuras se mueven, vuelan, comen y beben.', 'Evangelio árabe de la Infancia 36:1–2', 'lectura/?obra=arabic-infancy-es&capitulo=36', 'apocryphal'],
    ['infancia de Jesús · Evangelio árabe', 'Jesús devuelve sus colores a las túnicas', 'En el taller de un tintorero, Jesús saca de la tina cada prenda teñida y la devuelve con el color que su dueño había pedido.', 'Evangelio árabe de la Infancia 37:1–2', 'lectura/?obra=arabic-infancy-es&capitulo=37', 'apocryphal'],
    ['a los cinco años · Infancia de Tomás', 'Jesús cura al joven leñador', 'Un joven se hiere el pie con un hacha y pierde mucha sangre. Jesús toca la herida y el muchacho queda sano.', 'Infancia de Tomás, redacción griega A 10:1–2', 'lectura/?obra=infancy-thomas-es&capitulo=10', 'apocryphal'],
    ['a los ocho años · Infancia de Tomás', 'Jesús multiplica el trigo y lo comparte', 'De un solo grano sembrado, Jesús obtiene una cosecha abundante y la reparte entre las familias pobres de la aldea.', 'Infancia de Tomás, redacción griega A 12:1–2', 'lectura/?obra=infancy-thomas-es&capitulo=12', 'apocryphal'],
    ['a los ocho años · Infancia de Tomás', 'Jesús alarga la madera para José', 'La Infancia de Tomás cuenta que, al construir una cama, a José le quedó corta una pieza de madera y Jesús la alargó hasta igualarla con la otra. Este episodio pertenece a un relato apócrifo posterior; no aparece en la Historia de José el Carpintero, centrada en la vida y muerte de José.', 'Infancia de Tomás 13', 'lectura/?obra=infancy-thomas-es&capitulo=13', 'apocryphal', 'assets/linea-tiempo/jesus-alarga-madera.png'],
    ['marco narrativo · Génesis 10, antes de Babel', 'Las naciones y los hijos de Dios', 'Deuteronomio dice que el Altísimo fijó los límites de los pueblos y que la porción de Yahvé fue Jacob. Qumrán y la Septuaginta leen “hijos de Dios” o “ángeles de Dios” en 32:8; el texto masorético dice “hijos de Israel”. Se coloca junto a Génesis 10–11 por su relación temática, no como fecha de composición del poema. Una interpretación relaciona el pasaje con las naciones de Génesis 10, pero aquí no se enumeran setenta seres ni se los identifica con dioses paganos.', 'Deuteronomio 32:8–9', 'lectura/?obra=rvr1909-deuteronomio&capitulo=32#pasaje-32-8', 'canonical', 'assets/timeline/deuteronomio-naciones-elohim.jpg'],
    ['poema bíblico · fecha debatida', 'El juicio del consejo divino', 'El salmo representa a Dios en la asamblea divina y censura a los elohim por no hacer justicia al débil y al huérfano. Anuncia que morirán como humanos y que Dios heredará todas las naciones. Es una imagen poética de juicio; el texto no dice que esos elohim sean Baal, Quemos o Moloc.', 'Salmo 82:1–8', 'lectura/?obra=rvr1909-salmos&capitulo=82#pasaje-82-1', 'canonical', 'assets/timeline/salmo-82-consejo-divino.jpg'],
    ['lectura cristiana del siglo I · síntesis temática', 'La cruz, los poderes y Pentecostés', 'Colosenses interpreta la cruz como triunfo de Cristo sobre principados y potestades. Hechos relata después que, en Pentecostés, visitantes de muchas regiones entienden a los discípulos en sus propias lenguas. Por eso algunas lecturas cristianas ven un contrapunto con Babel; ninguno de estos pasajes identifica explícitamente a esos poderes con los setenta elohim ni describe una guerra literal contra ellos.', 'Colosenses 2:15', 'lectura/?obra=rvr1909-colosenses&capitulo=2#pasaje-2-15', 'context', 'assets/timeline/cruz-pentecostes-poderes.jpg'],
    ['c. 33 d. C. · antes de Pentecostés', 'Elección de Matías', 'Después de la muerte de Judas, los discípulos proponen a José Barsabás y a Matías. Oran y echan suertes para elegir a quien ocupará el puesto apostólico; Matías es incorporado al grupo de los Doce.', 'Hechos 1:15–26', 'lectura/?obra=rvr1909-hechos&capitulo=1#pasaje-1-26', 'canonical', 'assets/timeline/eleccion-matias.png'],
    ['33 d. C. · antes del arresto', 'Jesús revela a Judas su papel', 'En el Evangelio de Judas, Jesús anticipa que Judas tendrá un papel singular en su entrega: «Pero harás más que todos ellos, porque sacrificarás al humano que me lleva». El pasaje no contiene una orden literal «traicióname»; presenta la entrega como parte de la conversación reservada entre ambos.', 'Evangelio de Judas 7:1 · Codex Tchacos 56–57', 'lectura/?obra=gospel-judas-es&capitulo=7', 'apocryphal'],
    ['c. 33 d. C. · relato apócrifo', 'María Magdalena consuela a los discípulos', 'Después de la partida del Salvador, los discípulos quedan afligidos. María Magdalena los anima: «No lloréis. No os aflijáis, porque su gracia estará con vosotros y os protegerá». El episodio pertenece al Evangelio de María, no a los evangelios canónicos.', 'Evangelio de María 5:2', 'lectura/?obra=gospel-mary-es&capitulo=3#pasaje-3-1', 'tradition', 'assets/timeline/maria-magdalena-consuela-discipulos.png'],
    ['siglo I · tradición transmitida por Papías', 'José Barsabás sobrevive al veneno', 'Papías, citado por Eusebio, cuenta que José Barsabás, llamado Justo, bebió un veneno mortal y salió ileso. Hechos 1:23–26 menciona que no fue elegido para reemplazar a Judas, pero no narra el episodio del veneno ni su muerte.', 'Papías en Eusebio · Historia eclesiástica III, 39', 'https://www.newadvent.org/fathers/250103.htm', 'tradition', 'assets/timeline/jose-barsabas-veneno.jpg'],
    ['antes del diluvio · nacimiento de Enoc', 'Enoc niño', 'Jared tenía 162 años cuando nació Enoc. Génesis no describe un prodigio en su nacimiento, pero presenta a este hijo como el hombre que más tarde caminaría con Dios y sería llevado por él.', 'Génesis 5:18–24', 'lectura/?obra=rvr1909-genesis&capitulo=5#pasaje-5-18', 'canonical', 'assets/timeline/enoc-nino.png'],
    ['fecha de nacimiento desconocida', 'Nacimiento de Ezequiel', 'No consta cuándo nació ni cuántos años vivió. El libro lo presenta como sacerdote e hijo de Buzí entre los exiliados.', 'Ezequiel 1:1–3', 'lectura/?obra=rvr1909-ezequiel&capitulo=1#pasaje-1-1', 'canonical', 'assets/timeline/nacimiento-ezequiel.png'],
    ['antes del diluvio · cronología tradicional', 'Nacimiento de Noé', 'Génesis cuenta que Lamec esperaba que Noé trajera alivio y dice que vivió 950 años. Una tradición distinta, en 1 Enoc 106, describe al recién nacido con el rostro luminoso y los ojos brillantes, hasta iluminar la casa. Ese detalle pertenece a 1 Enoc, no al relato de Génesis.', 'Génesis 5:28–29', 'lectura/?obra=rvr1909-genesis&capitulo=5#pasaje-5-28', 'canonical', 'assets/timeline/nacimiento-noe.png'],
    ['1 a. C.', 'La Adoración de los Magos', 'Sabios de Oriente visitan al niño Jesús; Mateo narra después la huida de la familia a Egipto para escapar de Herodes.', 'Mateo 2:1–18', 'lectura/?obra=rvr1909-mateo&capitulo=2', 'canonical', 'assets/linea-tiempo/adoracion-magos.png'],
    ['12 años después de Cristo', 'Jesús entre los doctores', 'Jesús se queda rezagado en el Templo de Jerusalén y asombra a los maestros de la Ley con sus respuestas.', 'Lucas 2:41–52', 'lectura/?obra=rvr1909-lucas&capitulo=2#pasaje-2-46', 'canonical', 'assets/linea-tiempo/jesus-doctores.png'],
    ['c. 30–33 d. C.', 'El Discurso del Pan de Vida', 'En Cafarnaúm, Jesús declara que quien come de su carne y bebe de su sangre tiene vida eterna.', 'Juan 6:22–59', 'lectura/?obra=rvr1909-juan&capitulo=6#pasaje-6-35', 'canonical', 'assets/linea-tiempo/pan-vida.png'],
    ['c. 30–33 d. C.', 'La Pesca Milagrosa', 'Después de una noche sin capturas, Jesús hace que las redes de Pedro y sus compañeros se llenen de peces.', 'Lucas 5:1–11', 'lectura/?obra=rvr1909-lucas&capitulo=5', 'canonical', 'assets/linea-tiempo/pesca-milagrosa.png'],
    ['c. 30–33 d. C.', 'La Sanidad del Leproso', 'Jesús toca y limpia a un hombre con lepra, desafiando las leyes de exclusión de la época.', 'Marcos 1:40–45', 'lectura/?obra=rvr1909-marcos&capitulo=1#pasaje-1-40', 'canonical', 'assets/linea-tiempo/sanidad-leproso.png'],
    ['c. 30–33 d. C.', 'El Paralítico de Cafarnaúm', 'Jesús perdona los pecados de un hombre paralítico y lo sana, provocando críticas de los escribas.', 'Marcos 2:1–12', 'lectura/?obra=rvr1909-marcos&capitulo=2', 'canonical', 'assets/linea-tiempo/paralitico-cafarnaum.png'],
    ['c. 30–33 d. C.', 'La Resurrección de la Hija de Jairo', 'Jesús toma de la mano a una niña de doce años y le dice: “Talita kumi”, es decir, “niña, a ti te digo, levántate”.', 'Marcos 5:21–43', 'lectura/?obra=rvr1909-marcos&capitulo=5#pasaje-5-41', 'canonical', 'assets/linea-tiempo/hija-jairo.png'],
    ['33 d. C.', 'El Lavatorio de los Pies', 'Durante la última cena, Jesús asume el rol de siervo y lava los pies de sus discípulos para enseñar humildad.', 'Juan 13:1–17', 'lectura/?obra=rvr1909-juan&capitulo=13', 'canonical', 'assets/linea-tiempo/lavatorio-pies.png'],
    ['c. 30–33 d. C.', 'El Primer Milagro en Caná', 'En una boda de Caná, Jesús transforma el agua en vino. Juan presenta este signo como el comienzo de sus señales.', 'Juan 2:1–11', 'lectura/?obra=rvr1909-juan&capitulo=2', 'canonical', 'assets/linea-tiempo/boda-cana.png'],
    ['c. 30–33 d. C.', 'Caminando sobre las Aguas', 'Jesús camina sobre el mar de Galilea ante el asombro de sus discípulos.', 'Mateo 14:22–33', 'lectura/?obra=rvr1909-mateo&capitulo=14#pasaje-14-25', 'canonical', 'assets/linea-tiempo/camina-aguas.png'],
    ['33 d. C.', 'La Traición y el Arresto', 'Judas Iscariote entrega a Jesús con un beso y la guardia del templo lo captura en Getsemaní.', 'Marcos 14:43–52', 'lectura/?obra=rvr1909-marcos&capitulo=14#pasaje-14-43', 'canonical', 'assets/linea-tiempo/traicion-arresto.png'],
    ['33 d. C.', 'Las Negaciones de Pedro', 'Mientras Jesús es juzgado, Pedro niega conocerlo tres veces antes de que cante el gallo, tal como Jesús había anunciado.', 'Lucas 22:54–62', 'lectura/?obra=rvr1909-lucas&capitulo=22#pasaje-22-54', 'canonical', 'assets/linea-tiempo/negaciones-pedro.png'],
    ['33 d. C.', 'El Camino al Gólgota', 'Jesús carga con su cruz hacia el Gólgota; Simón de Cirene lo ayuda durante parte del trayecto.', 'Lucas 23:26–32', 'lectura/?obra=rvr1909-lucas&capitulo=23#pasaje-23-26', 'canonical', 'assets/linea-tiempo/camino-golgota.png'],
    ['33 d. C.', 'El Juicio de Jesús', 'Jesús es interrogado ante el consejo y posteriormente llevado ante el gobernador romano Poncio Pilato.', 'Marcos 14:53–65; 15:1–15', 'lectura/?obra=rvr1909-marcos&capitulo=15', 'canonical', 'assets/linea-tiempo/juicio-jesus.png'],
    ['33 d. C.', 'Jesús es azotado', 'Antes de la crucifixión, Pilato entrega a Jesús para que sea azotado; la escena se presenta aquí sin detalles gráficos.', 'Juan 19:1–3', 'lectura/?obra=rvr1909-juan&capitulo=19#pasaje-19-1', 'canonical', 'assets/linea-tiempo/azotes-jesus.png'],
    ['33 d. C. · después de la resurrección', 'Las Apariciones post-Resurrección', 'Jesús se manifiesta a los discípulos de Emaús, a los apóstoles y, según Pablo, a más de quinientas personas.', 'Lucas 24:13–49; 1 Corintios 15:3–8', 'lectura/?obra=rvr1909-lucas&capitulo=24', 'canonical', 'assets/linea-tiempo/apariciones.png'],
    ['33 d. C. · cuarenta días después', 'La Ascensión', 'Jesús asciende al cielo desde el Monte de los Olivos y deja a sus discípulos la promesa de su regreso.', 'Hechos 1:1–12', 'lectura/?obra=rvr1909-hechos&capitulo=1#pasaje-1-9', 'canonical', 'assets/linea-tiempo/ascension.png'],
    ['c. 30–33 d. C.', 'Jesús y la mujer acusada', 'Jesús detiene la condena pública y responde: “El que esté libre de pecado, que arroje la primera piedra”. El relato llama a la misericordia y al arrepentimiento.', 'Juan 8:1–11', 'lectura/?obra=rvr1909-juan&capitulo=8#pasaje-8-7', 'canonical', 'assets/linea-tiempo/mujer-adultera.png'],
    ['visión apocalíptica', 'La Corte Celestial', 'Alrededor del trono aparecen veinticuatro ancianos, cuatro seres vivientes cubiertos de ojos y siete lámparas de fuego que representan los siete espíritus de Dios.', 'Apocalipsis 4:4–8', 'lectura/?obra=rvr1909-apocalipsis&capitulo=4', 'canonical', 'assets/linea-tiempo/corte-celestial.png'],
    ['visión apocalíptica', 'Ángeles y huestes celestiales', 'Juan oye la voz de millones de ángeles alrededor del trono; en otra visión, Miguel y sus ángeles combaten contra el dragón.', 'Apocalipsis 5:11–12; 12:7–9', 'lectura/?obra=rvr1909-apocalipsis&capitulo=12#pasaje-12-7', 'canonical', 'assets/linea-tiempo/angeles-miguel.png'],
    ['visión apocalíptica', 'La Mujer vestida del sol y el Gran Dragón', 'Una mujer aparece vestida del sol, con la luna bajo sus pies y doce estrellas; frente a ella surge un dragón escarlata de siete cabezas y diez cuernos.', 'Apocalipsis 12:1–6', 'lectura/?obra=rvr1909-apocalipsis&capitulo=12#pasaje-12-1', 'canonical', 'assets/linea-tiempo/mujer-sol-dragon.png'],
    ['siglo 8 a. C. · visión profética', 'Isaías ve al Señor en el Templo', 'Isaías contempla al Señor sentado sobre un trono alto y sublime; serafines proclaman su santidad y la gloria divina llena el Templo.', 'Isaías 6:1–8', 'lectura/?obra=rvr1909-isaias&capitulo=6', 'canonical', 'assets/timeline/isaias-vision.png'],
    ['siglo 6 a. C. · contexto del relato', 'Nacimiento de Daniel', 'Daniel 1 lo presenta como un joven llevado a Babilonia a comienzos del siglo VI a. C. La escena de su nacimiento es una representación artística.', 'Daniel 1:1–6', 'lectura/?obra=rvr1909-daniel&capitulo=1#pasaje-1-1', 'exile'],
    ['c. 593 a. C. · visión profética', 'Los Querubines de Ezequiel', 'Ezequiel ve cuatro seres vivientes con caras de hombre, león, toro y águila, cuatro alas, pies como de becerro y manos humanas bajo las alas.', 'Ezequiel 1:4–14; 10:1–20', 'lectura/?obra=rvr1909-ezequiel&capitulo=1', 'canonical', 'assets/linea-tiempo/ezequiel-querubines.png'],
    ['c. 593 a. C. · visión profética', 'Las ruedas centelleantes de Ezequiel', 'Junto a cada ser hay una rueda dentro de otra, brillante como crisólito y llena de ojos, que se mueve con ellos en cualquier dirección.', 'Ezequiel 1:15–21; 10:9–13', 'lectura/?obra=rvr1909-ezequiel&capitulo=1#pasaje-1-15', 'canonical', 'assets/linea-tiempo/ezequiel-ofanim.png'],
    ['c. 593 a. C. · visión profética', 'Ezequiel ve la gloria de Dios', 'Sobre la expansión aparece la semejanza de un trono y, sobre él, una figura con apariencia humana rodeada de resplandor; Ezequiel cae rostro en tierra ante la visión.', 'Ezequiel 1:26–28', 'lectura/?obra=rvr1909-ezequiel&capitulo=1#pasaje-1-26', 'canonical', 'assets/linea-tiempo/ezequiel-trono.png'],
    ['siglo 6 a. C. · visión profética', 'Daniel ve al Anciano de Días', 'Daniel contempla al Anciano de Días sentado en un trono de fuego y ve venir con las nubes a una figura como hijo de hombre para recibir dominio eterno.', 'Daniel 7:9–14', 'lectura/?obra=rvr1909-daniel&capitulo=7#pasaje-7-9', 'canonical', 'assets/linea-tiempo/daniel-anciano-dias.png'],
    ['visión apocalíptica', 'Juan ve el trono y al Cordero', 'Juan contempla una puerta abierta en el cielo, un trono rodeado de un arco iris y al Cordero en pie ante Dios. No se sabe cuándo ni cómo murió: una tradición antigua sitúa sus últimos años en Éfeso, pero no prueba el modo de su muerte. Jesús le dijo a Pedro: «Si quiero que él quede hasta que yo venga, ¿qué a ti?»; la frase alimentó la tradición sobre la permanencia de Juan, pero no afirma que fuera inmortal.', 'Apocalipsis 4:1–6; 5:6–10 · Juan 21:20–23 · Eusebio III, 1', 'lectura/?obra=rvr1909-apocalipsis&capitulo=4#pasaje-4-2', 'canonical', 'assets/linea-tiempo/trono-cordero.png'],
    ['antes del diluvio · visión de 1 Enoc', 'Dios ordena capturar a Shemihaza', 'En 1 Enoc, Dios ordena al arcángel Miguel que ate a Shemihaza y a los Vigilantes que tomaron mujeres humanas. Deben permanecer encadenados hasta el día del juicio.', '1 Enoc 10:11–14', 'lectura/?obra=1-enoc-es&capitulo=10', 'apocryphal', 'assets/enoc/vigilantes.jpg'],
    ['antes del diluvio · Génesis', 'La violencia se extiende por la tierra', 'Génesis describe una humanidad entregada a la maldad y la violencia antes del diluvio. El versículo 5 dice: «Y vio Jehová que la maldad de los hombres era mucha en la tierra, y que todo designio de los pensamientos del corazón de ellos era de continuo solamente el mal».', 'Génesis 6:5–13', 'lectura/?obra=rvr1909-genesis&capitulo=6#pasaje-6-5', 'canonical', 'assets/timeline/generacion-violencia.png']
  ];
  // Doce originales y Matías, elegido en lugar de Judas: trece personas en total.
  // Solo algunas muertes constan en el Nuevo Testamento; las demás se señalan
  // como tradición posterior o como desconocidas, sin inventar fechas.
  const apostleFates = [
    ['33 d. C.', 'Muerte de Judas Iscariote', 'Mateo cuenta que, tras devolver las monedas, Judas se quitó la vida ahorcándose. Hechos 1:18 conserva un relato diferente sobre su final.', 'Mateo 27:3–5', 'lectura/?obra=rvr1909-mateo&capitulo=27#pasaje-27-3', 'canonical', 'assets/timeline/apostol-judas-iscariote.jpg'],
    ['c. 44 d. C.', 'Muerte de Santiago, hijo de Zebedeo', 'Herodes Agripa manda matarlo a espada. Es la muerte de uno de los Doce narrada expresamente en Hechos.', 'Hechos 12:1–2', 'lectura/?obra=rvr1909-hechos&capitulo=12#pasaje-12-1', 'canonical', 'assets/timeline/apostol-santiago-zebedeo.jpg'],
    ['c. 64–68 d. C. · tradición', 'Muerte de Pedro', 'La tradición antigua sitúa su martirio en Roma bajo Nerón y describe una crucifixión. Eusebio transmite el detalle de la cruz invertida; Hechos no narra su muerte.', 'Eusebio · Historia eclesiástica III, 1', 'https://www.newadvent.org/fathers/250103.htm', 'tradition', 'assets/timeline/apostol-pedro.jpg'],
    ['siglo I · fecha incierta', 'Muerte de Andrés', 'Los Hechos de Andrés, relato apócrifo posterior, describen su crucifixión en Patras. No es una muerte narrada por el Nuevo Testamento.', 'Hechos de Andrés · tradición posterior', 'https://www.newadvent.org/fathers/0819.htm', 'tradition', 'assets/timeline/apostol-andres.jpg'],
    ['c. 80 d. C. · tradición cristiana', 'Muerte de Felipe', 'Según la tradición cristiana y relatos apócrifos, Felipe murió como mártir en Hierápolis (la actual Turquía), alrededor del año 80 d. C., a los 87 años. Las fuentes antiguas no permiten verificar con seguridad todos los detalles de su martirio.', 'Eusebio · Historia eclesiástica V, 24 · tradición posterior', 'https://www.newadvent.org/fathers/250105.htm', 'tradition', 'assets/timeline/apostol-felipe.jpg'],
    ['siglo I · tradición posterior', 'Muerte de Bartolomé', 'Según una tradición posterior, Bartolomé fue desollado vivo y luego decapitado en Albanópolis. El Nuevo Testamento no narra su muerte y las fuentes antiguas difieren sobre el lugar y el modo del martirio.', 'Mateo 10:2–4 · tradición posterior', 'lectura/?obra=rvr1909-mateo&capitulo=10#pasaje-10-2', 'tradition', 'assets/timeline/apostol-bartolome.jpg'],
    ['siglo I · fecha incierta', 'Muerte de Tomás', 'Un relato apócrifo posterior lo sitúa en la India y dice que murió atravesado por lanzas. El Nuevo Testamento no cuenta su muerte.', 'Consumación de Tomás · tradición posterior', 'https://www.newadvent.org/fathers/0824.htm', 'tradition', 'assets/timeline/apostol-tomas.jpg'],
    ['siglo I · tradición cristiana', 'Muerte de Mateo', 'Según una tradición cristiana, Mateo murió como mártir en Etiopía. El rey Hirtaco (también llamado Itarco) habría ordenado matarlo porque Mateo se opuso a su matrimonio con Ifigenia, consagrada a la vida religiosa tras escuchar su predicación. El relato dice que un sicario lo atacó con una espada mientras oraba al pie del altar, después de celebrar la misa. El Nuevo Testamento no narra su muerte.', 'Mateo 10:2–4 · tradición posterior', 'lectura/?obra=rvr1909-mateo&capitulo=10#pasaje-10-2', 'tradition', 'assets/timeline/apostol-mateo.jpg'],
    ['c. 65 d. C. · tradición cristiana', 'Muerte de Simón el Zelote', 'Una tradición cristiana sitúa su martirio en Persia, alrededor del año 65 d. C., junto con Judas Tadeo. El Nuevo Testamento lo incluye entre los apóstoles, pero no relata cómo ni dónde murió.', 'Hechos 1:13 · lista apostólica · martirio según tradición posterior', 'lectura/?obra=rvr1909-hechos&capitulo=1#pasaje-1-13', 'tradition', 'assets/timeline/apostol-simon-celote.jpg'],
    ['c. 65 d. C. · tradición cristiana', 'Muerte de Judas Tadeo', 'Este apóstol es distinto de Judas Iscariote. Según una tradición cristiana, murió como mártir en Persia, en la ciudad llamada Suamir o Samir, alrededor del año 65 d. C., junto con Simón el Zelote. El Nuevo Testamento no relata su muerte; los detalles proceden de tradiciones posteriores.', 'Lucas 6:16 · Judas de Jacobo · martirio según tradición posterior', 'lectura/?obra=rvr1909-lucas&capitulo=6#pasaje-6-16', 'tradition', 'assets/timeline/apostol-judas-tadeo.jpg'],
    ['c. 80 d. C. · tradición cristiana', 'Muerte de Matías', 'La tradición cristiana sostiene que Matías murió como mártir en Jerusalén alrededor del año 80 d. C. La versión más extendida cuenta que fue apedreado y luego decapitado con un hacha. Hechos narra su elección para ocupar el puesto de Judas Iscariote, pero no relata su muerte; estos detalles proceden de tradiciones posteriores.', 'Hechos 1:23–26 · elección de Matías · muerte según tradición posterior', 'lectura/?obra=rvr1909-hechos&capitulo=1#pasaje-1-23', 'tradition', 'assets/timeline/apostol-matias.png'],
  ];
  const existing = new Map(Array.from(timelineTrack.children).map(card => [card.querySelector('h3')?.textContent.trim(), card]));
  const byTitle = new Map(existing);
  const imageCardAliases = { 'La última cena y el arresto': 'La cena y el arresto', 'Crucifixión y muerte de Jesús': 'Pasión, muerte y sepultura', 'Resurrección de Jesús': 'Jesús resucitado' };
  Object.entries(imageCardAliases).forEach(([newTitle, oldTitle]) => {
    const card = existing.get(oldTitle);
    if (card) { card.querySelector('h3').textContent = newTitle; byTitle.set(newTitle, card); }
  });
  const extra = [
    ['1 a. C.', 'Simeón carga al niño Jesús', 'Después del nacimiento, María y José llevan a Jesús al Templo. Simeón lo toma en brazos y lo reconoce como luz para las naciones.', 'Lucas 2:25–35', 'lectura/?obra=rvr1909-lucas&capitulo=2', 'jesus'],
    ['infancia de Jesús · relato coránico', 'Jesús habla desde la cuna', 'El Corán narra que Jesús, aún en la cuna, se declara siervo de Dios y profeta, y bendice el día de su nacimiento, su muerte y su resurrección. Este episodio pertenece a la tradición coránica y no aparece en los evangelios canónicos.', 'Corán 19:30–33', 'https://quran.com/19/30-33', 'quran'],
    ['c. 7 d. C. · tradición apócrifa', 'Jesús adolescente en el Templo', 'El relato canónico sitúa a Jesús a los doce años en Jerusalén.', 'Lucas 2:41–52', 'lectura/?obra=rvr1909-lucas&capitulo=2', 'jesus'],
    ['entre la muerte y la resurrección · relato apócrifo posterior', 'Evangelio de Nicodemo', 'Un relato apócrifo posterior desarrolla el descenso de Cristo al Hades entre la muerte y la resurrección.', 'Evangelio de Nicodemo', 'lectura/?obra=nicodemus-es&capitulo=17', 'jesus'],
    ['después de la resurrección · tradición posterior', 'Carino y Leucio, testigos del descenso', 'En el Evangelio de Nicodemo, dos hombres que vuelven a la vida después de la resurrección cuentan lo que vieron durante el descenso de Cristo al Hades. El texto los llama hijos de Simeón, pero no permite asegurar que sea el mismo Simeón que aparece en Lucas 2.', 'Evangelio de Nicodemo 17–27', 'lectura/?obra=nicodemus-es&capitulo=17', 'jesus'],
    ['Pascua · relato apócrifo', 'Ángeles abren el sepulcro', 'El Evangelio de Pedro cuenta que dos seres luminosos descienden y que la piedra «rodó por sí misma y volvió al costado». Es una escena propia de este relato apócrifo.', 'Evangelio de Pedro · fragmento I, sección 9 (35–38)', 'lectura/?obra=gospel-peter-es&capitulo=9', 'jesus'],
    ['Pascua · relato apócrifo', 'Los guardias quedan aterrados', 'En el Evangelio de Pedro, los soldados corren a informar a Pilato «y estaban en gran agonía, diciendo: De verdad era el Hijo de Dios». El Evangelio de Nicodemo también cuenta que vieron un terremoto y a un ángel mover la piedra.', 'Evangelio de Pedro · fragmento I, sección 11 (43–49)', 'lectura/?obra=gospel-peter-es&capitulo=11', 'jesus'],
    ['Pascua · dos tradiciones apócrifas', 'Jesús sale del sepulcro sostenido por dos seres celestiales', 'El Evangelio de Pedro describe a tres figuras saliendo: «dos de ellos sosteniendo al otro», y añade que Jesús «superó los cielos». No identifica a los dos acompañantes como muertos resucitados; en otra escena, el Evangelio de Nicodemo dice que Cristo salió del Hades llevando a Adán y seguido por los santos.', 'Evangelio de Pedro · fragmento I, sección 9 (39–42)', 'lectura/?obra=gospel-peter-es&capitulo=9', 'jesus'],
    ['Pascua · relato apócrifo', 'Los hijos de Simeón ven la luz en el Hades', 'En su testimonio, Carino y Leucio recuerdan: «apareció el color del sol como oro, y una luz de color púrpura iluminó el lugar». El relato los presenta como hijos de Simeón y sitúa la visión entre los muertos.', 'Evangelio de Nicodemo · relato de Carino y Leucio, sección 13', 'lectura/?obra=nicodemus-es&capitulo=13', 'jesus'],
    ['Después de la resurrección · diálogo apócrifo', 'Los discípulos tocan a Jesús para comprobar que no es un fantasma', 'La Epístola de los Apóstoles cuenta que los discípulos pensaron que era un fantasma y que Jesús pidió a Andrés mirar si sus pies «presionan la tierra», pues «un fantasma de un diablo no hace huella en la tierra»; luego «le tocamos» para comprobar que había resucitado en la carne.', 'Epístola de los Apóstoles · secciones 11–12', 'lectura/?obra=epistle-apostles-es&capitulo=11', 'jesus'],
    ['33 d. C. · tradición posterior', 'El Resucitado en María Magdalena y Nag Hammadi', 'Textos posteriores describen diálogos del Resucitado con sus discípulos.', 'Evangelio de María · BG 8502, pp. 7–18', 'pdfs/evangelio-maria-magdalena.pdf', 'church']
  ];
  extra.forEach(item => {
    if (byTitle.has(item[1])) return;
    const card = makeTimelineCard([...item.slice(0, 5), 'context']);
    const apocryphalTitle = ['Ángeles abren el sepulcro', 'Los guardias quedan aterrados', 'Jesús sale del sepulcro sostenido por dos seres celestiales', 'Los hijos de Simeón ven la luz en el Hades', 'Los discípulos tocan a Jesús para comprobar que no es un fantasma'].includes(item[1]);
    if (apocryphalTitle) {
      const badge = card.querySelector('.source-badge');
      badge.className = 'source-badge apocryphal';
      badge.textContent = 'Relato apócrifo';
    }
    if (item[1] === 'Jesús habla desde la cuna') {
      const badge = card.querySelector('.source-badge');
      badge.className = 'source-badge tradition';
      badge.textContent = 'Relato coránico';
    }
    if (item[1] === 'Jesús sale del sepulcro sostenido por dos seres celestiales') {
      const link = document.createElement('a');
      link.href = 'lectura/?obra=nicodemus-es&capitulo=19';
      link.textContent = 'Evangelio de Nicodemo 19 · Cristo conduce a Adán y a los santos';
      card.append(link);
    }
    if (item[1] === 'Los guardias quedan aterrados') {
      const link = document.createElement('a');
      link.href = 'lectura/?obra=nicodemus-es&capitulo=10';
      link.textContent = 'Evangelio de Nicodemo 10 · testimonio de los guardias';
      card.append(link);
    }
    byTitle.set(item[1], card);
  });
  milestones.forEach(item => {
    if (byTitle.has(item[1])) return;
    const artisticBirth = ['Nacimiento de Elías', 'Nacimiento de Isaías', 'Nacimiento de Daniel'].includes(item[1]);
    const card = makeTimelineCard([...item.slice(0, 5), artisticBirth ? 'context' : 'canonical']);
    if (artisticBirth) card.querySelector('.source-badge').textContent = 'Representación artística';
    if (item[1] === 'Israel aparece en la estela de Merneptah') {
      const badge = card.querySelector('.source-badge');
      badge.className = 'source-badge context';
      badge.textContent = 'Contexto histórico';
    }
    if (item[1] === 'La tierra caótica y el Espíritu sobre las aguas') {
      const note = document.createElement('p');
      note.className = 'timeline-description';
      const emphasis = document.createElement('strong');
      emphasis.textContent = 'Dios creó el mundo en 7 días, pero 2 Pedro 3:8 dice: «para el Señor, un día es como mil años».';
      const reference = document.createElement('a');
      reference.href = 'lectura/?obra=rvr1909-2-pedro&capitulo=3#pasaje-3-8';
      reference.textContent = '2 Pedro 3:8';
      note.append(emphasis, document.createElement('br'), reference);
      card.append(note);
    }
    if (item[1] === 'Caín teme ser hallado') {
      const secondReference = document.createElement('a');
      secondReference.href = 'lectura/?obra=rvr1909-genesis&capitulo=5#pasaje-5-4';
      secondReference.textContent = 'Génesis 5:4';
      card.append(secondReference);
    }
    if (item[1] === 'David derrota a Goliat') {
      const genesisReference = document.createElement('a');
      genesisReference.href = 'lectura/?obra=rvr1909-genesis&capitulo=6#pasaje-6-4';
      genesisReference.textContent = 'Génesis 6:4';
      card.append(genesisReference);
      const samuelReference = document.createElement('a');
      samuelReference.href = 'lectura/?obra=rvr1909-2-samuel&capitulo=21#pasaje-21-15';
      samuelReference.textContent = '2 Samuel 21:15–22';
      card.append(samuelReference);
    }
    byTitle.set(item[1], card);
  });
  requestedTimelineEvents.forEach(item => {
    if (byTitle.has(item[1])) return;
    const card = makeTimelineCard(item);
    const addReference = (href, label) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      card.append(link);
    };
    if (item[1] === 'Las naciones y los hijos de Dios') addReference('lectura/?obra=rvr1909-genesis&capitulo=10', 'Génesis 10 · tabla de las naciones');
    if (item[1] === 'La cruz, los poderes y Pentecostés') addReference('lectura/?obra=rvr1909-hechos&capitulo=2#pasaje-2-1', 'Hechos 2:1–11 · Pentecostés');
    if (item[1] === 'Nacimiento de Ezequiel') {
      const badge = card.querySelector('.source-badge');
      badge.className = 'source-badge context';
      badge.textContent = 'Representación artística';
    }
    if (item[1] === 'Nacimiento de Noé') {
      const badge = card.querySelector('.source-badge');
      badge.className = 'source-badge context';
      badge.textContent = 'Génesis y tradición de 1 Enoc';
      const enochLink = document.createElement('a');
      enochLink.href = 'lectura/?obra=1-enoc-es&capitulo=106';
      enochLink.textContent = '1 Enoc 106 · nacimiento extraordinario';
      card.append(enochLink);
    }
    byTitle.set(item[1], card);
  });
  apostleFates.forEach(item => byTitle.set(item[1], makeTimelineCard(item)));
  // La secuencia base ya está ordenada cronológicamente. Las tarjetas extra se
  // incorporan aquí y luego se ubican junto a su acontecimiento correspondiente;
  // cortar el arreglo por índices hacía que eventos del siglo I aparecieran
  // antes de hitos del siglo VI a. C.
  const order = [...milestones, ...extra];
  const insertRequestedBefore = (anchor, titles) => {
    const index = order.findIndex(item => item[1] === anchor);
    const position = index < 0 ? order.length : index;
    order.splice(position, 0, ...titles.map(title => requestedTimelineEvents.find(item => item[1] === title)).filter(Boolean));
  };
  insertRequestedBefore('Enoc y los vigilantes', ['Enoc niño']);
  insertRequestedBefore('El diseño exacto del Arca', ['Nacimiento de Noé']);
  insertRequestedBefore('Huida y regreso a Nazaret', ['La Adoración de los Magos']);
  const moveOrderBefore = (title, anchor) => {
    const itemIndex = order.findIndex(item => item[1] === title);
    const anchorIndex = order.findIndex(item => item[1] === anchor);
    if (itemIndex < 0 || anchorIndex < 0 || itemIndex === anchorIndex) return;
    const [item] = order.splice(itemIndex, 1);
    const nextIndex = order.findIndex(entry => entry[1] === anchor);
    order.splice(nextIndex, 0, item);
  };
  const moveOrderAfter = (title, anchor) => {
    const itemIndex = order.findIndex(item => item[1] === title);
    const anchorIndex = order.findIndex(item => item[1] === anchor);
    if (itemIndex < 0 || anchorIndex < 0 || itemIndex === anchorIndex) return;
    const [item] = order.splice(itemIndex, 1);
    const nextIndex = order.findIndex(entry => entry[1] === anchor);
    order.splice(nextIndex + 1, 0, item);
  };
  moveOrderAfter('Israel aparece en la estela de Merneptah', 'José es vendido y asciende en Egipto');
  moveOrderAfter('Israel aparece en la estela de Merneptah', 'Moisés golpea la roca en Meribá');
  moveOrderAfter('Lamec consulta a Enoc por el nacimiento de Noé', 'Enoc y los vigilantes');
  moveOrderBefore('Juicio contra los dioses de Egipto', 'La institución de la Pascua');
  moveOrderBefore('La Adoración de los Magos', 'Simeón carga al niño Jesús');
  moveOrderBefore('Simeón carga al niño Jesús', 'Relatos del niño Jesús');
  moveOrderAfter('Jesús habla desde la cuna', 'Simeón carga al niño Jesús');
  moveOrderBefore('Relatos del niño Jesús', 'Jesús habla desde la cuna');
  moveOrderBefore('Evangelio de Nicodemo', 'Jesús resucitado');
  moveOrderAfter('Carino y Leucio, testigos del descenso', 'Evangelio de Nicodemo');
  moveOrderBefore('El Resucitado en María Magdalena y Nag Hammadi', 'Pentecostés');
  // Se omiten estas dos fichas de la línea temporal: el recorrido conserva
  // los hitos principales y evita duplicar tarjetas sin imagen.
  insertRequestedBefore('Multiplicación de los panes', ['El Primer Milagro en Caná', 'La Pesca Milagrosa', 'La Sanidad del Leproso', 'El Paralítico de Cafarnaúm', 'La Resurrección de la Hija de Jairo', 'El Discurso del Pan de Vida', 'Caminando sobre las Aguas']);
  insertRequestedBefore('La última cena y el arresto', ['Jesús y la mujer acusada', 'El Lavatorio de los Pies', 'La Traición y el Arresto', 'Las Negaciones de Pedro', 'El Juicio de Jesús', 'Jesús es azotado', 'El Camino al Gólgota']);
  // Mantener la secuencia de la pasión legible: primero el lavatorio, luego
  // la última cena y, después, la traición y el arresto en Getsemaní.
  moveOrderAfter('La última cena y el arresto', 'El Lavatorio de los Pies');
  moveOrderAfter('La Traición y el Arresto', 'La última cena y el arresto');
  insertRequestedBefore('La Traición y el Arresto', ['Jesús revela a Judas su papel']);
  insertRequestedBefore('Crucifixión y muerte de Jesús', ['María Magdalena, María y Juan junto a la cruz']);
  insertRequestedBefore('Pentecostés', ['El beso de María Magdalena a Jesús según el Evangelio de Felipe']);
  insertRequestedBefore('Pentecostés', ['Las Apariciones post-Resurrección']);
  moveOrderBefore('Las Apariciones post-Resurrección', 'El Resucitado en María Magdalena y Nag Hammadi');
  insertRequestedBefore('Isaías y Emanuel', ['Isaías ve al Señor en el Templo', 'Los Querubines de Ezequiel', 'Las ruedas centelleantes de Ezequiel', 'Ezequiel ve la gloria de Dios', 'Daniel ve al Anciano de Días']);
  insertRequestedBefore('La torre de Babel', ['Las naciones y los hijos de Dios']);
  insertRequestedBefore('Isaías y Emanuel', ['El juicio del consejo divino']);
  insertRequestedBefore('El jinete del caballo blanco', ['La cruz, los poderes y Pentecostés']);
  // Situar las escenas de Isaías antes de la caída de Samaria (722 a. C.)
  // y las visiones de Ezequiel después, ya en el siglo VI a. C.
  moveOrderBefore('Nacimiento de Isaías', 'Isaías ve al Señor en el Templo');
  moveOrderBefore('Isaías y Emanuel', 'Los Querubines de Ezequiel');
  moveOrderBefore('Caída del reino del norte ante Asiria', 'Los Querubines de Ezequiel');
  insertRequestedBefore('Los Querubines de Ezequiel', ['Nacimiento de Ezequiel']);
  insertRequestedBefore('Daniel ve al Anciano de Días', ['Nacimiento de Daniel']);
  insertRequestedBefore('Ciro conquista Babilonia', ['Daniel mata al dragón en Babilonia']);
  insertRequestedBefore('El jinete del caballo blanco', ['Juan ve el trono y al Cordero']);
  insertRequestedBefore('El jinete del caballo blanco', ['La Corte Celestial', 'Ángeles y huestes celestiales', 'La Mujer vestida del sol y el Gran Dragón']);
  const insertApostleFatesBefore = (anchor, titles) => {
    const index = order.findIndex(item => item[1] === anchor);
    order.splice(index < 0 ? order.length : index, 0, ...titles.map(title => apostleFates.find(item => item[1] === title)).filter(Boolean));
  };
  insertApostleFatesBefore('Resurrección de Jesús', ['Muerte de Judas Iscariote']);
  insertRequestedBefore('Resurrección de Jesús', ['Elección de Matías']);
  insertRequestedBefore('Resurrección de Jesús', ['María Magdalena consuela a los discípulos']);
  insertRequestedBefore('Juan en Patmos y el Apocalipsis', ['José Barsabás sobrevive al veneno']);
  insertApostleFatesBefore('Juan en Patmos y el Apocalipsis', apostleFates.slice(1, -1).map(item => item[1]));
  moveOrderAfter('José Barsabás sobrevive al veneno', 'Muerte de Bartolomé');
  moveOrderAfter('Ascensión de Jesús', 'Pentecostés');
  moveOrderAfter('La cruz, los poderes y Pentecostés', 'Pentecostés');
  // Normalización final: estas tarjetas pertenecen a tramos históricos distintos.
  moveOrderBefore('La Adoración de los Magos', 'Huida y regreso a Nazaret');
  insertRequestedBefore('El Hijo del Hombre y el Anciano de Días', ['Dios ordena capturar a Shemihaza', 'La violencia se extiende por la tierra']);
  moveOrderAfter('Dios ordena capturar a Shemihaza', 'El Hijo del Hombre y el Anciano de Días');
  moveOrderAfter('La violencia se extiende por la tierra', 'Dios ordena capturar a Shemihaza');
  moveOrderBefore('Evangelio de Nicodemo', 'Jesús resucitado');
  moveOrderAfter('Carino y Leucio, testigos del descenso', 'Evangelio de Nicodemo');
  moveOrderAfter('Ángeles abren el sepulcro', 'Carino y Leucio, testigos del descenso');
  moveOrderAfter('Los guardias quedan aterrados', 'Ángeles abren el sepulcro');
  moveOrderAfter('Jesús sale del sepulcro sostenido por dos seres celestiales', 'Los guardias quedan aterrados');
  moveOrderAfter('Los hijos de Simeón ven la luz en el Hades', 'Jesús sale del sepulcro sostenido por dos seres celestiales');
  moveOrderAfter('Los discípulos tocan a Jesús para comprobar que no es un fantasma', 'Los hijos de Simeón ven la luz en el Hades');
  moveOrderBefore('El beso de María Magdalena a Jesús según el Evangelio de Felipe', 'Crucifixión y muerte de Jesús');
  moveOrderBefore('Simeón carga al niño Jesús', 'Relatos del niño Jesús');
  moveOrderAfter('Evangelio de Nicodemo', 'Muerte de Judas Iscariote');
  moveOrderAfter('Carino y Leucio, testigos del descenso', 'Evangelio de Nicodemo');
  // Fijar explícitamente el bloque del nacimiento al final de la normalización:
  // estas escenas no deben quedar detrás de las apariciones pospascuales.
  moveOrderBefore('La anunciación a María', 'Jesús bebé');
  moveOrderBefore('Jesús bebé', 'La Adoración de los Magos');
  moveOrderBefore('La Adoración de los Magos', 'Simeón carga al niño Jesús');
  moveOrderBefore('Simeón carga al niño Jesús', 'Huida y regreso a Nazaret');
  moveOrderAfter('Jacobo es curado de una mordedura de víbora', 'Relatos del niño Jesús');
  moveOrderAfter('María Magdalena consuela a los discípulos', 'Elección de Matías');
  moveOrderAfter('La Adoración de los Magos', 'Jesús bebé');
  moveOrderAfter('Jesús habla desde la cuna', 'Simeón carga al niño Jesús');
  moveOrderBefore('Relatos del niño Jesús', 'Jesús habla desde la cuna');
  moveOrderAfter('El juicio del consejo divino', 'Juicio contra los dioses de Egipto');
  // Las dos escenas de Lot preceden inmediatamente a la destrucción de Sodoma.
  moveOrderAfter('Los ángeles ciegan a los hombres de Sodoma', 'Lot recibe a los dos ángeles');
  insertRequestedBefore('Relatos del niño Jesús', ['Los leones guían a la Sagrada Familia', 'La palmera ofrece sus frutos a la Sagrada Familia']);
  insertRequestedBefore('Jesús adolescente en el Templo', ['Las figuras de barro cobran vida', 'Jesús devuelve sus colores a las túnicas', 'Jesús cura al joven leñador', 'Jesús multiplica el trigo y lo comparte', 'Jesús alarga la madera para José']);
  moveOrderAfter('Sodoma y Gomorra', 'Los ángeles ciegan a los hombres de Sodoma');
  // Las cuatro escenas del sepulcro van después de la muerte de Judas;
  // la prueba física de los discípulos sigue a las apariciones del Resucitado.
  moveOrderAfter('Ángeles abren el sepulcro', 'Muerte de Judas Iscariote');
  moveOrderAfter('Los guardias quedan aterrados', 'Ángeles abren el sepulcro');
  moveOrderAfter('Jesús sale del sepulcro sostenido por dos seres celestiales', 'Los guardias quedan aterrados');
  moveOrderAfter('Los hijos de Simeón ven la luz en el Hades', 'Jesús sale del sepulcro sostenido por dos seres celestiales');
  moveOrderAfter('Los discípulos tocan a Jesús para comprobar que no es un fantasma', 'Las Apariciones post-Resurrección');
  moveOrderBefore('Muerte de Simón el Zelote', 'Muerte de Pedro');
  moveOrderBefore('Muerte de Judas Tadeo', 'Muerte de Pedro');
  const timelineImages = {
    'Israel aparece en la estela de Merneptah': ['assets/timeline/estela-merneptah-museo.png', 'Estela de Merneptah de granito oscuro con jeroglíficos, expuesta en una sala de museo'],
    'La vid del Edén según 3 Baruc': ['assets/timeline/3-baruc-vid-edén.png', 'Samael planta una vid en el jardín del Edén, según la tradición apócrifa de 3 Baruc'],
    'Lamec consulta a Enoc por el nacimiento de Noé': ['assets/timeline/rollo-lamec-enoc.png', 'Lamec y Bathenosh contemplan al recién nacido Noé mientras Enoc aparece al fondo, según el Génesis Apócrifo'],
    'La tierra caótica y el Espíritu sobre las aguas': ['assets/timeline/caos-aguas-genesis-1.jpg', 'Oscuridad sobre las aguas primordiales y una presencia luminosa que se mueve sobre ellas, ilustración de Génesis 1:1–2'],
    'Satanás y un tercio de los ángeles caen a la tierra': ['assets/extintos/angeles-caidos-v2.jpg', 'Satanás y una multitud de ángeles caen hacia la tierra, representación artística inspirada en Apocalipsis 12'],
    'Los hijos de Dios celebran la fundación de la tierra': ['assets/timeline/hijos-dios-fundacion-tierra.jpg', 'Hijos de Dios celebran mientras contemplan la tierra durante su fundación, representación poética de Job 38'],
    'Creación del mundo y del ser humano': ['assets/timeline/creacion-tierra.jpg', 'La tierra recién formada emerge bajo una luz dorada, representación artística de Génesis 1'],
    'Pentecostés': ['assets/timeline/pentecostes-espiritu-santo.jpg', 'El Espíritu Santo desciende como lenguas de fuego sobre los discípulos reunidos en Jerusalén'],
    'Las naciones y los hijos de Dios': ['assets/timeline/deuteronomio-naciones-elohim.jpg', 'Pueblos de la antigüedad bajo un consejo celestial, imagen interpretativa inspirada en Deuteronomio 32'],
    'El juicio del consejo divino': ['assets/timeline/salmo-82-consejo-divino.jpg', 'Una figura divina juzga a la asamblea celestial, representación poética de Salmo 82'],
    'La cruz, los poderes y Pentecostés': ['assets/timeline/cruz-pentecostes-poderes.jpg', 'Una cruz al amanecer y discípulos reunidos en Jerusalén durante Pentecostés'],
    'Ascensión de Jesús': ['assets/timeline/ascension.png', 'Jesús asciende al cielo ante sus discípulos'],
    'Muerte de Matías': ['assets/timeline/apostol-matias.png', 'Representación artística del martirio de Matías según la tradición cristiana'],
    'Juan en Patmos y el Apocalipsis': ['assets/timeline/juan-patmos-feliz.png', 'Juan, anciano y sonriente, escribe en Patmos junto al mar'],
    'Nacimiento de Daniel': ['assets/timeline/nacimiento-daniel.jpg', 'Representación artística de un recién nacido con su familia en la antigua Judá'],
    'Nacimiento de Ezequiel': ['assets/timeline/nacimiento-ezequiel.png', 'Representación artística de un recién nacido con su familia en la antigua Judá'],
    'Nacimiento de Noé': ['assets/timeline/nacimiento-noe.png', 'Ilustración inspirada en 1 Enoc 106: el recién nacido Noé irradia luz y su resplandor ilumina la casa'],
    'Nacimiento de Elías': ['assets/timeline/nacimiento-elias.png', 'Representación artística de un recién nacido en una casa antigua de Galaad'],
    'Nacimiento de Isaías': ['assets/timeline/nacimiento-isaias.png', 'Representación artística de una persona que sostiene a un recién nacido en una casa antigua de Judá'],
    'El nacimiento y rescate de Moisés': ['assets/timeline/nacimiento-moises.png', 'La hija del faraón descubre al bebé Moisés en una cesta entre los juncos del Nilo'],
    'Adán y Eva en el Edén': ['assets/timeline/adan-eva.png', 'Adán y Eva en el jardín del Edén'],
    'La serpiente habla con Eva': ['assets/timeline/eva-serpiente.png', 'Eva escucha a la serpiente en el jardín del Edén, antes de tomar el fruto'],
    'La caída y la expulsión del Edén': ['assets/timeline/adan-eva-fruto.jpg', 'Eva prueba el fruto prohibido en el jardín del Edén'],
    'Caín teme ser hallado': ['assets/timeline/cain-teme-ser-hallado.png', 'Caín mira con temor hacia atrás mientras huye por un terreno desolado al atardecer'],
    'Adán, Eva y sus tres hijos': ['assets/timeline/adan-eva-tres-hijos.png', 'Adán y Eva junto a sus hijos Caín, Abel y Set'],
    'El pacto del monte Hermón': ['assets/timeline/enoc-pacto-hermon.png', 'Doscientos Vigilantes se reúnen y juran su pacto en el monte Hermón'],
    'Enoc y los vigilantes': ['assets/timeline/enoc-vision.png', 'Enoc contempla una visión celeste vinculada con los Vigilantes'],
    'El nacimiento de los Nefilim': ['assets/timeline/enoc-nefilim.png', 'Los Nefilim, gigantes de la tradición de 1 Enoc'],
    'Conocimientos prohibidos de los Vigilantes': ['assets/timeline/enoc-conocimientos.png', 'Los Vigilantes transmiten metalurgia, botánica y secretos astrales'],
    'El clamor de la Tierra y los arcángeles': ['assets/timeline/enoc-clamor-arcangeles.png', 'Miguel, Gabriel, Rafael y Uriel presentan el clamor de la Tierra'],
    'El Hijo del Hombre y el Anciano de Días': ['assets/timeline/enoc-hijo-hombre.png', 'El Hijo del Hombre ante el Anciano de Días'],
    'David reina y establece Jerusalén': ['assets/timeline/david-jerusalen-rey.png', 'David entra en Jerusalén acompañado por sus hombres y establece allí su capital'],
    'Jesús adolescente en el Templo': ['assets/linea-tiempo/jesus-doctores.png', 'Jesús, a los doce años, dialoga con los maestros en el Templo de Jerusalén'],
    'El llamado de Abraham': ['assets/timeline/llamado-abraham.png', 'Abraham emprende su viaje con su familia y animales de carga al amanecer'],
    'Isaac y Rebeca tienen a Jacob y Esaú': ['assets/timeline/isaac-rebeca-gemelos.jpg', 'Isaac y Rebeca con sus hijos gemelos recién nacidos, Jacob y Esaú'],
    'Jacob lucha y recibe el nombre Israel': ['assets/timeline/jacob-peniel-lucha.jpg', 'Jacob lucha con un ángel junto al río en Peniel, bajo la luna y antes del amanecer'],
    'José es vendido y asciende en Egipto': ['assets/timeline/jose-caravana.jpg', 'José parte con una caravana mientras sus hermanos observan desde la ladera'],
    'Lot recibe a los dos ángeles': ['assets/timeline/lot-recibe-angeles.png', 'Lot recibe en su casa a los dos ángeles que llegaron a Sodoma'],
    'Los ángeles ciegan a los hombres de Sodoma': ['assets/timeline/angeles-ciegan-sodoma.png', 'Los ángeles protegen a Lot y ciegan a los hombres que intentan entrar en su casa'],
    'La prueba de Abraham e Isaac': ['assets/timeline/abraham-prueba-isaac.jpg', 'En el monte Moriah, un ángel detiene a Abraham e Isaac está a salvo; un carnero aparece entre las ramas para el sacrificio'],
    'El diseño exacto del Arca': ['assets/linea-tiempo/noe-planos-arca.png', 'Noé recibe los planos y las medidas exactas del Arca'],
    'Décadas de trabajo y advertencia': ['assets/linea-tiempo/noe-construccion.png', 'Noé construye el Arca durante décadas'],
    'La recolección de las especies': ['assets/linea-tiempo/noe-animales.png', 'Parejas de animales se reúnen junto al Arca'],
    'El ingreso de la familia de Noé': ['assets/linea-tiempo/noe-familia-arca.png', 'La familia de Noé entra en el Arca'],
    'Cuarenta días y cuarenta noches de tormenta': ['assets/timeline/noe-diluvio.png', 'El Arca de Noé flota durante la tormenta del diluvio'],
    'Se abren las fuentes del gran abismo': ['assets/timeline/fuentes-abismo-compuertas-cielo.jpg', 'Las fuentes del abismo irrumpen desde la tierra mientras se abren las compuertas del cielo, ilustración de Génesis 7:11'],
    'Ciento cincuenta días de inundación': ['assets/linea-tiempo/noe-inundacion-total.png', 'El Arca permanece sola sobre las aguas del diluvio'],
    'El primer altar y el pacto del arcoíris': ['assets/linea-tiempo/noe-altar-arcoiris.png', 'Noé levanta un altar y recibe la señal del arcoíris'],
    'Los espíritus de los gigantes salen de las aguas': ['assets/linea-tiempo/espiritus-gigantes-1-enoc.png', 'Representación artística de espíritus malignos asociados a los gigantes de 1 Enoc, emergiendo de las aguas; no es una escena descrita literalmente por el texto'],
    'El beso de María Magdalena a Jesús según el Evangelio de Felipe': ['assets/linea-tiempo/maria-magdalena-besa-jesus.png', 'Recreación artística del pasaje fragmentario del Evangelio de Felipe que menciona un beso entre Jesús y María Magdalena'],
    'María Magdalena, María y Juan junto a la cruz': ['assets/linea-tiempo/marias-juan-cruz.png', 'Recreación artística del duelo de María Magdalena, María y Juan junto a Jesús crucificado; la postura en el suelo no está especificada en los Evangelios'],
    'El Primer Templo de Jerusalén': ['assets/linea-tiempo/primer-templo.jpg', 'Reconstrucción artística del Primer Templo de Jerusalén'],
    'Jerusalén cae y el Primer Templo es destruido': ['assets/linea-tiempo/caida-jerusalen.jpg', 'Jerusalén y el Primer Templo en llamas durante la conquista babilónica'],
    'Reconstrucción del Segundo Templo': ['assets/linea-tiempo/segundo-templo.jpg', 'La comunidad reconstruye el Segundo Templo de Jerusalén'],
    'Bautismo de Jesús': ['assets/linea-tiempo/bautismo-juan-jesus.jpg', 'Juan el Bautista bautiza a Jesús en el río Jordán'],
    'Multiplicación de los panes': ['assets/linea-tiempo/multiplicacion-panes.jpg', 'Jesús comparte panes y peces con una multitud junto al lago'],
    'Jesús sana al ciego': ['assets/linea-tiempo/jesus-sana-ciego.png', 'Jesús devuelve la vista a un hombre ciego en una aldea de Judea'],
    'Jesús calma la tempestad': ['assets/linea-tiempo/tempestad-calmada.jpg', 'Jesús calma la tempestad mientras sus discípulos están en la barca'],
    'Lázaro vuelve a la vida': ['assets/linea-tiempo/lazaro.jpg', 'Lázaro sale de su sepulcro al llamado de Jesús'],
    'La última cena y el arresto': ['assets/linea-tiempo/ultima-cena.jpg', 'Jesús comparte la última cena con sus discípulos'],
    'Carino y Leucio, testigos del descenso': ['assets/linea-tiempo/carino-leucio.jpg', 'Carino y Leucio, dos jóvenes testigos según el Evangelio de Nicodemo'],
    'Ángeles abren el sepulcro': ['assets/timeline/resurreccion-angeles-sepulcro.png', 'Dos seres luminosos descienden junto a la tumba y la piedra se mueve, según el Evangelio de Pedro'],
    'Los guardias quedan aterrados': ['assets/timeline/resurreccion-guardias-asustados.png', 'Guardias romanos aterrados ante la tumba abierta y el ángel, según relatos apócrifos'],
    'Jesús sale del sepulcro sostenido por dos seres celestiales': ['assets/timeline/resurreccion-jesus-con-dos-seres.png', 'Tres figuras salen del sepulcro: dos sostienen a Jesús, según el Evangelio de Pedro'],
    'Los hijos de Simeón ven la luz en el Hades': ['assets/timeline/resurreccion-luz-hades.png', 'Carino y Leucio contemplan la luz de Cristo en el Hades, según el Evangelio de Nicodemo'],
    'Los discípulos tocan a Jesús para comprobar que no es un fantasma': ['assets/timeline/resurreccion-tocan-jesus.png', 'Los discípulos tocan a Jesús resucitado para comprobar que está presente corporalmente, según la Epístola de los Apóstoles'],
    'La torre de Babel': ['assets/extintos/torre-babel-v2.jpg', 'La torre de Babel elevándose sobre la antigua ciudad'],
    'Sodoma y Gomorra': ['assets/extintos/sodoma-gomorra.jpg', 'La destrucción de Sodoma y Gomorra en una llanura antigua'],
    'Las diez plagas de Egipto': ['assets/timeline/plagas-egipto.png', 'El Nilo teñido de rojo y las ranas entre las plagas de Egipto'],
    'Moisés y Aarón ante el faraón': ['assets/timeline/moises-aaron-faraon.jpg', 'Moisés y Aarón exigen al faraón que deje salir al pueblo de Israel'],
    'Juicio contra los dioses de Egipto': ['assets/timeline/exodo-juicio-dioses-egipto.jpg', 'Moisés y Aarón ante el faraón en un templo egipcio, con estatuas cultuales al fondo'],
    'Ciro conquista Babilonia': ['assets/timeline/ciro-conquista-babilonia.jpg', 'Ciro y sus tropas persas entran en Babilonia por la puerta monumental al atardecer'],
    'Los Diez Mandamientos en el Sinaí': ['assets/timeline/moises-sinai.png', 'Moisés recibe las tablas de la alianza en el monte Sinaí'],
    'Moisés contempla la Tierra Prometida y muere': ['assets/timeline/muerte-moises-nebo.jpg', 'Moisés contempla desde el monte Nebo la Tierra Prometida antes de morir a los 120 años'],
    'El cruce del río Jordán': ['assets/timeline/josue-cruce-jordan.jpg', 'Josué conduce al pueblo mientras los sacerdotes llevan el Arca del Pacto al Jordán y las aguas se detienen'],
    'El becerro de oro': ['assets/timeline/becerro-oro-sinai.jpg', 'El pueblo de Israel adora el becerro de oro mientras Moisés está en el monte; Moisés desciende con las tablas de la Ley'],
    'El Tabernáculo': ['assets/timeline/moises-segundas-tablas-tabernaculo.jpg', 'Moisés desciende del monte con las segundas tablas y el rostro resplandeciente; los israelitas construyen el Tabernáculo'],
    'El informe de los diez espías': ['assets/timeline/espias-informe-cananea.jpg', 'Los espías regresan de Canaán con un informe; Josué y Caleb animan al pueblo a confiar en Dios'],
    'Israel vaga por el desierto': ['assets/timeline/israel-cuarenta-anos-desierto.jpg', 'Familias de Israel recorren el desierto durante los cuarenta años de peregrinación'],
    'Moisés golpea la roca en Meribá': ['assets/timeline/agua-roca-meriba.jpg', 'Agua brota de una roca en el desierto de Zin mientras Moisés y Aarón están junto al pueblo'],
    'La división del reino': ['assets/lugares/siquem.jpg', 'Paisaje de Siquem, asociado al cisma entre Israel y Judá'],
    'Sansón': ['assets/timeline/sanson.jpg', 'Sansón derriba las columnas del templo filisteo'],
    'Elías humilla a los profetas de Baal': ['assets/timeline/elias-profetas-baal.png', 'Elías confronta a los profetas de Baal en el monte Carmelo'],
    'Elías es llevado en un carro de fuego': ['assets/timeline/elias-carro-fuego.jpg', 'Elías asciende en un carro de fuego mientras Eliseo contempla la escena'],
    'Isaías y Emanuel': ['assets/timeline/isaias-emanuel.jpg', 'Isaías habla ante el rey Acaz mientras una mujer sostiene a su hijo'],
    'Daniel en el foso de los leones': ['assets/timeline/daniel-foso-leones.jpg', 'Daniel permanece a salvo entre los leones en el foso'],
    'La caída de Jericó': ['assets/extintos/muros-jerico-v2.jpg', 'Las murallas de Jericó se derrumban ante el pueblo de Israel'],
    'La anunciación a María': ['assets/timeline/anunciacion-maria.jpg', 'El ángel Gabriel anuncia a María el nacimiento de Jesús'],
    'Los leones guían a la Sagrada Familia': ['assets/timeline/infancia-pseudomateo-leones.png', 'Leones y un leopardo acompañan a María, José y Jesús niño durante la huida por el desierto'],
    'La palmera ofrece sus frutos a la Sagrada Familia': ['assets/timeline/infancia-pseudomateo-palmera.png', 'La Sagrada Familia recoge dátiles durante su viaje por el desierto'],
    'Las figuras de barro cobran vida': ['assets/timeline/infancia-arabe-figuras-vivas.png', 'Jesús niño da vida a figuras de animales y pájaros hechas de barro'],
    'Jesús devuelve sus colores a las túnicas': ['assets/timeline/infancia-arabe-tunicas.png', 'Jesús niño devuelve a cada túnica el color solicitado en el taller del tintorero'],
    'Jesús cura al joven leñador': ['assets/timeline/infancia-tomas-leñador.png', 'Jesús niño cura el pie herido de un joven leñador mientras la familia observa'],
    'Jesús multiplica el trigo y lo comparte': ['assets/timeline/infancia-tomas-trigo.png', 'Jesús y José reparten una cosecha abundante de trigo entre familias pobres'],
    'Jacobo es curado de una mordedura de víbora': ['assets/timeline/infancia-tomas-jacobo-vibora.png', 'Jesús niño sopla sobre la mordedura de víbora de Jacobo, quien recogía leña'],
    'El jinete del caballo blanco': ['assets/timeline/jinete-caballo-blanco.jpg', 'El jinete del Apocalipsis sobre un caballo blanco'],
    'Caín y Abel': ['assets/timeline/cain-abel.jpg', 'Caín contempla a Abel caído en el campo, en una representación sobria de Génesis 4'],
    'La zarza ardiente': ['assets/timeline/zarza-ardiente.jpg', 'Moisés se acerca a la zarza que arde sin consumirse en el desierto'],
    'La institución de la Pascua': ['assets/timeline/institucion-pascua.jpg', 'Una familia israelita comparte la cena de Pascua dentro de su casa en Egipto'],
    'Moisés abre el mar Rojo': ['assets/timeline/moises-mar-rojo.png', 'Moisés extiende su vara mientras Israel cruza el mar Rojo'],
    'La Roca de Moisés': ['assets/timeline/roca-moises-linea.png', 'Moisés hace brotar agua de una roca en el desierto'],
    'Débora, Gedeón y Jefté': ['assets/timeline/jueces-israel.jpg', 'Débora aconseja al pueblo mientras Gedeón reúne a los israelitas'],
    'Rut y Noemí': ['assets/timeline/rut-noemi.jpg', 'Rut acompaña a Noemí por un camino entre los campos de Belén'],
    'El llamado de Samuel': ['assets/timeline/samuel-llamado.jpg', 'Samuel escucha la llamada divina durante la noche en el santuario de Silo'],
    'Saúl es ungido primer rey': ['assets/timeline/saul-ungido.jpg', 'Samuel unge a Saúl como primer rey de Israel'],
    'David derrota a Goliat': ['assets/linea-tiempo/david-goliat.jpg', 'David vence a Goliat en el valle de Ela'],
    'David, Betsabé y Natán': ['assets/timeline/david-natan.jpg', 'El profeta Natán confronta a David en el palacio'],
    'Salomón pide sabiduría': ['assets/timeline/salmos-salomon-hijo-david.png', 'Salomón, hijo de David, como rey de Israel'],
    'Judá es llevado al exilio': ['assets/timeline/juda-exilio.jpg', 'Familias de Judá parten al exilio rumbo a Babilonia'],
    'Los desterrados viven en Babilonia': ['assets/lugares/babilonia.jpg', 'Vista de la antigua Babilonia, lugar del exilio de Judá'],
    'Ciro permite el regreso': ['assets/timeline/regreso-babilonia.jpg', 'Familias judías parten de Babilonia rumbo a Jerusalén tras el decreto de Ciro'],
    'Sadrac, Mesac y Abed-nego en el horno': ['assets/timeline/tres-jovenes-horno.jpg', 'Los tres jóvenes hebreos permanecen a salvo en el horno ardiente'],
    'El mundo del Segundo Templo': ['assets/linea-tiempo/segundo-templo.jpg', 'El Segundo Templo de Jerusalén en el período del judaísmo antiguo'],
    'Jesús bebé': ['assets/timeline/infancia-jesus.png', 'María y José cuidan al niño Jesús'],
    'Jesús habla desde la cuna': ['assets/timeline/jesus-habla-desde-la-cuna.png', 'Jesús niño habla desde una cuna, con María y oyentes presentes, en una ilustración del relato coránico'],
    'Huida y regreso a Nazaret': ['assets/timeline/huida-egipto.jpg', 'María, José y el niño Jesús huyen hacia Egipto al anochecer'],
    'Relatos del niño Jesús': ['assets/timeline/jesus-nino.png', 'Jesús durante su infancia, según relatos posteriores'],
    'Ayuno y tentación en el desierto': ['assets/timeline/jesus-ayuno-desierto.png', 'Jesús ayuna en el desierto antes de comenzar su ministerio'],
    'Crucifixión y muerte de Jesús': ['assets/timeline/jesus-cruz.png', 'Jesús en la cruz, escena de la Pasión'],
    'Resurrección de Jesús': ['assets/timeline/resurreccion-jesus.png', 'La resurrección de Jesús al amanecer'],
    'Juicio final y nueva creación': ['assets/timeline/nueva-creacion.jpg', 'La nueva creación y la ciudad santa en la visión final del Apocalipsis'],
    'Elección de Matías': ['assets/timeline/eleccion-matias.png', 'Los discípulos eligen a Matías para completar el grupo de los Doce'],
    'María Magdalena consuela a los discípulos': ['assets/timeline/maria-magdalena-consuela-discipulos.png', 'María Magdalena consuela a los discípulos después de la muerte de Jesús'],
    'José Barsabás sobrevive al veneno': ['assets/timeline/jose-barsabas-veneno.jpg', 'José Barsabás sobrevive a una prueba con veneno según la tradición'],
    'Enoc niño': ['assets/timeline/enoc-nino.png', 'Enoc niño en una representación artística de su vida extraordinaria'],
    'La Adoración de los Magos': ['assets/linea-tiempo/adoracion-magos.png', 'Los sabios de Oriente visitan al niño Jesús'],
    'Jesús entre los doctores': ['assets/linea-tiempo/jesus-doctores.png', 'Jesús adolescente dialoga con los maestros en el Templo'],
    'El Discurso del Pan de Vida': ['assets/linea-tiempo/pan-vida.png', 'Jesús enseña a la multitud sobre el pan de vida'],
    'La Pesca Milagrosa': ['assets/linea-tiempo/pesca-milagrosa.png', 'Los discípulos recogen una pesca abundante junto a Jesús'],
    'La Sanidad del Leproso': ['assets/linea-tiempo/sanidad-leproso.png', 'Jesús sana a un hombre con lepra'],
    'El Paralítico de Cafarnaúm': ['assets/linea-tiempo/paralitico-cafarnaum.png', 'Jesús sana al paralítico llevado por sus amigos'],
    'La Resurrección de la Hija de Jairo': ['assets/linea-tiempo/hija-jairo.png', 'Jesús devuelve la vida a la hija de Jairo'],
    'El Lavatorio de los Pies': ['assets/linea-tiempo/lavatorio-pies.png', 'Jesús lava los pies de sus discípulos'],
    'El Primer Milagro en Caná': ['assets/linea-tiempo/boda-cana.png', 'Jesús realiza su primer signo durante una boda en Caná'],
    'Caminando sobre las Aguas': ['assets/linea-tiempo/camina-aguas.png', 'Jesús camina sobre las aguas hacia sus discípulos'],
    'La Traición y el Arresto': ['assets/linea-tiempo/traicion-arresto.png', 'Jesús es arrestado en el huerto de Getsemaní'],
    'Jesús revela a Judas su papel': ['assets/timeline/jesus-habla-con-judas.png', 'Jesús conversa en privado con Judas antes de la entrega, según el Evangelio de Judas'],
    'Las Negaciones de Pedro': ['assets/linea-tiempo/negaciones-pedro.png', 'Pedro niega conocer a Jesús antes del amanecer'],
    'El Camino al Gólgota': ['assets/linea-tiempo/camino-golgota.png', 'Jesús camina hacia el Gólgota cargando la cruz'],
    'El Juicio de Jesús': ['assets/linea-tiempo/juicio-jesus.png', 'Jesús comparece ante las autoridades durante su juicio'],
    'Jesús es azotado': ['assets/linea-tiempo/azotes-jesus.png', 'Jesús es azotado antes de la crucifixión'],
    'Las Apariciones post-Resurrección': ['assets/linea-tiempo/apariciones.png', 'Jesús resucitado se aparece a sus discípulos'],
    'La Ascensión': ['assets/linea-tiempo/ascension.png', 'Jesús asciende al cielo ante sus discípulos'],
    'Jesús y la mujer acusada': ['assets/linea-tiempo/mujer-adultera.png', 'Jesús habla con la mujer acusada por sus adversarios'],
    'La Corte Celestial': ['assets/linea-tiempo/corte-celestial.png', 'Una visión del consejo celestial ante el trono de Dios'],
    'Ángeles y huestes celestiales': ['assets/linea-tiempo/angeles-miguel.png', 'Ángeles y huestes celestiales en una escena apocalíptica'],
    'La Mujer vestida del sol y el Gran Dragón': ['assets/linea-tiempo/mujer-sol-dragon.png', 'La mujer vestida del sol frente al gran dragón, visión del Apocalipsis'],
    'Isaías ve al Señor en el Templo': ['assets/timeline/isaias-vision.png', 'Isaías contempla al Señor en el Templo'],
    'Los Querubines de Ezequiel': ['assets/linea-tiempo/ezequiel-querubines.png', 'Ezequiel contempla a los querubines de su visión'],
    'Las ruedas centelleantes de Ezequiel': ['assets/linea-tiempo/ezequiel-ofanim.png', 'Las ruedas centelleantes de la visión de Ezequiel'],
    'Ezequiel ve la gloria de Dios': ['assets/linea-tiempo/ezequiel-trono.png', 'Ezequiel contempla la gloria de Dios sobre el trono'],
    'Daniel ve al Anciano de Días': ['assets/linea-tiempo/daniel-anciano-dias.png', 'Daniel contempla al Anciano de Días en visión'],
    'Daniel mata al dragón en Babilonia': ['assets/linea-tiempo/daniel-mata-dragon.jpg', 'Ilustración artística de Daniel matando al dragón adorado en Babilonia, según Bel y el Dragón'],
    'Jesús alarga la madera para José': ['assets/linea-tiempo/jesus-alarga-madera.png', 'Jesús niño alarga una pieza de madera para igualarla con otra, según la Infancia de Tomás'],
    'Juan ve el trono y al Cordero': ['assets/linea-tiempo/trono-cordero.png', 'Juan contempla el trono celestial y al Cordero'],
    'Dios ordena capturar a Shemihaza': ['assets/enoc/vigilantes.jpg', 'El arcángel Miguel encadena a Shemihaza y a los Vigilantes según 1 Enoc'],
    'La violencia se extiende por la tierra': ['assets/timeline/generacion-violencia.png', 'La violencia se extiende entre los seres humanos antes del diluvio'],
    'Simeón carga al niño Jesús': ['assets/timeline/simeon-templo.jpg', 'Simeón sostiene al niño Jesús en el Templo mientras María y José observan'],
    'Evangelio de Nicodemo': ['assets/timeline/jesus-descenso.png', 'Cristo desciende al Hades según el Evangelio de Nicodemo'],
    'El Resucitado en María Magdalena y Nag Hammadi': ['assets/gnosticismo/maria-7-10.jpg', 'María Magdalena transmite un diálogo del Resucitado en un texto de Nag Hammadi']
  };
  const timelineEraFallbacks = {
    origins: [
      ['assets/timeline/adan-eva-tres-hijos.png', 'Ilustración representativa de las primeras generaciones de Génesis'],
      ['assets/timeline/creacion-tierra.jpg', 'Ilustración contextual de los relatos de los orígenes'],
      ['assets/timeline/adan-eva.png', 'Ilustración contextual de los relatos de los orígenes'],
      ['assets/timeline/cain-teme-ser-hallado.png', 'Ilustración contextual de las primeras generaciones de Génesis']
    ],
    patriarchs: [
      ['assets/timeline/llamado-abraham.png', 'Ilustración representativa de la época de los patriarcas'],
      ['assets/timeline/isaac-rebeca-gemelos.jpg', 'Ilustración contextual de la época de los patriarcas'],
      ['assets/timeline/jacob-peniel-lucha.jpg', 'Ilustración contextual de la época de los patriarcas'],
      ['assets/timeline/abraham-prueba-isaac.jpg', 'Ilustración contextual de la época de los patriarcas']
    ],
    exodus: [
      ['assets/timeline/israel-cuarenta-anos-desierto.jpg', 'Ilustración representativa del Éxodo y la travesía por el desierto'],
      ['assets/timeline/moises-mar-rojo.png', 'Ilustración contextual del Éxodo'],
      ['assets/timeline/moises-sinai.png', 'Ilustración contextual del Éxodo'],
      ['assets/timeline/moises-segundas-tablas-tabernaculo.jpg', 'Ilustración contextual del Éxodo'],
      ['assets/timeline/plagas-egipto.png', 'Ilustración contextual del Éxodo']
    ],
    judges: [
      ['assets/timeline/sanson.jpg', 'Ilustración representativa del período de los jueces de Israel'],
      ['assets/linea-tiempo/david-goliat.jpg', 'Ilustración contextual del antiguo Israel'],
      ['assets/timeline/david-jerusalen-rey.png', 'Ilustración contextual del antiguo Israel']
    ],
    kingdom: [
      ['assets/timeline/david-jerusalen-rey.png', 'Ilustración representativa de la monarquía de Israel'],
      ['assets/linea-tiempo/primer-templo.jpg', 'Ilustración contextual de los reinos de Israel y Judá'],
      ['assets/linea-tiempo/israel-juda-banner.jpg', 'Ilustración contextual de la historia de Israel y Judá']
    ],
    exile: [
      ['assets/lugares/babilonia.jpg', 'Ilustración representativa del exilio en Babilonia'],
      ['assets/timeline/ciro-conquista-babilonia.jpg', 'Ilustración contextual del exilio y el retorno'],
      ['assets/timeline/daniel-foso-leones.jpg', 'Ilustración contextual del exilio en Babilonia']
    ],
    jesus: [
      ['assets/timeline/jesus-ensenando.png', 'Ilustración representativa de la época de Jesús'],
      ['assets/timeline/infancia-jesus.png', 'Ilustración contextual de la vida de Jesús'],
      ['assets/linea-tiempo/multiplicacion-panes.jpg', 'Ilustración contextual del ministerio de Jesús'],
      ['assets/timeline/jesus-cruz.png', 'Ilustración contextual de la vida de Jesús'],
      ['assets/timeline/resurreccion-jesus.png', 'Ilustración contextual de la vida de Jesús']
    ],
    church: [
      ['assets/timeline/pentecostes-espiritu-santo.jpg', 'Ilustración representativa de las primeras comunidades cristianas'],
      ['assets/timeline/juan-patmos-feliz.png', 'Ilustración contextual de los primeros cristianos y sus escritos'],
      ['assets/timeline/maria-magdalena-consuela-discipulos.png', 'Ilustración contextual de las primeras comunidades cristianas'],
      ['assets/timeline/apostol-pedro.jpg', 'Ilustración contextual de la misión apostólica']
    ],
    hope: [
      ['assets/timeline/jinete-caballo-blanco.jpg', 'Ilustración representativa de las visiones de esperanza y juicio'],
      ['assets/linea-tiempo/corte-celestial.png', 'Ilustración contextual de las visiones celestiales'],
      ['assets/linea-tiempo/trono-cordero.png', 'Ilustración contextual de las visiones de esperanza'],
      ['assets/linea-tiempo/mujer-sol-dragon.png', 'Ilustración contextual del Apocalipsis']
    ],
    canonical: [
      ['assets/timeline/pentecostes-espiritu-santo.jpg', 'Ilustración representativa de la historia cristiana antigua'],
      ['assets/timeline/juan-patmos-feliz.png', 'Ilustración contextual de los primeros cristianos y sus escritos']
    ],
    context: [
      ['assets/timeline/juan-patmos-feliz.png', 'Ilustración representativa de la transmisión de textos y tradiciones cristianas'],
      ['assets/timeline/pentecostes-espiritu-santo.jpg', 'Ilustración contextual de las primeras comunidades cristianas']
    ],
    apocryphal: [
      ['assets/timeline/jesus-descenso.png', 'Ilustración representativa de una tradición apócrifa cristiana'],
      ['assets/linea-tiempo/carino-leucio.jpg', 'Ilustración contextual de los relatos cristianos apócrifos']
    ],
    tradition: [
      ['assets/timeline/juan-patmos-feliz.png', 'Ilustración representativa de una tradición cristiana posterior'],
      ['assets/timeline/apostol-pedro.jpg', 'Ilustración contextual de la tradición apostólica']
    ]
  };
  const eras = { origins: 'origins', patriarchs: 'patriarchs', exodus: 'exodus', judges: 'judges', kingdom: 'kingdom', exile: 'exile', jesus: 'jesus', church: 'church', hope: 'hope' };
  const eventEra = title => {
    if (apostleFates.some(item => item[1] === title)) return 'church';
    if (title === 'Nacimiento de Noé') return 'origins';
    const item = milestones.find(row => row[1] === title) || extra.find(row => row[1] === title) || requestedTimelineEvents.find(row => row[1] === title);
    return item?.[5] || (title.includes('Noé') ? 'origins' : title.includes('Abraham') || title.includes('Jacob') || title.includes('José') ? 'patriarchs' : title.includes('Moisés') ? 'exodus' : title.includes('Jesús') || title.includes('Pasión') || title.includes('Resurrección') ? 'jesus' : 'church');
  };
  const hiddenTimelineTitles = new Set(['El mundo del Segundo Templo']);
  const ordered = [];
  order.forEach(item => {
    if (hiddenTimelineTitles.has(item[1])) return;
    const card = byTitle.get(item[1]);
    if (!card || ordered.includes(card)) return;
    card.dataset.era = eventEra(item[1]);
    card.dataset.year = item[0];
    if (['Multiplicación de los panes', 'Jesús sana al ciego', 'Jesús calma la tempestad', 'Lázaro vuelve a la vida'].includes(item[1])) card.dataset.milagro = 'true';
    const date = card.querySelector('.timeline-date');
    if (date) date.textContent = item[0];
    if (item[1] === 'Sodoma y Gomorra') {
      const description = card.querySelector('.timeline-description') || card.querySelector('p');
      if (description) description.textContent = item[2];
      const reference = card.querySelector('a');
      if (reference) {
        reference.textContent = item[3];
        reference.href = item[4];
      }
      const geologyReference = document.createElement('a');
      geologyReference.href = 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0075883';
      geologyReference.target = '_blank';
      geologyReference.rel = 'noopener noreferrer';
      geologyReference.textContent = 'Estudio geológico: nódulos naturales de azufre en la formación Lisan';
      card.append(geologyReference);
    }
    if (item[1] === 'Nacimiento de Daniel') card.querySelector('.source-badge').textContent = 'Representación artística';
    if (item[1] === 'Juicio contra los dioses de Egipto') {
      const description = card.querySelector('.timeline-description');
      const phrase = 'todos los dioses de Egipto';
      const [before, after = ''] = description.textContent.split(`«${phrase}»`);
      const emphasizedPhrase = document.createElement('strong');
      emphasizedPhrase.textContent = phrase;
      description.replaceChildren(document.createTextNode(`${before}«`), emphasizedPhrase, document.createTextNode(`»${after}`));
    }
    if (item[1] === 'Jacob lucha y recibe el nombre Israel') {
      const angelReference = document.createElement('a');
      angelReference.href = 'lectura/?obra=rvr1909-oseas&capitulo=12#pasaje-12-4';
      angelReference.textContent = 'Oseas 12:4 · luchó con el ángel';
      card.append(angelReference);
    }
    if (item[1] === 'Se abren las fuentes del gran abismo') {
      const description = card.querySelector('.timeline-description');
      const question = document.createElement('strong');
      question.textContent = '¿O sea que arriba del cielo que vemos se encuentra un firmamento?';
      description.append(document.createElement('br'), question);
      const creationReference = document.createElement('a');
      creationReference.href = 'lectura/?obra=rvr1909-genesis&capitulo=1#pasaje-1-6';
      creationReference.textContent = 'Génesis 1:6–8';
      card.querySelector('a').after(creationReference);
    }
    if (item[1] === 'Las naciones y los hijos de Dios') {
      const description = card.querySelector('.timeline-description');
      const quotation = document.createElement('strong');
      quotation.append(document.createTextNode('Deuteronomio 32:8 - NTV'), document.createElement('br'));
      quotation.append(document.createTextNode('Cuando el Altísimo asignó territorios a las naciones, cuando dividió a la raza humana, fijó los límites de los pueblos según el número de su corte celestial.'));
      description.replaceChildren(quotation);
    }
    const specificTimelineImage = timelineImages[item[1]];
    let image = card.querySelector('.timeline-image');
    if (specificTimelineImage || !image) {
      const fallbackSet = timelineEraFallbacks[card.dataset.era] || timelineEraFallbacks[item[5]] || timelineEraFallbacks.context;
      const titleSeed = Array.from(item[1]).reduce((sum, character) => sum + character.charCodeAt(0), 0);
      const [src, alt] = specificTimelineImage || fallbackSet[titleSeed % fallbackSet.length];
      if (!image) { image = document.createElement('img'); image.className = 'timeline-image'; card.insertBefore(image, card.firstChild); }
      image.src = src;
      image.alt = specificTimelineImage ? alt : `${alt} · ${item[1]}`;
      image.loading = 'lazy';
    }
    ordered.push(card);
  });
  timelineTrack.replaceChildren(...ordered);
  const markTimelineImageOrientation = image => {
    const applyOrientation = () => {
      const card = image.closest('.timeline-event');
      const isPortrait = image.naturalHeight > image.naturalWidth * 1.08;
      card?.classList.toggle('is-portrait', isPortrait);
      card?.classList.toggle('is-landscape', !isPortrait && image.naturalWidth >= image.naturalHeight);
    };
    if (image.complete && image.naturalWidth) applyOrientation();
    else image.addEventListener('load', applyOrientation, { once: true });
  };
  timelineTrack.querySelectorAll('.timeline-image').forEach(markTimelineImageOrientation);
}
