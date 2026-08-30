#!/usr/bin/env python3
"""Importa 2 Esdras (la forma inglesa que conserva 4 Esdras) de Gutenberg."""
import json
import re
import sys
from pathlib import Path

source = Path(sys.argv[1]).read_text()
start = source.index("The Second Book of Esdras", source.index("The Second Book of Esdras") + 1)
end = source.index("The book of the words of Tobit", start)
section = source[start:end]

chapters = []
current = None
verse = None
for line in section.splitlines():
    match = re.match(r"^(\d+):(\d+)\s+(.+)", line)
    if match:
        chapter_number, verse_number, text = match.groups()
        chapter_number = int(chapter_number)
        if current is None or current["number"] != chapter_number:
            current = {"number": chapter_number, "title": f"Capítulo {chapter_number}", "verses": []}
            chapters.append(current)
        verse = {"number": verse_number, "text": text}
        current["verses"].append(verse)
    elif verse and line.strip():
        verse["text"] += " " + line.strip()

for chapter in chapters:
    for verse in chapter["verses"]:
        verse["text"] = re.sub(r"\s+", " ", verse["text"]).strip()

if len(chapters) != 16 or [chapter["number"] for chapter in chapters] != list(range(1, 17)):
    raise SystemExit(f"Se esperaban los 16 capítulos de 2 Esdras; se detectaron {[chapter['number'] for chapter in chapters]}")

work = {
    "id": "4-esdras",
    "title": "4 Ezra (2 Esdras in the King James Apocrypha)",
    "language": "en",
    "sourceLanguage": "Latin, with lost Greek and Hebrew/Aramaic antecedents",
    "translator": "King James Version Apocrypha (1611)",
    "publication": "Deuterocanonical Books of the Bible, Project Gutenberg eBook 124",
    "license": "Public domain in the United States (Project Gutenberg record).",
    "sourceUrl": "https://www.gutenberg.org/ebooks/124",
    "scopeNote": "Esta edición inglesa transmite 4 Esdras como 2 Esdras: los capítulos 3–14 son el núcleo de 4 Esdras; 1–2 y 15–16 son adiciones latinas tradicionales.",
    "chapters": chapters,
}
Path(sys.argv[2]).write_text(json.dumps(work, ensure_ascii=False, indent=2) + "\n")
print(f"Importados {len(chapters)} capítulos y {sum(len(chapter['verses']) for chapter in chapters)} versículos.")
