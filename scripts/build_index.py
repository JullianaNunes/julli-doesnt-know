#!/usr/bin/env python3
"""Generate the static catalog. No third-party dependencies."""
import json, re, shutil, sys
from pathlib import Path
from datetime import date
from urllib.parse import urlparse, unquote
ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / 'conteudos'

def load(path):
    return json.loads(path.read_text(encoding='utf-8'))

def valid_id(value):
    return isinstance(value, str) and re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', value)

def local_file(path, base):
    resolved = (base / unquote(path)).resolve()
    if not resolved.is_relative_to(CONTENT.resolve()) or not resolved.is_file():
        raise ValueError(f'Arquivo local inexistente ou fora de conteudos: {path}')
    return resolved

def build():
    themes, articles, ids = [], [], set()
    for theme_file in sorted(CONTENT.glob('*/tema.json')):
        t = load(theme_file); theme_dir = theme_file.parent
        if not valid_id(t.get('id')) or t['id'] != theme_dir.name:
            raise ValueError(f'ID do tema inválido: {theme_file}')
        for field in ('title', 'summary', 'intro', 'art', 'order'):
            if field not in t: raise ValueError(f'{theme_file}: falta {field}')
        t['subthemes'] = []
        for sub_file in sorted(theme_dir.glob('*/subtema.json')):
            s = load(sub_file); sub_dir = sub_file.parent
            if not valid_id(s.get('id')) or s['id'] != sub_dir.name:
                raise ValueError(f'ID do subtema inválido: {sub_file}')
            for field in ('title', 'summary'):
                if not isinstance(s.get(field), str): raise ValueError(f'{sub_file}: falta {field}')
            t['subthemes'].append(s)
            for md in sorted(sub_dir.glob('*.md')):
                raw = md.read_text(encoding='utf-8')
                match = re.match(r'^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$', raw)
                if not match: raise ValueError(f'{md}: use os metadados JSON entre ---')
                a = json.loads(match[1]); body = match[2]
                for field in ('id', 'title', 'summary', 'date'):
                    if not isinstance(a.get(field), str): raise ValueError(f'{md}: falta {field}')
                if not valid_id(a['id']) or a['id'] in ids: raise ValueError(f'ID inválido ou duplicado: {a["id"]}')
                ids.add(a['id']); date.fromisoformat(a['date'])
                if not isinstance(a.get('related', []), list) or not all(isinstance(i,str) for i in a.get('related', [])):
                    raise ValueError(f'{md}: related deve ser uma lista de IDs')
                if not isinstance(a.get('featured', False), bool): raise ValueError(f'{md}: featured deve ser true ou false')
                if a.get('instagram') and not re.fullmatch(r'https://(?:www\.)?instagram\.com/(?:p|reel)/[^\s]+', a['instagram']):
                    raise ValueError(f'{md}: instagram deve apontar para um post ou reel')
                if a.get('image'):
                    a['image'] = local_file(a['image'],sub_dir).relative_to(ROOT).as_posix()
                for _, dest in re.findall(r'!?\[([^\]]*)\]\(([^\s)]+)\)', body):
                    parsed = urlparse(dest)
                    if parsed.scheme and parsed.scheme not in ('http','https'): raise ValueError(f'{md}: link inseguro {dest}')
                    if not parsed.scheme and not dest.startswith('#'): local_file(dest,sub_dir)
                a.update(theme=t['id'], subtheme=s['id'], file=md.relative_to(ROOT).as_posix(),
                         minutes=max(1, round(len(body.split())/180)),
                         search=' '.join((a['title'], a['summary'], t['title'], s['title'], body)))
                articles.append(a)
        t['subthemes'].sort(key=lambda s: s.get('order',0)); themes.append(t)
    themes.sort(key=lambda t:t['order'])
    articles.sort(key=lambda a:(a['date'],a['id']), reverse=True)
    for a in articles:
        for related in a.get('related',[]):
            if related not in ids: raise ValueError(f'{a["id"]}: conteúdo relacionado não existe: {related}')
    for t in themes:
        for start in t.get('start',[]):
            if start not in ids: raise ValueError(f'{t["id"]}: percurso aponta para conteúdo inexistente: {start}')
    payload={'themes':themes,'articles':articles}
    (CONTENT/'index.json').write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    return payload

def package():
    out=ROOT/'dist'
    if out.exists(): shutil.rmtree(out)
    out.mkdir()
    for name in ('index.html','assets','conteudos','.nojekyll'):
        src=ROOT/name
        if src.is_dir(): shutil.copytree(src,out/name)
        else: shutil.copy2(src,out/name)

if __name__=='__main__':
    try:
        result=build()
        if '--dist' in sys.argv: package()
        print(f'Índice pronto: {len(result["themes"])} temas, {len(result["articles"])} conteúdos.')
    except (ValueError,KeyError,OSError) as exc:
        sys.exit(f'Erro no catálogo: {exc}')
