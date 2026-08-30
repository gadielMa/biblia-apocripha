#!/usr/bin/env python3
import json, re, sys
from html.parser import HTMLParser
from pathlib import Path

if len(sys.argv) != 3:
    raise SystemExit('Uso: import-infancy-thomas.py <pagina-renderizada.html> <salida.json>')

class Paragraphs(HTMLParser):
    def __init__(self):
        super().__init__(); self.in_p = False; self.buf = []; self.items = []
    def handle_starttag(self, tag, attrs):
        if tag == 'p': self.in_p, self.buf = True, []
    def handle_endtag(self, tag):
        if tag == 'p' and self.in_p:
            text = re.sub(r'\s+', ' ', ''.join(self.buf)).strip()
            if text: self.items.append(text)
            self.in_p = False
    def handle_data(self, data):
        if self.in_p: self.buf.append(data)

def roman(s):
    vals = {'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000}
    return sum(-vals[c] if i+1 < len(s) and vals[c] < vals[s[i+1]] else vals[c] for i,c in enumerate(s))

p = Paragraphs(); p.feed(Path(sys.argv[1]).read_text())
form = None; chapters = []; current = None
forms = {'GREEK TEXT A': 'Greek A', 'GREEK TEXT B': 'Greek B', 'LATIN TEXT': 'Latin'}
for raw in p.items:
    if '.mw-parser-output' in raw or raw == 'Layout 2':
        continue
    if raw in forms:
        form = forms[raw]; current = None; continue
    if not form: continue
    # headings are Roman numerals, optionally followed by a title
    m = re.match(r'^[\u200b]?([IVXLCDM]+)\.\s*(.*)$', raw)
    if m and (len(m.group(1)) <= 5):
        current = {'number': roman(m.group(1)), 'title': f'{form} — Capítulo {roman(m.group(1))}', 'verses': []}
        chapters.append(current)
        rest = m.group(2).strip()
        raw = rest
    if current and raw:
        # Split explicit numbered paragraphs into editorial verses; unnumbered text gets next number.
        parts = re.split(r'(?<!\w)(?=(?:\d{1,2})\s+)', raw)
        for part in parts:
            part = re.sub(r'\[\d+\]', '', part).strip()
            if not part: continue
            n = re.match(r'^(\d{1,2})\s+(.*)$', part)
            if n: num, text = n.group(1), n.group(2).strip()
            else: num, text = str(len(current['verses']) + 1), part
            current['verses'].append({'number': num, 'text': re.sub(r'\s+', ' ', text)})

# remove accidental duplicate first verse caused by heading handling
for ch in chapters:
    seen = set(); clean = []
    for v in ch['verses']:
        key = (v['number'], v['text'])
        if key not in seen: clean.append(v); seen.add(key)
    ch['verses'] = clean

if len(chapters) < 30: raise SystemExit(f'Se esperaban las tres formas principales; se detectaron solo {len(chapters)} capítulos.')
work = {
    'id': 'infancy-thomas', 'title': 'Infancy Gospel of Thomas', 'language': 'en',
    'sourceLanguage': 'Greek and Latin', 'translator': 'M. R. James (1924)',
    'publication': 'The Apocryphal New Testament (1924)',
    'license': 'Public-domain historical translation; verify local status before redistribution.',
    'sourceUrl': 'https://en.wikisource.org/wiki/The_Apocryphal_New_Testament_(1924)/Infancy_Gospels/The_Gospel_of_Thomas',
    'chapters': chapters
}
Path(sys.argv[2]).write_text(json.dumps(work, ensure_ascii=False, indent=2) + '\n')
print(f'Importados {len(chapters)} capítulos y {sum(len(c["verses"]) for c in chapters)} versículos.')
