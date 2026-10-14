# Julli doesn’t know · Caderno de estudos

Biblioteca de estudos em HTML, CSS e JavaScript, pronta para GitHub Pages. Bordô, creme, títulos serifados e ilustrações de caderno, seguindo os mockups aprovados.

## O que já funciona

- Início, temas, subtemas e páginas de conteúdo.
- Busca nos títulos, resumos e textos; ignora diferenças de acentuação.
- Carrossel manual com deslize no celular e botões no computador.
- Filtros por subtema, índice do artigo e ampliação de imagens por clique ou teclado.
- Conteúdos carregados de arquivos Markdown, com links diretos via hash.
- Layout responsivo, navegação por teclado e opção de movimento reduzido.
- Índice gerado automaticamente no workflow do GitHub, sem backend nem npm.

Inclui quatro **conteúdos iniciais de exemplo**, baseados nos assuntos estudados: lobos cerebrais, cerebelo/tronco, neurônio e memória de trabalho. Os textos podem ser substituídos pelos roteiros finais. Filosofia, História e Tecnologia estão organizados, mas ainda sem artigos. Os URLs específicos dos posts não foram fornecidos: o botão do Instagram aparece quando `instagram` estiver preenchido com um link real de post/reel.

## Abrir no computador

Você precisa do Python 3. Abra o terminal na pasta do projeto:

```bash
python3 scripts/build_index.py
python3 -m http.server 8000
```

Abra **http://localhost:8000**. Não abra `index.html` por duplo clique: navegadores bloqueiam a leitura dos Markdown pelo protocolo `file://`.

O site não precisa do Python em produção. Ele só gera o catálogo antes da publicação; o navegador usa HTML, CSS e JavaScript.

## Organização

| Caminho | Finalidade |
| --- | --- |
| `index.html` | Estrutura principal |
| `assets/styles.css` | Identidade visual e layout |
| `assets/app.js` | Navegação, busca, carrossel, filtros e imagens |
| `assets/markdown.js` | Leitura e conversão do Markdown |
| `assets/art.js` | Pequenas ilustrações em SVG |
| `assets/hero.png` | Ilustração editorial da página inicial |
| `conteudos/TEMA/tema.json` | Nome, introdução e ordem do tema |
| `conteudos/TEMA/fotos/` | Imagens compartilhadas do tema |
| `conteudos/TEMA/SUBTEMA/subtema.json` | Nome e descrição do subtema |
| `conteudos/TEMA/SUBTEMA/fotos/` | Imagens explicativas do subtema |
| `conteudos/TEMA/SUBTEMA/estudo.md` | Um artigo/post |
| `conteudos/index.json` | Catálogo gerado; não editar manualmente |
| `templates/novo-conteudo.md` | Modelo para novos estudos |
| `scripts/build_index.py` | Gera catálogo e valida os arquivos |
| `.github/workflows/pages.yml` | Gera e publica o site ao atualizar main |

## Acrescentar um estudo por semana

1. Copie `templates/novo-conteudo.md` para a pasta do subtema, com um nome como `memoria-episodica.md`.
2. Edite os metadados entre os dois `---`. Esse bloco usa **JSON**, não YAML: mantenha as aspas, use vírgulas entre campos e não coloque vírgula depois do último.
3. Escreva o conteúdo abaixo do bloco.
4. Coloque as imagens em `fotos/` e insira no texto: `![Descrição da imagem](fotos/nome.png)`.
5. Faça commit e push para `main`. O workflow gera o índice e publica automaticamente.

Se estiver usando o servidor local, execute `python3 scripts/build_index.py` depois de adicionar/editar conteúdos.

### Metadados

| Campo | Como preencher |
| --- | --- |
| `id` | Identificador único, sem acentos/espaços. Preserve-o para manter links existentes. |
| `title` | Título do estudo |
| `summary` | Resumo curto mostrado nos cards |
| `date` | Data de publicação/atualização em `AAAA-MM-DD` |
| `instagram` | URL real `https://www.instagram.com/p/.../` ou `/reel/.../`; vazio esconde o botão |
| `image` | Capa relativa ao Markdown, por exemplo `fotos/capa.png`; vazio usa o desenho padrão |
| `art` | Desenho padrão: `brain`, `book`, `history`, `tech`, `neuron` ou `portrait` |
| `featured` | `true` para aparecer no carrossel inicial; `false` para não destacar |
| `related` | Lista de IDs existentes, por exemplo `["lobos-cerebrais"]` |

Para usar uma imagem da pasta do tema: `![Legenda](../fotos/imagem.png)`. Para um link interno: `[Ler outro estudo](#/conteudo/lobos-cerebrais)`. Você também pode configurar `related` para gerar os cards de conexão. Imagens do tema são armazenadas na pasta compartilhada, mas os doodles padrão das páginas permanecem em `art.js`.

### Markdown suportado

Títulos `##` e `###`, parágrafos, **negrito**, *itálico*, listas simples, citações `>`, links, imagens em uma linha própria, blocos de código com três crases e tabelas simples. O título principal vem dos metadados. Use `##` para as seções do índice lateral. Listas aninhadas, extensões avançadas e HTML bruto não são interpretados. O HTML bruto aparece como texto e URLs executáveis são rejeitadas.

Para diagramas ou gráficos que precisam de precisão, use imagens preparadas e conferidas separadamente. A ilustração principal é decorativa; o SVG do neurônio é um esquema simplificado.

### Novo tema ou subtema

Copie a estrutura de um tema/subtema existente, incluindo o JSON e `fotos/`. O `id` deve corresponder ao nome da pasta. Atualize título, descrições e `order`. Em `tema.json`, `start` é opcional e contém IDs de conteúdos existentes para o bloco “Comece por aqui”. Não é preciso editar o JavaScript.

## Publicar no GitHub Pages

1. Crie um repositório, por exemplo `julli-doesnt-know`.
2. Coloque **o conteúdo desta pasta na raiz do repositório**, incluindo `.github/workflows/pages.yml` e `.nojekyll`. Não suba só o ZIP e não mantenha uma pasta intermediária acima de `index.html`.
3. Use a branch `main`, como definido no workflow.
4. Em **Settings → Pages → Build and deployment → Source**, selecione **GitHub Actions**.
5. Faça push ou execute “Publicar caderno no GitHub Pages” na aba Actions. Aguarde o workflow concluir.
6. O endereço terá o formato `https://SEU-USUARIO.github.io/julli-doesnt-know/`.

As rotas usam `#/tema/neurociencia` e `#/conteudo/lobos-cerebrais`: abrir ou atualizar uma página interna funciona sem configurar um servidor de rotas. Os caminhos de arquivos são relativos à raiz do projeto, compatíveis com repositórios em subpastas do Pages.

Referência oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## Verificação

```bash
python3 scripts/build_index.py --dist
node --test scripts/check.test.mjs
```

O primeiro comando valida IDs, datas, referências entre artigos, URLs do Instagram e existência das imagens locais, e monta `dist/`. O segundo verifica conversão do Markdown, URLs, navegação, busca e caminhos em uma simulação de DOM. A inspeção visual em navegador não foi executada neste ambiente; confira desktop e celular após abrir o servidor local. O workflow será verificado em uma execução real depois que o repositório for criado e Pages habilitado.

As fontes web são opcionais; se o Google Fonts estiver indisponível, o site usa Georgia, Arial e monospace. A navegação não depende de CDN ou API externa.

## Próximas personalizações

Substitua os exemplos pelos roteiros completos e preencha os links dos posts. As cores estão nas variáveis no início de `assets/styles.css`. Para alterar sua apresentação, edite a função `about` em `assets/app.js` e o texto de abertura da função `home`.
