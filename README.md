# Biblioteca Bíblica Universal

Tabla interactiva de cánones bíblicos y textos apócrifos con acceso directo a PDFs locales.

La aplicación funciona como PWA instalable y adapta el catálogo a tarjetas en pantalla móvil. Los enlaces externos a BibleGateway se retiraron porque no representan de forma fiable todos los cánones del catálogo.

## Contenido

- **59 archivos PDF** en el repositorio (56 obras enlazadas en el catálogo)
- **141 textos visibles** organizados por grupo y canon

El estado de completitud de cada archivo y las fuentes abiertas candidatas se
mantienen en [AUDITORIA_PDFS.md](AUDITORIA_PDFS.md).

Las ausencias relevantes y el alcance respecto del Tanaj y el Corán se documentan
en [LACUNAS_CATALOGO.md](LACUNAS_CATALOGO.md).

## Textos buscables

El inicio también busca dentro de los textos que ya fueron importados a HTML/JSON.
Por ahora incluye **1 Enoc** (108 capítulos), **2 Enoc** (68 capítulos) y **3 Enoc**
(48 capítulos con sub-secciones tradicionales) en inglés,
con lector propio y referencias por
capítulo:versículo. Cuando una fuente no trae versificación, el proyecto asigna
divisiones editoriales; se distinguen con letras, por ejemplo `3a`.
Cada obra futura debe conservar la estructura de `textos/1-enoc.en.json` y figurar en
`textos/catalog.json`; luego ejecutar `node scripts/build-search-index.mjs` para que
la búsqueda global la incorpore.

2 Enoc también tiene una edición española automática completa, señalada como
pendiente de revisión; los capítulos 1–22 cuentan además con un borrador de
revisión humana en `textos/borradores/`.

El Protoevangelio de Santiago ya está incorporado en inglés (25 capítulos) y en
una edición española automática inicial.
También están incorporados el Evangelio de Nicodemo (20 capítulos) y el Evangelio
de la Infancia de Tomás (tres formas históricas: griega A, griega B y latina; 45
secciones), ambos con edición inglesa histórica y traducción automática inicial
al español.
La Didaché (Doctrina de los Doce Apóstoles) también está disponible en sus 16
capítulos, en inglés y con traducción automática inicial al español.
La Ascensión de Isaías está incorporada en 11 capítulos (296 versículos), a
partir de la edición inglesa de R. H. Charles (1900), con traducción automática
inicial al español.
El Pastor de Hermas está incorporado en sus tres partes (Visiones, Mandatos y
Semejanzas), con 100 secciones y traducción automática inicial al español.
La Epístola de Bernabé está incorporada en 21 capítulos y 199 versículos, con
traducción automática inicial al español.
El Apocalipsis de Pedro está incorporado en sus fragmentos griego, etíope y
testimoniales de la edición de 1924, organizados en 5 secciones y 124 pasajes.
El Evangelio de Pedro está incorporado como el Fragmento I de la edición de
1924, con 11 secciones y traducción automática inicial al español.
1 Clemente está incorporada en 65 capítulos y 393 versículos, con traducción
automática inicial al español.
Los Hechos de Pablo y Tecla están incorporados en 11 capítulos y 170 versículos,
con traducción automática inicial al español.
El Apocalipsis de Pablo está incorporado desde la edición de 1924, con 89
pasajes organizados en su visión principal y traducción automática inicial.
Los Salmos de Salomón están incorporados en sus 18 salmos, con traducción
automática inicial al español.
El Testamento de Abraham está incorporado en 20 capítulos, con traducción
automática inicial al español.
La Vida de Adán y Eva (Apocalipsis de Moisés) está incorporada en 43 capítulos
y 158 versículos, con traducción automática inicial al español.
4 Esdras está incorporado desde la edición inglesa pública que lo transmite como
2 Esdras (16 capítulos y 874 versículos); su ficha diferencia el núcleo de 4
Esdras de las adiciones latinas tradicionales y ofrece traducción automática inicial.
3 Macabeos también está incorporado desde la Septuaginta inglesa de Brenton (1851),
en sus 7 capítulos y con traducción automática inicial al español.
La misma edición pública incorpora 4 Macabeos (18 capítulos, 483 versículos) y la
Oración de Manasés (15 versículos), ambas con traducción automática inicial al español.
Salmo 151 está disponible por separado en sus 7 versículos, tal como lo transmite
la Septuaginta de Brenton, también con una traducción automática inicial.

## Grupos

| Grupo | Descripción |
|---|---|
| Torá / Antiguo Testamento | Los 5 libros de Moisés |
| Antiguo Testamento | Resto del Tanaj (34 libros) |
| Deuterocanónicos | 7 libros católicos no en el Tanaj |
| Nuevo Testamento | 27 libros del NT |
| Antiguo Testamento Etíope | 5 libros exclusivos del canon etíope |
| Nuevo Testamento Etíope | 6 libros litúrgicos etíopes |
| Evangelios Gnósticos / Nag Hammadi | Textos de Nag Hammadi |
| Apócrifos del NT | Hechos, Apocalipsis y Epístolas apócrifas |
| Literatura Cristiana Primitiva | Didaché, 1 Clemente, Bernabé, Hermas |
| Pseudoepígrafos del Segundo Templo | Enoc, Testamentos, Odas, etc. |
| Textos de Qumrán / Rollos del Mar Muerto | DSS: 1QS, 1QM, 1QpHab, 1QH, CD |
| Canon Ortodoxo Oriental | 3 y 4 Macabeos, Oración de Manasés, Salmo 151 |

## Uso

Abrir `index.html` en un navegador o visitar [GitHub Pages](https://gadielMa.github.io/biblia-apocripha).
