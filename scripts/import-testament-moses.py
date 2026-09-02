#!/usr/bin/env python3
"""Convierte la edición pública de Charles, extraída a texto, al formato del lector."""
import json
import re
import sys
from pathlib import Path

source = Path(sys.argv[1]).read_text()
start = re.search(r"THE ASSUMPTION OF MOSES\s+also known as", source)
if not start:
    raise SystemExit("No se encontró el inicio del Testamento de Moisés")
end = source.index("THE BOOK OF JUBILEES", start.end())
source = source[start.start():end]

# Se excluyen portada, atribución y paginación de la antología; queda únicamente
# el texto transmitido, desde el capítulo 1 al punto en que se corta el manuscrito.
text_start = re.search(r"1\s+The Testament of Moses", source)
if not text_start:
    raise SystemExit("No se encontró el comienzo del capítulo 1")
source = source[text_start.start():]
source = source.replace("\f", "\n")
source = re.sub(r"(?m)^\s*1(?:77|78|79|80|81)\s*$", "", source)
source = re.sub(r"\s+", " ", source).strip()
source = re.sub(r"\s+182\s*$", "", source)

starts = list(re.finditer(
    r"(?<!\S)(?P<number>1[0-2]|[1-9])\s*(?=(?:The Testament|And now|And in those|Then there|And when|And there|Then in that|And then))",
    source,
))
if len(starts) != 12:
    raise SystemExit(f"Extracción incompleta: se esperaban 12 capítulos y se detectaron {len(starts)}")

chapters = []
for index, match in enumerate(starts):
    number = int(match.group("number"))
    finish = starts[index + 1].start() if index + 1 < len(starts) else len(source)
    text = source[match.end():finish].strip()
    # Los números de versículo no existen en el manuscrito. Estas divisiones
    # editoriales (hasta tres frases) permiten lectura y búsqueda granular.
    sentences = re.split(r"(?<=[.!?])\s+(?=[A-Z'(])", text)
    verses = []
    for offset in range(0, len(sentences), 3):
        passage = " ".join(sentences[offset:offset + 3]).strip()
        if passage:
            verses.append({"number": str(len(verses) + 1), "text": passage})
    chapters.append({"number": number, "title": f"Chapter {number}", "verses": verses})

work = {
    "id": "testament-moses",
    "title": "Testament of Moses (Assumption of Moses)",
    "language": "en",
    "sourceLanguage": "Latin (surviving manuscript; probably translated from Greek or a Semitic original)",
    "translator": "R. H. Charles (1913)",
    "publication": "The Apocrypha and Pseudepigrapha of the Old Testament, vol. 2 (1913)",
    "license": "Public-domain historical translation.",
    "sourceUrl": "https://pathoftorah.com/pdf/ebooks/apocrypha_and_psuedepigrapha/assumption_of_moses.pdf",
    "scopeNote": "The surviving manuscript breaks off during chapter 12. Verse numbers are editorial divisions added for reading and search, not ancient numeration.",
    "chapters": chapters,
}
Path(sys.argv[2]).write_text(json.dumps(work, ensure_ascii=False, indent=2) + "\n")
print(f"Importados {len(chapters)} capítulos y {sum(len(c['verses']) for c in chapters)} pasajes.")
