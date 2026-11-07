/* VERS · comportamento do site: mapa dos verbos, números, filtros, resumo para levar, formulários */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // garantia: nunca deixar a tela coberta se o game.js não carregar
  setTimeout(function () { document.documentElement.classList.remove("portal-in"); }, 2000);

  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  /* Mapa dos verbos: abas acessíveis. O game.js escuta "vers:verbo" para mover o jogador
     e dispara "vers:select" quando alguém clica numa plataforma. Sem JS, tudo fica visível. */
  var map = document.querySelector("[data-map]");
  if (map) {
    map.classList.add("is-tabs");
    var tabs = [].slice.call(map.querySelectorAll("[data-verbo]"));
    var panels = [].slice.call(map.querySelectorAll("[data-verbo-panel]"));
    var lit = [0], cur = 0;
    function select(i, fromMap) {
      i = Math.max(0, Math.min(tabs.length - 1, i));
      cur = i;
      tabs.forEach(function (t, k) { t.setAttribute("aria-selected", k === i ? "true" : "false"); t.tabIndex = k === i ? 0 : -1; });
      panels.forEach(function (p, k) { p.hidden = k !== i; });
      if (lit.indexOf(i) === -1) lit.push(i);
      map.querySelector("[data-map-count]").textContent = lit.length + "/" + tabs.length;
      map.querySelector('[data-map-step="-1"]').disabled = i === 0;
      map.querySelector('[data-map-step="1"]').disabled = i === tabs.length - 1;
      if (!fromMap) document.dispatchEvent(new CustomEvent("vers:verbo", { detail: { index: i, lit: lit.slice() } }));
    }
    tabs.forEach(function (t, k) {
      t.addEventListener("click", function () { select(k); });
      t.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); select(cur + (e.key === "ArrowRight" ? 1 : -1)); tabs[cur].focus(); }
      });
    });
    map.querySelectorAll("[data-map-step]").forEach(function (b) {
      b.addEventListener("click", function () { select(cur + parseInt(b.getAttribute("data-map-step"), 10)); });
    });
    document.addEventListener("vers:select", function (e) { select(e.detail.index, false); });
    select(0, true);
  }

  /* Títulos entram fatiados em três faixas, como o E do logotipo (uma vez só) */
  var titles = document.querySelectorAll(".sec-title, .nucleo-title, .page-hero h1");
  if ("IntersectionObserver" in window && !reduce && titles.length) {
    var bands = [[0, 66], [33, 33], [66, 0]], offs = [-18, 24, -10];
    var tio = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        tio.unobserve(en.target);
        var el = en.target;
        el.classList.add("slice-host");
        var ink = getComputedStyle(el).color, pieces = [], tpl = el.cloneNode(true);
        for (var k = 0; k < 3; k++) {
          var c = tpl.cloneNode(true);
          c.removeAttribute("id"); c.setAttribute("aria-hidden", "true");
          c.className += " slice"; c.style.margin = "0"; c.style.color = ink; c.style.maxWidth = "none";
          el.appendChild(c); pieces.push(c);
        }
        el.style.color = "transparent";
        pieces.forEach(function (pc, k) {
          var clip = "inset(" + bands[k][0] + "% 0 " + bands[k][1] + "% 0)";
          // glitch: a faixa chega fora de lugar e com as cores separadas (laranja e céu), e se encaixa em 3 degraus (~6 Hz)
          var anim = pc.animate([
            { transform: "translateX(" + offs[k] + "px)", clipPath: clip, textShadow: "-5px 0 #f15e2b, 5px 0 #b0e0e9" },
            { transform: "translateX(0)", clipPath: clip, textShadow: "0 0 0 transparent, 0 0 0 transparent" }],
            { duration: 480, delay: k * 60, easing: "steps(3, end)", fill: "both" });
          if (k === 2) anim.onfinish = function () { pieces.forEach(function (x) { x.remove(); }); el.style.color = ""; };
        });
      });
    }, { threshold: 0.6 });
    titles.forEach(function (t) { tio.observe(t); });
  }

  /* Fases (5E): a régua de "ir avançando". Lê os data-e da página, na ordem do HTML, e acende uma fase
     a cada seção alcançada. A fase nova se encaixa em degraus e é anunciada. Nenhum conteúdo fica
     bloqueado: as fases são links, e quem pula direto para o fim também chega lá. */
  var FASES = { excitement: "Atrair", entry: "Entrar", engagement: "Participar", outcomes: "Prova", exit: "Seguir", extension: "Levar" };
  var steps = [], seenE = {};
  [].forEach.call(document.querySelectorAll("[data-e]"), function (el) {
    var k = el.getAttribute("data-e");
    if (!FASES[k] || seenE[k]) return;
    seenE[k] = true;
    if (!el.id) el.id = "fase-" + k;
    steps.push({ k: k, el: el });
  });
  if (steps.length > 1) {
    var KEY = "vers-fase:" + location.pathname;
    function ssGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
    function ssSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
    var hud = document.createElement("nav");
    hud.className = "fases"; hud.setAttribute("aria-label", "Fases desta página");
    var h = '<p class="fases-t" aria-hidden="true"><b></b><span></span><em> · nova fase</em></p><ol>';
    steps.forEach(function (s, i) {
      h += '<li><a href="#' + s.el.id + '" data-cross aria-label="Fase ' + (i + 1) + " de " + steps.length + ": " + FASES[s.k] + '"><i aria-hidden="true"></i></a></li>';
    });
    hud.innerHTML = h + '</ol><p class="visually-hidden" role="status" aria-live="polite"></p>';
    document.body.appendChild(hud);
    var cells = [].slice.call(hud.querySelectorAll("li")), links = [].slice.call(hud.querySelectorAll("a"));
    var tb = hud.querySelector(".fases-t b"), ts = hud.querySelector(".fases-t span"), live = hud.querySelector("[role=status]");
    var saved = parseInt(ssGet(KEY), 10), reached = isNaN(saved) ? 0 : Math.min(saved, steps.length - 1), flashT = 0, ticking = false;

    function where() {
      var mid = window.innerHeight * 0.5, c = 0;
      steps.forEach(function (s, i) { if (s.el.getBoundingClientRect().top <= mid) c = i; });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) c = steps.length - 1;
      return c;
    }
    function render(loud) {
      var c = where(), before = reached;
      if (c > reached) reached = c;
      cells.forEach(function (li, i) {
        li.classList.toggle("on", i <= reached);
        if (links[i]) { if (i === c) links[i].setAttribute("aria-current", "step"); else links[i].removeAttribute("aria-current"); }
        if (loud && i > before && i <= reached) {
          li.classList.remove("up"); void li.offsetWidth; li.classList.add("up");
          setTimeout(function () { li.classList.remove("up"); }, 700);
        }
      });
      tb.textContent = "Fase " + (c + 1) + "/" + steps.length;
      ts.textContent = FASES[steps[c].k];
      if (loud && reached > before) {
        hud.classList.add("flash"); clearTimeout(flashT);
        flashT = setTimeout(function () { hud.classList.remove("flash"); }, 2400);
        live.textContent = "Fase " + (reached + 1) + " de " + steps.length + " desbloqueada: " + FASES[steps[reached].k] + ".";
        ssSet(KEY, String(reached));
      }
    }
    function onScroll() { if (ticking) return; ticking = true; requestAnimationFrame(function () { ticking = false; render(true); }); }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    render(false);
    window.addEventListener("load", function () { render(false); });
  }

  /* Números sobem em degraus quando entram na tela (com separador de milhar em pt-BR) */
  var stats = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var el = e.target, end = parseInt(el.getAttribute("data-count"), 10), thousands = end >= 1000;
        var steps = 12, i = 0;
        var t = setInterval(function () {
          i++;
          var v = Math.round(end * i / steps);
          el.textContent = thousands ? v.toLocaleString("pt-BR") : String(v);
          if (i >= steps) clearInterval(t);
        }, 55);
      });
    }, { threshold: 0.6 });
    stats.forEach(function (s) { io.observe(s); });
  }

  /* VERS Apresenta: filtros por formato (modo de jogo) */
  document.querySelectorAll("[data-filters]").forEach(function (bar) {
    var grid = document.querySelector(bar.getAttribute("data-filters"));
    var empty = document.querySelector("[data-empty]");
    bar.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-f]");
      if (!b) return;
      bar.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      var f = b.getAttribute("data-f"), shown = 0;
      grid.querySelectorAll("[data-format]").forEach(function (card) {
        var ok = f === "todas" || card.getAttribute("data-format") === f;
        card.parentElement.hidden = !ok;
        var w = card;
        w.classList.remove("spawn");
        if (ok) { shown++; void w.offsetWidth; w.classList.add("spawn"); }
      });
      if (empty) empty.hidden = shown !== 0;
    });
  });

  /* Mural: deslocamento leve com o scroll */
  var mural = document.querySelector(".mural-bg");
  if (mural && !reduce) {
    window.addEventListener("scroll", function () { mural.style.setProperty("--mural-y", Math.round(window.scrollY * 0.25 / 8) * 8 + "px"); }, { passive: true });
  }

  /* Toast de confirmação (componente Toast do kit) */
  function toast(title, msg) {
    var slot = document.getElementById("toast-slot");
    if (!slot || !window.bootstrap) return;
    var el = document.createElement("div");
    el.className = "toast"; el.setAttribute("role", "status"); el.setAttribute("aria-live", "polite");
    el.innerHTML = '<div class="d-flex"><div class="toast-body"><strong class="d-block mb-1"></strong><span></span></div><button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Fechar"></button></div>';
    el.querySelector("strong").textContent = title;
    el.querySelector("span").textContent = msg;
    slot.appendChild(el);
    el.addEventListener("hidden.bs.toast", function () { el.remove(); });
    new bootstrap.Toast(el, { delay: 4200 }).show();
  }

  /* Extension (5E): um objeto para levar. Copia o resumo do mapa da VERS. */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      function done() { toast("Mapa copiado", "Cole onde precisar. Ele resume Obra, Catálogo, Serviço e Produto."); }
      if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(text).then(done, fallback); } else { fallback(); }
      function fallback() {
        var ta = document.createElement("textarea"); ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); done(); } catch (e) {}
        ta.remove();
      }
    });
  });

  /* Contato: ?frente=operacao já deixa a frente marcada */
  var qf = new URLSearchParams(location.search).get("frente");
  if (qf) { var rf = document.getElementById("f-" + qf); if (rf) rf.checked = true; }

  /* Formulários: validação; o envio abre o e-mail com os dados */
  document.querySelectorAll("form[data-mailto]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.classList.add("was-validated"); var f = form.querySelector(":invalid"); if (f) f.focus(); return; }
      var sel = form.querySelector("[name=frente]:checked");
      var to = (sel && sel.getAttribute("data-mail")) || form.getAttribute("data-mailto");
      var lines = [];
      new FormData(form).forEach(function (v, k) { if (v) lines.push(k + ": " + v); });
      location.href = "mailto:" + to + "?subject=" + encodeURIComponent(form.getAttribute("data-subject")) + "&body=" + encodeURIComponent(lines.join("\n"));
      var modal = form.closest(".modal");
      if (modal && window.bootstrap) bootstrap.Modal.getOrCreateInstance(modal).hide();
      toast(form.getAttribute("data-ok-title"), form.getAttribute("data-ok-msg"));
      var s = form.querySelector(".sent"); if (s) s.hidden = false;
      form.classList.remove("was-validated");
    });
  });
})();
