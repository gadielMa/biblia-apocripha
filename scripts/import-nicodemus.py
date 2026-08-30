#!/usr/bin/env python3
import json, re, sys
from html.parser import HTMLParser
from pathlib import Path

class P(HTMLParser):
    def __init__(self): super().__init__(); self.inp=False; self.buf=[]; self.ps=[]
    def handle_starttag(self,t,a):
        if t=='p': self.inp=True; self.buf=[]
        elif t=='br' and self.inp: self.buf.append('\n')
    def handle_endtag(self,t):
        if t=='p' and self.inp:
            x=''.join(self.buf).strip()
            if x:self.ps.append(x)
            self.inp=False
    def handle_data(self,d):
        if self.inp:self.buf.append(d)

raw=Path(sys.argv[1]).read_text(); raw=raw[raw.find('THE GOSPEL OF NICODEMUS,'):raw.find('REFERENCES TO THE GOSPEL OF NICODEMUS')]
p=P(); p.feed(raw); chapters=[]
for text in p.ps:
    m=re.fullmatch(r'CHAPTER\s+([IVXLCDM]+)\.', re.sub(r'\s+',' ',text).strip())
    if m:
        vals={'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000}; n=sum(-vals[c] if i+1<len(m[1]) and vals[c]<vals[m[1][i+1]] else vals[c] for i,c in enumerate(m[1])); chapters.append({'number':n,'verses':[]}); continue
    if not chapters: continue
    for part in re.split(r'(?m)(?=^\s*\d+\s+)', text):
        part=re.sub(r'\s+',' ',part).strip(); m=re.match(r'^(\d+)\s+(.+)',part)
        if m: chapters[-1]['verses'].append({'number':m[1],'text':m[2]})
        elif part and chapters[-1]['verses']: chapters[-1]['verses'][-1]['text']+=' '+part
if not chapters: raise SystemExit('No se encontraron capítulos')
work={'id':'nicodemus','title':'Gospel of Nicodemus (Acts of Pilate)','language':'en','sourceLanguage':'Greek/Latin traditions','translator':'Jeremiah Jones (public-domain edition)','publication':'Forbidden Gospels and Epistles','license':'Public-domain edition; verify local status before redistribution.','sourceUrl':'https://www.gutenberg.org/files/6516/6516-h/6516-h.htm','chapters':chapters}
Path(sys.argv[2]).write_text(json.dumps(work,ensure_ascii=False,indent=2)+'\n'); print('Importado',len(chapters),'capítulos,',sum(len(c['verses']) for c in chapters),'versículos')
