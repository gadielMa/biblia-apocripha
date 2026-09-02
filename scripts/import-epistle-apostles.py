#!/usr/bin/env python3
import html, json, re, sys
from html.parser import HTMLParser
from pathlib import Path

class Reader(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True); self.depth=0; self.tag=None; self.buf=[]; self.paragraphs=[]
    def handle_starttag(self, tag, attrs):
        if tag == 'div':
            if dict(attrs).get('id') == 'mw-content-text': self.depth = 1
            elif self.depth: self.depth += 1
        if self.depth and tag == 'p': self.tag, self.buf = tag, []
    def handle_endtag(self, tag):
        if tag == 'div' and self.depth:
            self.depth -= 1; return
        if tag == 'p' and self.tag:
            text=re.sub(r'\s+',' ',html.unescape(''.join(self.buf))).strip(); self.tag=None
            if text: self.paragraphs.append(text)
    def handle_data(self, data):
        if self.tag: self.buf.append(data)

reader=Reader(); reader.feed(Path(sys.argv[1]).read_text())
chapters=[]; current=None
for paragraph in reader.paragraphs:
    match=re.match(r'^(\d+)\s+(.+)', paragraph)
    if match and 2 <= int(match.group(1)) <= 51:
        current={'number':int(match.group(1)), 'title':f'Section {match.group(1)}', 'verses':[]}; chapters.append(current); paragraph=match.group(2)
    if current and paragraph:
        current['verses'].append({'number':str(len(current['verses'])+1),'text':paragraph})
if len(chapters) < 20: raise SystemExit(f'Extracción incompleta: {len(chapters)} secciones')
work={'id':'epistle-apostles','title':'Epistle of the Apostles','language':'en','sourceLanguage':'Greek (preserved chiefly in Coptic and Ethiopic)','translator':'M. R. James (1924)','publication':'The Apocryphal New Testament (1924)','license':'Public-domain historical translation.','sourceUrl':'https://en.wikisource.org/wiki/The_Apocryphal_New_Testament_(1924)/Epistles/The_Epistle_of_the_Apostles','scopeNote':'Las secciones y pasajes son divisiones editoriales para lectura y búsqueda; se preservan las variantes y lagunas de la edición fuente.','chapters':chapters}
Path(sys.argv[2]).write_text(json.dumps(work,ensure_ascii=False,indent=2)+'\n')
print(f'Importadas {len(chapters)} secciones y {sum(len(c["verses"]) for c in chapters)} pasajes.')
