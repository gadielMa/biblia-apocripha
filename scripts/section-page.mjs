const sections = [
  ['abraham-y-jesus', 'Abraham y Jesús', 'abraham-jesus.html', 'prayers-view', 'Paralelismos entre los relatos de Abraham e Isaac y las lecturas cristianas sobre Jesús.'],
  ['adan-y-jesus', 'Adán y Jesús', 'adan-jesus.html', 'prayers-view', 'Comparación de Adán y Jesús en textos bíblicos y lecturas posteriores.'],
  ['animales-extintos', 'Animales extintos', 'animales-extintos.html', 'extinct-view', 'Animales y criaturas de textos antiguos, con identificación y contexto.'],
  ['arbol-genealogico', 'Árbol genealógico', 'arbol-genealogico.html', 'genealogy-view', 'Genealogías bíblicas y las dos líneas que Mateo y Lucas trazan hasta Jesús.'],
  ['arca-de-noe', 'Arca de Noé', 'arca-noe.html', 'extinct-view', 'El relato del diluvio, el Arca y sus tradiciones relacionadas.'],
  ['ascendidos', 'Ascendidos', 'ascendidos.html', 'extinct-view', 'Personajes que los textos describen como llevados al cielo o trasladados.'],
  ['biblia-y-grecia', 'Biblia y Grecia', 'biblia-grecia.html', 'prayers-view', 'Cruces y diferencias entre las tradiciones bíblicas y el mundo griego.'],
  ['calendario-jubileos', 'Calendario Los Jubileos', 'calendario-jubileos.html', 'jubilee-calendar-view', 'Calendario de 364 días presentado en el Libro de los Jubileos.'],
  ['campanas', 'Campanas', 'campanas.html', 'prayers-view', 'La historia, los símbolos y las tradiciones vinculadas con las campanas.'],
  ['catalogo', 'Catálogo', 'catalogo.html', 'catalog-view', 'Obras bíblicas y extracanónicas reunidas en el catálogo.'],
  ['diablos', 'Diablos', 'diablos.html', 'extinct-view', 'Nombres, figuras y tradiciones sobre adversarios espirituales.'],
  ['mesias', 'El Mesías', 'mesias.html', 'prayers-view', 'Comparación de textos y creencias sobre Jesús en distintas tradiciones.'],
  ['nacimiento-de-jesus', 'El nacimiento de Jesús', 'nacimiento-jesus.html', 'prayers-view', 'Relatos y cronologías propuestos para el nacimiento y la muerte de Jesús.'],
  ['enoc', 'Enoc', 'enoc.html', 'enoch-view', 'Lectura y contexto de las tradiciones de Enoc.'],
  ['gnosticismo', 'Gnosticismo', 'gnosticismo.html', 'extinct-view', 'Textos gnósticos, sus figuras y sus propias visiones del mundo.'],
  ['infiernos', 'Infiernos', 'infiernos.html', 'extinct-view', 'Imágenes del mundo de los muertos y del juicio en distintas obras.'],
  ['inscripcion-frankfurt', 'Inscripción de Frankfurt', 'inscripcion-frankfurt.html', 'prayers-view', 'El amuleto de plata de Frankfurt y la inscripción que conserva.'],
  ['israel-vs-juda', 'Israel vs Judá', 'israel-juda.html', 'extinct-view', 'La historia de los reinos de Israel y Judá y sus tradiciones.'],
  ['judea', 'Judea', 'judea.html', 'prayers-view', 'Lugares, acontecimientos y contexto histórico de Judea.'],
  ['cara-de-dios', 'La cara de Dios', 'cara-de-dios.html', 'face-view', 'Textos y representaciones sobre cómo se describe la presencia divina.'],
  ['linea-de-tiempo', 'Línea de tiempo', 'linea-tiempo.html', 'timeline-view', 'Recorrido cronológico por relatos bíblicos, textos extracanónicos y contexto histórico.'],
  ['lugares-perdidos', 'Lugares perdidos', 'lugares-perdidos.html', 'extinct-view', 'Lugares antiguos, tradiciones y sitios cuya identificación se discute.'],
  ['objetos', 'Objetos', 'objetos.html', 'extinct-view', 'Objetos, reliquias y elementos materiales de las tradiciones bíblicas.'],
  ['oraciones', 'Oraciones', 'oraciones.html', 'prayers-view', 'Oraciones cristianas y sus textos de origen.'],
  ['pedro-traidor', 'Pedro traidor', 'pedro-traidor.html', 'prayers-view', 'Pedro, Judas y María Magdalena: relatos canónicos y extracanónicos.'],
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
    if (section.id === 'catalogo') await import('./catalog-page.mjs');
    if (section.id === 'calendario-jubileos') initializeCalendar();
    if (section.id === 'linea-de-tiempo') await import('./timeline-page.mjs');
  } catch (error) {
    content.innerHTML = '<p class="loading-message">No se pudo cargar esta sección. Probá actualizar la página.</p>';
    console.error(error);
  }
}

function initializeCalendar() {
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const monthLengths = [30, 30, 31, 30, 30, 31, 30, 30, 31, 30, 30, 31];
  const today = new Date();
  const epoch = new Date(0);
  epoch.setUTCFullYear(1, 0, 1);
  const utcToday = new Date(0);
  utcToday.setUTCFullYear(today.getFullYear(), today.getMonth(), today.getDate());
  utcToday.setUTCHours(0, 0, 0, 0);
  const elapsedDays = Math.floor((utcToday - epoch) / 86400000);
  const dayNumber = elapsedDays + 1;
  const yearNumber = Math.floor(elapsedDays / 364) + 1;
  const cycleDay = elapsedDays % 364;
  let offset = 0;
  let month = 0;
  while (month < monthLengths.length - 1 && cycleDay >= offset + monthLengths[month]) offset += monthLengths[month++];
  let shownMonth = month;
  let shownYear = yearNumber;
  const renderMonth = () => {
    const grid = document.querySelector('#jubilee-calendar-grid');
    const yearLabel = document.querySelector('#jubilee-year-name');
    const monthLabel = document.querySelector('#jubilee-month-name');
    const firstWeekday = monthLengths.slice(0, shownMonth).reduce((sum, length) => sum + length, 0) % 7;
    const cells = Array.from({ length: firstWeekday }, () => '<span class="jubilee-blank" aria-hidden="true"></span>');
    for (let day = 1; day <= monthLengths[shownMonth]; day++) {
      const todayCell = shownMonth === month && day === cycleDay - offset + 1;
      cells.push(`<span class="jubilee-day${todayCell ? ' is-today' : ''}"${todayCell ? ' aria-current="date"' : ''}>${day}</span>`);
    }
    monthLabel.textContent = monthNames[shownMonth];
    yearLabel.textContent = `Año ${shownYear} del ciclo`;
    grid.innerHTML = cells.join('');
  };
  document.querySelector('#jubilee-today-date').textContent = `${cycleDay - offset + 1} de ${monthNames[month]}, año ${yearNumber}`;
  const weekdayNames = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
  document.querySelector('#jubilee-today-meta').textContent = `${weekdayNames[cycleDay % 7]} · ${today.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })} en el calendario actual`;
  document.querySelector('#jubilee-day-number').textContent = cycleDay + 1;
  document.querySelector('#jubilee-prev').addEventListener('click', () => {
    if (shownMonth === 0) { shownMonth = 11; shownYear--; } else shownMonth--;
    renderMonth();
  });
  document.querySelector('#jubilee-next').addEventListener('click', () => {
    if (shownMonth === 11) { shownMonth = 0; shownYear++; } else shownMonth++;
    renderMonth();
  });
  document.querySelector('#jubilee-today').addEventListener('click', () => { shownMonth = month; shownYear = yearNumber; renderMonth(); });
  renderMonth();
}
