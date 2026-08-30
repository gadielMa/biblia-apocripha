# Biblioteca Bíblica Universal

Biblioteca web de estudio que reúne cánones bíblicos, deuterocanónicos, apócrifos, pseudoepígrafos, literatura cristiana primitiva y manuscritos de Qumrán.

## Estado actual

- Sitio estático HTML/CSS/JavaScript con búsqueda, filtros, ordenamiento y vista compacta.
- 46 PDFs locales y enlaces externos a BibleGateway, Wikisource, Google Books y fuentes institucionales.
- Etiquetas diferenciadas para **PDF**, **BibleGateway** y **Leer texto**.
- Colecciones católica, etíope, ortodoxa oriental, gnóstica, cristiana primitiva, pseudoepigráfica y de Qumrán.

## Política de fuentes

Los PDFs locales solo se incorporan cuando su licencia o condición de dominio público es clara. El resto se enlaza externamente con atribución. Cada registro debe distinguir entre PDF, texto HTML, BibleGateway y recurso pendiente.

## Roadmap

### Fase 1 — Lector interno

- Vista de lectura dentro de `/biblia/`, con navegación por capítulos o secciones.
- Tamaño de letra, ancho de lectura, modo oscuro y modo sepia.
- Búsqueda dentro del texto y URLs compartibles por obra.
- PDFs descargables y textos HTML identificados con su fuente.

### Fase 2 — Datos y descubrimiento

- Normalizar título, alias, tradición, fecha, idioma, fuente, licencia y estado.
- Corregir enlaces que presentan obras no canónicas como RVR1960.
- Filtros combinables, fichas individuales, bibliografía y referencias cruzadas.
- Comparador de cánones y cronología visual.

### Fase 3 — Experiencia de aplicación

- PWA instalable, lectura offline de recursos permitidos, favoritos e historial.
- Importación/exportación de favoritos en JSON.
- Mejoras responsive, accesibilidad WCAG básica y estadísticas por tradición, idioma y siglo.

### Fase 4 — Contenido diferencial de Induliru

- Introducciones editoriales, notas históricas, glosario, mapas y cronologías.
- Bibliografía verificable y página metodológica sobre canon, deuterocanon, apócrifos y pseudoepígrafos.

## Estructura

- `index.html`: interfaz, estilos, catálogo y comportamiento.
- `data.json` / `data.csv`: fuentes estructuradas del catálogo.
- `pdfs/`: archivos PDF alojados localmente.

## Desarrollo y calidad

Abrir `index.html` directamente o servir el directorio con cualquier servidor estático. Publicar haciendo push a `main`; GitHub Pages sirve el repositorio.

Antes de publicar, verificar enlaces, búsqueda, filtros, vista móvil y ejecutar `git diff --check`. Ningún texto no canónico debe presentarse como parte de RVR1960.

## Enlaces

- [Sitio publicado](https://gadielMa.github.io/biblia-apocripha)
- [Repositorio](https://github.com/gadielMa/biblia-apocripha)
