#!/usr/bin/env python3
import html,json,re,sys
from html.parser import HTMLParser
from pathlib import Path
class P(HTMLParser):
 def __init__(self):super().__init__();self.t=None;self.b=[];self.c=None;self.out=[]
 def handle_starttag(self,t,a):
  if t=='p':self.t=t;self.b=[]
 def handle_endtag(self,t):
  if t!=self.t:return
  x=re.sub(r'\s+',' ',html.unescape(''.join(self.b))).strip();self.t=None
  if not x:return
  if re.fullmatch(r'[A-E]',x):self.c={'number':len(self.out)+1,'title':f'Sección {x}','verses':[]};self.out.append(self.c)
  elif self.c and not x.startswith('.mw-parser-output'):self.c['verses'].append({'number':str(len(self.c['verses'])+1),'text':re.sub(r'\[\d+\]','',x)})
 def handle_data(self,d):
  if self.t:self.b.append(d)
p=P();p.feed(Path(sys.argv[1]).read_text())
if len(p.out)<4:raise SystemExit(f'Se detectaron solo {len(p.out)} secciones')
work={'id':'apocalypse-peter','title':'Apocalypse of Peter','language':'en','sourceLanguage':'Greek/Ethiopic fragments','translator':'M. R. James (1924)','publication':'The Apocryphal New Testament (1924)','license':'Public-domain historical translation; verify local status before redistribution.','sourceUrl':'https://en.wikisource.org/wiki/The_Apocryphal_New_Testament_(1924)/Apocalypses/The_Apocalypse_of_Peter','chapters':p.out}
Path(sys.argv[2]).write_text(json.dumps(work,ensure_ascii=False,indent=2)+'\n');print(f'Importadas {len(p.out)} secciones y {sum(len(c["verses"]) for c in p.out)} versículos.')
