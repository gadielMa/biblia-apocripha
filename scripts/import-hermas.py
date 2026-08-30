#!/usr/bin/env python3
import html,json,re,sys
from html.parser import HTMLParser
from pathlib import Path

class Parser(HTMLParser):
 def __init__(self): super().__init__(); self.tag=None; self.buf=[]; self.section=''; self.chapter=None; self.out=[]
 def handle_starttag(self,t,a):
  if t in ('h2','h3','p'): self.tag=t; self.buf=[]
 def handle_endtag(self,t):
  if t!=self.tag:return
  x=re.sub(r'\s+',' ',html.unescape(''.join(self.buf))).strip(); self.tag=None
  if not x:return
  if t=='h2': self.section=x; self.chapter=None
  elif t=='h3':
   m=re.search(r'([IVXLCDM]+)',x); n=m.group(1) if m else str(len(self.out)+1)
   vals={'I':1,'V':5,'X':10,'L':50,'C':100}; num=sum(-vals[c] if i+1<len(n) and vals[c]<vals[n[i+1]] else vals[c] for i,c in enumerate(n))
   self.chapter={'number':len(self.out)+1,'title':f'{self.section} — Capítulo {num}','verses':[]}; self.out.append(self.chapter)
  elif t=='p' and self.chapter:
   x=re.sub(r'\[\d+\]','',x); self.chapter['verses'].append({'number':str(len(self.chapter['verses'])+1),'text':x})
 def handle_data(self,d):
  if self.tag:self.buf.append(d)

files=[('Visions','hermas-visions.html'),('Mandates','hermas-mandates.html'),('Similitudes','hermas-similitudes.html')]
chapters=[]
for _,fn in files:
 p=Parser(); p.feed(Path(sys.argv[1],fn).read_text()); chapters.extend(p.out)
for i,c in enumerate(chapters,1): c['number']=i
if len(chapters)<40: raise SystemExit(f'Se detectaron solo {len(chapters)} capítulos')
work={'id':'hermas','title':'Shepherd of Hermas','language':'en','sourceLanguage':'Greek','translator':'J. B. Lightfoot (1891)','publication':'Apostolic Fathers (Lightfoot translation)','license':'Public-domain historical translation; verify local status before redistribution.','sourceUrl':'https://en.wikisource.org/wiki/Shepherd_of_Hermas','chapters':chapters}
Path(sys.argv[2]).write_text(json.dumps(work,ensure_ascii=False,indent=2)+'\n')
print(f'Importados {len(chapters)} capítulos y {sum(len(c["verses"]) for c in chapters)} versículos.')
