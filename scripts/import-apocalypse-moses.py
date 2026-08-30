#!/usr/bin/env python3
import html,json,re,sys
from pathlib import Path

vals={'i':1,'v':5,'x':10,'l':50,'c':100,'d':500,'m':1000}
def roman(s):
    s=s.lower()
    return sum(-vals[c] if i+1<len(s) and vals[c]<vals[s[i+1]] else vals[c] for i,c in enumerate(s))

source=Path(sys.argv[1]).read_text()
source=re.sub(r'<br\s*/?>|<p\s*/?>', '\n', source, flags=re.I)
source=re.sub(r'<[^>]+>', '', source)
source=html.unescape(source).replace('\r','')
source='\n'.join(re.sub(r'\s+',' ',line).strip() for line in source.splitlines())
matches=list(re.finditer(r'\b([ivxlcdm]+)\s+1(?:,\d+)?\s+',source,re.I))
chapters=[]
for i,m in enumerate(matches):
    number=roman(m.group(1))
    end=matches[i+1].start() if i+1<len(matches) else source.find('From The Apocrypha',m.end())
    if end<0:end=len(source)
    block=('1 '+source[m.end():end]).strip()
    verses=[]
    bits=re.split(r'(?m)^\s*(?=\d+\s+)',block)
    for bit in bits:
        bit=bit.strip()
        vm=re.match(r'(\d+)\s+(.*)',bit,re.S)
        if vm: verses.append({'number':vm.group(1),'text':re.sub(r'\s+',' ',vm.group(2)).strip()})
    if verses: chapters.append({'number':number,'title':f'Capítulo {number}','verses':verses})
if len(chapters)<40: raise SystemExit(f'Se esperaban al menos 40 capítulos y se detectaron {len(chapters)}')
work={'id':'apocalypse-moses','title':'Life of Adam and Eve (Apocalypse of Moses)','language':'en','sourceLanguage':'Greek','translator':'R. H. Charles (1913)','publication':'The Apocrypha and Pseudepigrapha of the Old Testament','license':'Public-domain historical translation; verify local status before redistribution.','sourceUrl':'https://ccel.org/c/charles/otpseudepig/apcmose.htm','chapters':chapters}
Path(sys.argv[2]).write_text(json.dumps(work,ensure_ascii=False,indent=2)+'\n')
print(f'Importados {len(chapters)} capítulos y {sum(len(c["verses"]) for c in chapters)} versículos.')
