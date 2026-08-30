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
vals={'I':1,'V':5,'X':10,'L':50,'C':100}
def roman(s):
 return sum(-vals[c] if i+1<len(s) and vals[c]<vals[s[i+1]] else vals[c] for i,c in enumerate(s))
p=P();p.feed(Path(sys.argv[1]).read_text());out=[]
for x in p.a:
 m=re.match(r'^([IVXLCDM]+)\.\s*(.*)',x)
 if m:
  n=roman(m.group(1));out.append({'number':n,'title':f'Capítulo {n}','verses':[{'number':'1','text':m.group(2)}]})
if len(out)!=20:raise SystemExit(f'Se esperaban 20 capítulos y se detectaron {len(out)}')
work={'id':'testament-abraham','title':'Testament of Abraham','language':'en','sourceLanguage':'Greek','translator':'Alexander Roberts (1885)','publication':'Ante-Nicene Fathers, Volume IX','license':'Public-domain historical translation; verify local status before redistribution.','sourceUrl':'https://en.wikisource.org/wiki/Ante-Nicene_Fathers/Volume_IX/The_Testament_of_Abraham/The_Testament_of_Abraham/Version_I','chapters':out}
Path(sys.argv[2]).write_text(json.dumps(work,ensure_ascii=False,indent=2)+'\n');print(f'Importados {len(out)} capítulos.')
