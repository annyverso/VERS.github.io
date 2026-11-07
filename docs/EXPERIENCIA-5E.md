# Experiência do site VERS: 5E, portais e entidades

Documento de projeto. Explica por que cada coisa está onde está.

## 1. Espinha: modelo 5E (Excitement, Entry, Engagement, Exit, Extension)
Cada seção do HTML traz `data-e="..."` com a fase a que serve.

| Fase | O que a pessoa vive | Onde no site |
|---|---|---|
| Excitement (atrair) | O cursor abre um portal na foto e a foto vira pixels na paleta | Foto de capa da home (`data-e="excitement"`) |
| Entry (entrar) | Clicar no portal, ou em "Atravessar o portal", cruza para o núcleo da marca. Trocar de página repete a travessia | `#nucleo` na home; faixas entre páginas |
| Engagement (participar) | Jogar o mapa dos verbos; filtrar catálogo e projetos | Mapa na home; catálogo; projetos |
| Exit (terminar) | Todo caminho acaba num próximo passo claro: "Próxima fase" | CTA final da home; bloco `.gate` em todas as páginas internas |
| Extension (levar) | Um objeto para levar: o mapa da VERS em texto, o catálogo completo | "Levar com você", no fim da home |
| Resultados significativos | A prova do que aconteceu | Seção "Operação em escala" e páginas de Projetos |
| Progresso (todas as fases) | O jogador sabe onde está e o que já acendeu | Régua "Fases" no canto da tela: um bloco por fase que a página tem (lido dos `data-e`, na ordem do HTML), em degraus como o E. Cada fase alcançada acende, é anunciada ("Fase 2 de 6 desbloqueada") e é um link. Nada fica bloqueado |
| Resultados significativos (onde) | A prova tem lugar | Seção "Onde a VERS já esteve": planeta em projeção estereográfica ("little planet") com os lugares reais e uma lista de cartões que é o conteúdo canônico |

## 2. Portais e embodiment (referências coladas pela Anny)
Só cores da paleta. Tudo em degraus, na linguagem do E.

| Ficção | Ideia | Gesto no site |
|---|---|---|
| Portal (Valve) / Marvel | Momentum se conserva; o espaço dobra | Faixas de troca de página entram por um lado e saem pelo oposto, na mesma direção. Na plataforma Serviço, um par de anéis laranja e azul, com uma caixa que passa de um ao outro |
| Rick and Morty | Cardápio de realidades; o corpo assume a regra da dimensão | Plataforma Catálogo: camadas de portais que se alternam. O jogador muda a cor dos óculos ao chegar |
| Stranger Things | Fenda viva, que pulsa | Plataforma Obra: o portal respira e solta esporos |
| Matrix / XR | Interface que transporta a consciência | Plataforma Produto: chuva digital dentro da moldura |
| Dark | Ciclos de tempo | Não usado de propósito: "menos é mais" |
| XR e conforto | Conflito entre corpo e visão causa enjoo | Câmera sempre parada, horizonte estável, movimentos curtos em degraus, `prefers-reduced-motion` respeitado |
| Glitch (portal literal) | O portal é uma falha na realidade, não uma moldura | O E do logotipo já é um glitch parado (barras deslocadas). Na foto: a borda do portal é uma fenda de 28 segmentos que recuam e avançam; fora dela a foto rasga em linhas deslocadas com canais de cor separados; dentro, faixas da foto real vazam por cima dos pixels, com linhas de varredura e blocos corrompidos na paleta. O clique dispara uma rajada que acalma. Na troca de página: lascas laranja e céu rasgam as bordas das faixas, a página treme em 3 degraus e os títulos chegam com as cores separadas. No mapa: ao acender, o portal ganha duas cópias fantasma, laranja e céu |

## 3. Entidades: Obra, Catálogo, Serviço, Produto, Projeto
Premissa (planilha): a instituição contrata um **serviço** ou um **produto** da VERS para exibir uma **obra**, e isso gera um **projeto** (na planilha, "case").

| Entidade | O que é | Cor | Página |
|---|---|---|---|
| Obra | O que o público vive | índigo claro | `obra-<id>.html` |
| Catálogo | As obras em circulação (VERS Apresenta) | lilás | `vers-apresenta.html` |
| Serviço | O que a VERS faz, com equipe e equipamento, para exibir uma obra | azul céu | `produtos-e-servicos.html#materializar` |
| Produto | O software da VERS | laranja | `produtos-e-servicos.html#gerenciar` |
| Projeto | A prova: cliente, frente, obra, resultado | limão | `projetos.html`, `projeto-<id>.html` |

Regras da planilha e como foram aplicadas:
- Cada afirmação de valor é seguida de métrica ou marca: linha "Prova" nas frentes; o número é a primeira coisa de cada cartão de projeto.
- Nenhuma página é ponto cego: todas terminam em `.gate` ("Próxima fase").
- Nunca misturar o que se vende com a evidência: Produtos e Serviços explicam; Projetos provam. A ficha técnica de operação saiu da página de obra e foi para Materializar.
- Rotas separadas para produtos e projetos; "Projetos relacionados" no fim de cada frente.
- Cartões de projeto puxam as tags de frente (Obra, Catálogo, Serviço, Produto), cliente e porte.
- Página de projeto cita cliente, frente usada e obras exibidas (linha "Cliente, Contratou, Para exibir, Resultado").
- O catálogo reúne obras e não se confunde com a VERS: a linha sob o título aponta para Produtos e Serviços e para Projetos.
- CTA por estágio: frentes "Solicitar proposta" ou "Falar com um especialista"; catálogo "Solicitar catálogo completo" ou "Agendar sessão de curadoria".

Brandbook vence nas palavras: "Materializar" (nunca "Operar"), "projeto" no lugar de "case", sem "ativação", sem verbos de visão nos CTAs. Para voltar a "Cases", mude `LABEL_PROJETO` em `_build/build.py`.

## 4. Normas e boas práticas
- **W3C**: HTML válido (html-validate), landmarks únicos, trilha de navegação, `lang`, JSON-LD schema.org (Organization, BreadcrumbList, ItemList, CreativeWork, Service, SoftwareApplication), `canonical` e `sitemap.xml` quando `SITE_URL` é informado.
- **WCAG 2.2 AA**: axe-core sem violações em todas as páginas (desktop e celular); foco visível; botões e abas com 44 px ou mais de altura (links de trilha com no mínimo 24 px, como pede o critério 2.5.8); contraste conferido; `prefers-reduced-motion`; nada pisca mais de três vezes por segundo; abas com setas (ARIA APG).
- **ISO/IEC/IEEE 29148** (requisitos): tabela abaixo, com identificador, enunciado verificável e método.
- **IEEE 3079-2020** (redução de enjoo em VR com HMD): usado como inspiração dos princípios de conforto. Não há certificação, porque a norma trata de headsets, não de páginas.
- **ISO 9241-210** (projeto centrado no ser humano): jornada 5E, textos originais preservados, teste com pessoas ainda por fazer.

| ID | Requisito | Verificação |
|---|---|---|
| RF-01 | Toda página interna termina em pelo menos um link de próxima fase | Inspeção: `nav.gate` em todas |
| RF-02 | Cada cartão de projeto mostra número, frente, porte e cliente | Inspeção |
| RF-03 | Cada projeto cita cliente, frente e, quando conhecida, a obra | Inspeção |
| RF-04 | Os quatro verbos são acessíveis por mouse, teclado e toque | Teste: setas, clique na plataforma, Voltar/Seguir |
| RF-05 | A travessia do portal tem equivalente por link | Teste: `a[data-cross]` com Enter |
| RNF-01 | Nenhum erro de HTML | `html-validate` |
| RNF-02 | Nenhuma violação WCAG 2.2 AA | `axe-core` |
| RNF-03 | Sem rolagem horizontal em 390 px | Teste de overflow |
| RNF-04 | Com `prefers-reduced-motion` ou sem WebGL, tudo continua utilizável | Teste nos dois modos |
| RNF-05 | Nenhum movimento passa de 700 ms (travessias 420 a 560 ms; contagem dos números 660 ms) | Revisão do código (`game.js`, `site.js`) |

## 5. Pendências de conteúdo (dados que só a VERS tem)
1. **Fotos** dos projetos e das obras da planilha (coluna "Fotos" vazia). Hoje: só Circuito Sesc tem foto; as demais usam o mural.
2. **Frente usada em cada projeto**: a planilha confirma só Impressionistas = Operar (Materializar). Os outros quatro foram deduzidos da categoria. Conferir.
3. **Produto (software)**: sem projeto que o comprove, a regra "afirmação seguida de métrica" ainda não se cumpre em Gerenciar. Falta o nome do software e uma caixa de e-mail (hoje `contato@vers.com.br`).
4. **Obras exibidas** em Circuito Sesc e Varilux: a planilha não diz quais.
5. **Formato** (Exposição XR, Instalação imersiva, Free-roaming) das três obras novas.
6. **Ficha técnica de referência** (12 headsets, 18 minutos) vem do kit e não bate com a escala da planilha (40 e 120 óculos).
7. Cinco itens do catálogo vindos do kit ("A cidade por dentro", "Temporada completa", "Praça pública", "Mediação como obra", "Sessão coletiva") descrevem cenas de operação. Manter como obras ou virar projetos é decisão da VERS.
8. Domínio do site: defina `SITE_URL` ao gerar para ativar canonical, JSON-LD com URL e sitemap.
9. Versões em inglês e francês não foram feitas.

## 6. Regra do glitch (acessibilidade e conforto)
- WCAG 2.3.1: nada pisca mais de três vezes por segundo. Todo sorteio do glitch usa um "tique" de no máximo **6 por segundo** (`floor(tempo × 6)`), nunca um valor novo por quadro; o deslocamento do DOM e os títulos andam em 3 degraus de ~165 ms.
- O glitch é rajada curta (0,5 s) e volta à calma: a foto fica estável quando a pessoa para.
- `prefers-reduced-motion: reduce`: sem travessia, sem classe `is-glitch`, sem fantasmas nos portais, sem fatiamento de títulos. O portal da foto fica parado.
- Só cores da paleta (laranja e céu como "canais" separados), nunca vermelho puro saturado.

## 7. Clique na foto de capa (Entry)
- O portal da foto agora diz o que faz: etiqueta "Atravessar →" que anda com ele e cursor de clique sobre a foto. A frase embaixo ("Atravessar o portal · ou clique no portal da foto") é o equivalente por teclado e leitor de tela.
- Com `prefers-reduced-motion`, o clique na foto vai direto ao destino (antes era ignorado, e a frase continuava mandando clicar).
- O retorno do clique é o avanço de fase: a régua acende a fase 2 ("Entrar") ao chegar no núcleo da marca.

## 8. Planeta (Resultados significativos)
- Projeção estereográfica: a mesma que transforma uma foto 360° em "planeta pequeno". Centro e zoom mudam; norte fica sempre para cima (conforto).
- Terra: Natural Earth (domínio público) via `world-atlas` (land-50m), rasterizada uma vez em `assets/mapa/terra.png`. Scripts em `_build/mapa/`.
- Os pinos são botões HTML (E em miniatura); os que se sobrepõem viram um grupo com contagem e aproximam ao clicar. Selecionar um pino acende o cartão do lugar.
- Os cartões são o conteúdo: sem WebGL, sem JS ou sem a imagem, a lista continua inteira.
- Só entram lugares que existem nos dados (`LUGARES` em `_build/build.py`). Projetos sem cidade registrada (Circuito Sesc, Varilux) ficam numa nota abaixo da lista, sem ponto.

