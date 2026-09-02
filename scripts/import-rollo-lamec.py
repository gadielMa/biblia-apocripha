#!/usr/bin/env python3
"""Convierte el texto local del Rollo de Lamec (1QapGen) a JSON."""
import json, re, sys
from pathlib import Path
from pypdf import PdfReader

raw = "\n".join(page.extract_text() or "" for page in PdfReader(sys.argv[1]).pages)
raw = re.sub(r"\n\d+\s*$", "", raw, flags=re.M)
parts = re.split(r"(?=CAPÍTULO \d+\n)", raw[raw.index("CAPÍTULO 1"):])
chapters = []
for part in parts:
    m = re.match(r"CAPÍTULO (\d+)\n([^\n]+)\n(.*)", part, re.S)
    if not m: continue
    number, title, body = m.groups()
    body = re.sub(r"\s+", " ", body).strip()
    bits = re.split(r"(?=(?:^| )\d{1,3}\s+)", body)
    verses = []
    for bit in bits:
        bit = bit.strip()
        marker = re.match(r"(\d{1,3})\s+(.*)", bit, re.S)
        if marker and marker.group(2).strip():
            verses.append({"number": marker.group(1), "text": marker.group(2).strip()})
    if not verses: verses = [{"number":"1", "text":body}]
    chapters.append({"number":int(number), "title":title.strip(), "verses":verses})
if len(chapters) != 16: raise SystemExit(f"Se esperaban 16 capítulos; se detectaron {len(chapters)}")
work = {"id":"rollo-lamec-es", "title":"Rollo de Lamec (parte del Génesis Apócrifo)", "language":"es", "sourceLanguage":"Arameo", "translator":"Edición española incluida en el proyecto", "publication":"Selección local de 16 capítulos", "license":"Edición aportada en este repositorio; conservar como transcripción de la edición local.", "sourceUrl":"../pdfs/rollo-de-lamec.pdf", "scopeNote":"Texto reconstruido del 1QapGen; los puntos suspensivos señalan lagunas del pergamino y la numeración conserva las divisiones editoriales.", "chapters":chapters}
Path(sys.argv[2]).write_text(json.dumps(work, ensure_ascii=False, indent=2) + "\n")
print(f"Importados {len(chapters)} capítulos y {sum(len(c['verses']) for c in chapters)} versículos.")
