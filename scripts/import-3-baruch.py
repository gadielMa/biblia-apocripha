#!/usr/bin/env python3
import html, json, re, sys
from html.parser import HTMLParser
from pathlib import Path

names={'one':1,'two':2,'three':3,'four':4,'five':5,'six':6,'seven':7,'eight':8,'nine':9,'ten':10,'eleven':11,'twelve':12,'thirteen':13,'fourteen':14,'fifteen':15,'sixteen':16,'seventeen':17}
class Reader(HTMLParser):
    def __init__(self): super().__init__(convert_charrefs=True); self.h=False; self.hbuf=[]; self.chapter=None; self.cell=0; self.buf=[]; self.chapters=[]
    def handle_starttag(self,t,a):
        t=t.lower()
        if t=='h2': self.h=True; self.hbuf=[]
        if t=='table': self.cell=0
        if t=='tr': self.cell=0
        if t=='td': self.cell+=1; self.buf=[]
    def handle_endtag(self,t):
        t=t.lower()
        if t=='h2':
            title=re.sub(r'\s+',' ',' '.join(self.hbuf)).strip(); m=re.search(r'Chapter\s+(?:the\s+)?([A-Za-z]+)',title,re.I)
            if m and m.group(1).lower() in names:
                n=names[m.group(1).lower()]; self.chapter={'number':n,'title':title,'verses':[]}; self.chapters.append(self.chapter)
            self.h=False
        if t=='td' and self.cell==2 and self.chapter:
            value=re.sub(r'\s+',' ',''.join(self.buf)).strip()
            if value: self.chapter['verses'].append({'number':str(len(self.chapter['verses'])+1),'text':html.unescape(value)})
    def handle_data(self,d):
        if self.h: self.hbuf.append(d)
        elif self.cell==2: self.buf.append(d)

r=Reader(); r.feed(Path(sys.argv[1]).read_text(encoding='utf-8'))
if len(r.chapters)!=17: raise SystemExit(f'Extracción incompleta: {len(r.chapters)} capítulos')
work={'id':'3-baruch','title':'3 Baruch (Greek Apocalypse of Baruch)','language':'en','sourceLanguage':'Greek','translator':'M. R. James (1897)','publication':'Apocrypha Anecdota II (1897)','license':'Public-domain historical translation.','sourceUrl':'https://greekdoc.com/DOCUMENTS/pseudepigrapha/3baruch.html','scopeNote':'The Greek and English text is divided into passage entries for reading and full-text search.','chapters':r.chapters}
Path(sys.argv[2]).write_text(json.dumps(work,ensure_ascii=False,indent=2)+'\n')
print(f'Importados {len(r.chapters)} capítulos y {sum(len(c["verses"]) for c in r.chapters)} pasajes.')
