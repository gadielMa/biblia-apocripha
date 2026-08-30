#!/usr/bin/env python3
"""Inserta capítulos revisados en Markdown dentro de una edición JSON."""
import json
import re
import sys
from pathlib import Path

if len(sys.argv) != 3:
    raise SystemExit("Uso: apply-reviewed-markdown.py <borrador.md> <obra.es.json>")

markdown = Path(sys.argv[1]).read_text()
work_path = Path(sys.argv[2])
work = json.loads(work_path.read_text())
sections = re.split(r"^## Capítulo (\d+)\s*$", markdown, flags=re.M)
reviews = {}
for index in range(1, len(sections), 2):
    chapter = int(sections[index])
    content = sections[index + 1]
    verses = {
        number: re.sub(r"\s+", " ", text).strip()
        for number, text in re.findall(r"^\*\*(\d+)\.\*\*\s+(.+?)(?=^\*\*\d+\.\*\*|\Z)", content, re.M | re.S)
    }
    reviews[chapter] = verses

for chapter in work["chapters"]:
    reviewed = reviews.get(chapter["number"])
    if not reviewed:
        continue
    for verse in chapter["verses"]:
        if verse["number"] in reviewed:
            verse["text"] = reviewed[verse["number"]]
            verse["reviewed"] = True

work["translationProgress"]["humanReviewedThroughChapter"] = max(reviews)
work_path.write_text(json.dumps(work, ensure_ascii=False, indent=2) + "\n")
print(f"Aplicada revisión humana hasta el capítulo {max(reviews)}.")
