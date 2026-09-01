#!/usr/bin/env python3
"""Convierte la edición pública de The Gnostic Gospels a JSON del lector."""
import html
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path


class ActsReader(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.tag = None
        self.buffer = []
        self.chapters = []
        self.current = None
        self.body_depth = 0

    def handle_starttag(self, tag, attrs):
        if tag == "div":
            classes = dict(attrs).get("class", "").split()
            if "gospel-body" in classes:
                self.body_depth = 1
            elif self.body_depth:
                self.body_depth += 1
        if self.body_depth and tag in {"h2", "h3", "p"}:
            self.tag, self.buffer = tag, []
        elif self.body_depth and tag == "br" and self.tag == "p":
            self.buffer.append(" ")

    def handle_endtag(self, tag):
        if tag == "div" and self.body_depth:
            self.body_depth -= 1
            if self.body_depth == 0:
                self.tag = None
            return
        if tag != self.tag:
            return
        text = re.sub(r"\s+", " ", html.unescape("".join(self.buffer))).strip()
        self.tag = None
        if not text:
            return
        if tag in {"h2", "h3"}:
            self.current = {"number": len(self.chapters) + 1, "title": text, "verses": []}
            self.chapters.append(self.current)
        elif tag == "p" and self.current:
            self.current["verses"].append(
                {"number": str(len(self.current["verses"]) + 1), "text": text}
            )

    def handle_data(self, data):
        if self.tag:
            self.buffer.append(data)


if len(sys.argv) not in {7, 8}:
    raise SystemExit("Uso: import-acts-peter.py fuente.html salida.json id titulo idioma-fuente url [numeracion-original]")

source_path, output_path, work_id, title, source_language, source_url = sys.argv[1:7]
preserve_numeric_titles = len(sys.argv) == 8 and sys.argv[7] == "numeracion-original"

reader = ActsReader()
reader.feed(Path(source_path).read_text())
skip_titles = {"Notes on the translation", "Footnotes"}
chapters = [
    chapter
    for chapter in reader.chapters
    if chapter["verses"] and chapter["title"] not in skip_titles
]
for number, chapter in enumerate(chapters, 1):
    chapter["number"] = int(chapter["title"]) if preserve_numeric_titles and chapter["title"].isdigit() else number

if len(chapters) < 20:
    raise SystemExit(f"Extracción incompleta: solo {len(chapters)} secciones.")

work = {
    "id": work_id,
    "title": title,
    "language": "en",
    "sourceLanguage": source_language,
    "translator": "M. R. James (1924)",
    "publication": "The Apocryphal New Testament (1924), reproduced by The Gnostic Gospels",
    "license": "Public-domain historical translation, as dedicated by The Gnostic Gospels.",
    "sourceUrl": source_url,
    "scopeNote": "Las secciones y pasajes son divisiones editoriales para lectura y búsqueda. Se conservan las lagunas, notas y alternativas de la edición fuente cuando aparecen en el texto.",
    "chapters": chapters,
}
Path(output_path).write_text(json.dumps(work, ensure_ascii=False, indent=2) + "\n")
print(f"Importadas {len(chapters)} secciones y {sum(len(c['verses']) for c in chapters)} pasajes.")
