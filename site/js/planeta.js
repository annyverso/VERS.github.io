/* VERS · planeta (Three.js)
   Um mapa-múndi real visto como "little planet": a projeção estereográfica que transforma uma foto 360°
   em um planeta pequeno. A terra vem de uma máscara do Natural Earth (domínio público, assets/mapa/terra.png);
   o shader desenha o planeta em blocos de pixel na paleta VERS e a borda é a mesma fenda do portal da home.
   Os lugares são botões HTML sobre o canvas (acessíveis, com foco e rótulo) e cada um acende o cartão
   correspondente na lista, que é o conteúdo de verdade: sem WebGL, sem JS ou sem a imagem, a lista continua inteira.
   Conforto: norte sempre para cima, nenhum giro contínuo, movimentos curtos em degraus, e com
   prefers-reduced-motion o planeta fica parado e os saltos são diretos. */
import * as THREE from "../../vendor/three/three.module.min.js";

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const D2R = Math.PI / 180;
const HEX = { deep: 0x1e2447, line: 0x283170, land: 0xcbd0eb, land2: 0xd0b7d8, lime: 0xd3de28, indigo: 0x4b59a7 };

const frag = `
precision highp float;
uniform sampler2D land; uniform vec2 res; uniform float lat0; uniform float lon0; uniform float zoom; uniform float cell; uniform float tick;
uniform vec3 cOcean; uniform vec3 cLine; uniform vec3 cLand; uniform vec3 cLand2; uniform vec3 cEdge; uniform vec3 cRim;
const float PI = 3.14159265;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
void main() {
  vec2 cellId = floor(gl_FragCoord.xy / cell);
  vec2 c = (cellId + 0.5) * cell;
  float R = 0.5 * min(res.x, res.y) * 0.92;
  vec2 q = (c - 0.5 * res) / R;
  float r0 = length(q);
  vec3 col = vec3(0.0); float a = 0.0;
  if (r0 <= 1.0) {
    a = 1.0;
    vec2 p = q * zoom; float rho = length(p);
    float cc = 2.0 * atan(rho * 0.5);                 // estereográfica: rho = 2 tan(c/2)
    float sc = sin(cc), cs = cos(cc), s0 = sin(lat0), c0 = cos(lat0);
    float lat = asin(clamp(cs * s0 + (rho > 1e-5 ? p.y * sc * c0 / rho : 0.0), -1.0, 1.0));
    float lon = lon0 + atan(p.x * sc, rho * c0 * cs - p.y * s0 * sc);
    vec2 uv = vec2(fract(lon / (2.0 * PI) + 0.5), clamp(0.5 + lat / PI, 0.0, 1.0));
    float m = smoothstep(0.42, 0.58, texture2D(land, uv).r);
    vec3 ground = mix(cLand, cLand2, step(0.88, hash(cellId)));
    col = mix(cOcean, ground, m);
    // grade a cada 30 graus, com uma célula de largura
    float dang = (cell / R) * zoom / (1.0 + rho * rho * 0.25);
    float st = PI / 6.0;
    float gl = abs(fract(lat / st + 0.5) - 0.5) * st;
    float gn = abs(fract(lon / st + 0.5) - 0.5) * st * cos(lat);
    if (m < 0.5 && (gl < dang * 0.5 || gn < dang * 0.5)) col = cLine;
    // o lado de trás escurece em três degraus
    col *= 1.0 - 0.42 * floor(smoothstep(0.5, 1.0, r0) * 3.0) / 3.0;
    // borda: arcos que acendem e apagam, como a fenda do portal da home
    if (r0 > 1.0 - 1.2 * cell / R) {
      float seg = floor((atan(q.y, q.x) + PI) / (2.0 * PI) * 36.0);
      col = step(0.2, hash(vec2(seg, tick))) > 0.5 ? cEdge : cRim;
    }
  } else if (hash(cellId + 17.0) > 0.994) { col = vec3(1.0); a = 1.0; }   // estrelas
  gl_FragColor = vec4(col, a);
  #include <colorspace_fragment>
}`;

function webgl() {
  try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch (e) { return false; }
}

async function init(host) {
  const stage = host.querySelector("[data-stage]"), pinsEl = host.querySelector("[data-pins]");
  const cards = [].slice.call(document.querySelectorAll("[data-lugar]"));
  if (!stage || !pinsEl || !cards.length) return;

  const places = cards.map((card) => ({
    id: card.getAttribute("data-lugar"), nome: card.getAttribute("data-nome"), card,
    lat: parseFloat(card.getAttribute("data-lat")) * D2R, lon: parseFloat(card.getAttribute("data-lon")) * D2R,
    n: card.querySelectorAll("[data-item]").length,
  }));

  const tex = await new THREE.TextureLoader().loadAsync(host.getAttribute("data-terra"));
  tex.minFilter = tex.magFilter = THREE.LinearFilter; tex.generateMipmaps = false; tex.wrapS = THREE.RepeatWrapping;

  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
  renderer.setPixelRatio(DPR);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const canvas = renderer.domElement;
  canvas.setAttribute("aria-hidden", "true");
  stage.appendChild(canvas);

  const col = (h) => new THREE.Color(h);
  const U = {
    land: { value: tex }, res: { value: new THREE.Vector2(1, 1) }, lat0: { value: 0 }, lon0: { value: 0 }, zoom: { value: 2.7 }, cell: { value: 6 }, tick: { value: 0 },
    cOcean: { value: col(HEX.deep) }, cLine: { value: col(HEX.line) }, cLand: { value: col(HEX.land) }, cLand2: { value: col(HEX.land2) }, cEdge: { value: col(HEX.lime) }, cRim: { value: col(HEX.indigo) },
  };
  const scene = new THREE.Scene(), cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({
    uniforms: U, fragmentShader: frag, vertexShader: "void main(){ gl_Position = vec4(position, 1.0); }",
  })));

  /* vista: centro (lat, lon) e zoom. WORLD mostra o planeta quase inteiro; o resto aproxima. */
  const WORLD = { lat: 14 * D2R, lon: -52 * D2R, zoom: 2.7 };
  const view = { lat: WORLD.lat, lon: WORLD.lon, zoom: WORLD.zoom };
  let anim = null, size = 300, dirty = true, selected = null, interacted = false;

  function resize() {
    const r = stage.getBoundingClientRect();
    size = Math.max(200, Math.round(r.width));
    renderer.setSize(size, size, false);
    U.res.value.set(size * DPR, size * DPR);
    U.cell.value = Math.max(4, Math.round(size / 96)) * DPR;
    dirty = true;
  }
  new ResizeObserver(resize).observe(stage); resize();

  // projeção direta, a mesma do shader (R = 1): devolve a posição em pixels CSS e se está dentro do disco
  function project(p) {
    const dl = p.lon - view.lon, s0 = Math.sin(view.lat), c0 = Math.cos(view.lat), sp = Math.sin(p.lat), cp = Math.cos(p.lat);
    const cosc = s0 * sp + c0 * cp * Math.cos(dl);
    const k = 2 / (1 + cosc), x = k * cp * Math.sin(dl), y = k * (c0 * sp - s0 * cp * Math.cos(dl));
    const R = 0.5 * size * 0.92, qx = x / view.zoom, qy = y / view.zoom;
    return { x: size / 2 + qx * R, y: size / 2 - qy * R, in: cosc > -0.98 && Math.hypot(qx, qy) <= 1.0 };
  }

  /* pinos: um botão por lugar. Quando se sobrepõem, o de maior peso vira o grupo e mostra a contagem. */
  const pins = places.map((p) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "pin"; b.setAttribute("data-pin", p.id);
    b.innerHTML = '<b></b><b></b><b></b><span class="pin-n" aria-hidden="true"></span><span class="pin-l" aria-hidden="true"></span>';
    b.querySelector(".pin-l").textContent = p.nome;
    pinsEl.appendChild(b);
    b.addEventListener("click", () => onPin(p));
    return b;
  });

  function layout() {
    const pts = places.map((p, i) => Object.assign({ p, i }, project(p)));
    const done = {};
    pts.slice().sort((a, b) => b.p.n - a.p.n).forEach((a) => {
      if (done[a.i]) return;
      const group = [a]; done[a.i] = true;
      pts.forEach((b) => { if (!done[b.i] && a.in && b.in && Math.hypot(a.x - b.x, a.y - b.y) < 26) { group.push(b); done[b.i] = true; } });
      group.forEach((g, gi) => {
        const el = pins[g.i];
        el.hidden = !(a.in && gi === 0);
        if (gi) return;
        const total = group.reduce((s, x) => s + x.p.n, 0);
        el.style.left = Math.round(a.x) + "px"; el.style.top = Math.round(a.y) + "px";
        el.setAttribute("data-grupo", group.length > 1 ? group.map((x) => x.i).join(",") : "");
        el.querySelector(".pin-n").textContent = group.length > 1 ? String(group.length) : "";
        el.querySelector(".pin-l").textContent = group.length > 1 ? group.length + " lugares" : a.p.nome;
        el.setAttribute("aria-label", group.length > 1
          ? group.length + " lugares perto daqui: " + group.map((x) => x.p.nome).join(", ") + ". Aproximar."
          : a.p.nome + ", " + total + (total === 1 ? " ação da VERS" : " ações da VERS"));
        el.classList.toggle("is-on", group.some((x) => x.p === selected));
      });
    });
  }

  function lerpLon(a, b, t) { let d = b - a; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; return a + d * t; }
  function goTo(t) {
    interacted = true;
    if (reduce) { view.lat = t.lat; view.lon = t.lon; view.zoom = t.zoom; dirty = true; return; }
    anim = { from: { lat: view.lat, lon: view.lon, zoom: view.zoom }, to: t, t: 0 };
  }
  function select(p) {
    selected = p;
    cards.forEach((c) => { const on = !!p && c === p.card; c.classList.toggle("is-on", on); if (on) c.setAttribute("aria-current", "true"); else c.removeAttribute("aria-current"); });
    dirty = true;
  }
  function onPin(p) {
    const g = pins[places.indexOf(p)].getAttribute("data-grupo");
    if (g) { // grupo: aproxima no centro dele até os lugares se separarem
      const ids = g.split(",").map(Number), m = ids.map((i) => places[i]);
      const lat = m.reduce((s, x) => s + x.lat, 0) / m.length, lon = m.reduce((s, x) => s + x.lon, 0) / m.length;
      goTo({ lat, lon, zoom: Math.max(0.16, view.zoom * 0.18) });
      return;
    }
    select(p);
    goTo({ lat: p.lat, lon: p.lon, zoom: 0.45 });
    p.card.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" });
  }
  // o cartão também leva ao planeta
  places.forEach((p) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "lugar-ir"; b.textContent = "Ver no planeta";
    b.setAttribute("aria-label", "Ver " + p.nome + " no planeta");
    b.addEventListener("click", () => { select(p); goTo({ lat: p.lat, lon: p.lon, zoom: 0.45 }); stage.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" }); });
    p.card.querySelector("h3").after(b);
  });

  // controles
  host.querySelectorAll("[data-z]").forEach((b) => b.addEventListener("click", () => {
    const k = b.getAttribute("data-z");
    if (k === "mundo") { select(null); goTo(WORLD); }
    else goTo({ lat: view.lat, lon: view.lon, zoom: Math.min(4, Math.max(0.12, view.zoom * (k === "mais" ? 0.45 : 2.2))) });
  }));

  // arrastar: mouse nos dois eixos, toque só na horizontal (a vertical rola a página)
  let drag = null;
  stage.addEventListener("pointerdown", (e) => {
    if (e.target.closest("button")) return;
    drag = { x: e.clientX, y: e.clientY, lat: view.lat, lon: view.lon, touch: e.pointerType === "touch" };
    stage.setPointerCapture(e.pointerId); stage.classList.add("is-drag"); interacted = true; anim = null;
  });
  stage.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const k = view.zoom / (0.5 * size * 0.92);   // radianos por pixel, perto do centro
    view.lon = drag.lon - (e.clientX - drag.x) * k;
    if (!drag.touch) view.lat = Math.max(-1.45, Math.min(1.45, drag.lat + (e.clientY - drag.y) * k));
    dirty = true;
  });
  const end = () => { drag = null; stage.classList.remove("is-drag"); };
  stage.addEventListener("pointerup", end); stage.addEventListener("pointercancel", end);

  let visible = true, running = false, last = performance.now(), clock = 0;
  new IntersectionObserver((en) => { visible = en[0].isIntersecting; if (visible) kick(); }).observe(host);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) kick(); });

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now; clock += dt;
    if (anim) {
      anim.t = Math.min(1, anim.t + dt / 0.7);
      const q = Math.ceil(anim.t * 8) / 8;                            // em degraus, como pixel
      view.lat = anim.from.lat + (anim.to.lat - anim.from.lat) * q;
      view.lon = lerpLon(anim.from.lon, anim.to.lon, q);
      view.zoom = Math.exp(Math.log(anim.from.zoom) + (Math.log(anim.to.zoom) - Math.log(anim.from.zoom)) * q);
      if (anim.t >= 1) anim = null;
      dirty = true;
    } else if (!interacted && !reduce) {                               // ocioso: o planeta balança de leve, em graus inteiros
      const sway = Math.round(Math.sin(clock * 0.4) * 12);
      const lon = WORLD.lon + sway * D2R;
      if (Math.abs(lon - view.lon) > 1e-6) { view.lon = lon; dirty = true; }
    }
    const tk = Math.floor(clock * 2.5);
    if (tk !== U.tick.value) { U.tick.value = tk; dirty = true; }
    if (dirty) {
      U.lat0.value = view.lat; U.lon0.value = view.lon; U.zoom.value = view.zoom;
      renderer.render(scene, cam); layout(); dirty = false;
    }
  }
  function kick() {
    if (reduce) { frame(performance.now()); return; }
    if (running) return; running = true; last = performance.now();
    (function step(now) { if (!visible || document.hidden) { running = false; return; } frame(now); requestAnimationFrame(step); })(last);
  }
  host.classList.add("is-ready");
  frame(performance.now()); kick();
}

function boot() {
  const host = document.querySelector("[data-planeta]");
  if (!host || !webgl()) return;
  const go = () => init(host).catch((e) => { console.warn("[VERS planeta]", e); host.classList.add("is-off"); });
  if (!("IntersectionObserver" in window)) { go(); return; }
  // só baixa a textura (60 KB) quando a seção está perto da tela
  const io = new IntersectionObserver((en) => { if (en[0].isIntersecting) { io.disconnect(); go(); } }, { rootMargin: "600px 0px" });
  io.observe(host.closest("section") || host);   // o planeta fica oculto até estar pronto, então observa-se a seção
}
boot();
