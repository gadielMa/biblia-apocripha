#!/usr/bin/env python3
"""Genera una edición española local a partir de una obra JSON en inglés.

Requiere Argos Translate con el modelo en→es instalado localmente. El resultado
se marca como traducción automática para que pueda revisarse antes de presentarlo
como una edición crítica.
"""
import json
import sys
from copy import deepcopy
from pathlib import Path

try:
    import argostranslate.translate
except ImportError as error:
    raise SystemExit("Falta argostranslate. Instalalo en un entorno local antes de ejecutar este script.") from error

if len(sys.argv) not in (3, 5):
    raise SystemExit("Uso: translate-text.py <obra.en.json> <obra.es.json> [capítulo-inicial capítulo-final]")

source_path, output_path = map(Path, sys.argv[1:3])
source = json.loads(source_path.read_text())
start = int(sys.argv[3]) if len(sys.argv) == 5 else 1
end = int(sys.argv[4]) if len(sys.argv) == 5 else len(source["chapters"])
translated = json.loads(output_path.read_text()) if output_path.exists() else deepcopy(source)
translated["id"] = f"{source['id']}-es"
translated["language"] = "es"
translated["title"] = {
    "1-enoc": "1 Enoc",
    "2-enoc": "2 Enoc (Libro de los Secretos de Enoc)",
    "3-enoc": "3 Enoc (Libro hebreo de Enoc / Sefer Hekhalot)",
    "proto-james": "Protoevangelio de Santiago",
    "nicodemus": "Evangelio de Nicodemo (Hechos de Pilato)",
    "infancy-thomas": "Evangelio de la Infancia de Tomás",
    "didache": "Didaché (Doctrina de los Doce Apóstoles)",
    "ascension-isaiah": "Ascensión de Isaías",
    "hermas": "Pastor de Hermas",
    "barnabas": "Epístola de Bernabé",
    "apocalypse-peter": "Apocalipsis de Pedro",
    "gospel-peter": "Evangelio de Pedro",
    "1-clement": "1 Clemente",
    "paul-thecla": "Hechos de Pablo y Tecla",
    "apocalypse-paul": "Apocalipsis de Pablo",
    "psalms-solomon": "Salmos de Salomón",
    "testament-abraham": "Testamento de Abraham",
}.get(source["id"], source["title"])
translated["translator"] = "Traducción automática local (Argos Translate), pendiente de revisión humana"
translated["translationNote"] = (
    "Traducción automática inicial desde la edición inglesa indicada. "
    "No es una traducción crítica ni sustituye el texto fuente."
)

for chapter_index, chapter in enumerate(translated["chapters"], start=1):
    if not start <= chapter_index <= end:
        continue
    verses = chapter.get("verses") or []
    for verse in verses:
        verse["text"] = argostranslate.translate.translate(verse["text"], "en", "es")
    print(f"Capítulo {chapter_index}/{len(translated['chapters'])} traducido.", flush=True)

translated["translationProgress"] = {"completedThroughChapter": end, "totalChapters": len(translated["chapters"])}
output_path.write_text(json.dumps(translated, ensure_ascii=False, indent=2) + "\n")

count = sum(len(chapter.get("verses") or []) for chapter in translated["chapters"])
print(f"Traducida {translated['title']}: {count} versículos.")
