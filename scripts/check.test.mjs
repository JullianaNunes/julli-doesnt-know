import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {renderMarkdown,safeURL} from '../assets/markdown.js';
const base='https://example.org/meu-repo/conteudos/neurociencia/anatomia-do-cerebro/artigo.md';

test('Markdown: headings, paragraphs, inline formatting, tables, lists and code',()=>{
 const r=renderMarkdown('## Olá cérebro\n\nUm **resumo** e *exemplo*.\n\n- Um\n- Dois\n\n| Item | Valor |\n| --- | --- |\n| A | 1 |\n\n```js\nif (a < b) x();\n```\n\n## Olá cérebro',base);
 assert.deepEqual(r.headings.map(x=>x.id),['ola-cerebro','ola-cerebro-2']);
 for(const s of ['<strong>resumo</strong>','<em>exemplo</em>','<ul>','<table>','a &lt; b']) assert.ok(r.html.includes(s));
});
test('Local images resolve relative to Markdown, including a GitHub Pages subdirectory',()=>{
 const r=renderMarkdown('![Neurônio](fotos/neuronio.svg)',base);
 assert.ok(r.html.includes('https://example.org/meu-repo/conteudos/neurociencia/anatomia-do-cerebro/fotos/neuronio.svg'));
 assert.ok(r.html.includes('data-zoom'));
});
test('Executable URLs and raw HTML cannot become executable markup',()=>{
 assert.equal(safeURL('javascript:alert(1)',base),'');
 assert.equal(safeURL('data:text/html,test',base),'');
 const r=renderMarkdown('<script>alert(1)</script>\n\n[x](javascript:bad)\n\n![bad](javascript:bad)',base);
 assert.ok(!r.html.includes('<script>'));assert.ok(!r.html.includes('href="javascript:'));assert.ok(!r.html.includes('<img'));
});
test('Internal article links preserve hash routing and stay in the same tab',()=>{
 const r=renderMarkdown('[Outro estudo](#/conteudo/lobos-cerebrais)',base);
 assert.ok(r.html.includes('href="#/conteudo/lobos-cerebrais"'));assert.ok(!r.html.includes('target="_blank"'));
});
test('Front matter is removed and blockquotes render',()=>{
 const r=renderMarkdown('---\n{"id":"x"}\n---\n\n> **Ideia:** lembrar.',base);
 assert.ok(!r.html.includes('"id"'));assert.ok(r.html.includes('<blockquote>'));
});

test('Application smoke: four page levels, search, not-found and subdirectory paths',async()=>{
 // A minimal DOM harness exercises routing/render output; this is not browser visual QA.
 const elements=new Map();
 const element=()=>({innerHTML:'',value:'',dataset:{},classList:{toggle(){}},setAttribute(){},removeAttribute(){},addEventListener(){},focus(){},querySelectorAll(){return [];}});
 for(const selector of ['#main','#search','.search','.close-image','#image-dialog'])elements.set(selector,element());
 globalThis.document={title:'',querySelector:s=>elements.get(s),querySelectorAll:()=>[],getElementById:()=>null};
 globalThis.location={hash:'#/',href:'https://example.org/meu-repo/'};
 globalThis.window={addEventListener(){},scrollTo(){}};
 globalThis.matchMedia=()=>({matches:true});
 globalThis.fetch=async url=>{try{return new Response(await readFile(fileURLToPath(url)));}catch{return new Response('missing',{status:404});}};
 const {route}=await import('../assets/app.js');const main=elements.get('#main');
 assert.ok(main.innerHTML.includes('Uma coisa me'));assert.ok(main.innerHTML.includes('Do Instagram para o caderno'));
 location.hash='#/tema/neurociencia';await route();assert.ok(main.innerHTML.includes('Explore os subtemas'));
 location.hash='#/subtema/neurociencia/anatomia-do-cerebro';await route();assert.ok(main.innerHTML.includes('Páginas deste subtema'));
 location.hash='#/conteudo/lobos-cerebrais';await route();assert.ok(main.innerHTML.includes('Os quatro lobos'));assert.ok(main.innerHTML.includes('Nesta página'));assert.ok(!main.innerHTML.includes('Ver o vídeo no Instagram'));
 location.hash='#/busca/memoria';await route();assert.ok(main.innerHTML.includes('Memória de trabalho'));assert.ok(!main.innerHTML.includes('Ainda não encontramos'));
 location.hash='#/busca/zzzznaoexiste';await route();assert.ok(main.innerHTML.includes('Ainda não encontramos'));
 location.hash='#/tema/historia';await route();assert.ok(main.innerHTML.includes('Novas páginas vêm por aí'));
 location.hash='#/conteudo/ausente';await route();assert.ok(main.innerHTML.includes('não foi encontrada'));
 location.hash='#/sobre';await route();assert.ok(main.innerHTML.includes('Oi, eu sou a Julli'));
});
