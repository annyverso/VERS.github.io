# -*- coding: utf-8 -*-
"""Gera o site VERS a partir de dados (uma fonte só para todas as páginas).

Modelo de informação (diagnóstico "cases_disponiveis.xlsx" + brandbook 10-2026):
  OBRA      o que o público vive
  CATÁLOGO  as obras em circulação (VERS Apresenta)
  SERVIÇO   o que a VERS faz, com equipe e equipamento, para exibir uma obra
  PRODUTO   o software da VERS que gerencia óculos, sessões e público
  PROJETO   a prova: quem contratou, qual frente, qual obra, qual resultado
            (na planilha: "case"; o brandbook manda evitar o termo, então a
            palavra pública é "Projeto". Troque em LABEL_PROJETO se preferir.)

Espinha de experiência: modelo 5E (Excitement, Entry, Engagement, Exit, Extension,
com os resultados significativos por cima). Cada seção traz data-e="...".

Uso, na pasta do projeto:   python _build/build.py
  SITE_URL=https://seu-dominio  python _build/build.py   (gera canonical, JSON-LD com URL e sitemap.xml)
"""
import os, json, html
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
E = html.escape
P = "assets/photos/"
SITE_URL = os.environ.get("SITE_URL", "").rstrip("/")
LABEL_PROJETO, LABEL_PROJETOS = "Projeto", "Projetos"

# ------------------------------------------------------------------ entidades
KIND = {  # chave: (rótulo, definição curta)
    "obra": ("Obra", "O que o público vive."),
    "catalogo": ("Catálogo", "As obras em circulação, reunidas pelo VERS Apresenta."),
    "servico": ("Serviço", "O que a VERS faz, com equipe e equipamento, para exibir uma obra."),
    "produto": ("Produto", "O software da VERS que gerencia óculos, sessões e público."),
    "projeto": (LABEL_PROJETO, "A prova: quem contratou, qual frente, qual obra e o que aconteceu."),
}
def tag(kind, text=None):
    return f'<span class="tag k-{kind}">{E(text or KIND[kind][0])}</span>'

# ------------------------------------------------------------------ conteúdo (textos originais do kit)
NAV = [("home", "Início", "index.html"), ("servicos", "Produtos e Serviços", "produtos-e-servicos.html"),
       ("catalogo", "Catálogo", "vers-apresenta.html"), ("projetos", LABEL_PROJETOS, "projetos.html"),
       ("contato", "Contato", "contato.html")]

# Modelo "Netflix": a VERS faz a obra, distribui, empresta equipamento e equipe, e entrega o software.
VERBOS = [
    dict(id="produzir", nome="Produzir", kind="obra", novo=False,
         texto="Quando a VERS cria: concebe, dirige, desenvolve e realiza. É o verbo da obra autoral própria.",
         itens=["Pesquisa e direção criativa", "Design narrativo e de experiência", "Direção de arte e som espacial"],
         linha="A VERS faz a obra", contrata="Comissionamento: criação e produção de obra autoral em XR",
         recebe="Uma obra autoral", frente="comissionamento", cta="Comissionar uma obra", cta_href="contato.html?frente=comissionamento"),
    dict(id="distribuir", nome="Distribuir", kind="catalogo", novo=False,
         texto="Quando a VERS escolhe uma obra, negocia seus direitos, adapta sua apresentação a um território e estabelece as condições para que ela circule. É o verbo do VERS Apresenta.",
         itens=["Curadoria nacional e internacional", "Licenciamento e localização cultural", "Estratégia de circulação"],
         linha="A VERS leva a obra a circular", contrata="VERS Apresenta: distribuição curatorial e licenciamento",
         recebe="Obras do catálogo, com licença e adaptação ao território", frente="apresenta", cta="Entrar no catálogo", cta_href="vers-apresenta.html"),
    dict(id="materializar", nome="Materializar", kind="servico", novo=False,
         texto="Quando a VERS dá forma pública à obra: estrutura, implanta e opera a experiência imersiva em contexto real, diante do público. É o verbo da obra em exibição.",
         itens=["Infraestrutura e implantação XR", "Fluxo de público e formação de equipe", "Manutenção e supervisão de temporada"],
         linha="A VERS leva equipamento e equipe", contrata="Operação: implantação e operação de exposições XR",
         recebe="A obra em exibição, com equipamento e equipe", frente="operacao", cta="Solicitar proposta", cta_href="contato.html?frente=operacao"),
    dict(id="gerenciar", nome="Gerenciar", kind="produto", novo=True,
         texto="Quando a VERS entrega a tecnologia que mantém a obra funcionando: um software próprio que orquestra os óculos, as sessões e o público. É o verbo da operação em escala.",
         itens=["Orquestração de óculos e dispositivos", "Controle de sessões e fluxo de público", "Proteção de dados e controle de acesso"],
         linha="A VERS entrega o software", contrata="Software de gestão da VERS",
         recebe="Orquestração de óculos, sessões e público", frente="software", cta="Falar com um especialista", cta_href="contato.html?frente=software"),
]
VBY = {v["id"]: v for v in VERBOS}

FORMATOS = {  # definições do brandbook (p. 7): os termos não são sinônimos
    "Exposição XR": "Formato de maior porte, com percurso, temporada, operação contínua e mediação.",
    "Instalação imersiva": "A obra que se estende para o espaço físico.",
    "Free-roaming": "O visitante caminha livremente, sem cabos, cadeiras ou pontos fixos.",
}

# Obras: as 5 do kit (com foto) + as 3 da planilha (sem foto: a coluna "Fotos" está vazia)
OBRAS = [
    dict(id="cidade", photo="vr-reach-wide.jpg", format="Instalação imersiva", venue="Sesc Batatais", year="2026", title="A cidade por dentro", summary="Cenografia, ambientação e mediação concebidas em diálogo com a obra."),
    dict(id="temporada", photo="free-roaming-overhead.jpg", format="Exposição XR", venue="São Paulo", year="2026", title="Temporada completa", summary="Percurso, temporada e operação contínua em instituição de grande porte."),
    dict(id="praca", photo="praca-barretos-wide.jpg", format="Exposição XR", venue="Barretos", year="2026", title="Praça pública", summary="Implantação em espaço aberto, com estrutura própria e equipe local."),
    dict(id="mediacao", photo="mediacao-wide.jpg", format="Instalação imersiva", venue="Circuito Sesc", year="2026", title="Mediação como obra", summary="A relação entre mediador e visitante tratada com cuidado curatorial.", projeto="circuito"),
    dict(id="coletiva", photo="tent-dusk-wide.jpg", format="Free-roaming", venue="Sesc Batatais", year="2026", title="Sessão coletiva", summary="Público circula livremente pelo espaço enquanto vivencia a obra."),
    dict(id="impressionistas", photo=None, format=None, venue="Shopping Cidade São Paulo", year="2025", title="Uma Noite com os Impressionistas", summary="Experiência paga em realidade virtual, com 120 óculos simultâneos em 1.500 m² de área imersiva.", projeto="impressionistas"),
    dict(id="tinta-e-fogo", photo=None, format=None, venue="Ribeirão Preto", year="2023", title="Tinta & Fogo", summary="Obra própria da VERS, premiada no Laval Virtual 2023 (França) e no Cinequest 2023 (EUA).", projeto="tinta-e-fogo"),
    dict(id="desalma", photo=None, format=None, venue="CCXP", year="", title="Desalma", summary="Experiência imersiva da série Desalma, do Globoplay, em quatro dias de operação contínua na CCXP.", projeto="desalma"),
]
OBY = {o["id"]: o for o in OBRAS}

# Projetos (planilha, abas Cases_Backlog e ProvaSocial). "verbo" é a frente usada:
# a planilha confirma só o primeiro (Operar = Materializar); os demais são dedução da categoria.
PROJETOS = [
    dict(id="impressionistas", title="Uma Noite com os Impressionistas", client="Shopping Cidade São Paulo", periodo="2025–2026", categoria="Operação de grande porte",
         porte="Larga escala", abr="Nacional", verbo="materializar", obras=["impressionistas"], pre="", num="120", plus=False, unit="óculos simultâneos",
         headline="Maior operação de VR da América Latina.",
         fatos=["120 óculos simultâneos", "1.500 m² de área imersiva", "40 profissionais contratados em 14 dias", "2.000 pessoas por mês (experiência paga)"]),
    dict(id="circuito", title="Circuito Sesc de Artes", client="Sesc", periodo="2023–2026", categoria="Circuito itinerante",
         porte="Larga escala", abr="Nacional", verbo="materializar", obras=[], pre="até", num="8.500", plus=False, unit="pessoas atendidas",
         headline="Quatro anos como fornecedora oficial do Sesc.", photo="vr-crianca-wide.jpg",
         alt="Criança com óculos de realidade virtual sentada em uma poltrona preta, sob uma tenda em praça pública",
         fatos=["4 anos como fornecedora oficial (2023–2026)", "40 óculos simultâneos", "4 times em 4 regiões de SP", "Até 8.500 pessoas atendidas"]),
    dict(id="desalma", title="CCXP · Desalma", client="Globo / Globoplay", periodo="", categoria="Evento",
         porte="Grande porte", abr="Nacional", verbo="materializar", obras=["desalma"], pre="", num="5.000", plus=True, unit="visitantes em 4 dias",
         headline="Quatro dias de operação contínua para a série Desalma.",
         fatos=["4 dias de operação contínua", "Mais de 5.000 visitantes atendidos", "Consultoria técnica e suporte presencial"]),
    dict(id="varilux", title="Festival Varilux de Cinema Francês", client="Festival Varilux / Aliança Francesa", periodo="desde 2017", categoria="Mostra e festival",
         porte="Grande porte", abr="Nacional", verbo="distribuir", obras=[], pre="", num="7.500", plus=False, unit="pessoas por edição, em média",
         headline="Presente desde 2017, com indicação técnica de Michel Reilhac, da Bienal de Veneza.",
         fatos=["Edições 2017, 2024 e 2025", "Média de 7.500 pessoas por edição", "Indicação técnica de Michel Reilhac (Bienal de Veneza)"]),
    dict(id="tinta-e-fogo", title="Tinta & Fogo", client="Obra própria da VERS", periodo="2023", categoria="Produção original", own=True,
         porte="Médio porte", abr="Internacional (premiações nos EUA e na França)", verbo="produzir", obras=["tinta-e-fogo"], pre="", num="2", plus=False, unit="prêmios internacionais",
         headline="Premiada no Laval Virtual e no Cinequest, em 2023.",
         fatos=["Premiada no Laval Virtual 2023 (França)", "Premiada no Cinequest 2023 (EUA)", "Exposição de 3 meses em Ribeirão Preto", "Mais de 3.500 pessoas"]),
]
PBY = {p["id"]: p for p in PROJETOS}
HOME_ORDER = ["impressionistas", "circuito", "desalma", "varilux", "tinta-e-fogo"]

# Lugares do planeta (lat/lon em graus). Só entram lugares que aparecem nos dados da VERS (planilha e kit).
# Para acrescentar um lugar: copie um bloco, ajuste nome, país, coordenadas e os itens (obra, projeto ou prêmio);
# o planeta, os pinos, os cartões e a lista se montam sozinhos.
# Atenção: "CCXP" está nos dados sem cidade; a CCXP acontece em São Paulo, então ficou lá (confirmar).
# Premiações: o planeta marca a sede do festival (Laval Virtual, em Laval; Cinequest, em San José).
LUGARES = [
    dict(id="sao-paulo", nome="São Paulo", pais="Brasil", lat=-23.5505, lon=-46.6333, itens=[
        ("projeto", "impressionistas", None, "2025–2026"), ("obra", "temporada", None, "2026"), ("projeto", "desalma", None, "")]),
    dict(id="batatais", nome="Batatais", pais="Brasil", lat=-20.8914, lon=-47.5836, itens=[
        ("obra", "cidade", None, "2026"), ("obra", "coletiva", None, "2026")]),
    dict(id="barretos", nome="Barretos", pais="Brasil", lat=-20.5573, lon=-48.5679, itens=[("obra", "praca", None, "2026")]),
    dict(id="ribeirao-preto", nome="Ribeirão Preto", pais="Brasil", lat=-21.1775, lon=-47.8103, itens=[("obra", "tinta-e-fogo", None, "2023")]),
    dict(id="laval", nome="Laval", pais="França", lat=48.0698, lon=-0.77, itens=[("premio", "tinta-e-fogo", "Tinta & Fogo, Laval Virtual", "2023")]),
    dict(id="san-jose", nome="San José, Califórnia", pais="EUA", lat=37.3382, lon=-121.8863, itens=[("premio", "tinta-e-fogo", "Tinta & Fogo, Cinequest", "2023")]),
]
# Projetos que os dados registram sem cidade (não ganham ponto no planeta)
SEM_LUGAR = [("circuito", "4 regiões do estado de SP"), ("varilux", "circuito nacional")]

CLIENTS = [("sesc", "Sesc"), ("globo", "Globo"), ("banco-do-brasil", "Banco do Brasil"), ("onu", "ONU"), ("japan-foundation", "Japan Foundation"),
           ("anima-mundi", "Anima Mundi"), ("fundacao-itau", "Fundação Itaú"), ("embratur", "Embratur"), ("sebrae", "Sebrae"),
           ("senac", "Senac"), ("usp", "USP"), ("gamescom", "Gamescom Latam")]
FICHA = [("Formato", "Free-roaming · até 12 pessoas simultâneas"), ("Duração", "18 minutos por sessão"), ("Área mínima", "180 m² livres, pé-direito 3,5 m"),
         ("Equipamento", "12 headsets standalone + estação de higienização"), ("Equipe", "1 supervisor · 4 mediadores por turno"),
         ("Idiomas", "Português, inglês e espanhol"), ("Acessibilidade", "Audiodescrição e legendagem em LIBRAS")]
CANAIS = [("Comissionamento", "Criação e produção de obra autoral em XR", "novosprojetos@vers.com.br"),
          ("VERS Apresenta", "Distribuição curatorial e licenciamento", "apresenta@vers.com.br"),
          ("Operação", "Implantação e operação de exposições XR", "operacao@vers.com.br"),
          ("Imprensa", "Releases, imagens e entrevistas", "imprensa@vers.com.br")]

# ------------------------------------------------------------------ peças reutilizáveis
def url(path):
    return f"{SITE_URL}/{path}" if SITE_URL else path

def crumbs(items):
    """items: [(rótulo, href)], o último é a página atual."""
    out = '<nav class="crumbs" aria-label="Trilha"><ol><li><a href="index.html">Início</a></li>'
    for i, (l, h) in enumerate(items):
        out += f'<li><a href="{h}" aria-current="page">{E(l)}</a></li>' if i == len(items) - 1 else f'<li><a href="{h}">{E(l)}</a></li>'
    return out + "</ol></nav>"

def ld_crumbs(items):
    its = [("Início", "index.html")] + list(items)
    return {"@context": "https://schema.org", "@type": "BreadcrumbList",
            "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": l, "item": url(h)} for i, (l, h) in enumerate(its)]}

def header(active, exact):
    links = ""
    for k, l, h in NAV:
        cur = ' aria-current="page"' if (k == active and exact) else (' aria-current="true"' if k == active else "")
        links += f'<li class="nav-item"><a class="nav-link" href="{h}"{cur}>{l}</a></li>'
    return f'''<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
<header class="site-header">
  <nav class="navbar navbar-expand-lg" aria-label="Principal">
    <a class="brand me-auto" href="index.html"><img src="assets/graphics/logotipo-white.png" alt="VERS, início" width="80" height="22"></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="menu" aria-expanded="false" aria-label="Abrir menu"><span class="navbar-toggler-icon"></span></button>
    <div class="collapse navbar-collapse justify-content-end" id="menu">
      <ul class="navbar-nav align-items-lg-center">{links}</ul>
      <a class="btn-v accent sm ms-lg-3" href="contato.html">Falar com a VERS</a>
    </div>
  </nav>
</header>'''

FOOTER = f'''<footer class="site-footer">
  <div class="wrap">
    <div class="row g-5">
      <div class="col-lg-3"><a class="lockup" href="index.html"><img src="assets/graphics/logotipo-white.png" alt="VERS" width="124" height="34"><span>Produtora e distribuidora de cultura imersiva</span></a></div>
      <div class="col-6 col-md-3 col-lg-2 offset-lg-1"><h2>Frentes</h2><ul><li><a href="produtos-e-servicos.html#produzir">Produzir</a></li><li><a href="produtos-e-servicos.html#distribuir">Distribuir</a></li><li><a href="produtos-e-servicos.html#materializar">Materializar</a></li><li><a href="produtos-e-servicos.html#gerenciar">Gerenciar</a></li></ul></div>
      <div class="col-6 col-md-3 col-lg-2"><h2>VERS Apresenta</h2><ul><li><a href="vers-apresenta.html">Catálogo</a></li><li><a href="produtos-e-servicos.html#distribuir">Licenciamento</a></li><li><a href="vers-apresenta.html">Circulação</a></li></ul></div>
      <div class="col-6 col-md-3 col-lg-2"><h2>Institucional</h2><ul><li><a href="index.html#nucleo">Sobre a VERS</a></li><li><a href="projetos.html">{LABEL_PROJETOS}</a></li><li><a href="contato.html">Imprensa</a></li><li><a href="assets/Brandbook/BRANDBOOK_VERS_RGB_10-2026.pdf">Brandbook</a></li></ul></div>
      <div class="col-6 col-md-3 col-lg-2"><h2>Contato</h2><ul><li><a href="mailto:contato@vers.com.br">contato@vers.com.br</a></li><li><a href="https://www.instagram.com/vers_xr" rel="noopener">Instagram</a></li></ul></div>
    </div>
    <div class="bottom"><p class="tagline"><span>Onde a cultura</span><span>ganha presença</span></p><p class="legal">© 2026 VERS · São Paulo, Brasil</p></div>
  </div>
</footer>
<div id="toast-slot" class="toast-container position-fixed bottom-0 end-0 p-3"></div>'''

HEAD_JS = "try{if(sessionStorage.getItem('vers-portal')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('portal-in')}catch(e){}"
WRITTEN = []

def page(fname, key, title, desc, body, exact=True, ld=None, photo="vr-sunset-wide.jpg", scripts=""):
    canon = f'\n<link rel="canonical" href="{SITE_URL}/{fname}">' if SITE_URL else ""
    ogimg = f"{SITE_URL}/{P}{photo}" if SITE_URL else f"{P}{photo}"
    ldtxt = "".join(f'\n<script type="application/ld+json">{json.dumps(x, ensure_ascii=False)}</script>' for x in (ld or []))
    doc = f'''<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{E(title)}</title>
<meta name="description" content="{E(desc)}">
<meta name="theme-color" content="#191919">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="{E(title)}">
<meta property="og:description" content="{E(desc)}">
<meta property="og:image" content="{ogimg}">{canon}
<link rel="icon" href="assets/Icones/favicon.svg" type="image/svg+xml">
<link rel="icon" href="assets/Icones/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="assets/Icones/apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">
<script>{HEAD_JS}</script>
<link rel="stylesheet" href="vendor/bootstrap/bootstrap.min.css">
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="site/css/site.css">{ldtxt}
</head>
<body data-page="{key}">
{header(key, exact)}
<main id="conteudo" tabindex="-1">
{body}
</main>
{FOOTER}
<script src="vendor/bootstrap/bootstrap.bundle.min.js"></script>
<script src="site/js/site.js"></script>
<script type="module" src="site/js/game.js"></script>{scripts}
</body>
</html>
'''
    with open(os.path.join(ROOT, fname), "w", encoding="utf-8", newline="\n") as f:
        f.write(doc)
    WRITTEN.append(fname)

def sec_head(eyebrow, title, lede=None):
    out = '<header class="sec-head">'
    if eyebrow:
        out += f'<p class="eyebrow rule">{E(eyebrow)}</p>'
    out += f'<h2 class="sec-title">{E(title)}</h2>'
    if lede:
        out += f'<p class="sec-lede">{E(lede)}</p>'
    return out + "</header>"

def work(o, heading="h3"):
    fmt = f'<span class="tag lime">{E(o["format"])}</span>' if o["format"] else ""
    if o["photo"]:
        media = f'<img src="{P}{o["photo"]}" alt="" loading="lazy" decoding="async" width="1800" height="1200">'
    else:
        media = '<div class="grafismo mural-bg" aria-hidden="true"></div>'
    meta = " · ".join(x for x in (o["venue"], o["year"]) if x)
    return f'''<a class="work" href="obra-{o["id"]}.html" data-format="{E(o["format"] or "")}">
  <div class="media{"" if o["photo"] else " noimg"}">{media}<div class="fmt">{tag("obra")}{fmt}</div></div>
  <div class="d-grid gap-2"><p class="meta">{E(meta)}</p><{heading} class="title m-0">{E(o["title"])}</{heading}><p class="sum">{E(o["summary"])}</p></div>
</a>'''

def proj_card(p, heading="h3"):
    v = VBY[p["verbo"]]
    pre = f'<small class="pre">{p["pre"]}</small>' if p["pre"] else ""
    plus = '<small class="suf">+</small>' if p["plus"] else ""
    when = " · ".join(x for x in (p["client"], p["periodo"]) if x)
    return f'''<a class="proj" href="projeto-{p["id"]}.html" data-format="{v["nome"]}">
  <p class="tags">{tag(v["kind"], KIND[v["kind"]][0] + " · " + v["nome"])}<span class="tag k-porte">{E(p["porte"])}</span></p>
  <p class="num">{pre}<span data-count="{int(p["num"].replace(".", ""))}">{p["num"]}</span>{plus}</p>
  <p class="unit">{E(p["unit"])}</p>
  <{heading} class="title">{E(p["title"])}</{heading}>
  <p class="meta">{E(when)}</p>
  <span class="e-mark" aria-hidden="true"></span>
</a>'''

def gate(items, title="Próxima fase"):
    """Fim de fase (Exit): nenhuma página termina sem um próximo passo."""
    lis = "".join(
        f'<li><a class="gate-link" href="{h}">{tag(k)}<strong>{E(t)}</strong><span>{E(d)}</span><i class="e-mark" aria-hidden="true"></i></a></li>'
        for k, t, d, h in items)
    return f'''<nav class="gate g-black vers-dark" aria-labelledby="gate-t" data-e="exit"><div class="wrap">
  <p class="eyebrow rule lime" id="gate-t">{E(title)}</p><ul class="gate-list">{lis}</ul></div></nav>'''

def legend():
    rows = "".join(f'<div class="lg-row"><dt>{tag(k)}</dt><dd>{E(d)}</dd></div>' for k, (_, d) in KIND.items())
    return f'<dl class="legend">{rows}</dl>'

# ------------------------------------------------------------------ início
def planeta():
    """Seção 'Onde a VERS já esteve': planeta (canvas, só com JS e WebGL) + cartões (conteúdo de verdade)."""
    cards = ""
    for L in LUGARES:
        rows = ""
        for kind, ref, label, ano in L["itens"]:
            if kind == "obra":
                href, t, name = f"obra-{ref}.html", tag("obra"), OBY[ref]["title"]
            elif kind == "projeto":
                href, t, name = f"projeto-{ref}.html", tag("projeto"), PBY[ref]["title"]
            else:
                href, t, name = f"projeto-{ref}.html", '<span class="tag k-porte">Prêmio</span>', label
            yr = f'<span class="yr">{E(ano)}</span>' if ano else ""
            rows += f'<li data-item>{t}<a href="{href}">{E(label or name)}</a>{yr}</li>'
        cards += (f'<li class="lugar" id="lugar-{L["id"]}" data-lugar="{L["id"]}" data-nome="{E(L["nome"])}" data-lat="{L["lat"]}" data-lon="{L["lon"]}">'
                  f'<h3>{E(L["nome"])}<span>{E(L["pais"])}</span></h3><ul>{rows}</ul></li>')
    sem = " · ".join(f'<a href="projeto-{i}.html">{E(PBY[i]["title"])}</a> ({E(d)})' for i, d in SEM_LUGAR)
    paises = len({L["pais"] for L in LUGARES})
    return f'''<section class="section g-indigo vers-indigo" id="planeta" data-e="outcomes" aria-labelledby="planeta-t">
  <div class="wrap">
    <header class="sec-head"><p class="eyebrow rule">Onde estivemos</p><h2 class="sec-title" id="planeta-t">Onde a VERS já esteve</h2>
      <p class="sec-lede">{len(LUGARES)} lugares em {paises} países, com obras, {LABEL_PROJETOS.lower()} e prêmios.</p></header>
    <div class="planeta-grid">
      <div class="planeta" data-planeta data-terra="assets/mapa/terra.png" role="group" aria-label="Planeta com os lugares onde a VERS esteve">
        <div class="planeta-stage" data-stage></div>
        <div class="planeta-pins" data-pins></div>
        <div class="planeta-ctl"><button type="button" data-z="mais" aria-label="Aproximar">+</button><button type="button" data-z="menos" aria-label="Afastar">&minus;</button><button type="button" data-z="mundo">Planeta inteiro</button></div>
        <p class="planeta-dica">Arraste para girar. Toque num ponto para ir até lá.</p>
      </div>
      <div class="d-grid gap-3 align-content-center">
        <ul class="lugares">{cards}</ul>
        <p class="lugares-sem">Sem cidade registrada nos dados: {sem}.</p>
      </div>
    </div>
  </div>
</section>'''

def home():
    # mapa dos verbos: cada plataforma é uma entidade (Obra, Catálogo, Serviço, Produto)
    tabs = ""; panels = ""
    proofs = {"produzir": "tinta-e-fogo", "distribuir": "varilux", "materializar": "impressionistas"}
    for i, v in enumerate(VERBOS):
        ent = KIND[v["kind"]][0]
        badge = '<span class="new">Novo</span>' if v["novo"] else ""
        lis = "".join(f"<li>{E(x)}</li>" for x in v["itens"])
        sel = "true" if i == 0 else "false"
        pid = proofs.get(v["id"])
        if pid:
            p = PBY[pid]
            proof = f'<p class="proof"><span>Prova</span> <a href="projeto-{pid}.html">{E(p["title"])}: {p["pre"] + " " if p["pre"] else ""}{p["num"]}{"+" if p["plus"] else ""} {E(p["unit"])}</a></p>'
        else:
            proof = f'<p class="proof"><span>Saiba mais</span> <a href="produtos-e-servicos.html#{v["id"]}">Entender o produto</a></p>'
        tabs += f'<button type="button" role="tab" id="vt-{i}" aria-controls="vp-{i}" aria-selected="{sel}" data-verbo="{i}"><span class="n">{i + 1:02d}</span>{v["nome"]}</button>'
        panels += f'''<div class="verbo" role="tabpanel" id="vp-{i}" aria-labelledby="vt-{i}" data-verbo-panel="{i}">
  <p class="ent ent-{v["kind"]}"><span>{ent}</span>{E(v["linha"])}</p>
  <h3>{v["nome"]}{badge}</h3>
  <p>{E(v["texto"])}</p>
  <ul>{lis}</ul>
  {proof}
  <p class="mt-2"><a class="btn-v accent" href="{v["cta_href"]}">{E(v["cta"])}</a></p>
</div>'''
    verbos = f'''<p class="premissa">A instituição contrata um <b>serviço</b> ou um <b>produto</b> da VERS para exibir uma <b>obra</b>. Escolha um verbo e atravesse o mapa.</p>
    <div class="map" data-map>
      <div class="map-stage" data-map-stage aria-hidden="true"></div>
      <div class="map-panel">
        <div class="map-tabs" role="tablist" aria-label="Os verbos da VERS">{tabs}</div>
        {panels}
        <div class="map-foot"><button type="button" class="map-nav" data-map-step="-1">Voltar</button><p class="map-progress" aria-live="polite">Portais acesos <b data-map-count>1/4</b></p><button type="button" class="map-nav" data-map-step="1">Seguir</button></div>
      </div>
    </div>'''
    cards = ""
    for n, pid in enumerate(HOME_ORDER):
        col = "col-lg-6" if n < 2 else "col-lg-4"
        cards += f'<div class="col-md-6 {col}">{proj_card(PBY[pid])}</div>'
    logos = "".join(f'<li><img src="assets/clients/{s}.png" alt="{E(n)}" loading="lazy"></li>' for s, n in CLIENTS)
    resumo = ("VERS · Produtora e distribuidora de cultura imersiva\n"
              "A instituição contrata um serviço ou um produto da VERS para exibir uma obra.\n\n"
              + "\n".join(f"{KIND[v['kind']][0]} ({v['nome']}): {v['linha']}." for v in VERBOS)
              + "\n\nContato: contato@vers.com.br")
    body = f'''
<section class="hero vers-dark" data-pixel-portal data-e="excitement" aria-labelledby="hero-t">
  <img class="hero-photo" src="{P}vr-sunset-wide.jpg" alt="Visitante com óculos de realidade virtual em uma sessão do Circuito Sesc de Artes" width="2000" height="1333">
  <div class="protect-left"></div>
  <div class="protect-bottom"></div>
  <div class="hero-copy">
    <p class="descriptor">Produtora e distribuidora de cultura imersiva</p>
    <h1 id="hero-t"><span class="w5">Onde a cultura</span><span class="w9">ganha presença</span></h1>
    <div class="actions">
      <a class="btn-v accent lg" href="vers-apresenta.html">Conhecer o catálogo</a>
      <a class="btn-v outline-white lg" href="contato.html">Falar com a VERS</a>
    </div>
    <p class="play-hint"><i aria-hidden="true"></i><a href="#nucleo" data-cross>Atravessar o portal<span class="hint-gl"> · ou clique no portal da foto</span></a></p>
  </div>
</section>

<section class="section g-paper" id="nucleo" data-e="entry" tabindex="-1">
  <div class="wrap"><div class="row g-5">
    <div class="col-lg-5 d-grid gap-4 align-content-start">
      <p class="eyebrow rule">Núcleo de marca</p>
      <h2 class="nucleo-title">A tecnologia nunca foi o fim. Ela é o meio.</h2>
    </div>
    <div class="col-lg-6 offset-lg-1 d-grid gap-4">
      <p class="body-xl">Presença não é apenas o efeito de estar dentro de uma experiência. É a passagem de uma obra da representação para a vivência.</p>
      <p class="secondary" style="max-width:var(--measure-prose)">A VERS existe para transformar obras, narrativas, patrimônios, memórias e conhecimentos em experiências imersivas capazes de ocupar o espaço, encontrar o público e circular entre instituições, territórios e circuitos culturais.</p>
      <p class="nucleo-tag">A obra é vivida a partir de dentro.</p>
    </div>
  </div></div>
</section>

<section class="section g-indigo vers-indigo" id="verbos" data-e="engagement">
  <div class="wrap">
    {sec_head("Os verbos da VERS", "Produzir. Distribuir. Materializar. Gerenciar.", "Os verbos se atravessam e se sustentam. A VERS produz com rigor de quem opera em escala.")}
    {verbos}
  </div>
</section>

<section class="section g-black vers-dark" id="resultados" data-e="outcomes">
  <div class="wrap">
    <div class="d-flex justify-content-between align-items-end gap-4 flex-wrap mb-5">
      <div class="d-grid gap-3"><p class="eyebrow rule lime">{LABEL_PROJETOS}</p><h2 class="sec-title">Operação em escala</h2></div>
      <a class="btn-v outline" href="projetos.html">Entrar nos {LABEL_PROJETOS.lower()}</a>
    </div>
    <div class="row g-4">{cards}</div>
    <hr class="hr-rule">
    <blockquote class="quote sm"><p>Cada obra entregue tem consistência curatorial, qualidade artística e robustez de operação no padrão do circuito internacional de XR.</p><footer>Promessa de marca</footer></blockquote>
  </div>
</section>

{planeta()}

<section class="section g-subtle">
  <div class="wrap">
    {sec_head("Instituições e parceiros", "Com quem a VERS trabalha")}
    <ul class="logos">{logos}</ul>
  </div>
</section>

<section class="section g-lime text-center" style="padding-block:var(--space-9)" data-e="exit">
  <div class="wrap" style="max-width:var(--container-text)">
    <h2 class="sec-title mb-3">Vamos dar presença à sua obra</h2>
    <p class="sec-lede mx-auto mb-5" style="color:var(--vers-ink-700)">Comissionamento, distribuição curatorial ou operação de uma exposição XR no Brasil.</p>
    <a class="btn-v lg" href="contato.html">Falar com a VERS</a>
    <div class="takeaway" data-e="extension" role="group" aria-labelledby="levar-t">
      <p class="eyebrow justify-content-center" id="levar-t">Levar com você</p>
      <p class="d-flex flex-wrap gap-3 justify-content-center"><button type="button" class="btn-v outline" data-copy="{E(resumo).replace(chr(10), '&#10;')}">Copiar o mapa da VERS</button><a class="btn-v outline" href="vers-apresenta.html">Solicitar catálogo completo</a></p>
    </div>
  </div>
</section>'''
    ld = [{"@context": "https://schema.org", "@type": "Organization", "name": "VERS", "description": "Produtora e distribuidora de cultura imersiva",
           "email": "contato@vers.com.br", "sameAs": ["https://www.instagram.com/vers_xr"], **({"url": SITE_URL + "/", "logo": f"{SITE_URL}/assets/Icones/apple-touch-icon.png"} if SITE_URL else {})}]
    page("index.html", "home", "VERS · Onde a cultura ganha presença",
         "A VERS é uma produtora e distribuidora de cultura imersiva: produz, distribui, materializa e gerencia obras em realidade virtual.", body, ld=ld,
         scripts='\n<script type="module" src="site/js/planeta.js"></script>')

# ------------------------------------------------------------------ produtos e serviços
def servicos():
    cr = [("Produtos e Serviços", "produtos-e-servicos.html")]
    jump = "".join(f'<li><a class="tag k-{v["kind"]}" href="#{v["id"]}">{KIND[v["kind"]][0]} · {v["nome"]}</a></li>' for v in VERBOS)
    secs = ""
    for n, v in enumerate(VERBOS):
        bg = "g-paper" if n % 2 == 0 else "g-subtle"
        lis = "".join(f"<li>{E(x)}</li>" for x in v["itens"])
        rel = [p for p in PROJETOS if p["verbo"] == v["id"]]
        badge = '<span class="new">Novo</span>' if v["novo"] else ""
        extra = ""
        if v["id"] == "materializar":
            ficha = "".join(f"<div><dt>{E(k)}</dt><dd>{E(x)}</dd></div>" for k, x in FICHA)
            extra = f'''<div class="row g-5 mt-4">
        <div class="col-lg-7 d-grid gap-4 align-content-start">
          <p class="secondary" style="max-width:var(--measure-prose)">A VERS assume a produção expositiva completa: cenografia, ambientação, direção de arte, desenho de fluxo, formação da equipe local, protocolos de atendimento, manutenção e supervisão ao longo da temporada. Quando o projeto envolve sistema proprietário, a operação é integrada à equipe criadora da obra, sem perder capacidade de execução local.</p>
          <figure class="frame"><img src="{P}equipe-publico-wide.jpg" alt="Equipe de mediação de avental amarelo atende o público" loading="lazy" width="1800" height="1200"></figure>
        </div>
        <div class="col-lg-4 offset-lg-1 ficha" role="group" aria-labelledby="ficha-t"><p class="cap" id="ficha-t">Ficha técnica de referência</p><dl class="m-0">{ficha}</dl></div>
      </div>'''
        if rel:
            relcards = "".join(f'<div class="col-md-6 col-lg-4">{proj_card(p)}</div>' for p in rel)
            relblock = f'<div class="rel"><h3 class="rel-t">{LABEL_PROJETOS} relacionados</h3><div class="row g-4">{relcards}</div></div>'
        else:
            relblock = f'<div class="rel"><h3 class="rel-t">{LABEL_PROJETOS}</h3><p class="secondary">As operações em que a VERS atua em escala estão em <a href="projetos.html">{LABEL_PROJETOS}</a>.</p></div>'
        if rel:
            p0 = rel[0]
            prova = f'<p class="proof"><span>Prova</span> <a href="projeto-{p0["id"]}.html">{E(p0["title"])}: {p0["pre"] + " " if p0["pre"] else ""}{p0["num"]}{"+" if p0["plus"] else ""} {E(p0["unit"])}</a></p>'
        else:
            prova = ""
        secs += f'''
<section class="section {bg} offer" id="{v["id"]}" data-kind="{v["kind"]}" aria-labelledby="{v["id"]}-t">
  <div class="wrap">
    <div class="row g-5">
      <div class="col-lg-7 d-grid gap-4 align-content-start">
        <p class="d-flex gap-2 align-items-center">{tag(v["kind"])}<span class="eyebrow" style="color:var(--vers-ink-600)">Verbo {n + 1:02d}</span></p>
        <h2 class="sec-title" id="{v["id"]}-t">{v["nome"]}{badge}</h2>
        <p class="body-xl">{E(v["linha"])}.</p>
        <p class="secondary" style="max-width:var(--measure-prose)">{E(v["texto"])}</p>
        <ul class="bul">{lis}</ul>
        {prova}
      </div>
      <div class="col-lg-4 offset-lg-1 ficha" role="group" aria-label="Como contratar: {v["nome"]}">
        <p class="cap">Como contratar</p>
        <dl class="m-0"><div><dt>Você contrata</dt><dd>{E(v["contrata"])}</dd></div><div><dt>Você recebe</dt><dd>{E(v["recebe"])}</dd></div></dl>
        <p class="mt-4 d-flex flex-wrap gap-3"><a class="btn-v" href="{v["cta_href"]}">{E(v["cta"])}</a>{'<a class="btn-v outline" href="contato.html?frente=apresenta">Agendar sessão de curadoria</a>' if v["id"] == "distribuir" else ""}</p>
      </div>
    </div>
    {extra}
    {relblock}
  </div>
</section>'''
    body = f'''
<section class="page-hero g-indigo vers-indigo" data-e="entry">
  <div class="grafismo mural-bg" aria-hidden="true"></div>
  <div class="inner">
    {crumbs(cr)}
    <p class="eyebrow rule lime">Produtos e serviços</p>
    <h1>O que a VERS entrega</h1>
    <p class="lede">A instituição contrata um serviço ou um produto da VERS para exibir uma obra. Cada frente abaixo diz o que é, como contratar e onde já aconteceu.</p>
    <nav aria-label="Nesta página"><ul class="jump">{jump}</ul></nav>
  </div>
</section>

<section class="section g-paper" style="padding-block:var(--space-8)" aria-labelledby="ler-t">
  <div class="wrap">
    <p class="eyebrow rule" id="ler-t">Como ler a VERS</p>
    {legend()}
  </div>
</section>
{secs}
{gate([("projeto", "Entrar nos " + LABEL_PROJETOS.lower(), "Quem contratou, qual frente e o que aconteceu.", "projetos.html"),
       ("catalogo", "Entrar no catálogo", "As obras que a VERS põe em circulação.", "vers-apresenta.html"),
       ("servico", "Falar com a VERS", "Conte sobre a instituição, o espaço e a data.", "contato.html")])}'''
    ld = [ld_crumbs(cr), {"@context": "https://schema.org", "@graph": [
        *[{"@type": "Service", "name": f'{v["nome"]} · {v["contrata"].split(":")[0]}', "description": v["texto"], "provider": {"@type": "Organization", "name": "VERS"}, "areaServed": "BR"}
          for v in VERBOS if v["kind"] != "produto"],
        {"@type": "SoftwareApplication", "name": "Software de gestão da VERS", "description": VBY["gerenciar"]["texto"], "applicationCategory": "BusinessApplication", "publisher": {"@type": "Organization", "name": "VERS"}}]}]
    page("produtos-e-servicos.html", "servicos", "Produtos e Serviços | VERS",
         "O que a VERS entrega: produzir obras, distribuir pelo catálogo, materializar com equipe e equipamento e gerenciar com software próprio.", body, ld=ld)

# ------------------------------------------------------------------ catálogo (obras)
MODAL = '''<div class="modal fade" id="catalogo" tabindex="-1" aria-labelledby="catalogo-t">
  <div class="modal-dialog modal-dialog-centered">
    <form class="modal-content" novalidate data-mailto="apresenta@vers.com.br" data-subject="Solicitar catálogo completo VERS Apresenta" data-ok-title="Solicitação enviada" data-ok-msg="A seleção curatorial chega em até dois dias úteis.">
      <div class="modal-header"><div><p class="eyebrow mb-2" style="color:var(--vers-indigo)">VERS Apresenta</p><h2 class="modal-title" id="catalogo-t">Solicitar catálogo completo</h2></div><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button></div>
      <div class="modal-body d-grid gap-3">
        <div><label class="form-label" for="d-org">Instituição</label><input type="text" class="form-control" id="d-org" name="instituicao" placeholder="Sesc São Paulo" required><div class="invalid-feedback">Informe a instituição.</div></div>
        <div><label class="form-label" for="d-mail">E-mail institucional</label><input type="email" class="form-control" id="d-mail" name="email" placeholder="nome@instituicao.org.br" required><div class="invalid-feedback">Use um e-mail válido.</div></div>
        <div><label class="form-label" for="d-fmt">Formato de interesse</label><select class="form-select" id="d-fmt" name="formato" aria-describedby="d-fmt-h"><option>Exposição XR</option><option>Instalação imersiva</option><option>Free-roaming</option><option>Experiência independente</option></select><p id="d-fmt-h" class="form-text">Os termos não são sinônimos: escolha o mais próximo do seu espaço.</p></div>
      </div>
      <div class="modal-footer"><button type="button" class="btn-v ghost" data-bs-dismiss="modal">Cancelar</button><button type="submit" class="btn-v">Enviar</button></div>
    </form>
  </div>
</div>'''

def catalogo():
    cr = [("Catálogo", "vers-apresenta.html")]
    filters = [("todas", "Todas")] + [(f, f) for f in FORMATOS]
    tabs = "".join(f'<button type="button" data-f="{E(v)}" aria-pressed="{"true" if v == "todas" else "false"}">{E(l)}</button>' for v, l in filters)
    grade = "".join(f'<div class="col-md-6 col-lg-4">{work(o, "h2")}</div>' for o in OBRAS)
    body = f'''
<section class="page-hero g-indigo vers-indigo" data-e="entry">
  <div class="grafismo mural-bg" aria-hidden="true"></div>
  <div class="inner">
    {crumbs(cr)}
    <p class="eyebrow rule lime">Frente de distribuição curatorial</p>
    <h1>VERS Apresenta</h1>
    <p class="lede">Seleciona, licencia, localiza, produz, implanta e opera obras imersivas em circulação no Brasil e no exterior.</p>
    <p class="d-flex flex-wrap gap-2 mt-2"><span class="tag lime">Curadoria</span><span class="tag sky">Licenciamento</span><span class="tag lilac">Localização cultural</span><span class="tag orange">Implantação</span></p>
    <p class="xnav">O catálogo reúne <b>obras</b>. O que a VERS faz por elas está em <a href="produtos-e-servicos.html">Produtos e Serviços</a>; a prova está em <a href="projetos.html">{LABEL_PROJETOS}</a>.</p>
  </div>
</section>

<section class="section g-paper" style="padding-block:var(--space-8)" data-e="engagement">
  <div class="wrap">
    <div class="d-flex justify-content-between align-items-end gap-4 flex-wrap mb-5">
      <div class="tabs flex-grow-1" role="group" aria-label="Filtrar por formato" data-filters="#grade">{tabs}</div>
      <button type="button" class="btn-v" data-bs-toggle="modal" data-bs-target="#catalogo">Solicitar catálogo completo</button>
    </div>
    <div class="row g-5" id="grade">{grade}</div>
    <p class="muted mt-4" data-empty hidden>Nenhuma obra neste formato no momento.</p>
  </div>
</section>

<section class="section g-subtle text-center" style="padding-block:var(--space-9)">
  <div class="wrap" style="max-width:var(--container-text)">
    <p class="eyebrow justify-content-center mb-3" style="color:var(--vers-indigo)">Por que esta obra, para esta instituição, agora?</p>
    <h2 class="sec-title mb-3">Curadoria, não catálogo genérico</h2>
    <p class="sec-lede mx-auto mb-5">Cada seleção é pensada para a instituição, com uma justificativa curatorial clara.</p>
    <a class="btn-v lg" href="contato.html?frente=apresenta">Agendar sessão de curadoria</a>
  </div>
</section>
{gate([("servico", "Como exibir uma obra", "Equipamento, equipe e operação.", "produtos-e-servicos.html#materializar"),
       ("projeto", "Entrar nos " + LABEL_PROJETOS.lower(), "Onde as obras já circularam.", "projetos.html")])}
{MODAL}'''
    ld = [ld_crumbs(cr), {"@context": "https://schema.org", "@type": "ItemList", "name": "Catálogo VERS Apresenta",
                          "itemListElement": [{"@type": "ListItem", "position": i + 1, "url": url(f"obra-{o['id']}.html"), "name": o["title"]} for i, o in enumerate(OBRAS)]}]
    page("vers-apresenta.html", "catalogo", "VERS Apresenta | VERS", "VERS Apresenta: catálogo de obras imersivas em circulação no Brasil e no exterior, com curadoria e licenciamento.", body, ld=ld)

# ------------------------------------------------------------------ obra (uma página por obra)
def obra(o):
    cr = [("Catálogo", "vers-apresenta.html"), (o["title"], f"obra-{o['id']}.html")]
    proj = PBY.get(o.get("projeto"))
    chips = tag("obra") + (f'<span class="tag lime">{E(o["format"])}</span>' if o["format"] else "") + f'<span class="tag black">{E(o["venue"])}</span>'
    if o["photo"]:
        hero = f'''<section class="obra-hero vers-dark" data-e="entry">
  <img src="{P}{o["photo"]}" alt="" width="1800" height="1200">
  <div class="protect-bottom"></div>
  <div class="inner">{crumbs(cr)}<p class="d-flex gap-1 mb-4 flex-wrap">{chips}</p><h1>{E(o["title"])}</h1></div>
</section>'''
    else:
        hero = f'''<section class="page-hero g-indigo vers-indigo" data-e="entry">
  <div class="grafismo mural-bg" aria-hidden="true"></div>
  <div class="inner">{crumbs(cr)}<p class="d-flex gap-1 flex-wrap">{chips}</p><h1>{E(o["title"])}</h1></div>
</section>'''
    fmt = f'<div class="d-grid gap-2"><p class="eyebrow rule">Sobre o formato</p><p><b>{E(o["format"])}.</b> {E(FORMATOS[o["format"]])}</p></div>' if o["format"] else ""
    onde = " · ".join(x for x in (o["venue"], o["year"]) if x)
    projlink = f'<p class="proof"><span>Prova</span> <a href="projeto-{proj["id"]}.html">{E(proj["title"])}: {proj["pre"] + " " if proj["pre"] else ""}{proj["num"]}{"+" if proj["plus"] else ""} {E(proj["unit"])}</a></p>' if proj else ""
    quote = ""
    if o["format"] == "Instalação imersiva":
        quote = '''<section class="section g-black vers-dark" style="padding-block:var(--space-8)"><div class="wrap">
    <blockquote class="quote"><p>A experiência não acontece apenas dentro do headset. Ela ganha presença no espaço.</p><footer>Dicionário de marca · Instalação imersiva</footer></blockquote></div></section>'''
    outras = "".join(f'<div class="col-md-6 col-lg-4">{work(x)}</div>' for x in [x for x in OBRAS if x["id"] != o["id"]][:3])
    gates = []
    if proj:
        gates.append(("projeto", "Entrar no " + LABEL_PROJETO.lower(), proj["title"] + ", " + proj["client"] + ".", f"projeto-{proj['id']}.html"))
    gates += [("servico", "Como exibir esta obra", "Equipamento, equipe e operação.", "produtos-e-servicos.html#materializar"),
              ("catalogo", "Outras obras", "Voltar ao catálogo.", "vers-apresenta.html")]
    body = f'''{hero}

<section class="section g-paper" data-e="engagement">
  <div class="wrap"><div class="row g-5">
    <div class="col-lg-7 d-grid gap-4 align-content-start">
      <p class="eyebrow rule">Sobre a obra</p>
      <p class="body-xl">{E(o["summary"])}</p>
      {fmt}
      <div class="d-grid gap-2"><p class="eyebrow rule">Onde circulou</p><p>{E(onde)}</p>{projlink}</div>
      <p class="d-flex gap-3 flex-wrap mt-2"><a class="btn-v" href="contato.html?frente=apresenta">Agendar sessão de curadoria</a><a class="btn-v outline" href="produtos-e-servicos.html#materializar">Como exibir esta obra</a></p>
    </div>
  </div></div>
</section>
{quote}
<section class="section g-paper">
  <div class="wrap">
    {sec_head("Também em circulação", "Outras obras")}
    <div class="row g-5">{outras}</div>
  </div>
</section>
{gate(gates)}'''
    ld = [ld_crumbs(cr), {"@context": "https://schema.org", "@type": "CreativeWork", "name": o["title"], "description": o["summary"],
                          **({"genre": o["format"]} if o["format"] else {}), "publisher": {"@type": "Organization", "name": "VERS"}}]
    page(f"obra-{o['id']}.html", "catalogo", f"{o['title']} | VERS", o["summary"], body, exact=False, ld=ld, photo=o["photo"] or "vr-sunset-wide.jpg")

# ------------------------------------------------------------------ projetos (a prova)
def projetos():
    cr = [(LABEL_PROJETOS, "projetos.html")]
    filters = [("todas", "Todos")] + [(v["nome"], f'{KIND[v["kind"]][0]} · {v["nome"]}') for v in VERBOS]
    tabs = "".join(f'<button type="button" data-f="{E(v)}" aria-pressed="{"true" if v == "todas" else "false"}">{E(l)}</button>' for v, l in filters)
    grade = "".join(f'<div class="col-md-6 col-lg-4">{proj_card(p, "h2")}</div>' for p in PROJETOS)
    body = f'''
<section class="page-hero g-black vers-dark" style="padding-bottom:var(--space-8)" data-e="outcomes">
  <div class="grafismo ondas-bg" aria-hidden="true"></div>
  <div class="inner">
    {crumbs(cr)}
    <p class="eyebrow rule lime">{LABEL_PROJETOS}</p>
    <h1>Operação em escala</h1>
    <p class="lede">Cada projeto mostra quem contratou, qual frente a VERS assumiu, que obra o público viveu e o que aconteceu.</p>
  </div>
</section>

<section class="section g-paper" style="padding-block:var(--space-8)">
  <div class="wrap">
    <div class="tabs mb-5" role="group" aria-label="Filtrar por frente" data-filters="#grade">{tabs}</div>
    <div class="row g-4" id="grade">{grade}</div>
    <p class="muted mt-4" data-empty hidden>Nenhum projeto nesta frente por enquanto. <a href="contato.html">Conte o seu</a>.</p>
  </div>
</section>
{gate([("servico", "Produtos e Serviços", "O que a VERS entrega e como contratar.", "produtos-e-servicos.html"),
       ("catalogo", "Entrar no catálogo", "As obras em circulação.", "vers-apresenta.html"),
       ("servico", "Falar com a VERS", "Conte sobre a instituição e a data.", "contato.html")])}'''
    ld = [ld_crumbs(cr)]
    page("projetos.html", "projetos", f"{LABEL_PROJETOS} | VERS", "Projetos da VERS: operações de grande porte, circuitos itinerantes, eventos, mostras e obras próprias premiadas.", body, ld=ld)

def projeto(p):
    v = VBY[p["verbo"]]
    cr = [(LABEL_PROJETOS, "projetos.html"), (p["title"], f"projeto-{p['id']}.html")]
    obras = [OBY[i] for i in p["obras"]]
    node_cli = ("Autoria", "VERS, obra própria") if p.get("own") else ("Cliente", p["client"])
    ob_node = ""
    if obras:
        ob_node = '<li><span class="cap">Para exibir</span><strong>' + "<br>".join(f'<a href="obra-{o["id"]}.html">{E(o["title"])}</a>' for o in obras) + "</strong></li>"
    cont = "Realizou" if p.get("own") else "Contratou"
    num = f'{p["pre"] + " " if p["pre"] else ""}{p["num"]}{"+" if p["plus"] else ""}'
    chain = f'''<ol class="chain">
      <li><span class="cap">{node_cli[0]}</span><strong>{E(node_cli[1])}</strong></li>
      <li><span class="cap">{cont}</span><strong><a href="produtos-e-servicos.html#{v["id"]}">{v["nome"]}</a></strong>{tag(v["kind"])}</li>
      {ob_node}
      <li><span class="cap">Resultado</span><strong>{E(num)} {E(p["unit"])}</strong></li>
    </ol>'''
    fatos = "".join(f"<li>{E(x)}</li>" for x in p["fatos"])
    ficha = [("Categoria", p["categoria"]), ("Porte", p["porte"]), ("Abrangência", p["abr"])] + ([("Período", p["periodo"])] if p["periodo"] else [])
    fich = "".join(f"<div><dt>{E(k)}</dt><dd>{E(x)}</dd></div>" for k, x in ficha)
    photo = f'<figure class="frame mt-2"><img src="{P}{p["photo"]}" alt="{E(p["alt"])}" loading="lazy" width="1800" height="1200"></figure>' if p.get("photo") else ""
    others = [x for x in PROJETOS if x["id"] != p["id"]]
    same = [x for x in others if x["verbo"] == p["verbo"]] + [x for x in others if x["verbo"] != p["verbo"]]
    rel = "".join(f'<div class="col-md-6 col-lg-4">{proj_card(x)}</div>' for x in same[:3])
    obsec = ""
    if obras:
        obsec = f'''<section class="section g-subtle"><div class="wrap">{sec_head("Obra exibida" if len(obras) == 1 else "Obras exibidas", obras[0]["title"] if len(obras) == 1 else "No projeto")}
    <div class="row g-5">{"".join(f'<div class="col-md-6 col-lg-4">{work(o)}</div>' for o in obras)}</div></div></section>'''
    gates = [("servico" if v["kind"] == "servico" else v["kind"], f'{v["nome"]}: como contratar', v["linha"] + ".", f'produtos-e-servicos.html#{v["id"]}')]
    if obras:
        gates.append(("obra", "Entrar na obra", obras[0]["title"] + ".", f'obra-{obras[0]["id"]}.html'))
    gates.append(("projeto", "Outros " + LABEL_PROJETOS.lower(), "A prova, projeto a projeto.", "projetos.html"))
    body = f'''
<section class="page-hero g-black vers-dark" style="padding-bottom:var(--space-8)" data-e="outcomes">
  <div class="grafismo ondas-bg" aria-hidden="true"></div>
  <div class="inner">
    {crumbs(cr)}
    <p class="d-flex gap-1 flex-wrap">{tag("projeto")}<span class="tag k-porte">{E(p["categoria"])}</span></p>
    <h1>{E(p["title"])}</h1>
    <p class="lede">{E(p["headline"])}</p>
  </div>
</section>

<section class="section g-paper" aria-label="Como este projeto aconteceu">
  <div class="wrap">
    {chain}
    <div class="row g-5 mt-4">
      <div class="col-lg-7 d-grid gap-4 align-content-start">
        <p class="eyebrow rule">Números e marcos</p>
        <ul class="bul big">{fatos}</ul>
        {photo}
      </div>
      <div class="col-lg-4 offset-lg-1 ficha" role="group" aria-labelledby="ficha-t"><p class="cap" id="ficha-t">Ficha do projeto</p><dl class="m-0">{fich}</dl>
        <p class="mt-4"><a class="btn-v" href="{v["cta_href"]}">{E(v["cta"])}</a></p></div>
    </div>
  </div>
</section>
{obsec}
<section class="section g-paper">
  <div class="wrap">{sec_head("Em seguida", "Outros " + LABEL_PROJETOS.lower())}<div class="row g-4">{rel}</div></div>
</section>
{gate(gates)}'''
    ld = [ld_crumbs(cr)]
    page(f"projeto-{p['id']}.html", "projetos", f"{p['title']} | VERS", f"{p['title']}: {p['headline']}", body, exact=False, ld=ld, photo=p.get("photo") or "vr-sunset-wide.jpg")

# ------------------------------------------------------------------ contato
def contato():
    cr = [("Contato", "contato.html")]
    opts = [("comissionamento", "Comissionamento", "novosprojetos@vers.com.br"), ("apresenta", "VERS Apresenta", "apresenta@vers.com.br"),
            ("operacao", "Operação", "operacao@vers.com.br"), ("software", "Software", "contato@vers.com.br")]
    radios = "".join(
        f'<div class="form-check"><input class="form-check-input" type="radio" name="frente" id="f-{v}" value="{l}" data-mail="{m}"{" checked" if i == 0 else ""}><label class="form-check-label" for="f-{v}">{l}</label></div>'
        for i, (v, l, m) in enumerate(opts))
    canais = "".join(f'<div class="canal"><p class="t">{E(t)}</p><p class="secondary" style="font-size:var(--size-body-s)">{E(d)}</p><a href="mailto:{m}">{m}</a></div>' for t, d, m in CANAIS)
    body = f'''
<section class="page-hero g-black vers-dark" style="padding-bottom:var(--space-8)" data-e="exit">
  <div class="grafismo ondas-bg" aria-hidden="true"></div>
  <div class="inner">
    {crumbs(cr)}
    <p class="eyebrow rule lime">Contato</p>
    <h1>Vamos dar presença à sua obra</h1>
  </div>
</section>

<section class="section g-paper">
  <div class="wrap"><div class="row g-5">
    <form class="col-lg-7 d-grid gap-4" novalidate data-mailto="contato@vers.com.br" data-subject="Contato pelo site VERS" data-ok-title="Mensagem enviada" data-ok-msg="Retornamos em até dois dias úteis.">
      <fieldset><legend class="form-label">Frente</legend><div class="d-flex flex-wrap gap-4">{radios}</div></fieldset>
      <div class="row g-4">
        <div class="col-md-6"><label class="form-label" for="c-nome">Nome</label><input type="text" class="form-control" id="c-nome" name="nome" placeholder="Beatriz Almeida" autocomplete="name" required><div class="invalid-feedback">Informe seu nome.</div></div>
        <div class="col-md-6"><label class="form-label" for="c-org">Instituição</label><input type="text" class="form-control" id="c-org" name="instituicao" placeholder="Sesc São Paulo" autocomplete="organization" required><div class="invalid-feedback">Informe a instituição.</div></div>
      </div>
      <div><label class="form-label" for="c-mail">E-mail institucional</label><input type="email" class="form-control" id="c-mail" name="email" placeholder="nome@instituicao.org.br" autocomplete="email" required><div class="invalid-feedback">Use um e-mail válido.</div></div>
      <div><label class="form-label" for="c-fmt">Formato pretendido</label><select class="form-select" id="c-fmt" name="formato" aria-describedby="c-fmt-h"><option>Ainda avaliando</option><option>Experiência independente</option><option>Instalação imersiva</option><option>Exposição XR</option><option>Free-roaming</option></select><p id="c-fmt-h" class="form-text">Experiência, instalação, exposição e free-roaming não são sinônimos.</p></div>
      <div><label class="form-label" for="c-msg">Sobre o projeto</label><textarea class="form-control" id="c-msg" name="mensagem" rows="5" placeholder="Conte sobre a instituição, a data pretendida e o espaço disponível."></textarea></div>
      <div class="form-check"><input class="form-check-input" type="checkbox" id="c-news" name="selecao" value="sim"><label class="form-check-label" for="c-news">Quero receber a seleção curatorial do VERS Apresenta</label></div>
      <p class="d-flex gap-3 align-items-center flex-wrap"><button type="submit" class="btn-v lg">Enviar mensagem</button><span class="sent" hidden>Mensagem enviada</span></p>
    </form>
    <aside class="col-lg-4 offset-lg-1" aria-labelledby="canais-t">
      <p class="eyebrow mb-3" id="canais-t" style="color:var(--vers-ink-600)">Canais diretos</p>
      {canais}
      <hr style="border:0;border-top:2px solid var(--vers-black);opacity:1;margin:24px 0 18px">
      <p class="secondary" style="font-size:var(--size-body-s)">Comunicação institucional em português, inglês ou francês, conforme a origem da produtora.</p>
    </aside>
  </div></div>
</section>
{gate([("servico", "Produtos e Serviços", "O que a VERS entrega e como contratar.", "produtos-e-servicos.html"),
       ("projeto", "Entrar nos " + LABEL_PROJETOS.lower(), "Quem já contratou e o que aconteceu.", "projetos.html")], "Antes de enviar")}'''
    ld = [ld_crumbs(cr)]
    page("contato.html", "contato", "Contato | VERS", "Fale com a VERS sobre comissionamento, VERS Apresenta, operação de exposições XR ou o software de gestão.", body, ld=ld)

# ------------------------------------------------------------------ endereços antigos e sitemap
def redirect_stub(fname, to, label):
    doc = f'''<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{label} | VERS</title>
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url={to}">
</head>
<body><p><a href="{to}">Entrar em {label}</a></p></body>
</html>
'''
    with open(os.path.join(ROOT, fname), "w", encoding="utf-8", newline="\n") as f:
        f.write(doc)

def sitemap():
    if not SITE_URL:
        return
    urls = "".join(f"  <url><loc>{SITE_URL}/{f}</loc></url>\n" for f in WRITTEN)
    with open(os.path.join(ROOT, "sitemap.xml"), "w", encoding="utf-8", newline="\n") as f:
        f.write(f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{urls}</urlset>\n')

if __name__ == "__main__":
    home(); servicos(); catalogo(); projetos(); contato()
    for o in OBRAS: obra(o)
    for p in PROJETOS: projeto(p)
    redirect_stub("obra.html", "vers-apresenta.html", "o catálogo")   # endereço antigo continua vivo
    sitemap()
    print("ok", len(WRITTEN), "páginas")
