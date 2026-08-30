#!/usr/bin/env python3
import html,json,re,sys
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
p=P();p.feed(Path(sys.argv[1]).read_text()); ch={}
for x in p.a:
 m=re.match(r'(\d+):(\d+)\s*(.*)',x)
 if m: ch.setdefault(int(m.group(1)),[]).append({'number':m.group(2),'text':m.group(3).strip()})
out=[{'number':n,'title':f'Capítulo {n}','verses':vs} for n,vs in sorted(ch.items())]
if len(out)!=11:raise SystemExit(f'Se detectaron {len(out)} capítulos')
work={'id':'paul-thecla','title':'Acts of Paul and Thecla','language':'en','sourceLanguage':'Greek','translator':'Jeremiah Jones (1820)','publication':'Acts of Paul and Thecla (public-domain translation)','license':'Public-domain historical translation; verify local status before redistribution.','sourceUrl':'https://en.wikisource.org/wiki/Acts_of_Paul_and_Thecla_(Jeremiah_Jones_translation)','chapters':out}
Path(sys.argv[2]).write_text(json.dumps(work,ensure_ascii=False,indent=2)+'\n');print(f'Importados {len(out)} capítulos y {sum(len(c["verses"]) for c in out)} versículos.')
