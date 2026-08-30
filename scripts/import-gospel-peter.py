#!/usr/bin/env python3
import html,json,re,sys
from html.parser import HTMLParser
from pathlib import Path
class P(HTMLParser):
 def __init__(self):super().__init__();self.i=0;self.b=[];self.c=None;self.out=[]
 def handle_starttag(self,t,a):
  if t=='p':self.i=1;self.b=[]
 def handle_endtag(self,t):
  if t=='p' and self.i:
   x=re.sub(r'\s+',' ',html.unescape(''.join(self.b))).strip();self.i=0
   if not x:return
   if x=='FRAGMENT I':return
   m=re.match(r'^(?:I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII|XIII|XIV)\.\s*(.*)',x)
   if m:
    rn=m.group(0).split('.')[0]; vals={'I':1,'V':5,'X':10,'L':50,'C':100}; n=sum(-vals[c] if j+1<len(rn) and vals[c]<vals[rn[j+1]] else vals[c] for j,c in enumerate(rn));self.c={'number':n,'title':f'Fragmento I — Sección {n}','verses':[]};self.out.append(self.c);x=m.group(1)
   if self.c:
    x=re.sub(r'\.mw-parser-output[^ ]*\{[^}]*\}','',x);x=re.sub(r'\[\d+\]','',x);self.c['verses'].append({'number':str(len(self.c['verses'])+1),'text':x})
 def handle_data(self,d):
  if self.i:self.b.append(d)
p=P();p.feed(Path(sys.argv[1]).read_text())
if len(p.out)<10:raise SystemExit(f'Se detectaron solo {len(p.out)} secciones')
work={'id':'gospel-peter','title':'Gospel of Peter','language':'en','sourceLanguage':'Greek fragment','translator':'M. R. James (1924)','publication':'The Apocryphal New Testament (1924)','license':'Public-domain historical translation; verify local status before redistribution.','sourceUrl':'https://en.wikisource.org/wiki/The_Apocryphal_New_Testament_(1924)/Passion_Gospels/The_Gospel_of_Peter','chapters':p.out}
Path(sys.argv[2]).write_text(json.dumps(work,ensure_ascii=False,indent=2)+'\n');print(f'Importadas {len(p.out)} secciones y {sum(len(c["verses"]) for c in p.out)} versículos.')
