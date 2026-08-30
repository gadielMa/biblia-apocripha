#!/usr/bin/env python3
import json
import re
import sys
from pathlib import Path

source = Path(sys.argv[1]).read_text()
section = source[source.index("\\c 151"):]
verses = []
verse = None
for line in section.splitlines():
    match = re.match(r"\\v\s+(\d+)\s*(.*)", line)
    if match:
        number, text = match.groups()
        text = re.sub(r"\\f\s.*?\\f\*", "", text)
        text = re.sub(r"\\[a-z0-9]+\*?", "", text, flags=re.I)
        verse = {"number": number, "text": re.sub(r"\s+", " ", text).strip()}
        verses.append(verse)
    elif verse and line.strip() and not line.startswith("\\"):
        verse["text"] += " " + line.strip()

if len(verses) != 7:
    raise SystemExit(f"Se esperaban 7 versículos y se detectaron {len(verses)}")
work = {
    "id": "psalm-151",
    "title": "Psalm 151",
    "language": "en",
    "sourceLanguage": "Greek (with a Hebrew witness at Qumran)",
    "translator": "Sir Lancelot C. L. Brenton (1851)",
    "publication": "Brenton English Septuagint",
    "license": "Public domain (eBible.org record for the Brenton English Septuagint).",
    "sourceUrl": "https://ebible.org/eng-Brenton/",
    "chapters": [{"number": 151, "title": "Psalm 151", "verses": verses}],
}
Path(sys.argv[2]).write_text(json.dumps(work, ensure_ascii=False, indent=2) + "\n")
print("Importados 1 salmo y 7 versículos.")
