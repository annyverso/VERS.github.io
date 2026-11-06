import React from "react";
import { Section } from "../../components/layout/Section.jsx";
import { Button } from "../../components/core/Button.jsx";
import { Eyebrow } from "../../components/core/Eyebrow.jsx";
import { Tag } from "../../components/core/Tag.jsx";
import { Rule } from "../../components/core/Rule.jsx";
import { MediaFrame } from "../../components/media/MediaFrame.jsx";
import { QuoteBlock } from "../../components/media/QuoteBlock.jsx";
import { WorkCard } from "../../components/media/WorkCard.jsx";

const FICHA = [
  ["Formato", "Free-roaming · até 12 pessoas simultâneas"],
  ["Duração", "18 minutos por sessão"],
  ["Área mínima", "180 m² livres, pé-direito 3,5 m"],
  ["Equipamento", "12 headsets standalone + estação de higienização"],
  ["Equipe", "1 supervisor · 4 mediadores por turno"],
  ["Idiomas", "Português, inglês e espanhol"],
  ["Acessibilidade", "Audiodescrição e legendagem em LIBRAS"]
];

/** vers.com.br — obra / exhibition detail, with the technical sheet the operational register needs. */
export function SiteObra({ go, P, data }) {
  const { OBRAS, IMAGES } = data;
  const obra = OBRAS[0];
  return (
    <main>
      <section className="vers-dark" style={{ position: "relative", minHeight: 560, background: "var(--vers-black)", display: "grid", overflow: "hidden" }}>
        <img src={P + IMAGES[obra.image]} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--protect-bottom)" }} />
        <div style={{ position: "relative", alignSelf: "end", padding: "var(--space-9) var(--gutter-page)", maxWidth: "var(--container-full)", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
          <div style={{ display: "flex", gap: 2, marginBottom: 22 }}>
            <Tag tone="lime">{obra.format}</Tag><Tag tone="neutral" style={{ background: "var(--vers-black)", color: "var(--vers-white)" }}>{obra.venue}</Tag>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(42px,5.4vw,84px)", lineHeight: 0.94, letterSpacing: "-0.035em", textTransform: "uppercase", color: "var(--vers-white)", margin: 0, maxWidth: "16ch" }}>{obra.title}</h1>
        </div>
      </section>

      <Section ground="paper" width="var(--container-wide)">
        <div style={{ display: "grid", gridTemplateColumns: "minmax(300px,1.35fr) minmax(280px,1fr)", gap: "var(--space-9)", alignItems: "start" }}>
          <div style={{ display: "grid", gap: "var(--space-5)" }}>
            <Eyebrow rule tone="accent">Sobre a obra</Eyebrow>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--size-body-xl)", lineHeight: 1.5, margin: 0 }}>
              O público circula livremente pelo espaço físico enquanto vivencia a obra. A experiência não acontece apenas dentro do headset: ela ganha presença no espaço.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--size-body-m)", lineHeight: 1.6, color: "var(--text-secondary)", margin: 0, maxWidth: "var(--measure-prose)" }}>
              A VERS assume a produção expositiva completa: cenografia, ambientação, direção de arte, desenho de fluxo, formação da equipe local, protocolos de atendimento, manutenção e supervisão ao longo da temporada. Quando o projeto envolve sistema proprietário, a operação é integrada à equipe criadora da obra, sem perder capacidade de execução local.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
              <Button variant="primary" onClick={() => go("contato")}>Solicitar proposta</Button>
              <Button variant="outline">Baixar ficha técnica</Button>
            </div>
          </div>

          <aside style={{ display: "grid", gap: 0, borderTop: "4px solid var(--vers-black)", paddingTop: 20 }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: "var(--size-eyebrow)", fontWeight: 500, letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 14 }}>Ficha técnica</div>
            {FICHA.map(([k, v]) => (
              <div key={k} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 16, padding: "12px 0", borderBottom: "1px solid var(--border-subtle)" }}>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)" }}>{k}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--size-body-s)", lineHeight: 1.45 }}>{v}</span>
              </div>
            ))}
          </aside>
        </div>
      </Section>

      <Section ground="black" width="var(--container-wide)" pad="var(--space-8)">
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "var(--space-5)" }}>
          <MediaFrame src={P + IMAGES.dusk} ratio="16 / 9" protect="none" credit="Danilo Ferrara" />
          <MediaFrame src={P + IMAGES.equipe} ratio="16 / 9" protect="none" />
        </div>
        <Rule tone="subtle" />
        <QuoteBlock accent="var(--vers-lime)" attribution="Dicionário de marca" role="Instalação imersiva">
          A experiência não acontece apenas dentro do headset. Ela ganha presença no espaço.
        </QuoteBlock>
      </Section>

      <Section ground="paper" width="var(--container-wide)" eyebrow="Também em circulação" title="Outras obras">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "var(--space-7)" }}>
          {OBRAS.slice(1, 4).map((o) => (
            <WorkCard key={o.id} image={P + IMAGES[o.image]} format={o.format} venue={o.venue} year={o.year} title={o.title} summary={o.summary} href="#" onClick={(e) => e.preventDefault()} />
          ))}
        </div>
      </Section>
    </main>
  );
}
