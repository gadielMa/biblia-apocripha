#!/usr/bin/env python3
import html
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

class Reader(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tag = None
        self.buf = []
        self.chapters = []
        self.chapter = None
    def handle_starttag(self, tag, attrs):
        if tag in ("h2", "p"):
            self.tag, self.buf = tag, []
        elif self.tag == "p" and tag == "br":
            self.buf.append(" ")
    def handle_endtag(self, tag):
        if tag != self.tag:
            return
        text = re.sub(r"\s+", " ", html.unescape("".join(self.buf))).strip()
        active = self.tag
        self.tag = None
        if active == "h2":
            self.chapter = {"number": len(self.chapters) + 1, "title": text, "verses": []}
            self.chapters.append(self.chapter)
        elif self.chapter and text and not text.startswith("Pages ") and text != "The Gospel":
            self.chapter["verses"].append({"number": str(len(self.chapter["verses"]) + 1), "text": text})
    def handle_data(self, data):
        if self.tag:
            self.buf.append(data)

reader = Reader()
reader.feed(Path(sys.argv[1]).read_text())
chapters = [chapter for chapter in reader.chapters if chapter["verses"]]
chapters = [chapter for chapter in chapters if chapter["title"] not in ("Contents", "Bookmarks", "Notes on Translation")]
if len(chapters) != 5:
    raise SystemExit(f"Se esperaban 5 secciones con texto; se detectaron {[(c['title'], len(c['verses'])) for c in chapters]}")
for number, chapter in enumerate(chapters, start=1):
    chapter["number"] = number
work = {
    "id": "gospel-mary",
    "title": "Gospel of Mary",
    "language": "en",
    "sourceLanguage": "Coptic (Papyrus Berolinensis 8502, 1)",
    "translator": "Mark M. Mattison",
    "publication": "The Gnostic Gospels",
    "license": "Public-domain translation, as dedicated by the translator.",
    "sourceUrl": "https://thegnosticgospels.org/gospels/gospel-of-mary/",
    "scopeNote": "El manuscrito conservado tiene lagunas: faltan las páginas 1–6 y 11–14. Las secciones y pasajes son divisiones editoriales para lectura y búsqueda.",
    "chapters": chapters,
}
Path(sys.argv[2]).write_text(json.dumps(work, ensure_ascii=False, indent=2) + "\n")
print(f"Importadas {len(chapters)} secciones y {sum(len(c['verses']) for c in chapters)} pasajes.")
