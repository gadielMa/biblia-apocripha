#!/usr/bin/env python3
import html
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

if len(sys.argv) != 3:
    raise SystemExit('Uso: import-proto-james.py <pagina-renderizada.html> <salida.json>')

class Paragraphs(HTMLParser):
    def __init__(self):
        super().__init__(); self.in_p = False; self.buf = []; self.items = []
    def handle_starttag(self, tag, attrs):
        if tag == 'p': self.in_p = True; self.buf = []
    def handle_endtag(self, tag):
        if tag == 'p' and self.in_p:
            text = re.sub(r'\s+', ' ', ''.join(self.buf)).strip()
            if text: self.items.append(text)
            self.in_p = False
    def handle_data(self, data):
        if self.in_p: self.buf.append(data)

parser = Paragraphs()
parser.feed(Path(sys.argv[1]).read_text())
chapters = []
for index, text in enumerate(parser.items):
    match = re.fullmatch(r'CHAPTER ([IVXLCDM]+)\.', text)
    if match:
        values = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
        number = sum(-values[c] if i + 1 < len(match[1]) and values[c] < values[match[1][i + 1]] else values[c] for i, c in enumerate(match[1]))
        chapters.append({'number': number, 'paragraphs': []})
    elif chapters:
        text = re.sub(r'\[\d+\]', '', text)
        text = re.sub(r'\s+', ' ', text).strip()
        if text: chapters[-1]['paragraphs'].append(text)

chapters = [{'number': ch['number'], 'verses': [{'number': str(i + 1), 'text': text} for i, text in enumerate(ch['paragraphs'])]} for ch in chapters]
if len(chapters) != 25: raise SystemExit(f'Se esperaban 25 capítulos y se detectaron {len(chapters)}')
work = {'id': 'proto-james', 'title': 'Protoevangelium of James', 'language': 'en', 'sourceLanguage': 'Greek', 'translator': 'Jeremiah Jones (1722)', 'publication': 'The Apocryphal Gospels, public-domain translation', 'license': 'Public-domain translation; verify local status before redistribution.', 'sourceUrl': 'https://en.wikisource.org/wiki/The_Apocryphal_Gospels_and_other_documents_relating_to_the_History_of_Christ/The_Gospel_of_James', 'chapters': chapters}
Path(sys.argv[2]).write_text(json.dumps(work, ensure_ascii=False, indent=2) + '\n')
print(f'Importado: {len(chapters)} capítulos.')
