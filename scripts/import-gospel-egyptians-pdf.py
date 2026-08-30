#!/usr/bin/env python3
"""Estructura la edición española incluida en el PDF del proyecto."""
import json
import re
import sys
from pathlib import Path

from pypdf import PdfReader

pages = [page.extract_text() or "" for page in PdfReader(sys.argv[1]).pages]
text = "\n".join(pages)
text = re.sub(r"\n\d+\s*$", "", text, flags=re.M)
start = text.index("CAPÍTULO 1")
text = text[start:]
parts = re.split(r"(?=CAPÍTULO \d+\n)", text)
chapters = []
for part in parts:
    match = re.match(r"CAPÍTULO (\d+)\n([^\n]+)\n(.*)", part, re.S)
    if not match:
        continue
    number, title, body = match.groups()
    body = re.sub(r"\n\d+\s*$", "", body).strip()
    paragraphs = [re.sub(r"\s+", " ", paragraph).strip() for paragraph in body.splitlines() if paragraph.strip()]
    chapters.append({"number": int(number), "title": title, "verses": [{"number": str(i + 1), "text": paragraph} for i, paragraph in enumerate(paragraphs)]})

if len(chapters) != 7:
    raise SystemExit(f"Se esperaban 7 capítulos; se detectaron {len(chapters)}")
work = {
    "id": "gospel-egyptians-es",
    "title": "Evangelio copto de los Egipcios",
    "language": "es",
    "sourceLanguage": "Copto (NHC III,2)",
    "translator": "Edición española incluida en el proyecto",
    "publication": "PDF local del proyecto",
    "license": "Edición aportada en este repositorio; su texto se conserva como transcripción de la edición local.",
    "sourceUrl": "../pdfs/evangelio-egipcios.pdf",
    "scopeNote": "Esta edición local organiza el texto en siete capítulos. La versificación es editorial para lectura y búsqueda; no sustituye una edición crítica del manuscrito copto.",
    "chapters": chapters,
}
Path(sys.argv[2]).write_text(json.dumps(work, ensure_ascii=False, indent=2) + "\n")
print(f"Importados {len(chapters)} capítulos y {sum(len(c['verses']) for c in chapters)} pasajes.")
