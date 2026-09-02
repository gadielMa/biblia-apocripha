#!/usr/bin/env python3
"""Importa la traducción pública de R. H. Charles de 2 Baruc."""
import html, json, re, sys
from html.parser import HTMLParser
from pathlib import Path

class Reader(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True); self.in_p=False; self.in_dt=False; self.buf=[]; self.paragraphs=[]
    def handle_starttag(self, tag, attrs):
        if tag.lower() in ('p', 'dt'):
            self.in_p, self.in_dt, self.buf = tag.lower() == 'p', tag.lower() == 'dt', []
    def handle_endtag(self, tag):
        if tag.lower() in ('p', 'dt') and ((tag.lower() == 'p' and self.in_p) or (tag.lower() == 'dt' and self.in_dt)):
            value = re.sub(r'\s+', ' ', ''.join(self.buf)).strip()
            if value: self.paragraphs.append(html.unescape(value))
            self.in_p=False; self.in_dt=False
    def handle_data(self, data):
        if self.in_p or self.in_dt: self.buf.append(data)

reader=Reader(); reader.feed(Path(sys.argv[1]).read_text(encoding='cp1252'))
chapters=[]; current=None
for paragraph in reader.paragraphs:
    heading=re.match(r'^Chapter\s+(?:Chapter\s+)?(\d+)(?:\s*[.]?\s*(.*))?$', paragraph, re.I)
    if heading:
        current={'number':int(heading.group(1)), 'title':(heading.group(2) or f'Chapter {heading.group(1)}').strip(), 'verses':[]}
        chapters.append(current); continue
    if (paragraph.startswith('Copyright 2000') or paragraph.startswith('©') or
            paragraph.startswith('Text may be freely') or paragraph.startswith('Edited and adapted') or
            paragraph.startswith('Scanned and edited')):
        break
    if not current or re.match(r'^\d+(?:--|:)\d+', paragraph): continue
    # The source already contains printed verse numbers; keep them in the text
    # while using stable editorial passage positions for search and permalinks.
    for chunk in re.split(r'(?=\b\d+\s+)', paragraph):
        chunk=chunk.strip()
        if chunk: current['verses'].append({'number':str(len(current['verses'])+1), 'text':chunk})

if len(chapters) < 80 or any(not c['verses'] for c in chapters):
    raise SystemExit(f'Extracción incompleta: {len(chapters)} capítulos')
work={'id':'2-baruch','title':'2 Baruch (Syriac Apocalypse of Baruch)','language':'en','sourceLanguage':'Syriac (translated from Greek, probably from Hebrew)','translator':'R. H. Charles (1913)','publication':'The Apocrypha and Pseudepigrapha of the Old Testament, vol. 2 (1913)','license':'Public-domain historical translation.','sourceUrl':'https://www.futurerevealed.com/hebrew/apocalypse-baruch.htm','scopeNote':'The printed verse numbers are preserved in each passage. The reader divisions are editorial and support full-text search.','chapters':chapters}
Path(sys.argv[2]).write_text(json.dumps(work,ensure_ascii=False,indent=2)+'\n')
print(f'Importados {len(chapters)} capítulos y {sum(len(c["verses"]) for c in chapters)} pasajes.')
