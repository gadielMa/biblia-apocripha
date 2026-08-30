#!/usr/bin/env python3
import html,json,re,sys
from html.parser import HTMLParser
from pathlib import Path

class P(HTMLParser):
 def __init__(self): super().__init__(); self.tag=None; self.buf=[]; self.chapter=None; self.out=[]
 def handle_starttag(self,t,a):
  if t in ('h2','p'): self.tag=t; self.buf=[]
 def handle_endtag(self,t):
  if t!=self.tag:return
  x=re.sub(r'\s+',' ',html.unescape(''.join(self.buf))).strip(); self.tag=None
  if not x:return
  if t=='h2':
   m=re.search(r'(\d+)',x)
   if m:self.chapter={'number':int(m.group(1)),'title':f'Capítulo {int(m.group(1))}','verses':[]}; self.out.append(self.chapter)
  elif t=='p' and self.chapter:
   m=re.match(r'\d+:(\d+)\s*(.*)',x); num=m.group(1) if m else str(len(self.chapter['verses'])+1); text=m.group(2) if m else x
   self.chapter['verses'].append({'number':num,'text':text})
 def handle_data(self,d):
  if self.tag:self.buf.append(d)
p=P(); p.feed(Path(sys.argv[1]).read_text())
if len(p.out)!=21: raise SystemExit(f'Se esperaban 21 capítulos y se detectaron {len(p.out)}')
work={'id':'barnabas','title':'Epistle of Barnabas','language':'en','sourceLanguage':'Greek','translator':'J. W. Hoole (1885)','publication':'Epistle of Barnabas (Hoole translation)','license':'Public-domain historical translation; verify local status before redistribution.','sourceUrl':'https://en.wikisource.org/wiki/Epistle_of_Barnabas_(Hoole_translation)','chapters':p.out}
Path(sys.argv[2]).write_text(json.dumps(work,ensure_ascii=False,indent=2)+'\n')
print(f'Importados {len(p.out)} capítulos y {sum(len(c["verses"]) for c in p.out)} versículos.')
