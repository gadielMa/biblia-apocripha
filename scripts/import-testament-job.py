#!/usr/bin/env python3
"""Importa la traducción histórica de M. R. James del Testamento de Job."""
import html
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

class ParagraphReader(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.in_p = False
        self.buffer = []
        self.paragraphs = []
    def handle_starttag(self, tag, attrs):
        if tag == "p":
            self.in_p, self.buffer = True, []
    def handle_endtag(self, tag):
        if tag == "p" and self.in_p:
            text = re.sub(r"\s+", " ", "".join(self.buffer)).strip()
            if text:
                self.paragraphs.append(html.unescape(text))
            self.in_p = False
    def handle_data(self, data):
        if self.in_p:
            self.buffer.append(data)

reader = ParagraphReader()
reader.feed(Path(sys.argv[1]).read_text())
chapters, current = [], None
for paragraph in reader.paragraphs:
    heading = re.fullmatch(r"Chapter\s+(\d+)", paragraph, re.I)
    if heading:
        current = {"number": int(heading.group(1)), "title": f"Chapter {heading.group(1)}", "verses": []}
        chapters.append(current)
        continue
    if paragraph.startswith("Scanned and edited by"):
        break
    if not current:
        continue
    # Mantiene cada bloque de la edición y, cuando hay numeración impresa,
    # lo separa para que la búsqueda pueda apuntar a pasajes cortos.
    chunks = re.split(r"(?=\b\d+\s+)", paragraph)
    for chunk in chunks:
        chunk = chunk.strip()
        if chunk:
            current["verses"].append({"number": str(len(current["verses"]) + 1), "text": chunk})

if len(chapters) != 12 or any(not chapter["verses"] for chapter in chapters):
    raise SystemExit(f"Extracción incompleta: {len(chapters)} capítulos")

work = {
    "id": "testament-job",
    "title": "Testament of Job",
    "language": "en",
    "sourceLanguage": "Greek",
    "translator": "M. R. James (1897)",
    "publication": "Apocrypha Anecdota II, Texts and Studies 5/1 (1897)",
    "license": "Public-domain historical translation.",
    "sourceUrl": "https://wesley.nnu.edu/sermons-essays-books/noncanonical-literature/noncanonical-literature-ot-pseudepigrapha/testament-of-job/",
    "scopeNote": "Verse numbers are editorial passage divisions for reading and search. They do not claim a single ancient canonical numeration.",
    "chapters": chapters,
}
Path(sys.argv[2]).write_text(json.dumps(work, ensure_ascii=False, indent=2) + "\n")
print(f"Importados {len(chapters)} capítulos y {sum(len(c['verses']) for c in chapters)} pasajes.")
