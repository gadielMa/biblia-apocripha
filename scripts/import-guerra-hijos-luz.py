#!/usr/bin/env python3
"""Convierte la selección española local del Rollo de la Guerra (1QM) a JSON."""
import json, re, sys
from pathlib import Path
from pypdf import PdfReader

raw = "\n".join(page.extract_text() or "" for page in PdfReader(sys.argv[1]).pages)
raw = re.sub(r"\n\d+\s*$", "", raw, flags=re.M)
parts = re.split(r"(?=COLUMNA \d+\n)", raw[raw.index("COLUMNA 1"):])
chapters = []
for part in parts:
    m = re.match(r"COLUMNA (\d+)\n([^\n]+)\n(.*)", part, re.S)
    if not m: continue
    number, title, body = m.groups()
    paragraphs = [re.sub(r"\s+", " ", line).strip() for line in body.splitlines() if line.strip()]
    chapters.append({"number": int(number), "title": title.strip(), "verses": [{"number": str(i + 1), "text": t} for i, t in enumerate(paragraphs)]})
if len(chapters) != 11: raise SystemExit(f"Se esperaban 11 columnas; se detectaron {len(chapters)}")
work = {"id":"guerra-hijos-luz-es", "title":"Guerra de los Hijos de la Luz contra los Hijos de las Tinieblas", "language":"es", "sourceLanguage":"Hebreo", "translator":"Edición española incluida en el proyecto", "publication":"Selección local de 11 columnas", "license":"Edición aportada en este repositorio; conservar como transcripción de la edición local.", "sourceUrl":"../pdfs/guerra-hijos-luz.pdf", "scopeNote":"Selección local de once columnas conservadas; la versificación es editorial para lectura y búsqueda.", "chapters":chapters}
Path(sys.argv[2]).write_text(json.dumps(work, ensure_ascii=False, indent=2) + "\n")
print(f"Importadas {len(chapters)} columnas y {sum(len(c['verses']) for c in chapters)} pasajes.")
