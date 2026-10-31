const sections = [
  ['abraham-y-jesus', 'Abraham y Yashua', 'abraham-jesus.html', 'prayers-view', 'Paralelismos entre los relatos de Abraham e Isaac y las lecturas cristianas sobre Yashua.'],
  ['adan-y-jesus', 'Adán y Yashua', 'adan-jesus.html', 'prayers-view', 'Comparación de Adán y Yashua en textos bíblicos y lecturas posteriores.'],
  ['animales-extintos', 'Animales extintos', 'animales-extintos.html', 'extinct-view', 'Animales y criaturas de textos antiguos, con identificación y contexto.'],
  ['arbol-genealogico', 'Árbol genealógico', 'arbol-genealogico.html', 'genealogy-view', 'Genealogías bíblicas y las dos líneas que Mateo y Lucas trazan hasta Jesús.'],
  ['arca-de-noe', 'Arca de Noé', 'arca-noe.html', 'extinct-view', 'El relato del diluvio, el Arca y sus tradiciones relacionadas.'],
  ['ascendidos', 'Ascendidos', 'ascendidos.html', 'extinct-view', 'Personajes que los textos describen como llevados al cielo o trasladados.'],
  ['biblia-y-grecia', 'Biblia y Grecia', 'biblia-grecia.html', 'prayers-view', 'Cruces y diferencias entre las tradiciones bíblicas y el mundo griego.'],
  ['calendario-jubileos', 'Calendario Los Jubileos', 'calendario-jubileos.html', 'jubilee-calendar-view', 'Calendario de 364 días presentado en el Libro de los Jubileos.'],
  ['campanas', 'Campanas', 'campanas.html', 'prayers-view', 'La historia, los símbolos y las tradiciones vinculadas con las campanas.'],
  ['catalogo', 'Catálogo', 'catalogo.html', 'catalog-view', 'Obras bíblicas y extracanónicas reunidas en el catálogo.'],
  ['diablos', 'Diablos [31]', 'diablos.html', 'extinct-view', 'Nombres, figuras y tradiciones sobre adversarios espirituales.'],
  ['dragones', 'Dragones', 'dragones.html', 'dragon-view', 'Dragones y criaturas monstruosas en Daniel, la Biblia y los textos extracanónicos.'],
  ['el-pan-de-vida', 'El pan de vida', 'el-pan-de-vida.html', 'prayers-view', 'La cita de Juan 6:35 y el pan descrito en Ezequiel 4:9.'],
  ['mesias', 'El Mesías', 'mesias.html', 'prayers-view', 'Yashua (ye-shú-a) es la forma hebrea del nombre de Jesús; Yahushúa (ya-hu-shú-a) es su forma plena relacionada. Los antiguos escribas quisieron llamar a Yashua como Yeshúa o Yehoshúa para ocultar que Yahweh (YHWH) es Yashúa, entonces cambiaron la fonética de la palabra. El griego Iēsous pasó al latín Iesus y de allí al español Jesús. Usar Yashua o Yahushúa resalta sus raíces lingüísticas semíticas.'],
  ['nacimiento-de-jesus', 'El nacimiento de Yashua', 'nacimiento-jesus.html', 'prayers-view', 'Relatos y cronologías propuestos para el nacimiento y la muerte de Yashua.'],
  ['enoc', 'Enoc', 'enoc.html', 'enoch-view', 'Lectura y contexto de las tradiciones de Enoc.'],
  ['gnosticismo', 'Gnosticismo', 'gnosticismo.html', 'extinct-view', 'Textos gnósticos, sus figuras y sus propias visiones del mundo.'],
  ['gigantes-nefilim', 'Gigantes Nefilim', 'gigantes-nefilim.html', 'nephilim-view', 'Goliat, los hijos de Anac, Og de Basán y otros gigantes mencionados en la Biblia y en Enoc.'],
  ['infiernos', 'Infiernos [5]', 'infiernos.html', 'extinct-view', 'Imágenes del mundo de los muertos y del juicio en distintas obras.'],
  ['inscripcion-frankfurt', 'Inscripción de Frankfurt', 'inscripcion-frankfurt.html', 'prayers-view', 'El amuleto de plata de Frankfurt y la inscripción que conserva.'],
  ['israel-vs-juda', 'Israel vs Judá', 'israel-juda.html', 'extinct-view', 'La historia de los reinos de Israel y Judá y sus tradiciones.'],
  ['joseph-y-yeshua', 'Joseph y Yashua', 'joseph-yeshua.html', 'prayers-view', 'Paralelismos entre José de Egipto y Jesús en la lectura tipológica cristiana.'],
  ['judea', 'Judea', 'judea.html', 'prayers-view', 'Lugares, acontecimientos y contexto histórico de Judea.'],
  ['cara-de-dios', 'La cara de Elah', 'cara-de-dios.html', 'face-view', 'Textos y representaciones sobre cómo se describe la presencia divina.'],
  ['linea-de-tiempo', 'Línea de tiempo', 'linea-tiempo.html', 'timeline-view', 'Recorrido cronológico por relatos bíblicos, textos extracanónicos y contexto histórico.'],
  ['lamec-y-yeshua', 'Lamec y Yashúa', 'lamec-yeshua.html', 'prayers-view', 'El contraste entre la venganza de Lamec y el perdón que enseña Yashúa.'],
  ['los-13-discipulos', 'Los 13 discípulos', 'los-13-discipulos.html', 'prayers-view', 'María Magdalena, los Doce apóstoles y el simbolismo del número trece.'],
  ['lugares-perdidos', 'Lugares perdidos [12]', 'lugares-perdidos.html', 'extinct-view', 'Lugares antiguos, tradiciones y sitios cuya identificación se discute.'],
  ['moises-y-yeshua', 'Moisés y Yashua', 'moises-yeshua.html', 'prayers-view', 'El gesto de Séfora en Éxodo 4 y el lavatorio de pies realizado por Yashua en Juan 13.'],
  ['objetos', 'Objetos [9]', 'objetos.html', 'extinct-view', 'Objetos, reliquias y elementos materiales de las tradiciones bíblicas.'],
  ['objetos-de-jesus', 'Objetos de Jesús', 'objetos-jesus.html', 'extinct-view', 'El sudario, las sandalias y la túnica en los evangelios y las tradiciones sobre Jesús.'],
  ['oraciones', 'Oraciones [3]', 'oraciones.html', 'prayers-view', 'Oraciones cristianas y sus textos de origen.'],
  ['pedro-traidor', 'Pedro traidor', 'pedro-traidor.html', 'prayers-view', 'Pedro, Judas y María Magdalena: relatos canónicos y extracanónicos.'],
  ['piedras-de-ica', 'Piedras de Ica', 'piedras-ica.html', 'ica-view', 'Las piedras grabadas de Ica, las interpretaciones sobre sus imágenes y el contexto arqueológico.'],
  ['profecias', 'Profecías', 'profecias.html', 'prophecies-view', 'Textos proféticos y sus interpretaciones posteriores.'],
  ['sabana-santa', 'Sábana Santa', 'sabana-santa.html', 'extinct-view', 'La reliquia de Turín, su historia documentada y los estudios sobre ella.']
].map(([id, title, file, className, description]) => ({ id, title, file, className, description }));

const params = new URLSearchParams(location.search);
const section = sections.find(item => item.id === params.get('tema'));
const title = document.querySelector('#section-title');
const description = document.querySelector('#section-description');
const content = document.querySelector('#section-content');
const picker = document.querySelector('#section-picker-links');

picker.innerHTML = sections.map(item => `<a href="seccion.html?tema=${encodeURIComponent(item.id)}"${item.id === section?.id ? ' aria-current="page"' : ''}>${item.title}</a>`).join('');

if (!section) {
  title.textContent = 'Sección no encontrada';
  description.textContent = 'Volvé al inicio para elegir una sección disponible.';
  content.innerHTML = '<a class="primary-link" href="./">Ver todas las secciones</a>';
  document.title = 'Sección no encontrada · Biblia Extracanónica';
} else {
  title.textContent = section.title;
  description.textContent = section.description;
  document.title = `${section.title} · Biblia Extracanónica`;
  content.classList.add(section.className);
  content.id = `${section.id}-view`;
  try {
    const response = await fetch(`secciones/${section.file}`);
    if (!response.ok) throw new Error(`No se pudo cargar ${section.file}`);
    content.innerHTML = await response.text();
    content.querySelectorAll('img').forEach(image => {
      if (!image.hasAttribute('loading')) image.loading = 'lazy';
      if (!image.hasAttribute('decoding')) image.decoding = 'async';
    });
    if (section.id === 'catalogo') await import('./catalog-page.mjs?v=71');
    if (section.id === 'calendario-jubileos') initializeCalendar();
    if (section.id === 'linea-de-tiempo') await import('./timeline-page.mjs?v=76');
    if (section.id === 'arbol-genealogico') await import('./genealogy-page.mjs?v=71');
    if (section.id === 'dragones') await import('./dragones-page.mjs');
  } catch (error) {
    content.innerHTML = '<p class="loading-message">No se pudo cargar esta sección. Probá actualizar la página.</p>';
    console.error(error);
  }
}

function initializeCalendar() {
  const standardMonthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const standardMonthLengths = [30, 30, 31, 30, 30, 31, 30, 30, 31, 30, 30, 31];
  const thirteenMonthNames = [...standardMonthNames, 'Adaru'];
  const thirteenMonthLengths = Array(13).fill(28);
  const today = new Date();
  const epoch = new Date(0);
  epoch.setUTCFullYear(1, 0, 1);
  const utcToday = new Date(0);
  utcToday.setUTCFullYear(today.getFullYear(), today.getMonth(), today.getDate());
  utcToday.setUTCHours(0, 0, 0, 0);
  const elapsedDays = Math.floor((utcToday - epoch) / 86400000);
  const yearNumber = Math.floor(elapsedDays / 364) + 1;
  const cycleDay = elapsedDays % 364;
  const dayNumber = cycleDay + 1;
  const weekdayNames = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
  const todayMeta = `${weekdayNames[cycleDay % 7]} · ${today.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })} en el calendario actual`;

  const mountCalendar = ({ prefix, monthNames, monthLengths }) => {
    const id = name => `${prefix}-${name}`;
    let offset = 0;
    let month = 0;
    while (month < monthLengths.length - 1 && cycleDay >= offset + monthLengths[month]) offset += monthLengths[month++];
    let shownMonth = month;
    let shownYear = yearNumber;
    const renderMonth = () => {
      const grid = document.getElementById(id('calendar-grid'));
      const yearLabel = document.getElementById(id('year-name'));
      const monthLabel = document.getElementById(id('month-name'));
      const firstWeekday = monthLengths.slice(0, shownMonth).reduce((sum, length) => sum + length, 0) % 7;
      const cells = Array.from({ length: firstWeekday }, () => '<span class="jubilee-blank" aria-hidden="true"></span>');
      for (let day = 1; day <= monthLengths[shownMonth]; day++) {
        const todayCell = shownYear === yearNumber && shownMonth === month && day === cycleDay - offset + 1;
        cells.push(`<span class="jubilee-day${todayCell ? ' is-today' : ''}"${todayCell ? ' aria-current="date"' : ''}>${day}</span>`);
      }
      monthLabel.textContent = monthNames[shownMonth];
      yearLabel.textContent = `Año ${shownYear} del ciclo`;
      grid.innerHTML = cells.join('');
    };

    document.getElementById(id('today-date')).textContent = `${cycleDay - offset + 1} de ${monthNames[month]}, año ${yearNumber}`;
    document.getElementById(id('today-meta')).textContent = todayMeta;
    document.getElementById(id('day-number')).textContent = dayNumber;
    document.getElementById(id('prev')).addEventListener('click', () => {
      if (shownMonth === 0) { shownMonth = monthLengths.length - 1; shownYear--; } else shownMonth--;
      renderMonth();
    });
    document.getElementById(id('next')).addEventListener('click', () => {
      if (shownMonth === monthLengths.length - 1) { shownMonth = 0; shownYear++; } else shownMonth++;
      renderMonth();
    });
    document.getElementById(id('today')).addEventListener('click', () => { shownMonth = month; shownYear = yearNumber; renderMonth(); });
    renderMonth();
  };

  mountCalendar({ prefix: 'jubilee', monthNames: standardMonthNames, monthLengths: standardMonthLengths });
  mountCalendar({ prefix: 'adaru', monthNames: thirteenMonthNames, monthLengths: thirteenMonthLengths });
}
