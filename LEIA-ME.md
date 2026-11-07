# Site VERS

## Como abrir
- Windows: clique duas vezes em `abrir-site.bat` (precisa de Python).
- Ou nesta pasta: `python -m http.server 8000` e abra http://localhost:8000
- Não abra o `index.html` direto do Explorer: o navegador bloqueia o Three.js fora de um servidor.

## Páginas (textos originais do UI kit, mais a camada de prova da planilha)
- `index.html`: Início (foto com portal, núcleo de marca, mapa dos verbos, projetos, parceiros)
- `produtos-e-servicos.html`: as quatro frentes (Produzir, Distribuir, Materializar, Gerenciar): o que é, como contratar, projetos relacionados
- `vers-apresenta.html`: catálogo de obras, com filtro por formato
- `obra-<id>.html`: uma página por obra (8)
- `projetos.html` e `projeto-<id>.html`: a prova (5): cliente, frente, obra, resultado
- `contato.html`: formulário por frente (aceita `?frente=operacao`)
- `obra.html`: endereço antigo, redireciona para o catálogo
- `index-ui-kit.html`: o site React original, preservado

## Como o site pensa: `docs/EXPERIENCIA-5E.md`
Modelo 5E (Excitement, Entry, Engagement, Exit, Extension), portais e embodiment, o que é Obra, Catálogo, Serviço, Produto e Projeto, normas e a lista de dados que ainda faltam.

## Movimento (`site/js/game.js`, Three.js r169), no idioma do logotipo
O E da VERS é feito de blocos horizontais deslocados. Todo movimento é em degraus, como pixel.
- **Portal na foto (glitch)**: o cursor abre uma fenda na foto: a borda é rasgada em segmentos, a foto de fora desliza em linhas com as cores separadas, e dentro a foto vira pixels na paleta com faixas da imagem real vazando. Clicar dispara uma rajada e atravessa para o núcleo da marca. Sem cursor, o portal passeia sozinho.
- **Mapa dos verbos**: cenário isométrico com 4 plataformas: Produzir = Obra, Distribuir = Catálogo, Materializar = Serviço, Gerenciar = Produto. Cada portal tem o gesto de uma ficção de portal (fenda viva, cardápio de realidades, par de portais, chuva digital). O jogador muda a cor dos óculos ao chegar.
- **Troca de página**: 7 faixas horizontais entram por um lado e saem pelo oposto, na mesma direção (o momentum se conserva). Lascas laranja e céu rasgam as bordas, a página treme em 3 degraus e os títulos chegam com as cores separadas (classe `is-glitch`).
- **Títulos**: entram fatiados em três faixas, uma vez só.
- **Fases (régua no canto)**: um bloco por fase da página (5E), lido dos `data-e`. Acende conforme a pessoa avança e anuncia a fase nova.
- **Planeta (`site/js/planeta.js`)**: mapa-múndi real em projeção estereográfica ("little planet"), com os lugares onde a VERS esteve. Arraste para girar; clique num pino ou num cartão para ir até o lugar.
- Regra do glitch: no máximo 6 tiques por segundo (WCAG 2.3.1) e só em rajadas curtas.
- Respeita "reduzir movimento". Sem WebGL, o mapa vira lista e o resto fica estático.

## Acrescentar um lugar ao planeta
Em `_build/build.py`, na lista `LUGARES`, copie um bloco e ajuste nome, país, latitude, longitude e os itens (`obra`, `projeto` ou `premio`, com o id e o ano). Depois rode `python3 _build/build.py`. O planeta, o pino e o cartão aparecem sozinhos. Dados geográficos: Natural Earth (domínio público).

## Editar
Textos, obras, projetos: listas no topo de `_build/build.py`. Depois: `python _build/build.py`.
Com domínio definido: `SITE_URL=https://seu-dominio python _build/build.py` (gera canonical, JSON-LD com URL e sitemap.xml).
Estilo: `site/css/site.css` sobre `tokens.css` e Bootstrap 5.3.3 (`vendor/`).
