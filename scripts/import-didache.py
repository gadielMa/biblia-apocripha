#!/usr/bin/env python3
import json, re, sys
from html.parser import HTMLParser
from pathlib import Path

if len(sys.argv) != 3:
    raise SystemExit('Uso: import-didache.py <pagina-renderizada.html> <salida.json>')

class P(HTMLParser):
    def __init__(self): super().__init__(); self.in_p=False; self.buf=[]; self.items=[]
    def handle_starttag(self,t,a):
        if t=='p': self.in_p=True; self.buf=[]
    def handle_endtag(self,t):
        if t=='p' and self.in_p:
            x=re.sub(r'\s+',' ',''.join(self.buf)).strip()
            if x:self.items.append(x)
            self.in_p=False
    def handle_data(self,d):
        if self.in_p:self.buf.append(d)

vals={'I':1,'V':5,'X':10,'L':50,'C':100}
def roman(s):
    return sum(-vals[c] if i+1<len(s) and vals[c]<vals[s[i+1]] else vals[c] for i,c in enumerate(s))

p=P(); p.feed(Path(sys.argv[1]).read_text()); chapters=[]; current=None
for raw in p.items:
    if raw in {'TRANSLATION','OF'} or raw.startswith('THE TEACHING'): continue
    m=re.match(r'^[\u200b]?([IVXLCDM]+)\.\s*(.*)$',raw)
    if raw.startswith('Watch concerning your life;'):
        current={'number':16,'title':'Capítulo 16','verses':[]}; chapters.append(current)
        m=None
    if m:
        n=roman(m.group(1)); current={'number':n,'title':f'Capítulo {n}','verses':[]}; chapters.append(current); raw=m.group(2).strip()
    if not current or not raw: continue
    raw=re.sub(r'\[\d+\]','',raw)
    current['verses'].append({'number':str(len(current['verses'])+1),'text':re.sub(r'\s+',' ',raw)})
if len(chapters)!=16: raise SystemExit(f'Se esperaban 16 capítulos y se detectaron {len(chapters)}')
work={'id':'didache','title':'Didache (The Teaching of the Twelve Apostles)','language':'en','sourceLanguage':'Greek','translator':'J. W. Hoole (1921)','publication':'Didache (Hoole translation)','license':'Public-domain historical translation; verify local status before redistribution.','sourceUrl':'https://en.wikisource.org/wiki/Didache_(Hoole_translation)/Translation','chapters':chapters}
Path(sys.argv[2]).write_text(json.dumps(work,ensure_ascii=False,indent=2)+'\n')
print(f'Importados {len(chapters)} capítulos y {sum(len(c["verses"]) for c in chapters)} versículos.')
