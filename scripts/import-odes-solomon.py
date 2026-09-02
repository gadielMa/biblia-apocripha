#!/usr/bin/env python3
import html,json,re,sys
from html.parser import HTMLParser
from pathlib import Path
vals={'I':1,'V':5,'X':10,'L':50,'C':100}
def roman(s): return sum((-1 if i+1<len(s) and vals[c]<vals[s[i+1]] else 1)*vals[c] for i,c in enumerate(s))
class Reader(HTMLParser):
 def __init__(self): super().__init__(convert_charrefs=True); self.heading=False; self.hbuf=[]; self.current=None; self.chapters=[]; self.li=False; self.buf=[]; self.link_in_li=False
 def flush_li(self):
  if self.li and self.current and not self.link_in_li:
   value=re.sub(r'\s+',' ',''.join(self.buf)).strip()
   if value: self.current['verses'].append({'number':str(len(self.current['verses'])+1),'text':html.unescape(value)})
  self.li=False; self.buf=[]; self.link_in_li=False
 def handle_starttag(self,t,a):
  t=t.lower()
  if t=='h2': self.heading=True; self.hbuf=[]
  if t=='li': self.flush_li(); self.li=True; self.buf=[]
  if t=='a' and self.li: self.link_in_li=True
 def handle_endtag(self,t):
  t=t.lower()
  if t=='h2':
   title=re.sub(r'\s+',' ',' '.join(self.hbuf)).strip(); m=re.fullmatch(r'Ode\s+(\d+)',title,re.I)
   if m: self.current={'number':int(m.group(1)),'title':title,'verses':[]}; self.chapters.append(self.current)
   self.heading=False
  if t in ('li','ol','ul'): self.flush_li()
 def handle_data(self,d):
  if self.heading:self.hbuf.append(d)
  elif self.li:self.buf.append(d)
r=Reader(); r.feed(Path(sys.argv[1]).read_text())
found={c['number']:c for c in r.chapters}
chapters=[]
for n in range(1,43):
 chapter=found.get(n)
 if not chapter or not chapter['verses']:
  chapter={'number':n,'title':f'Ode {n}','verses':[{'number':'1','text':'This ode is missing; no text has survived.'}]}
 chapters.append(chapter)
work={'id':'odes-solomon','title':'Odes of Solomon','language':'en','sourceLanguage':'Syriac (with Greek and Coptic witnesses)','translator':'J. Rendel Harris and Alphonse Mingana (1911)','publication':'The Odes and Psalms of Solomon (1911)','license':'Public-domain historical translation.','sourceUrl':'https://archive.org/details/odespsalmsofsolo02harruoft','scopeNote':'The collection has 42 numbered odes; Ode 2 is lost. Passage numbers are editorial divisions for search.','chapters':chapters}
Path(sys.argv[2]).write_text(json.dumps(work,ensure_ascii=False,indent=2)+'\n'); print(f'Importadas 42 odas y {sum(len(c["verses"]) for c in chapters)} pasajes.')
