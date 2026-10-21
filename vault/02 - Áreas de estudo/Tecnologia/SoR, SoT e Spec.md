---
tipo: conceito
status: em estudo
area: "Tecnologia"
subtema: "Engenharia de dados"
tags:
  - estudos
  - tecnologia
publicar: false
atualizado: 2026-10-20
origem_site: conteudos/tecnologia/engenharia-de-dados/sor-sot-spec.md
instagram: ""
---

# SoR, SoT e Spec

## Por que dividir os dados em camadas?

Um dado que chega de um sistema nem sempre está pronto para virar uma análise. Pode haver datas em formatos diferentes, registros duplicados ou informações que precisam ser combinadas.

Organizar esse caminho em camadas ajuda a preservar a origem, acompanhar as transformações e preparar informações para cada uso.

## Tradução mental: uma cozinha

Pense no preparo de uma refeição: primeiro chegam os ingredientes; depois você lava, corta e organiza; por fim, prepara um prato para quem vai comer.

No estudo que fizemos, usamos essa sequência para explicar SoR, SoT e Spec. Esses nomes e suas responsabilidades dependem da arquitetura de cada organização.

### SoR: os ingredientes que chegam

SoR costuma significar **System of Record**, o sistema de registro de referência para determinada informação. Na analogia, é a origem confiável dos ingredientes.

Em uma plataforma de dados, uma camada chamada SoR pode armazenar cópias próximas ao formato da fonte e preservar seu histórico. Essa é uma convenção da plataforma: ser sistema de registro não significa, por definição, ser uma camada de dados brutos.

### SoT: lavar, cortar e organizar

Na convenção usada no nosso exemplo, SoT representa a etapa de transformação: limpar, validar, padronizar e integrar os dados. É o *mise en place*, a preparação dos ingredientes antes da receita.

Por exemplo: converter datas para o mesmo formato, tratar duplicidades segundo uma regra e relacionar compras ao cadastro do cliente.

**Atenção à sigla:** SoT também é usada como **Source of Truth**, ou fonte da verdade. “System of Transformation” não é uma expansão universal. Vale consultar o glossário da arquitetura em que você trabalha.

### Spec: o prato para uma necessidade específica

No exemplo, Spec é a camada especializada para consumo. Os dados são organizados para atender uma análise, produto, relatório ou indicador.

É como usar os ingredientes preparados para fazer um prato específico. Uma tabela com o total de compras por cliente e por mês pode ser um desses resultados.

## E Bronze, Silver e Gold?

A arquitetura **Medallion** descreve um refinamento progressivo dos dados. A comparação abaixo ajuda a entender a ideia da cozinha, mas não estabelece equivalência obrigatória com SoR, SoT e Spec.

| Camada Medallion | Papel típico | Na cozinha |
| --- | --- | --- |
| Bronze | Ingestão e preservação de dados próximos à origem | Ingredientes recebidos |
| Silver | Limpeza, validação, padronização e integração | Ingredientes preparados |
| Gold | Modelagem e agregações orientadas ao negócio | Prato pronto para uma finalidade |

## Um exemplo com compras

- **Bronze:** registros de compras como chegaram dos sistemas, com metadados de ingestão.
- **Silver:** compras validadas, datas padronizadas e identificadores de clientes relacionados.
- **Gold:** valor total de compras por cliente e por mês, pronto para um relatório.

Nem toda tabela Gold é apenas uma soma. Ela pode conter modelos dimensionais e dados enriquecidos para diferentes usos de negócio.

## Para guardar no caderno

> A lógica da cozinha é: receber, preparar e servir. Medallion chama essas etapas de Bronze, Silver e Gold. SoR, SoT e Spec dependem das definições adotadas pela organização; a semelhança na analogia não torna os termos sinônimos.

## Teste sua compreensão

Se chegam dois registros da mesma compra, em qual etapa você investigaria a duplicidade? Explique também por que preservar o registro original ajuda a conferir o tratamento.

## Referências

- [Databricks — Arquitetura Medallion](https://docs.databricks.com/aws/pt/lakehouse/medallion)
- [Databricks — Data warehousing architecture](https://docs.databricks.com/aws/en/sql/get-started/data-warehousing-concepts)

A referência Medallion fundamenta Bronze, Silver e Gold. SoR/SoT/Spec e a analogia foram retomados do nosso estudo; o significado local dessas siglas deve ser confirmado na documentação de cada organização.

## Conexões no Obsidian

- [[Tecnologia]] — mapa da área deste estudo.
- [[Conteúdos do Instagram]] — os três estudos reunidos para continuar a leitura.
