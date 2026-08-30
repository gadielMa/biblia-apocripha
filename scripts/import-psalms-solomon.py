#!/usr/bin/env python3
import html,json,re,sys
from html.parser import HTMLParser
from pathlib import Path
class P(HTMLParser):
 def __init__(self):super().__init__();self.t=None;self.b=[];self.c=None;self.out=[]
 def handle_starttag(self,t,a):
  if t in ('h2','p'):self.t=t;self.b=[]
 def handle_endtag(self,t):
  if t!=self.t:return
  x=re.sub(r'\s+',' ',html.unescape(''.join(self.b))).strip();self.t=None
  if not x:return
  if t=='h2':
   m=re.search(r'(\d+)',x)
   if m:self.c={'number':int(m.group(1)),'title':f'Salmo {int(m.group(1))}','verses':[]};self.out.append(self.c)
  elif self.c and not x.startswith('Retrieved from'):
   self.c['verses'].append({'number':str(len(self.c['verses'])+1),'text':re.sub(r'\[\d+\]','',x)})
 def handle_data(self,d):
  if self.t:self.b.append(d)
p=P();p.feed(Path(sys.argv[1]).read_text())
if len(p.out)!=18:raise SystemExit(f'Se esperaban 18 salmos y se detectaron {len(p.out)}')
work={'id':'psalms-solomon','title':'Psalms of Solomon','language':'en','sourceLanguage':'Greek (from Hebrew)','translator':'R. H. Charles (1913)','publication':'The Forgotten Books of Eden','license':'Public-domain historical translation; verify local status before redistribution.','sourceUrl':'https://en.wikisource.org/wiki/The_Forgotten_Books_of_Eden/The_Psalms_of_Solomon','chapters':p.out}
Path(sys.argv[2]).write_text(json.dumps(work,ensure_ascii=False,indent=2)+'\n');print(f'Importados {len(p.out)} salmos y {sum(len(c["verses"]) for c in p.out)} pasajes.')
