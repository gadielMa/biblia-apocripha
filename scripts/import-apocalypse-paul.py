#!/usr/bin/env python3
import html,json,sys,re
from html.parser import HTMLParser
from pathlib import Path
class P(HTMLParser):
 def __init__(self):super().__init__();self.i=0;self.b=[];self.a=[]
 def handle_starttag(self,t,a):
  if t=='p':self.i=1;self.b=[]
 def handle_endtag(self,t):
  if t=='p' and self.i:
   x=re.sub(r'\s+',' ',html.unescape(''.join(self.b))).strip();self.i=0
   if x:self.a.append(x)
 def handle_data(self,d):
  if self.i:self.b.append(d)
p=P();p.feed(Path(sys.argv[1]).read_text()); start=next(i for i,x in enumerate(p.a) if x.startswith('Here beginneth'))
vs=[]
for x in p.a[start:]:
 if x.startswith('.mw-parser-output'):continue
 x=re.sub(r'\[\d+\]','',x)
 vs.append({'number':str(len(vs)+1),'text':x})
work={'id':'apocalypse-paul','title':'Apocalypse of Paul','language':'en','sourceLanguage':'Greek/Latin/Syriac/Coptic','translator':'M. R. James (1924)','publication':'The Apocryphal New Testament (1924)','license':'Public-domain historical translation; verify local status before redistribution.','sourceUrl':'https://en.wikisource.org/wiki/The_Apocryphal_New_Testament_(1924)/Apocalypses/The_Apocalypse_of_Paul','chapters':[{'number':1,'title':'Visión de San Pablo','verses':vs}]}
Path(sys.argv[2]).write_text(json.dumps(work,ensure_ascii=False,indent=2)+'\n');print(f'Importados 1 capítulo y {len(vs)} pasajes.')
