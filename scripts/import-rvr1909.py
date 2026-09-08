#!/usr/bin/env python3
"""Importa los 66 libros RVR1909 JSON de BibleAquifer al formato del lector."""
import html, json, re, sys
from pathlib import Path

src, out = Path(sys.argv[1]), Path(sys.argv[2]); out.mkdir(parents=True, exist_ok=True)
names = ['Génesis','Éxodo','Levítico','Números','Deuteronomio','Josué','Jueces','Rut','1 Samuel','2 Samuel','1 Reyes','2 Reyes','1 Crónicas','2 Crónicas','Esdras','Nehemías','Ester','Job','Salmos','Proverbios','Eclesiastés','Cantar de los Cantares','Isaías','Jeremías','Lamentaciones','Ezequiel','Daniel','Oseas','Joel','Amós','Abdías','Jonás','Miqueas','Nahúm','Habacuc','Sofonías','Hageo','Zacarías','Malaquías','Mateo','Marcos','Lucas','Juan','Hechos','Romanos','1 Corintios','2 Corintios','Gálatas','Efesios','Filipenses','Colosenses','1 Tesalonicenses','2 Tesalonicenses','1 Timoteo','2 Timoteo','Tito','Filemón','Hebreos','Santiago','1 Pedro','2 Pedro','1 Juan','2 Juan','3 Juan','Judas','Apocalipsis']
def slug(s):
    return re.sub(r'[^a-z0-9]+','-',s.lower().replace('á','a').replace('é','e').replace('í','i').replace('ó','o').replace('ú','u').replace('ñ','n')).strip('-')
for i, name in enumerate(names, 1):
    entries = json.loads((src / 'json' / f'{i:02d}.content.json').read_text())
    chapters = {}
    for entry in entries:
        ref = entry['title'].split()[-1]
        chapter, verse = ref.split(':')
        chapter = int(chapter); verse = int(verse)
        text = re.sub(r'<[^>]+>', '', html.unescape(entry['content']))
        text = re.sub(r'^\s*\d+\s*', '', text).strip()
        chapters.setdefault(chapter, []).append({'number': str(verse), 'text': text})
    work = {'id': f'rvr1909-{slug(name)}', 'title': name, 'language': 'es', 'sourceLanguage': 'Hebreo/Arameo/Griego', 'translator': 'Casiodoro de Reina y Cipriano de Valera (revisión 1909)', 'publication': 'Reina-Valera 1909', 'license': 'Dominio público; datos CC0 1.0.', 'sourceUrl': 'https://github.com/BibleAquifer/ReinaValera1909/releases', 'scopeNote': 'Texto completo de la edición Reina-Valera 1909. Numeración tradicional por capítulo y versículo.', 'chapters': [{'number': n, 'title': f'Capítulo {n}', 'verses': v} for n, v in sorted(chapters.items())]}
    (out / f'{slug(name)}.es.json').write_text(json.dumps(work, ensure_ascii=False, indent=2) + '\n')
if len(sys.argv) > 3:
    catalog_path = Path(sys.argv[3]); catalog = json.loads(catalog_path.read_text())
    existing = {item['id'] for item in catalog}
    for name in names:
        ident = f'rvr1909-{slug(name)}'
        if ident not in existing:
            catalog.append({'id': ident, 'title': f'{name} (Reina-Valera 1909)', 'language': 'es', 'file': f'rvr1909/{slug(name)}.es.json'})
    catalog_path.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + '\n')
print(f'Importados {len(names)} libros RVR1909.')
