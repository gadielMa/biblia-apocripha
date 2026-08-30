#!/usr/bin/env python3
import html, json, re, sys
from pathlib import Path

if len(sys.argv) != 3:
    raise SystemExit('Uso: import-ascension-isaiah.py <directorio-capitulos> <salida.json>')
root=Path(sys.argv[1]); chapters=[]
for n in range(1,12):
    s=(root/f'ascension-isaiah-{n}.html').read_text()
    verses=[]
    for m in re.finditer(r'<span><sup[^>]*>(\d+)</sup>(.*?)</span>',s,re.S):
        text=html.unescape(re.sub(r'<[^>]+>','',m.group(2)))
        text=re.sub(r'\s+',' ',text).strip()
        if text: verses.append({'number':m.group(1),'text':text})
    if not verses: raise SystemExit(f'No se encontraron versículos en capítulo {n}')
    chapters.append({'number':n,'title':f'Capítulo {n}','verses':verses})
work={'id':'ascension-isaiah','title':'Ascension of Isaiah','language':'en','sourceLanguage':'Ethiopic (translated into English)','translator':'R. H. Charles (1900)','publication':'The Ascension of Isaiah (1900)','license':'Public-domain historical translation; verify local status before redistribution.','sourceUrl':'https://www.fellowshipbook.org/en/etiope/ascension-of-isaiah','chapters':chapters}
Path(sys.argv[2]).write_text(json.dumps(work,ensure_ascii=False,indent=2)+'\n')
print(f'Importados {len(chapters)} capítulos y {sum(len(c["verses"]) for c in chapters)} versículos.')
