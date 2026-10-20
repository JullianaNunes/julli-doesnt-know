// Markdown editorial: headings, paragraphs, lists, quotes, code, tables and images.
// Raw HTML is deliberately displayed as text. All URLs pass an allowlist.
export const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function safeURL(value, base = globalThis.location?.href ?? 'https://example.org/') {
  if (/^#\//.test(value)) return value;
  try { const url = new URL(value, base); return ['http:', 'https:'].includes(url.protocol) ? url.href : ''; } catch { return ''; }
}
export const slug = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
function inline(source, base) {
  const tokens = [];
  const token = html => `\u0000${tokens.push(html)-1}\u0000`;
  let s = source.replace(/`([^`]+)`/g,(_,v)=>token(`<code>${escapeHTML(v)}</code>`));
  s = s.replace(/\[([^\]]+)\]\(([^\s)]+)\)/g,(_,label,url)=>{const href=safeURL(url,base);return token(href?`<a href="${escapeHTML(href)}"${(!href.startsWith('http') || href.startsWith(new URL(base).origin))?'':' target="_blank" rel="noopener noreferrer"'}>${escapeHTML(label)}</a>`:escapeHTML(label));});
  s = escapeHTML(s).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>');
  return s.replace(/\u0000(\d+)\u0000/g,(_,i)=>tokens[Number(i)]);
}
export function renderMarkdown(source, base) {
  const lines = source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/,'').replace(/\r/g,'').split('\n');
  const out=[], headings=[], used=new Map(); let i=0;
  const cells = row => row.trim().replace(/^\|/,'').replace(/\|$/,'').split('|').map(x=>x.trim());
  const special = line => /^(#{1,6}\s|```|>\s?|[-*]\s|\d+\.\s|!\[|\s*$)/.test(line);
  while(i<lines.length){
    const line=lines[i]; if(!line.trim()){i++;continue;}
    if(line.startsWith('```')){const code=[];i++;while(i<lines.length&&!lines[i].startsWith('```'))code.push(lines[i++]);i++;out.push(`<pre><code>${escapeHTML(code.join('\n'))}</code></pre>`);continue;}
    const h=line.match(/^(#{1,6})\s+(.+)$/);
    if(h){const stem=slug(h[2])||'secao',n=used.get(stem)||0;used.set(stem,n+1);const id=stem+(n?`-${n+1}`:'');const level=Math.max(2,h[1].length);headings.push({id,text:h[2],level});out.push(`<h${level} id="${id}">${inline(h[2],base)}</h${level}>`);i++;continue;}
    const image=line.match(/^!\[([^\]]*)\]\(([^\s)]+)\)$/);
    if(image){const url=safeURL(image[2],base);if(url)out.push(`<figure><img src="${escapeHTML(url)}" alt="${escapeHTML(image[1])}" loading="lazy" data-zoom tabindex="0" role="button" aria-label="Ampliar: ${escapeHTML(image[1])}"><figcaption>${escapeHTML(image[1])}</figcaption></figure>`);i++;continue;}
    if(/^>/.test(line)){const q=[];while(i<lines.length&&/^>/.test(lines[i]))q.push(lines[i++].replace(/^>\s?/,''));out.push(`<blockquote>${renderMarkdown(q.join('\n'),base).html}</blockquote>`);continue;}
    if(/^[-*]\s/.test(line)||/^\d+\.\s/.test(line)){const ordered=/^\d+\./.test(line),tag=ordered?'ol':'ul',items=[];while(i<lines.length&&(ordered?/^\d+\.\s/:/^[-*]\s/).test(lines[i]))items.push(`<li>${inline(lines[i++].replace(/^([-*]|\d+\.)\s+/,''),base)}</li>`);out.push(`<${tag}>${items.join('')}</${tag}>`);continue;}
    if(line.includes('|')&&i+1<lines.length&&/^\s*\|?\s*:?-{3,}/.test(lines[i+1])){const header=cells(line);i+=2;const rows=[];while(i<lines.length&&lines[i].includes('|')&&lines[i].trim())rows.push(cells(lines[i++]));out.push(`<div class="table-wrap"><table><thead><tr>${header.map(c=>`<th>${inline(c,base)}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${header.map((_,n)=>`<td>${inline(r[n]||'',base)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);continue;}
    const p=[line];i++;while(i<lines.length&&!special(lines[i])&&!(lines[i].includes('|')&&lines[i+1]?.match(/^\s*\|?\s*:?-{3,}/)))p.push(lines[i++]);out.push(`<p>${inline(p.join(' '),base)}</p>`);
  }
  return {html:out.join('\n'),headings};
}
