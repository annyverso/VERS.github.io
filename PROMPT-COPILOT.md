# Prompt para o GitHub Copilot — replicar o Site VERS (UI kit vers.com.br)

## Como usar
1. Extraia o zip e abra a pasta inteira como workspace no VS Code (ou suba para um repositório). O Copilot só enxerga o que está no workspace.
2. No Copilot Chat (modo Agent), anexe/@-mencione este arquivo e escreva: "Siga o `PROMPT-COPILOT.md` e replique o site."
3. Para ver o resultado: `python -m http.server 8000` na raiz e abra `http://localhost:8000`. Não abra o `index.html` com duplo clique (as imagens usam máscara CSS e o navegador bloqueia por CORS em `file://`).

---

## PROMPT (cole a partir daqui)

Você é um engenheiro front-end. Meu workspace contém o UI kit do site da VERS (produtora e distribuidora de cultura imersiva). Sua tarefa é **replicar exatamente** o site que já funciona em `index.html`, mantendo a mesma estrutura de pastas, os mesmos componentes, os mesmos textos e os mesmos caminhos de assets. Não invente conteúdo, não troque fontes, cores nem imagens, e não "melhore" o design.

### 1. Referência visual (fonte da verdade)
- Prints das 4 telas em `reference/`: `tela-home.png`, `tela-apresenta.png`, `tela-obra.png`, `tela-contato.png` (1440 px de largura). O resultado final deve ficar visualmente igual a eles.
- O site já roda: `index.html` + `app.js` + `vendor/bundle.js`. Use-o como oráculo para comparar a sua versão.

### 2. Stack e regras
- React 18 (UMD em `vendor/`), sem build obrigatório. Se preferir Vite + React, mantenha a mesma árvore de componentes e converta os caminhos de `assets/` para `public/assets/`.
- Estilo 100% por `style={{…}}` inline com variáveis CSS de `tokens.css`. Nada de Tailwind nem bibliotecas de UI.
- Cantos retos em todo o site (sem `border-radius`). A única sombra do kit é a do Dialog e a do Toast.
- Um fundo dominante por seção, alternando; nunca dois fundos iguais em sequência.
- Fotografia sempre em tela cheia, atrás de um gradiente de proteção quando houver texto sobre ela.
- Grafismos grandes, cortados e vazando a seção; nunca como adesivo pequeno.
- Textos em português (pt-BR), do jeito que estão nos arquivos. Não reescreva.

### 3. Estrutura de pastas (replicar)
```
/
├─ index.html                      # shell: carrega tokens.css, vendor/*, app.js
├─ app.js                          # versão transpilada de src/app.jsx (App + roteamento)
├─ tokens.css                      # variáveis CSS + @font-face (fonts/)
├─ tokens.json
├─ fonts/                          # Elgraine-*.otf (corpo) e Nebulica-*.otf (display/UI)
├─ vendor/                         # react, react-dom, bundle.js (componentes compilados), bundle.css
├─ src/
│  ├─ app.jsx                      # App(): estado `page`, NAV, FOOTER, VERBOS, OBRAS, IMAGES, CLIENTS, STATS
│  ├─ components/                  # um arquivo .jsx por componente
│  │  ├─ brand/       Grafismo.jsx  Logo.jsx  Stat.jsx
│  │  ├─ core/        Button.jsx  Eyebrow.jsx  IconButton.jsx  Rule.jsx  Tag.jsx
│  │  ├─ feedback/    Dialog.jsx  Toast.jsx  Tooltip.jsx
│  │  ├─ forms/       Checkbox.jsx  Field.jsx  Input.jsx  Radio.jsx  Select.jsx  Switch.jsx  Textarea.jsx
│  │  ├─ layout/      Section.jsx
│  │  ├─ media/       MediaFrame.jsx  QuoteBlock.jsx  WorkCard.jsx
│  │  └─ navigation/  SiteFooter.jsx  SiteHeader.jsx  Tabs.jsx
│  └─ ui_kits/site/   SiteHome.jsx  SiteApresenta.jsx  SiteObra.jsx  SiteContato.jsx  SiteData.js  README.md
├─ assets/
│  ├─ graphics/       # logotipo, símbolo V, olho, mural, ondas, glitch (PNG com alfa)
│  ├─ photos/         # fotografias dos cases (JPG)
│  ├─ clients/        # logos de clientes (PNG)
│  ├─ Marca/          # logotipo e símbolo V em SVG (9 tintas cada), usar para assinatura nítida em qualquer tamanho
│  ├─ Icones/         # favicon.svg, favicon-32.png, apple-touch-icon.png, icon-192/512.png, icon-maskable-512.png
│  ├─ Brandbook/      # BRANDBOOK_VERS_RGB_10-2026.pdf (78 págs.; em conflito, vale o PDF)
│  └─ grafismos/      # biblioteca VERS_<Elemento>_<Cor>.png (42 arquivos; ver seção 4)
├─ docs/              # tokens.md, brandbook-10-2026.md e components/<Nome>__*.d.ts|README.md (props de cada componente)
└─ reference/         # prints de referência das 4 telas
```
Leia `docs/components/*__*.d.ts` e os `.jsx` de `src/` antes de escrever qualquer componente: as props e os estilos estão lá.

### 4. Caminhos dos assets (use exatamente estes, relativos a `index.html`)
No `app.jsx`: `G = "assets/graphics"`, `P = "assets/photos/"`, `C = "assets/clients/"`. Os componentes recebem `assetBase`/`P`/`G`/`C` por prop; não escreva caminhos absolutos.

**Fotos (`assets/photos/`)** — mapeamento usado pelo site (`IMAGES` em `src/ui_kits/site/SiteData.js`):
| chave | arquivo | onde aparece |
|---|---|---|
| hero | `assets/photos/vr-sunset-wide.jpg` | hero da Início |
| circuito | `assets/photos/vr-crianca-wide.jpg` | obra "Circuito Sesc de Artes" |
| instalacao | `assets/photos/vr-reach-wide.jpg` | obra "A cidade por dentro" |
| temporada | `assets/photos/free-roaming-overhead.jpg` | obra "Temporada completa" |
| praca | `assets/photos/praca-barretos-wide.jpg` | obra "Praça pública" |
| mediacao | `assets/photos/mediacao-wide.jpg` | obra "Mediação como obra" |
| coletiva | `assets/photos/tent-dusk-wide.jpg` | obra "Sessão coletiva" |
| dusk | `assets/photos/tent-dusk-wide.jpg` | par de fotos da tela Obra (crédito "Danilo Ferrara") |
| equipe | `assets/photos/equipe-publico-wide.jpg` | par de fotos da tela Obra |

Fotos extras disponíveis, ainda não usadas na UI: `alexandre-calil.jpg`, `equipe-tall.jpg`, `vr-crianca-tall.jpg`, `vr-dupla-tall.jpg`, `vr-retrato-tall.jpg`.

**Grafismos e marca (`assets/graphics/`)** — cores `white | black | graphite | indigo | lilac | lime | orange | sky`:
- Logotipo: `logotipo-{cor}.png` (8 arquivos)
- Símbolo V: `simbolo-v-{cor}.png` (8 arquivos)
- Olho: `olho-{cor}.png` (8 arquivos)
- Só em branco (usados com máscara CSS no `Grafismo`, que pinta qualquer cor): `mural-white.png`, `ondas-white.png`, `glitch-grande-white.png`, `glitch-h-white.png`, `glitch-v-white.png`
- Ausente: `olho-invertido-white.png` (o `Grafismo form="olho-invertido"` o referencia e dá 404; hoje não é usado nas 4 telas).

**Clientes (`assets/clients/`)**: a faixa "Com quem a VERS trabalha" usa `CLIENTS = ["sesc","globo","banco-do-brasil","onu","japan-foundation","anima-mundi","fundacao-itau","embratur","sebrae","senac","usp","gamescom"]`, carregados como `assets/clients/{id}.png`, em escala de cinza e opacidade 0.72. Existem ainda `companhia-das-letras`, `hering`, `mix-brasil`, `suvinil` e `ufrj` (`.png`), sem uso na UI.

**Marca em SVG (`assets/Marca/`)** — uma tinta por arquivo: `vers-logotipo-{preto|branco|limao|laranja|azul-claro|lilas|indigo|grafite-so-textura|currentcolor}.svg` e `vers-simbolo-{mesmas tintas}.svg`. O `currentcolor` herda a cor do CSS quando embutido no HTML (via `<img>` aparece preto). `grafite-so-textura` nunca serve de assinatura. Status: candidatos pendentes de aprovação de Alexandre Calil. Hoje o site usa o PNG de `assets/graphics/`; os SVG são a opção para o header e o rodapé.

**Ícones (`assets/Icones/`)**: no `<head>` use `<link rel="icon" href="assets/Icones/favicon.svg" type="image/svg+xml">`, `<link rel="icon" href="assets/Icones/favicon-32.png" sizes="32x32">` e `<link rel="apple-touch-icon" href="assets/Icones/apple-touch-icon.png">`. No manifesto: `icon-192.png` e `icon-512.png` (`"purpose":"any"`), `icon-maskable-512.png` (`"purpose":"maskable"`). O `favicon.ico` não existe aqui.

**Biblioteca de grafismos (`assets/grafismos/`)**: `VERS_{Elemento}_{Cor}.png`, com Elemento ∈ GlitchGrande, GlitchHorizontal, GlitchVertical, Logotipo, Ondas, SimboloV e Cor ∈ Preto, Branco, Amarelo, Laranja, AzulClaro, Lilas, Indigo (42 arquivos; faltam Mural e OlhoMeioTom desta biblioteca). Hexadecimais: Preto #191919, Branco #FFFFFF, Amarelo #D3DE28, Laranja #F15E2B, AzulClaro #B0E0E9, Lilas #D0B7D8, Indigo #4B59A7. Fundo transparente; as 7 cores de um elemento têm o mesmo alfa e se empilham com registro perfeito. Aviso: esta cópia pesa de 56 a 590 KB por arquivo, então não é o master de até 8334 px.

**Brandbook (`assets/Brandbook/BRANDBOOK_VERS_RGB_10-2026.pdf`)**: referência normativa da marca, com correção de 04/11/2026 na p. 66. Esta cópia tem a ilustração das pp. 22 e 23 reamostrada para 2400 px. O texto integral está em `docs/brandbook-10-2026.md`.

**Fontes (`fonts/`)**: Nebulica (títulos, UI, eyebrows) em Thin a Black; Elgraine (corpo e editorial) em ExtraLight a Black, com itálicos. O `tokens.css` já declara os `@font-face`.

### 5. Design tokens (em `tokens.css`; use as variáveis, não hex solto)
- Cores de marca: `--vers-black #231f20`, `--vers-white`, `--vers-lime #d3de28`, `--vers-indigo #4b59a7`, `--vers-orange #f15e2b`, `--vers-sky #b0e0e9`, `--vers-lilac #d0b7d8`, `--vers-graphite #3b3b3b`. Escalas: `--vers-indigo-100…950`, `--vers-ink-050…900`.
- Tipografia: `--font-ui` (Nebulica), `--font-body` (Elgraine). Eyebrows em caixa-alta com `--tracking-eyebrow`.
- Layout: `--gutter-page`, `--container-full`. Veja `docs/tokens.md` para a lista completa.
- Logotipo: área de proteção = altura do V; largura mínima 80 px; nunca distorcer, girar ou sobrepor a fundo com contraste < 3:1.

### 6. Telas (replicar na ordem; `page` ∈ home | apresenta | obra | contato)
- **Header** (sticky, `tone="dark"`, altura 78 px): logotipo branco à esquerda, links Início, VERS Apresenta, Obras e Contato, e CTA "Falar com a VERS". O link ativo tem fio lime. O CTA leva a Contato.
- **Início** (`SiteHome.jsx`): hero com foto `hero` em tela cheia + gradientes + olho lime; "Núcleo de marca"; os três verbos (Produzir, Distribuir, Materializar) sobre índigo; três obras (`WorkCard`); "Histórico" com os 4 números (42 mil · 18 · 07 · 03) sobre preto; faixa de parceiros; chamada final lime "Vamos dar presença à sua obra".
- **VERS Apresenta** (`SiteApresenta.jsx`): hero índigo com mural; `Tabs` filtrando por formato (Todas / Exposição XR / Instalação imersiva / Free-roaming); grade de 6 obras; botão "Solicitar catálogo" abre `Dialog` com formulário e, ao enviar, um `Toast` "Solicitação enviada".
- **Obra** (`SiteObra.jsx`): hero com foto + selos de formato; descrição + **ficha técnica** (formato, duração, área mínima, equipamento, equipe, idiomas, acessibilidade); par de fotos sobre preto (`MediaFrame`, crédito "Danilo Ferrara"); `QuoteBlock` "Dicionário de marca"; "Outras obras".
- **Contato** (`SiteContato.jsx`): seletor de frente (Comissionamento / VERS Apresenta / Operação), formulário completo (Nome, Instituição, E-mail institucional, Formato pretendido, Sobre o projeto, checkbox da seleção curatorial), canais diretos por frente, nota trilíngue. Ao enviar: `Toast` "Mensagem enviada".
- **Footer**: 4 colunas (Frentes, VERS Apresenta, Institucional, Contato), assinatura "Onde a cultura ganha presença" em lime e "© 2026 VERS · São Paulo, Brasil".
- Dados de textos: `src/ui_kits/site/SiteData.js` (NAV, FOOTER, VERBOS, OBRAS, IMAGES, CLIENTS, STATS). Copie-os como estão.

### 7. Critérios de aceite
1. As 4 telas, em 1440 px, batem com `reference/*.png` (layout, cores, tipografia, imagens).
2. Zero erros no console e zero 404 de imagem, exceto o `olho-invertido-white.png` já citado.
3. Navegação, abas, Dialog, Toasts e formulários funcionam como descrito.
4. Nenhum caminho absoluto; tudo relativo à raiz do projeto, como na seção 4.
5. Não adicione dependências além de React.

### 8. Problemas conhecidos (corrija só se eu pedir)
- No Início, o título e os cards da seção índigo ("Os três verbos") e os blocos "Histórico" aparecem com texto escuro sobre fundo escuro nos prints. Parece ser herança de cor no `Section`; confirme em `src/components/layout/Section.jsx` e `docs/components/Section__*` antes de mexer.
- O shell original tinha um bug: o `onClick` do header mandava qualquer clique para Contato. Em `app.jsx` ele já está corrigido com `!e.defaultPrevented`.

### 9. Uso das fotos (regras do brandbook)
- No máximo uma foto com marca Sesc (avental ou tenda amarela, placa) por peça, e nunca na abertura.
- Toda pessoa identificável deve estar de óculos VR; a VERS não tem autorização de imagem de quem aparece sem óculos.
- As fotos `vr-crianca-*.jpg` mostram uma criança: confirme a autorização antes de publicar em canal aberto.

## FIM DO PROMPT
