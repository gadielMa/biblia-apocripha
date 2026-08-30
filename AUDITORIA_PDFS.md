# Auditoría de textos y fuentes

Estado inicial: 2026-08-29.

Esta auditoría separa **el texto antiguo** de una **edición o traducción**. Un PDF
breve no se considera una edición completa sólo por llevar el título de la obra.
Antes de importar, convertir o traducir un texto se debe verificar la licencia de
la edición concreta.

## Diagnóstico del repositorio

- 59 archivos PDF.
- 45 tienen 10 páginas o menos.
- 33 tienen 5 páginas o menos.
- La mediana es 5 páginas.

Los siguientes estados se usan en el trabajo:

- `pendiente`: falta comparar el archivo local contra un texto de referencia.
- `abreviado`: la extensión actual es incompatible con una edición íntegra.
- `fuente abierta`: hay una fuente reutilizable identificada; todavía no se copió.
- `no importar aún`: hay texto para consulta, pero la licencia o la edición no
  permite aún incorporarlo al sitio.

## Lote 1 — prioridad alta

| Obra | PDF actual | Diagnóstico | Fuente de referencia | Estado |
|---|---:|---|---|---|
| 1 Enoc | 70 págs. | Debe cotejarse contra sus 108 capítulos antes de llamarlo completo. | [Project Gutenberg — R. H. Charles, dominio público](https://www.gutenberg.org/ebooks/77935) | fuente abierta |
| 2 Enoc / Enoc eslavo | 4 págs. | El PDF continúa abreviado, pero la web ya incluye lector HTML completo: 68 capítulos y 321 versículos. | [Wikisource — edición de 1928](https://en.wikisource.org/wiki/The_Forgotten_Books_of_Eden/The_Book_of_the_Secrets_of_Enoch) | incorporado en HTML |
| 3 Enoc / Sefer Hekhalot | 3 págs. | El PDF es una síntesis de 8 capítulos seleccionados; la web incluye ahora el texto de Odeberg: 53 secciones (capítulos 1–48 y sub-secciones tradicionales) y 352 versículos. | [Internet Archive — Odeberg, 1928](https://archive.org/details/HebrewBookOfEnochenoch3) | incorporado en HTML |
| 2 Baruc | 3 págs. | Abreviado. | [Online Critical Pseudepigrapha — TEI/XML abierto](https://pseudepigrapha.org/) | fuente abierta |
| 3 Baruc | 4 págs. | Abreviado. | [Online Critical Pseudepigrapha — TEI/XML abierto](https://pseudepigrapha.org/) | fuente abierta |
| 3 Macabeos | 3 págs. | Abreviado. | [Online Critical Pseudepigrapha — edición abierta](https://pseudepigrapha.org/) | fuente abierta |
| 4 Macabeos | 4 págs. | Abreviado. | [Online Critical Pseudepigrapha — edición abierta](https://pseudepigrapha.org/) | fuente abierta |
| 4 Esdras | 5 págs. | Abreviado. | [Online Critical Pseudepigrapha — edición abierta](https://pseudepigrapha.org/) | fuente abierta |
| Apocalipsis de Abraham | 5 págs. | Abreviado. | [R. H. Charles, edición anterior a 1923 en Wikimedia Commons](https://commons.wikimedia.org/wiki/File:The_Apocalypse_of_Abraham_(IA_apocalypseofabra00boxg).pdf) | fuente abierta |
| Testamento de Moisés | 4 págs. | Abreviado; conservar la nota de que el texto transmitido es incompleto. | [CCEL — R. H. Charles, dominio público](https://www.ccel.org/c/charles/pseudepigrapha/index.html) | fuente abierta |
| Testamento de Abraham | 5 págs. | Abreviado. | [Wikisource — *Ante-Nicene Fathers*, versión inglesa](https://en.wikisource.org/wiki/Ante-Nicene_Fathers/Volume_IX/The_Testament_of_Abraham/The_Testament_of_Abraham/Version_I) | fuente abierta |
| Testamento de Job | 5 págs. | Abreviado. | [Online Critical Pseudepigrapha — edición abierta](https://pseudepigrapha.org/docs/text/TJob) | fuente abierta |

## Estrategia de publicación

1. Conservar cada PDF actual hasta contar con una sustitución verificada.
2. Incorporar el texto como HTML estructurado por capítulo y versículo/sección.
3. Mostrar siempre edición, traductor, idioma fuente, licencia y enlace de origen.
4. Añadir búsqueda local sólo para HTML propio; no prometer búsqueda por versos
   en un PDF.
5. Traducir al español únicamente textos de dominio público o con licencia que
   permita obras derivadas; indicar la traducción de la biblioteca y revisar su
   fidelidad antes de publicarla.

## Próximo lote

Apocalipsis de Pedro y Pablo, Hechos de Andrés/Pedro/Tomás, Evangelios de
Felipe/Judas/Tomás, Didaché, Carta de Bernabé, Documento de Damasco, Regla de
la Comunidad y Guerra de los Hijos de la Luz.
