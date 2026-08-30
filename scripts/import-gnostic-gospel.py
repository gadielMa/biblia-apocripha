#!/usr/bin/env python3
import html, json, re, sys
from html.parser import HTMLParser
from pathlib import Path

class Reader(HTMLParser):
    def __init__(self): super().__init__(); self.tag=None; self.buf=[]; self.chapters=[]; self.chapter=None
    def handle_starttag(self, tag, attrs):
        if tag in ('h2','p'): self.tag,self.buf=tag,[]
        elif self.tag=='p' and tag=='br': self.buf.append(' ')
    def handle_endtag(self, tag):
        if tag != self.tag: return
        text=re.sub(r'\s+',' ',html.unescape(''.join(self.buf))).strip(); tag,self.tag=self.tag,None
        if tag=='h2': self.chapter={'number':len(self.chapters)+1,'title':text,'verses':[]}; self.chapters.append(self.chapter)
        elif self.chapter and text and not text.startswith('Pages ') and text not in ('The Gospel','The Gospel of Thomas'):
            self.chapter['verses'].append({'number':str(len(self.chapter['verses'])+1),'text':text})
    def handle_data(self,data):
        if self.tag:self.buf.append(data)

source, output, work_id, title, language = sys.argv[1:6]
r=Reader(); r.feed(Path(source).read_text())
skip={'Contents','Bookmarks','Notes on Translation','Footnotes'}
chapters=[c for c in r.chapters if c['verses'] and c['title'] not in skip]
for number, chapter in enumerate(chapters,1): chapter['number']=number
if not chapters: raise SystemExit('No se detectaron secciones.')
work={'id':work_id,'title':title,'language':'en','sourceLanguage':language,'translator':'Mark M. Mattison','publication':'The Gnostic Gospels','license':'Public-domain translation, as dedicated by the translator.','sourceUrl':f'https://thegnosticgospels.org/gospels/{Path(source).stem}/','scopeNote':'Las secciones y pasajes son divisiones editoriales para lectura y búsqueda; se conservan las lagunas indicadas por la traducción fuente.','chapters':chapters}
Path(output).write_text(json.dumps(work,ensure_ascii=False,indent=2)+'\n')
print(f'Importadas {len(chapters)} secciones y {sum(len(c["verses"]) for c in chapters)} pasajes.')
