/* VERS · camada de jogo (Three.js)
   Todo movimento vem do E do logotipo: barras deslocadas, em degraus, como pixel.
   O ritmo segue o modelo 5E de experiência:
   Excitement  na foto da home, o cursor abre um portal: dentro dele a foto vira
               pixels na paleta VERS. Sem cursor, o portal passeia sozinho.
   Entry       clicar no portal (ou em "Atravessar o portal") cruza para o núcleo da marca.
               Trocar de página usa a mesma travessia: faixas que entram por um lado
               e saem pelo oposto, com o mesmo momentum (como no jogo Portal).
   Engagement  o mapa dos verbos: cenário isométrico com quatro plataformas, uma por
               entidade (Obra, Catálogo, Serviço, Produto). Cada portal tem a gramática
               de uma ficção de portal; o jogador muda de cor ao atravessar (embodiment).
   Conforto    câmera sempre parada, horizonte estável, tudo em degraus curtos; com
               prefers-reduced-motion o cenário fica estático (princípios de conforto
               em VR, como os do IEEE 3079, adaptados à web).
*/
import * as THREE from "../../vendor/three/three.module.min.js";

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const HEX = { deep: 0x1e2447, indigo: 0x4b59a7, lime: 0xd3de28, lilac: 0xd0b7d8, sky: 0xb0e0e9, orange: 0xf15e2b };
/* ruído determinístico 0..1: o glitch sempre sorteia a partir de um "tique", nunca a cada quadro.
   Os tiques ficam em no máximo 6 por segundo (WCAG 2.3.1: até três flashes por segundo). */
const h01 = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const root = document.documentElement;
/* o glitch do DOM (títulos com as cores separadas e a página tremendo em 3 degraus) dura o mesmo que a travessia */
function glitchDom(ms) {
  if (reduce) return;
  root.classList.add("is-glitch");
  setTimeout(() => root.classList.remove("is-glitch"), ms);
}

function webgl() {
  try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); }
  catch (e) { return false; }
}
const HAS_GL = webgl();
if (!HAS_GL) document.documentElement.classList.add("no-webgl");

/* ------------------------------------------------------------------ 1. portal entre páginas */
/* A tela fecha em faixas horizontais que entram de lados alternados, cada uma com
   um atraso diferente: é o E do logotipo, deslocado em blocos. */
const Wipe = (() => {
  let renderer, scene, cam, bands = [], slivers = [], W = 0, H = 0;
  const ROWS = 7;
  // deslocamento de cada faixa em "blocos", como as barras do E (0 = alinhada)
  const SHIFT = [0, 0.18, 0.06, 0.24, 0.02, 0.14, 0.08];
  function build() {
    W = window.innerWidth; H = window.innerHeight;
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(1); renderer.setSize(W, H);
    renderer.domElement.className = "portal-wipe";
    renderer.domElement.setAttribute("aria-hidden", "true");
    document.body.appendChild(renderer.domElement);
    scene = new THREE.Scene();
    cam = new THREE.OrthographicCamera(0, W, 0, -H, -1, 1);
    const h = H / ROWS;
    bands = []; slivers = [];
    for (let r = 0; r < ROWS; r++) {
      const color = r === 3 ? HEX.lime : r === 1 || r === 5 ? HEX.indigo : HEX.deep;
      const m = new THREE.Mesh(new THREE.PlaneGeometry(W, h + 1), new THREE.MeshBasicMaterial({ color }));
      m.position.y = -(r * h + h / 2);
      scene.add(m);
      bands.push({ m, dir: r % 2 ? 1 : -1 });
      // rasgos: duas lascas finas por faixa, em laranja e céu, que se separam da borda como canais de cor
      [HEX.orange, HEX.sky].forEach((c, k) => {
        const sl = new THREE.Mesh(new THREE.PlaneGeometry(W * 0.5, Math.max(4, h * 0.13)), new THREE.MeshBasicMaterial({ color: c }));
        sl.visible = false; scene.add(sl); slivers.push({ m: sl, r, k });
      });
    }
  }
  function draw(t, oy, dir, sec) {
    const h = H / ROWS, origin = Math.min(ROWS - 1, Math.max(0, Math.floor(oy / h))), tick = Math.floor(sec * 6);
    const moving = [];
    bands.forEach((b, r) => {
      const delay = Math.abs(r - origin) * 0.07 + SHIFT[r];
      let p = Math.max(0, Math.min(1, (t - delay) / 0.45));
      p = Math.ceil(p * 5) / 5;                       // em degraus, como pixel
      // momentum preservado: a faixa entra por um lado (fechando) e sai pelo oposto (abrindo)
      b.m.position.x = dir > 0 ? W / 2 + b.dir * (1 - p) * W * 1.02 : W / 2 - b.dir * p * W * 1.02;
      moving[r] = p > 0 && p < 1;
    });
    // glitch: só enquanto a faixa se move, as lascas aparecem fora de prumo e mudam no máximo 6 vezes por segundo
    slivers.forEach(({ m, r, k }) => {
      const b = bands[r], on = moving[r] && h01(r * 9.1 + k * 4.3 + tick) > 0.35;
      m.visible = on;
      if (!on) return;
      m.position.x = b.m.position.x + (k ? 1 : -1) * (0.04 + 0.16 * h01(r + tick * 2.7 + k)) * W + b.dir * W * 0.1;
      m.position.y = b.m.position.y + (h01(r * 3.3 + tick + k * 7) - 0.5) * h * 0.8;
    });
    renderer.render(scene, cam);
  }
  function run(dir, ox, oy, ms, done) {
    if (!renderer) build();
    const t0 = performance.now();
    draw(0, oy, dir, 0);
    root.classList.remove("portal-in");
    glitchDom(ms + 40);
    (function tick(now) {
      const t = Math.min(1, (now - t0) / ms);
      draw(t, oy, dir, (now - t0) / 1000);
      if (t < 1) requestAnimationFrame(tick); else done && done();
    })(t0);
  }
  function destroy() {
    if (!renderer) return;
    renderer.domElement.remove(); renderer.dispose();
    bands.forEach((b) => { b.m.geometry.dispose(); b.m.material.dispose(); });
    slivers.forEach((s) => { s.m.geometry.dispose(); s.m.material.dispose(); });
    renderer = null;
  }
  return { run, destroy };
})();

function storeGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
function storeSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
function storeDel(k) { try { sessionStorage.removeItem(k); } catch (e) {} }

/* Entry: atravessar o portal sem trocar de página. A tela fecha em faixas, o scroll
   pula para o destino e as faixas saem pelo lado oposto. Sem WebGL ou com movimento
   reduzido, o destino aparece direto. */
let crossing = false;
function cross(sel, ox, oy) {
  const t = document.querySelector(sel);
  if (!t || crossing) return;
  // salto instantâneo: a tela está coberta pelas faixas, então o scroll suave do CSS só atrasaria a chegada
  const land = () => { t.scrollIntoView({ behavior: "instant", block: "start" }); t.focus({ preventScroll: true }); };
  if (!HAS_GL || reduce) { land(); return; }
  crossing = true;
  Wipe.run(1, ox, oy, 420, () => {
    land();
    Wipe.run(-1, ox, oy, 460, () => { Wipe.destroy(); crossing = false; });
  });
}
function initCross() {
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-cross]");
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    cross(a.getAttribute("href"), e.clientX || innerWidth / 2, e.clientY || innerHeight / 2);
  });
}

function initTransitions() {
  // chegada: o portal se abre a partir do ponto onde a pessoa clicou na página anterior
  const arrival = storeGet("vers-portal");
  storeDel("vers-portal");
  if (arrival && HAS_GL && !reduce) {
    let o = { x: 0.5, y: 0.5 };
    try { o = JSON.parse(arrival); } catch (e) {}
    Wipe.run(-1, o.x * window.innerWidth, o.y * window.innerHeight, 560, Wipe.destroy);
  } else {
    document.documentElement.classList.remove("portal-in");
  }

  if (!HAS_GL || reduce) return;
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target && a.target !== "_self") return;
    const href = a.getAttribute("href");
    if (!href || href.startsWith("#") || /^(mailto|tel|javascript):/i.test(href) || a.hasAttribute("download")) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || !/(\.html|\/)$/.test(url.pathname)) return;
    if (url.pathname === location.pathname && url.search === location.search) return;
    e.preventDefault();
    storeSet("vers-portal", JSON.stringify({ x: e.clientX / innerWidth || 0.5, y: e.clientY / innerHeight || 0.5 }));
    Wipe.run(1, e.clientX || innerWidth / 2, e.clientY || innerHeight / 2, 520, () => { location.href = url.href; });
  });
  // voltar pelo histórico (bfcache) não pode reaparecer com a tela coberta
  window.addEventListener("pageshow", (ev) => { if (ev.persisted) { Wipe.destroy(); document.documentElement.classList.remove("portal-in"); } });
}

/* ------------------------------------------------------------------ 2. portal de pixels na foto */
const frag = /* glsl */`
precision highp float;
uniform sampler2D tex; uniform vec2 res; uniform vec2 imgRes; uniform vec2 mouse;
uniform float radius; uniform float boot; uniform float time; uniform float dpr; uniform float glitch;
uniform vec3 c0; uniform vec3 c1; uniform vec3 c2; uniform vec3 c3; uniform vec3 c4;
varying vec2 vUv;
float hash(float n){ return fract(sin(n) * 43758.5453); }
vec2 cover(vec2 uv){
  float rs = res.x / res.y, ri = imgRes.x / imgRes.y;
  vec2 s = rs > ri ? vec2(1.0, ri / rs) : vec2(rs / ri, 1.0);
  return (uv - 0.5) * s + 0.5;
}
vec3 palette(float l){
  if (l < 0.2) return c0; if (l < 0.38) return c1; if (l < 0.56) return c2; if (l < 0.74) return c3; return c4;
}
void main(){
  vec2 frag = vUv * res;                          // px (y para cima)
  // carregamento: a foto nasce em blocos grandes e vai ficando nítida
  float bootBlock = floor(mix(72.0, 1.0, boot) / 4.0) * 4.0 * dpr;
  vec2 f = bootBlock > 1.0 ? (floor(frag / bootBlock) + 0.5) * bootBlock : frag;
  vec3 col = texture2D(tex, cover(f / res)).rgb;

  float d = distance(frag, mouse);
  // o relógio do glitch nunca passa de 6 Hz (WCAG 2.3.1: no máximo três flashes por segundo)
  float tick = floor(time * (5.0 + glitch));
  float ang = atan(frag.y - mouse.y, frag.x - mouse.x);
  float seg = floor((ang + 3.14159) / 6.28318 * 28.0);
  // a borda é uma fenda: cada segmento do círculo recua ou avança em degraus
  float rad = radius + (hash(seg * 3.7 + tick) - 0.5) * 14.0 * dpr * (0.4 + glitch);
  float halo = rad * 0.38;

  if (d >= rad && d < rad + halo) {
    // fora do portal a realidade rasga: linhas deslocadas e cores separadas, mais fortes perto da borda
    float row = floor(frag.y / (6.0 * dpr));
    float k = 1.0 - (d - rad) / halo;
    float t = step(0.62, hash(row * 5.3 + tick)) * k;
    float off = t * (hash(row + tick * 2.1) - 0.5) * 70.0 * dpr * (0.6 + glitch);
    vec2 q = frag + vec2(off, 0.0);
    col = texture2D(tex, cover(q / res)).rgb;
    col.r = texture2D(tex, cover((q + vec2(9.0 * dpr * t, 0.0)) / res)).r;
    col.b = texture2D(tex, cover((q - vec2(9.0 * dpr * t, 0.0)) / res)).b;
  }

  if (d < rad) {
    float b = 16.0 * dpr;
    float row = floor(frag.y / b);
    // a outra realidade: pixels na paleta, com linhas deslocadas como o E do logotipo
    float shift = step(0.72, hash(row * 7.1 + tick)) * (hash(row + tick * 3.3) - 0.5) * b * 4.0;
    vec2 cell = (floor((frag + vec2(shift, 0.0)) / b) + 0.5) * b;
    vec3 pix = palette(dot(texture2D(tex, cover(cell / res)).rgb, vec3(0.299, 0.587, 0.114)));
    vec2 g = mod(frag + vec2(shift, 0.0), b);
    if (g.x < dpr || g.y < dpr) pix *= 0.82;
    // a nossa realidade vaza por faixas: a foto de verdade, rasgada, com os canais de cor separados
    float sr = floor(frag.y / (8.0 * dpr));
    float tear = step(0.76 - 0.3 * glitch, hash(sr * 13.7 + tick));
    float off = (hash(sr * 1.9 + tick * 7.3) - 0.5) * 140.0 * dpr * (0.5 + glitch);
    float sp = (5.0 + 18.0 * glitch + 14.0 * tear) * dpr;
    vec2 p = frag + vec2(off, 0.0);
    vec3 leak = vec3(texture2D(tex, cover((p + vec2(sp, 0.0)) / res)).r,
                     texture2D(tex, cover(p / res)).g,
                     texture2D(tex, cover((p - vec2(sp, 0.0)) / res)).b);
    col = mix(pix, leak, tear);
    if (mod(frag.y, 3.0 * dpr) < dpr) col *= 0.88;                    // linhas de varredura
    vec2 cb = floor(frag / (28.0 * dpr));                              // blocos corrompidos, na paleta
    float cr = hash(cb.x * 17.0 + cb.y * 31.0 + tick * 5.0);
    if (cr > 0.985 - 0.04 * glitch) col = cr > 0.992 ? c4 : c3;
    // borda: arcos que acendem e apagam em degraus
    if (d > rad - 5.0 * dpr) {
      float on = step(0.22, hash(seg * 5.1 + tick * 2.7));
      col = on > 0.5 ? (hash(seg + tick) > 0.8 ? vec3(1.0) : c4) : c1;
    }
  }
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`;

function initHeroPortal() {
  const hero = document.querySelector("[data-pixel-portal]");
  if (!hero || !HAS_GL) return;
  const img = hero.querySelector(".hero-photo");
  const start = () => {
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setPixelRatio(DPR);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const canvas = renderer.domElement;
    canvas.className = "pixel-portal";
    canvas.setAttribute("aria-hidden", "true");
    img.after(canvas);

    const tex = new THREE.Texture(img);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    const col = (h) => new THREE.Color(h);
    const u = {
      tex: { value: tex }, res: { value: new THREE.Vector2(1, 1) }, imgRes: { value: new THREE.Vector2(img.naturalWidth, img.naturalHeight) },
      mouse: { value: new THREE.Vector2(-999, -999) }, radius: { value: 0 }, boot: { value: reduce ? 1 : 0 }, time: { value: 0 }, dpr: { value: DPR }, glitch: { value: 0 },
      c0: { value: col(HEX.deep) }, c1: { value: col(HEX.indigo) }, c2: { value: col(HEX.lilac) }, c3: { value: col(HEX.sky) }, c4: { value: col(HEX.lime) },
    };
    const scene = new THREE.Scene();
    const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({
      uniforms: u, fragmentShader: frag,
      vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }",
    })));

    let w = 1, h = 1;
    function resize() {
      const r = hero.getBoundingClientRect();
      w = r.width; h = r.height;
      renderer.setSize(w, h, false);
      u.res.value.set(w * DPR, h * DPR);
    }
    resize();
    window.addEventListener("resize", resize);

    // alvo do portal: o cursor, ou um passeio automático (modo demonstração)
    const target = { x: 0, y: 0, r: 0 }, pos = { x: w * 0.7, y: h * 0.5 };
    let lastMove = -1e9, pulse = 0, t = 0;
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      target.x = e.clientX - r.left; target.y = e.clientY - r.top; lastMove = performance.now();
    }, { passive: true });
    // clicar no portal: ele se expande e a pessoa atravessa para o núcleo da marca
    // (com movimento reduzido não há rajada nem faixas: a travessia vai direto ao destino)
    hero.addEventListener("click", (e) => {
      if (e.target.closest("a, button")) return;
      if (!reduce) pulse = 1;
      setTimeout(() => cross("#nucleo", e.clientX, e.clientY), reduce ? 0 : 260);
    });
    // etiqueta que anda com o portal: diz o que o clique faz (a frase "Atravessar o portal" é o equivalente por teclado)
    const tag = document.createElement("span");
    tag.className = "portal-tag"; tag.setAttribute("aria-hidden", "true"); tag.textContent = "Atravessar"; tag.hidden = true;
    hero.append(tag);
    const place = (x, y) => { tag.style.left = Math.round(x / 4) * 4 + "px"; tag.style.top = Math.round(y / 4) * 4 + "px"; };

    let visible = true, running = false, last = performance.now();
    new IntersectionObserver((en) => { visible = en[0].isIntersecting; if (visible) loop(); }).observe(hero);
    document.addEventListener("visibilitychange", () => { if (!document.hidden) loop(); });

    function frame(now) {
      const dt = Math.min(0.05, (now - last) / 1000); last = now; t += dt;
      const idle = now - lastMove > 2500;
      if (idle) { // passeia pela metade direita, longe do texto
        target.x = w * (0.68 + 0.16 * Math.sin(t * 0.45));
        target.y = h * (0.42 + 0.18 * Math.sin(t * 0.7 + 1.0));
      }
      pos.x += (target.x - pos.x) * (idle ? 0.04 : 0.18);
      pos.y += (target.y - pos.y) * (idle ? 0.04 : 0.18);
      pulse = Math.max(0, pulse - dt * 0.9);
      const base = Math.min(w, h) * (idle ? 0.16 : 0.2);
      target.r = base + pulse * Math.max(w, h) * 0.5;
      u.radius.value += (target.r * DPR - u.radius.value) * 0.2;
      u.mouse.value.set(pos.x * DPR, (h - pos.y) * DPR);
      u.glitch.value = pulse;                 // rajada: ao clicar, a fenda treme forte e acalma
      place(pos.x, pos.y);
      tag.hidden = u.boot.value < 0.8 || pulse > 0.05;
      u.time.value = t;
      if (u.boot.value < 1) u.boot.value = Math.min(1, u.boot.value + dt / 1.3);
      renderer.render(scene, cam);
    }
    function loop() {
      if (running || reduce) return; running = true; last = performance.now();
      (function step(now) {
        if (!visible || document.hidden) { running = false; return; }
        frame(now); requestAnimationFrame(step);
      })(last);
    }
    if (reduce) { // sem animação: um portal parado, à direita
      u.mouse.value.set(w * 0.72 * DPR, h * 0.5 * DPR); u.radius.value = Math.min(w, h) * 0.18 * DPR;
      place(w * 0.72, h * 0.5); tag.hidden = false;
      renderer.render(scene, cam);
    } else loop();
  };
  if (img.complete && img.naturalWidth) start(); else img.addEventListener("load", start, { once: true });
}

/* ------------------------------------------------------------------ 3. mapa dos verbos */
function initMap() {
  const map = document.querySelector("[data-map]");
  const stage = map && map.querySelector("[data-map-stage]");
  if (!stage || !HAS_GL) return;
  map.classList.add("is-live");

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  stage.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  cam.position.set(10, 9, 10); cam.lookAt(0, 1.4, 0);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x1e2447, 1.3));
  const sun = new THREE.DirectionalLight(0xffffff, 1.6); sun.position.set(4, 10, 2); scene.add(sun);

  const COLORS = [0xcbd0eb, 0xd0b7d8, 0xb0e0e9, 0xf15e2b];       // obra, catálogo, serviço, produto
  const N = 4, plats = [], frames = [];
  const posOf = (i) => new THREE.Vector3(-2.4 + 1.6 * i, 0, 2.4 - 1.6 * i);
  const hOf = (i) => 0.7 + 0.45 * i;
  const lam = (c) => new THREE.MeshLambertMaterial({ color: c });

  for (let i = 0; i < N; i++) {
    const h = hOf(i), p = posOf(i);
    const box = new THREE.Mesh(new THREE.BoxGeometry(1.3, h, 1.3), lam(COLORS[i]));
    box.position.set(p.x, h / 2, p.z); box.userData.i = i;
    scene.add(box); plats.push(box);
    // portal: moldura quadrada virada para a câmera
    const g = new THREE.Group();
    g.position.set(p.x - 0.12, h, p.z - 0.12); g.rotation.y = Math.PI / 4;
    const fm = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 });
    const bar = (w, hh, x, y) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, hh, 0.06), fm); m.position.set(x, y, 0); g.add(m); };
    bar(0.9, 0.07, 0, 1.1); bar(0.07, 1.1, -0.42, 0.55); bar(0.07, 1.1, 0.42, 0.55);
    // preenchimento em três faixas, como o E: entram de lados alternados quando o portal acende
    const fills = [];
    for (let k = 0; k < 3; k++) {
      const f = new THREE.Mesh(new THREE.PlaneGeometry(0.77, 0.3), new THREE.MeshBasicMaterial({ color: 0xd3de28, side: THREE.DoubleSide }));
      f.position.set(0, 0.2 + k * 0.34, 0); f.scale.x = 0.0001; g.add(f); fills.push({ m: f, dir: k % 2 ? 1 : -1, off: [0, 0.12, 0.05][k] });
    }
    // fantasmas: duas cópias da moldura, em laranja e céu, que se afastam quando o portal "falha"
    const ghosts = [HEX.orange, HEX.sky].map((c) => {
      const gm = new THREE.MeshBasicMaterial({ color: c }), gg = new THREE.Group();
      [[0.9, 0.07, 0, 1.1], [0.07, 1.1, -0.42, 0.55], [0.07, 1.1, 0.42, 0.55]].forEach(([w, hh, x, y]) => {
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, hh, 0.06), gm); m.position.set(x, y, -0.05); gg.add(m);
      });
      gg.visible = false; g.add(gg); return gg;
    });
    scene.add(g);
    frames.push({ g, fm, fills, ghosts, bx: g.position.x, lit: false, t: 0 });
  }
  // escadas entre as plataformas
  const stepMat = lam(0x2c3568);
  for (let i = 0; i < N - 1; i++) {
    const a = posOf(i), b = posOf(i + 1);
    for (let k = 1; k <= 3; k++) {
      const t = k / 4, hh = hOf(i) + (hOf(i + 1) - hOf(i)) * t;
      const st = new THREE.Mesh(new THREE.BoxGeometry(0.42, hh, 0.42), stepMat);
      st.position.set(a.x + (b.x - a.x) * t, hh / 2, a.z + (b.z - a.z) * t);
      scene.add(st);
    }
  }
  /* Gramática de portal por entidade. Cada ficção de portal vira um gesto mínimo, em degraus,
     só com cores da paleta. Aparece quando o portal acende. */
  const px = (c, s) => new THREE.Mesh(new THREE.BoxGeometry(s, s, s), new THREE.MeshBasicMaterial({ color: c }));
  const ring = (w, h, c, parent, x, y, z) => {
    const m = new THREE.MeshBasicMaterial({ color: c }), grp = new THREE.Group(); grp.position.set(x, y, z);
    [[w, 0.045, 0, h / 2], [w, 0.045, 0, -h / 2], [0.045, h, -w / 2, 0], [0.045, h, w / 2, 0]].forEach(([bw, bh, bx, by]) => {
      const b = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, 0.045), m); b.position.set(bx, by, 0); grp.add(b);
    });
    parent.add(grp); return grp;
  };
  const G = [];
  { // Obra: fenda viva (Stranger Things). O portal respira e solta esporos laranja.
    const sp = [];
    for (let k = 0; k < 6; k++) { const m = px(0xf15e2b, 0.055); frames[0].g.add(m); sp.push({ m, x: (k % 2 ? 1 : -1) * (0.5 + (k * 0.037) % 0.1), y0: 0.12 + (k * 0.17) % 0.8 }); }
    G[0] = (t, lit) => {
      frames[0].g.scale.setScalar(lit ? 1 + (Math.floor(t * 2) % 2) * 0.035 : 1);
      sp.forEach((s, k) => { s.m.visible = lit; s.m.position.set(s.x, s.y0 + ((Math.floor(t * 3) + k) % 5) * 0.09, 0.05); });
    };
  }
  { // Catálogo: cardápio de realidades (Rick and Morty). Camadas de portais que se alternam.
    const r1 = ring(0.7, 0.9, 0xd0b7d8, frames[1].g, 0, 0.55, 0.3), r2 = ring(0.48, 0.62, 0xb0e0e9, frames[1].g, 0, 0.5, 0.6);
    G[1] = (t, lit) => { const s = Math.floor(t * 2) % 3; r1.visible = lit && s !== 0; r2.visible = lit && s !== 1; };
  }
  { // Serviço: par de portais (Portal, Marvel). O equipamento entra por um e sai pelo outro.
    const A = ring(0.3, 0.38, 0xf15e2b, frames[2].g, -0.44, 0.19, 0.5), B = ring(0.3, 0.38, 0xb0e0e9, frames[2].g, 0.44, 0.19, 0.5);
    const crate = px(0xffffff, 0.13); frames[2].g.add(crate);
    G[2] = (t, lit) => {
      A.visible = B.visible = lit;
      const c = (t % 1.8) / 1.8, q = Math.ceil(Math.min(1, c / 0.6) * 6) / 6;
      crate.visible = lit && c < 0.7;
      crate.position.set(-0.44 + 0.88 * q, 0.19 + Math.sin(q * Math.PI) * 0.4, 0.5);
    };
  }
  { // Produto: chuva digital (Matrix, XR). O software atravessa a moldura.
    const cells = [];
    for (let c = 0; c < 5; c++) for (let r = 0; r < 6; r++) { const m = px(0x1e2447, 0.06); m.position.set(-0.3 + c * 0.15, 0.2 + r * 0.15, 0.06); frames[3].g.add(m); cells.push({ m, c, r }); }
    G[3] = (t, lit) => cells.forEach(({ m, c, r }) => { m.visible = lit && ((Math.floor(t * (5 + c)) % 9) - r + 9) % 9 < 3; });
  }
  const clock = { t: 0 };

  // jogador: um cubo limão com uma faixa índigo, um visitante de óculos
  const player = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.34, 0.34), lam(0xd3de28));
  const visor = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.1, 0.36), lam(0x1e2447));
  body.position.y = 0.17; visor.position.y = 0.24;
  player.add(body, visor); scene.add(player);
  // embodiment (Rick and Morty): ao atravessar, o corpo assume a regra da dimensão. Aqui, os óculos mudam de cor.
  const mutate = (i) => visor.material.color.setHex(COLORS[i]);
  mutate(0);
  const spot = (i) => { const p = posOf(i); return new THREE.Vector3(p.x + 0.32, hOf(i), p.z + 0.32); };
  player.position.copy(spot(0));

  let cur = 0, path = [], hop = null, hover = -1, bob = 0;
  function light(i) { const f = frames[i]; if (!f.lit) { f.lit = true; f.t = 0; } }
  light(0);

  function goTo(i) {
    if (reduce) { cur = i; player.position.copy(spot(i)); light(i); mutate(i); kick(); return; }
    path = [];
    const step = i > cur ? 1 : -1;
    for (let k = cur + step; step > 0 ? k <= i : k >= i; k += step) path.push(k);
    kick();
  }
  document.addEventListener("vers:verbo", (e) => goTo(e.detail.index));

  // clique numa plataforma escolhe o verbo (o painel e as abas acompanham)
  const ray = new THREE.Raycaster(), ptr = new THREE.Vector2();
  function pick(e) {
    const r = renderer.domElement.getBoundingClientRect();
    ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ptr, cam);
    const hit = ray.intersectObjects(plats)[0];
    return hit ? hit.object.userData.i : -1;
  }
  renderer.domElement.addEventListener("pointermove", (e) => { const h = pick(e); if (h !== hover) { hover = h; renderer.domElement.style.cursor = h >= 0 ? "pointer" : "default"; kick(); } });
  renderer.domElement.addEventListener("pointerleave", () => { hover = -1; kick(); });
  renderer.domElement.addEventListener("click", (e) => { const h = pick(e); if (h >= 0) document.dispatchEvent(new CustomEvent("vers:select", { detail: { index: h } })); });

  function resize() {
    const r = stage.getBoundingClientRect();
    renderer.setSize(r.width, r.height, false);
    const a = r.width / r.height, d = Math.max(2.7, 4.6 / a);
    cam.left = -d * a; cam.right = d * a; cam.top = d; cam.bottom = -d; cam.updateProjectionMatrix();
    kick();
  }
  new ResizeObserver(resize).observe(stage);

  let running = false, visible = true, last = performance.now();
  new IntersectionObserver((en) => { visible = en[0].isIntersecting; if (visible) kick(); }).observe(stage);
  function kick() { if (reduce) { frame(performance.now()); return; } if (!running) { running = true; last = performance.now(); requestAnimationFrame(loop); } }
  function loop(now) { frame(now); if (visible && !document.hidden) requestAnimationFrame(loop); else running = false; }

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    // pulo em arco, com pouso "achatado"
    if (!hop && path.length) { const to = path.shift(); hop = { from: player.position.clone(), to: spot(to), i: to, t: 0 }; }
    if (hop) {
      hop.t = Math.min(1, hop.t + dt / 0.32);
      const q = Math.ceil(hop.t * 8) / 8;               // movimento em degraus
      player.position.lerpVectors(hop.from, hop.to, q);
      player.position.y += Math.sin(q * Math.PI) * 0.9;
      if (hop.t >= 1) { cur = hop.i; light(cur); mutate(cur); hop = null; body.scale.set(1.25, 0.7, 1.25); }
    } else {
      bob += dt;
      player.position.y = spot(cur).y + (Math.floor(bob * 4) % 2) * 0.04;
    }
    body.scale.lerp(new THREE.Vector3(1, 1, 1), 0.2);
    plats.forEach((p, i) => { const up = i === hover ? 0.08 : 0; p.position.y += (hOf(i) / 2 + up - p.position.y) * 0.3; });
    frames.forEach((f, i) => {
      f.fm.color.setHex(f.lit ? 0xd3de28 : 0xffffff); f.fm.opacity = f.lit ? 1 : 0.55;
      if (f.lit && f.t < 1) f.t = reduce ? 1 : Math.min(1, f.t + dt / 0.5);
      f.fills.forEach((b) => {
        let p = f.lit ? Math.max(0, Math.min(1, (f.t - b.off) / 0.6)) : 0;
        p = Math.ceil(p * 4) / 4;
        b.m.scale.x = Math.max(0.0001, p);
        b.m.position.x = b.dir * (1 - p) * 0.385;
      });
      f.g.position.y = plats[i].position.y + hOf(i) / 2;
    });
    clock.t += dt;
    G.forEach((fn, i) => fn(clock.t, frames[i].lit));
    // glitch dos portais: ao acender (primeiro meio segundo) falham sem parar, depois só de vez em quando
    const tk = Math.floor(clock.t * 5);
    frames.forEach((f, i) => {
      const burst = !reduce && f.lit && (f.t < 1 || h01(i * 13 + tk) > 0.86);
      f.ghosts.forEach((gg, k) => {
        gg.visible = burst;
        if (burst) gg.position.set((k ? 1 : -1) * (0.04 + 0.1 * h01(tk * 3 + i + k)), (h01(tk + i * 5 + k) - 0.5) * 0.06, 0);
      });
      f.g.position.x = f.bx + (burst ? (h01(tk + i * 7) - 0.5) * 0.1 : 0);
    });
    renderer.render(scene, cam);
  }
  resize();
}

function boot() {
  initCross();
  initTransitions();
  try { initHeroPortal(); } catch (e) { console.warn("[VERS portal]", e); }
  try { initMap(); } catch (e) { console.warn("[VERS mapa]", e); }
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
