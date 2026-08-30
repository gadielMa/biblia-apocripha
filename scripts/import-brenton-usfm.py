#!/usr/bin/env python3
"""Convierte una obra de la edición Brenton (USFM) al formato del lector."""
import json
import re
import sys
from pathlib import Path

if len(sys.argv) != 7:
    raise SystemExit("Uso: import-brenton-usfm.py <fuente.usfm> <salida.json> <id> <título> <idioma-fuente> <publicación>")

source_path, output_path, work_id, title, source_language, publication = sys.argv[1:]
chapters = []
current = None
verse = None

def clean(text):
    text = re.sub(r"\\f\s.*?\\f\\*", "", text)
    text = re.sub(r"\\[a-z0-9]+\*?", "", text, flags=re.I)
    return re.sub(r"\s+", " ", text).strip()

for line in Path(source_path).read_text().splitlines():
    chapter = re.match(r"\\c\s+(\d+)", line)
    if chapter:
        number = int(chapter.group(1))
        current = {"number": number, "title": f"Capítulo {number}", "verses": []}
        chapters.append(current)
        verse = None
        continue
    match = re.match(r"\\v\s+(\d+)\s*(.*)", line)
    if match and current:
        number, text = match.groups()
        verse = {"number": number, "text": clean(text)}
        current["verses"].append(verse)
    elif verse and line.strip() and not line.startswith("\\"):
        verse["text"] = clean(verse["text"] + " " + line)

if not chapters or not all(chapter["verses"] for chapter in chapters):
    raise SystemExit("No se detectaron capítulos y versículos válidos.")

work = {
    "id": work_id,
    "title": title,
    "language": "en",
    "sourceLanguage": source_language,
    "translator": "Sir Lancelot C. L. Brenton (1851)",
    "publication": publication,
    "license": "Public domain (eBible.org record for the Brenton English Septuagint).",
    "sourceUrl": "https://ebible.org/eng-Brenton/",
    "chapters": chapters,
}
Path(output_path).write_text(json.dumps(work, ensure_ascii=False, indent=2) + "\n")
print(f"Importados {len(chapters)} capítulos y {sum(len(chapter['verses']) for chapter in chapters)} versículos.")
