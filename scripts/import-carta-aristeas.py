#!/usr/bin/env python3
"""Convierte la selección española local de la Carta de Aristeas a JSON."""
import json, re, sys
from pathlib import Path
from pypdf import PdfReader

raw = "\n".join(page.extract_text() or "" for page in PdfReader(sys.argv[1]).pages)
raw = re.sub(r"\n\d+\s*$", "", raw, flags=re.M)
parts = re.split(r"(?=CAPITULO \d+\n)", raw[raw.index("CAPITULO 1"):])
chapters = []
for part in parts:
    m = re.match(r"CAPITULO (\d+)\n([^\n]+)\n(.*)", part, re.S)
    if not m:
        continue
    number, title, body = m.groups()
    paragraphs = [re.sub(r"\s+", " ", line).strip() for line in body.splitlines() if line.strip()]
    chapters.append({"number": int(number), "title": title.strip(), "verses": [{"number": str(i + 1), "text": text} for i, text in enumerate(paragraphs)]})
if len(chapters) != 8:
    raise SystemExit(f"Se esperaban 8 capítulos; se detectaron {len(chapters)}")
work = {
    "id": "carta-aristeas-es", "title": "Carta de Aristeas", "language": "es",
    "sourceLanguage": "Griego", "translator": "Edición española incluida en el proyecto",
    "publication": "Selección local de 8 capítulos", "license": "Edición aportada en este repositorio; conservar como transcripción de la edición local.",
    "sourceUrl": "../pdfs/carta-aristeas.pdf",
    "scopeNote": "Selección local de ocho capítulos; la numeración de pasajes es editorial para facilitar la lectura y la búsqueda.",
    "chapters": chapters,
}
Path(sys.argv[2]).write_text(json.dumps(work, ensure_ascii=False, indent=2) + "\n")
print(f"Importados {len(chapters)} capítulos y {sum(len(c['verses']) for c in chapters)} pasajes.")
