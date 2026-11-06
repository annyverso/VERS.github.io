import React from "react";
import { Section } from "../../components/layout/Section.jsx";
import { Button } from "../../components/core/Button.jsx";
import { Eyebrow } from "../../components/core/Eyebrow.jsx";
import { Rule } from "../../components/core/Rule.jsx";
import { Stat } from "../../components/brand/Stat.jsx";
import { Grafismo } from "../../components/brand/Grafismo.jsx";
import { WorkCard } from "../../components/media/WorkCard.jsx";
import { QuoteBlock } from "../../components/media/QuoteBlock.jsx";

/** vers.com.br — home. Hero, os três verbos, obras, track record, parceiros, chamada final. */
export function SiteHome({ go, P, G, C, data }) {
  const { VERBOS, OBRAS, IMAGES, CLIENTS, STATS } = data;
  return (
    <main>
      {/* Hero */}
      <section className="vers-dark" style={{ position: "relative", minHeight: 640, display: "grid", background: "var(--vers-black)", overflow: "hidden" }}>
        <img src={P + IMAGES.hero} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--protect-left)" }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--protect-bottom)" }} />
        <Grafismo form="olho-invertido" colour="var(--vers-lime)" opacity={0.55} size="520px" position="right -80px bottom -120px" assetBase={G} />
        <div style={{ position: "relative", alignSelf: "end", padding: "var(--space-9) var(--gutter-page)", maxWidth: "var(--container-full)", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
          <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontWeight: 700, fontSize: "var(--size-body-l)", lineHeight: 1.3, color: "var(--vers-lime)", margin: 0 }}>Produtora e distribuidora de cultura imersiva</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,6.6vw,104px)", lineHeight: 1.06, letterSpacing: 0, color: "var(--vers-white)", margin: "24px 0 0" }}>
            <span style={{ display: "block", fontWeight: 500 }}>Onde a cultura</span>
            <span style={{ display: "block", fontWeight: 900 }}>ganha presença</span>
          </h1>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 38 }}>
            <Button variant="accent" size="lg" onClick={() => go("apresenta")}>Conhecer o catálogo</Button>
            <Button variant="outline" size="lg" onClick={() => go("contato")} style={{ color: "var(--vers-white)", borderColor: "var(--vers-white)" }}>Falar com a VERS</Button>
          </div>
        </div>
      </section>

      {/* Núcleo */}
      <Section ground="paper" width="var(--container-wide)">
        <div style={{ display: "grid", gridTemplateColumns: "minmax(300px,1fr) minmax(320px,1.15fr)", gap: "var(--space-9)", alignItems: "start" }}>
          <div style={{ display: "grid", gap: "var(--space-5)" }}>
            <Eyebrow rule tone="accent">Núcleo de marca</Eyebrow>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(34px,3.4vw,56px)", lineHeight: 0.96, letterSpacing: "-0.03em", textTransform: "uppercase", margin: 0 }}>
              A tecnologia nunca foi o fim. Ela é o meio.
            </h2>
          </div>
          <div style={{ display: "grid", gap: "var(--space-5)" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--size-body-xl)", lineHeight: 1.5, margin: 0 }}>
              Presença não é apenas o efeito de estar dentro de uma experiência. É a passagem de uma obra da representação para a vivência.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--size-body-m)", lineHeight: 1.6, color: "var(--text-secondary)", margin: 0, maxWidth: "var(--measure-prose)" }}>
              A VERS existe para transformar obras, narrativas, patrimônios, memórias e conhecimentos em experiências imersivas capazes de ocupar o espaço, encontrar o público e circular entre instituições, territórios e circuitos culturais.
            </p>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--size-body-l)", lineHeight: 1.3, letterSpacing: "-0.01em", color: "var(--vers-indigo)", margin: 0 }}>
              A obra é vivida a partir de dentro.
            </p>
          </div>
        </div>
      </Section>

      {/* Três verbos */}
      <Section ground="indigo" eyebrow="Os três verbos da VERS" title="Produzir. Distribuir. Materializar."
        lede="Os três verbos se atravessam e se sustentam. A VERS produz com rigor de quem opera em escala." width="var(--container-wide)">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "var(--space-7)" }}>
          {VERBOS.map((v, i) => (
            <article key={v.title} style={{ display: "grid", gap: 18, alignContent: "start", borderTop: "4px solid var(--vers-lime)", paddingTop: 22 }}>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", color: "var(--vers-lime)" }}>{String(i + 1).padStart(2, "0")}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 34, lineHeight: 1, letterSpacing: "-0.02em", textTransform: "uppercase", margin: 0 }}>{v.title}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--size-body-m)", lineHeight: 1.55, color: "var(--text-secondary)", margin: 0 }}>{v.body}</p>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 9 }}>
                {v.bullets.map((b) => (
                  <li key={b} style={{ display: "grid", gridTemplateColumns: "16px 1fr", gap: 12, fontFamily: "var(--font-ui)", fontSize: 13, letterSpacing: "0.02em", color: "var(--text-primary)" }}>
                    <span style={{ width: 12, height: 2, background: "var(--vers-lime)", marginTop: 8 }} />{b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      {/* Obras */}
      <Section ground="paper" width="var(--container-wide)">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 30, flexWrap: "wrap" }}>
          <div style={{ display: "grid", gap: 16 }}>
            <Eyebrow rule tone="accent">Em cartaz e em circulação</Eyebrow>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(32px,3vw,48px)", lineHeight: 0.96, letterSpacing: "-0.03em", textTransform: "uppercase", margin: 0 }}>Obras</h2>
          </div>
          <Button variant="outline" onClick={() => go("apresenta")}>Todas as obras</Button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "var(--space-7)" }}>
          {OBRAS.slice(0, 3).map((o) => (
            <WorkCard key={o.id} image={P + IMAGES[o.image]} format={o.format} venue={o.venue} year={o.year}
              title={o.title} summary={o.summary} href="#" onClick={(e) => { e.preventDefault(); go("obra"); }} />
          ))}
        </div>
      </Section>

      {/* Track record */}
      <Section ground="black" eyebrow="Histórico" title="Operação em escala" width="var(--container-wide)">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "var(--space-7)", borderTop: "1px solid var(--border-subtle)", paddingTop: "var(--space-7)" }}>
          {STATS.map((s) => <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} tone="lime" />)}
        </div>
        <Rule tone="subtle" />
        <QuoteBlock size="sm" attribution="Promessa de marca" accent="var(--vers-lime)">
          Cada obra entregue tem consistência curatorial, qualidade artística e robustez de operação no padrão do circuito internacional de XR.
        </QuoteBlock>
      </Section>

      {/* Parceiros */}
      <Section ground="subtle" eyebrow="Instituições e parceiros" title="Com quem a VERS trabalha" width="var(--container-wide)">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: "var(--space-7)", alignItems: "center" }}>
          {CLIENTS.map((c) => (
            <div key={c} style={{ height: 52, display: "grid", placeItems: "center" }}>
              <img src={C + c + ".png"} alt="" style={{ maxHeight: 52, maxWidth: "100%", width: "auto", objectFit: "contain", filter: "grayscale(1)", opacity: 0.72 }} />
            </div>
          ))}
        </div>
      </Section>

      {/* Chamada final */}
      <Section ground="lime" align="center" pad="var(--space-9)" width="var(--container-text)"
        title="Vamos dar presença à sua obra" lede="Comissionamento, distribuição curatorial ou operação de uma exposição XR no Brasil.">
        <Button variant="primary" size="lg" onClick={() => go("contato")}>Falar com a VERS</Button>
      </Section>
    </main>
  );
}
