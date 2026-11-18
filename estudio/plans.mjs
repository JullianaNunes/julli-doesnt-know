export const formats = { vlog: "Vlog", carrossel: "Carrossel", reels: "Reels" };

export const example = "Conheço toda a história da minha versão adolescente, mas olho para algumas decisões e sinto que foram tomadas por outra pessoa. Quero conectar isso ao Navio de Teseu.";

const topics = [
  {
    matches: /navio de teseu|vers[aã]o adolescente|identidade pessoal/i,
    title: "A minha versão adolescente ainda sou eu?",
    hook: "Eu conheço toda a história da minha versão adolescente. Mas tem decisão daquela época que parece que foi tomada por outra pessoa.",
    concept: "O Navio de Teseu me fez pensar nisso. Se você troca as tábuas de um navio uma por uma, em que momento ele deixa de ser o mesmo navio?",
    turn: "Comigo, tem coisa que mudou aos poucos e que eu só percebi quando olhei pra trás. E ainda assim sou eu que lembro como era estar ali.",
    end: "O que ainda me liga a quem eu era quando eu já não escolheria nada do mesmo jeito?",
    object: "Caderno com duas colunas, ‘o que mudou’ e ‘o que ficou’",
    visual: "Rasurar e redesenhar a mesma tábua num doodle do navio",
    caption: "Tem escolhas antigas que eu consigo explicar direitinho e que hoje me parecem quase de outra pessoa. Fiquei pensando se reconhecer a minha história e me reconhecer nela são a mesma coisa.",
  },
  {
    matches: /ansied|ansios|luta ou fuga|sistema de alarme/i,
    title: "Por que o corpo ainda fica em alerta?",
    hook: "Dá pra saber que está tudo bem e ainda sentir como se alguma coisa fosse acontecer.",
    concept: "A resposta de luta ou fuga ajuda a entender o que é esse estado de alerta. O corpo se prepara pra agir, mesmo quando a gente ainda está tentando entender a situação.",
    turn: "Imagina ouvir um barulho atrás de você e só depois perceber que era uma porta. O susto veio antes da explicação.",
    end: "O que muda quando eu entendo o que estou sentindo, mesmo que a sensação ainda esteja ali?",
    object: "Caderno aberto na anotação ‘corpo em alerta’",
    visual: "Mão virando a página antes de revelar a palavra ‘explicação’",
    caption: "Uma pergunta que ficou no meu caderno: por que entender uma sensação e deixar de senti-la parecem coisas tão separadas?",
  },
  {
    matches: /amor fati|s[ií]sifo|nietzsche.*camus|camus.*nietzsche/i,
    title: "E se eu tivesse escolhido diferente?",
    hook: "Eu fico pensando em quem eu seria se tivesse feito outras escolhas. E a resposta só existe na minha cabeça.",
    concept: "Nietzsche chama de amor fati a ideia de amar o próprio destino. Camus imagina Sísifo feliz voltando para a pedra que precisa empurrar todos os dias.",
    turn: "A pedra continua ali. Nas duas ideias, o que me interessa é o que a gente faz com aquilo que já faz parte da nossa vida.",
    end: "Que parte da minha história eu continuo tentando reescrever toda vez que penso em quem eu poderia ter sido?",
    object: "Caderno aberto num ‘e se…’ escrito à mão",
    visual: "Desenhar dois caminhos que partem do mesmo ponto",
    caption: "Pensar em outra versão de mim é fácil. Mais estranho é reparar no que sobra da minha vida de agora quando eu paro de imaginar a outra.",
  },
  {
    matches: /efeito holofote|medo d[ae] rejei[cç][aã]o/i,
    title: "Será que alguém reparou?",
    hook: "Sabe quando uma frase que você falou dura dez segundos na conversa e o resto do dia na sua cabeça?",
    concept: "O efeito holofote é a tendência a superestimar quanto os outros reparam na gente. Pra quem falou, a frase pesa. Pra quem ouviu, talvez fosse só mais uma frase.",
    turn: "Dá pra testar a intuição ao contrário. De quantos pequenos erros das outras pessoas você se lembra hoje?",
    end: "O que eu faria diferente se eu não precisasse ter certeza de que ninguém vai reparar?",
    object: "Caderno com um círculo em volta da palavra ‘eu’",
    visual: "Abrir o enquadramento para revelar as outras palavras na página",
    caption: "Uma frase pode ter duas durações: o tempo que levou pra sair e o tempo que você passou repassando. Tenho pensado em quem mais, além de mim, ouviu a segunda versão.",
  },
];

function angleFor(idea) {
  const topic = topics.find(({ matches }) => matches.test(idea));
  if (topic) return topic;
  const headline = idea.split(/\r?\n/).find(line => line.trim()).trim();
  const title = headline.length <= 105 ? headline : headline.slice(0, 102).trimEnd() + "…";
  return {
    title,
    hook: /[?]$/.test(title) ? title : `Eu queria entender melhor uma coisa: ${title.charAt(0).toLocaleLowerCase("pt-BR") + title.slice(1)}`,
    concept: "O primeiro passo é olhar pra isso de perto. [Mostre a cena, a leitura ou o detalhe concreto que puxou a ideia.]",
    turn: "O detalhe que muda a pergunta é este: [explique uma descoberta sua e compare com o que você pensava antes].",
    end: "Se fosse pra testar essa ideia na prática amanhã, o que você observaria primeiro?",
    object: "Objeto ou anotação que deu origem à pergunta",
    visual: "Close no detalhe que mudou sua interpretação",
    caption: `Uma ideia que ficou no meu caderno: ${title}\n\nO que você observaria primeiro pra descobrir se ela se sustenta no dia a dia?`,
  };
}

function seconds(value) {
  return `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;
}

function timed(blocks) {
  let elapsed = 0;
  return blocks.map(([title, text, cue, minimum]) => {
    const duration = Math.max(minimum, Math.ceil(text.trim().split(/\s+/).length / 2.3) + 2);
    const mark = `${seconds(elapsed)}–${seconds(elapsed + duration)}`;
    elapsed += duration;
    return { mark, title, text, cue, duration };
  });
}

export function draft(idea, format) {
  const a = angleFor(idea);
  const carousel = format === "carrossel";
  const vlog = format === "vlog";
  const beats = carousel ? [
    ["Capa", a.title, "Título em serifada bordô sobre fundo creme."],
    ["De onde veio", a.hook, "Use uma foto ou recorte que situe a cena."],
    ["A ideia", a.concept, "Sublinhe só o trecho que sustenta o argumento."],
    ["O que isso muda", a.turn, "Mostre o exemplo com um doodle ou detalhe visual."],
    ["O que fica", a.end, "Dê espaço à pergunta no centro da página."],
  ] : vlog ? [
    ["Abrir a cena", a.hook, "Comece pelo som do ambiente. A voz entra enquanto a ação já acontece.", 9],
    ["Mostrar o que puxou a ideia", a.concept, "Use voz em off sobre o detalhe. Volte à cena antes de passar para a reflexão.", 17],
    ["Deixar a ideia acontecer", a.turn, "Troque o plano aberto por um close quando aparecer a pista visual. Sustente o som ambiente no corte.", 15],
    ["Fechar a cena", a.end, "Volte ao primeiro enquadramento ou encerre a ação inicial. Deixe o último plano respirar.", 8],
  ] : [
    ["Gancho", a.hook, "Abra em plano médio, já na primeira frase. Corte na virada da ideia.", 7],
    ["O conceito", a.concept, "Intercale um close do caderno na palavra-chave. Retome o rosto na segunda frase.", 13],
    ["O exemplo", a.turn, "Mostre um detalhe por 2–3 segundos e volte para a fala antes da conclusão.", 12],
    ["Pergunta final", a.end, "Mantenha a pausa antes da pergunta. Termine no mesmo enquadramento, sem enxerto.", 7],
  ];
  const script = carousel ? beats.map(([title, text, cue], index) => ({
    mark: `Slide ${String(index + 1).padStart(2, "0")}`, title, text, cue, duration: 0,
  })) : timed(beats);
  const takes = carousel ? [
    `Slide 2 · Foto vertical do detalhe inicial. ${a.object}.`,
    `Slide 4 · ${a.visual}.`,
    "Capa · Separe uma imagem com espaço livre para o título, se usar fotografia.",
  ] : [
    vlog ? "Abertura · Plano aberto da ação. Grave 4 segundos de som ambiente antes da fala." : "Gancho e final · Plano médio vertical, câmera à altura dos olhos. Grave as duas falas com a mesma luz.",
    `Conceito · Close de 4–6 segundos. ${a.object}.`,
    `Exemplo · Plano de detalhe. ${a.visual}.`,
    vlog ? "Fecho · Grave a conclusão da ação sem falar e a pergunta em voz em off." : "Apoio · Filme as mãos voltando ao caderno. Segure 2 segundos antes e depois da ação.",
  ];
  const editing = carousel ? [
    ["Composição", "Use 4:5, margens generosas e uma ideia por página. Quebre o texto em blocos curtos."],
    ["Tipografia", "Serifada bordô nos títulos, fonte simples no corpo e um destaque manual quando fizer sentido."],
    ["Ritmo", "Alterne página de texto e imagem. Use o mesmo alinhamento para guiar a leitura."],
    ["Capa", a.title],
  ] : [
    ["Texto na tela", "Use frases curtas em creme ou bordô com contraste. Revise as legendas e preserve as margens da interface."],
    ["Cortes", vlog ? "Ligue cenas pela ação e pelo som. Dê tempo para ver o que está acontecendo." : "Prefira cortes secos entre ideias. Retire repetições e preserve pausas que dão sentido à fala."],
    ["Som", vlog ? "Use som ambiente entre os blocos de voz em off. Se tiver trilha, mantenha-a abaixo da voz." : "Priorize a voz. Se usar trilha, mantenha o volume baixo até a pergunta final."],
    ["Apoios", "Reserve o doodle, a foto ou o caderno para o momento em que a fala precisa de uma imagem."],
    ["Capa", `${a.title} · Texto bordô em fundo creme ou sobre um close com área livre.`],
    ["Enquadramento", "Grave na vertical, em 9:16."],
  ];
  return {
    format, title: a.title, script, takes, caption: a.caption,
    editing: editing.map(([label, value]) => ({ label, value })),
  };
}

export function chatPrompt(idea, format) {
  const schema = {
    format,
    title: "Título",
    script: [{ mark: format === "carrossel" ? "Slide 01" : "00:00–00:08", title: "Bloco", text: "Fala ou texto final", cue: "Instrução de corte ou layout", duration: format === "carrossel" ? 0 : 8 }],
    takes: ["Enquadramento, ação e bloco de uso"],
    caption: "Legenda pronta para publicar",
    editing: [{ label: "Capa", value: "Direção visual" }],
  };
  return `Use a skill $criar-conteudo-julli, se disponível, para criar um plano de ${formats[format]} pro perfil julli doesn’t know. Mesmo sem a skill, escreva em português brasileiro falado, com uma observação concreta, uma conexão relevante com um conceito ou exemplo e, quando couber, uma pergunta final que avance a ideia. Preserve detalhes que eu fornecer e evite inventar experiências ou fontes. Use bordô e creme, apoios pontuais de caderno, livros ou doodles, cortes com intenção e legendas legíveis. Para vídeo, estime tempos contínuos em mm:ss e indique onde cortar e inserir cada take. Para carrossel, escreva o texto final e o apoio visual de cada slide, com duração zero. Dê instruções executáveis de gravação/edição e uma legenda que acrescente algo à fala. Devolva somente um objeto JSON válido, com todos os campos deste exemplo e mais itens nas listas quando necessário:\n${JSON.stringify(schema)}\n\nMinha ideia:\n${idea}`;
}

export function parsePlan(source) {
  const raw = source.trim().replace(/^\x60\x60\x60(?:json)?\s*([\s\S]*?)\s*\x60\x60\x60$/i, "$1");
  const plan = JSON.parse(raw);
  const isText = value => typeof value === "string" && Boolean(value.trim());
  const hasItems = value => Array.isArray(value) && value.length > 0 && value.length <= 30;
  if (!plan || !Object.hasOwn(formats, plan.format) || !isText(plan.title) || !isText(plan.caption)
    || !hasItems(plan.script) || !plan.script.every(row => row && [row.mark, row.title, row.text, row.cue].every(isText) && Number.isFinite(row.duration) && row.duration >= 0)
    || !hasItems(plan.takes) || !plan.takes.every(isText)
    || !hasItems(plan.editing) || !plan.editing.every(row => row && isText(row.label) && isText(row.value))) {
    throw new Error("O plano precisa ter formato, título, roteiro, takes, legenda e edição.");
  }
  return plan;
}

export function toText(plan) {
  return [
    `# ${plan.title}`,
    formats[plan.format],
    "## Roteiro",
    ...plan.script.map(row => `${row.mark} · ${row.title}\n${row.text}\n${row.cue}`),
    "## Takes / imagens\n" + plan.takes.map(take => "- " + take).join("\n"),
    "## Legenda\n" + plan.caption,
    "## Edição\n" + plan.editing.map(row => `- ${row.label}: ${row.value}`).join("\n"),
  ].join("\n\n");
}
