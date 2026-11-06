import React from "react";
import { Section } from "../../components/layout/Section.jsx";
import { Button } from "../../components/core/Button.jsx";
import { Eyebrow } from "../../components/core/Eyebrow.jsx";
import { Tag } from "../../components/core/Tag.jsx";
import { Tabs } from "../../components/navigation/Tabs.jsx";
import { WorkCard } from "../../components/media/WorkCard.jsx";
import { Grafismo } from "../../components/brand/Grafismo.jsx";
import { Dialog } from "../../components/feedback/Dialog.jsx";
import { Field } from "../../components/forms/Field.jsx";
import { Input } from "../../components/forms/Input.jsx";
import { Select } from "../../components/forms/Select.jsx";

const FILTERS = [
  { id: "todas", label: "Todas" },
  { id: "Exposição XR", label: "Exposição XR" },
  { id: "Instalação imersiva", label: "Instalação imersiva" },
  { id: "Free-roaming", label: "Free-roaming" }
];

/** vers.com.br — VERS Apresenta. The curatorial distribution catalogue. */
export function SiteApresenta({ go, P, G, data, onRequest }) {
  const { OBRAS, IMAGES } = data;
  const [filter, setFilter] = React.useState("todas");
  const [open, setOpen] = React.useState(false);
  const list = filter === "todas" ? OBRAS : OBRAS.filter((o) => o.format === filter);

  return (
    <main>
      <section className="vers-indigo" style={{ position: "relative", background: "var(--vers-indigo-900)", overflow: "hidden", padding: "var(--space-10) var(--gutter-page) var(--space-9)" }}>
        <Grafismo form="mural" colour="rgba(255,255,255,.10)" repeat size="280px" assetBase={G} />
        <div style={{ position: "relative", maxWidth: "var(--container-wide)", margin: "0 auto", display: "grid", gap: "var(--space-5)" }}>
          <Eyebrow rule tone="lime">Frente de distribuição curatorial</Eyebrow>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(44px,5.4vw,84px)", lineHeight: 0.94, letterSpacing: "-0.035em", textTransform: "uppercase", color: "var(--vers-white)", margin: 0 }}>VERS Apresenta</h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--size-body-xl)", lineHeight: 1.5, color: "rgba(255,255,255,.76)", margin: 0, maxWidth: "var(--measure-prose)" }}>
            Seleciona, licencia, localiza, produz, implanta e opera obras imersivas em circulação no Brasil e no exterior.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
            <Tag tone="lime">Curadoria</Tag><Tag tone="sky">Licenciamento</Tag><Tag tone="lilac">Localização cultural</Tag><Tag tone="orange">Implantação</Tag>
          </div>
        </div>
      </section>

      <Section ground="paper" width="var(--container-wide)" pad="var(--space-8)">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap" }}>
          <Tabs items={FILTERS} value={filter} onChange={setFilter} style={{ flex: "1 1 420px" }} />
          <Button variant="primary" onClick={() => setOpen(true)}>Solicitar catálogo</Button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "var(--space-7)" }}>
          {list.map((o) => (
            <WorkCard key={o.id} image={P + IMAGES[o.image]} format={o.format} venue={o.venue} year={o.year}
              title={o.title} summary={o.summary} href="#" onClick={(e) => { e.preventDefault(); go("obra"); }} />
          ))}
        </div>
        {list.length === 0 && <p style={{ fontFamily: "var(--font-body)", color: "var(--text-muted)" }}>Nenhuma obra neste formato no momento.</p>}
      </Section>

      <Section ground="subtle" width="var(--container-text)" align="center" pad="var(--space-9)"
        eyebrow="Por que esta obra, para esta instituição, agora?"
        title="Curadoria, não catálogo genérico"
        lede="Cada seleção é pensada para a instituição, com uma justificativa curatorial clara.">
        <Button variant="primary" size="lg" onClick={() => setOpen(true)}>Solicitar uma seleção</Button>
      </Section>

      <Dialog open={open} onClose={() => setOpen(false)} eyebrow="VERS Apresenta" title="Solicitar catálogo"
        footer={<>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="primary" onClick={() => { setOpen(false); onRequest && onRequest(); }}>Enviar</Button>
        </>}>
        <div style={{ display: "grid", gap: 18 }}>
          <Field label="Instituição" htmlFor="d-org" required><Input id="d-org" placeholder="Sesc São Paulo" /></Field>
          <Field label="E-mail institucional" htmlFor="d-mail" required><Input id="d-mail" type="email" placeholder="nome@instituicao.org.br" /></Field>
          <Field label="Formato de interesse" htmlFor="d-fmt" help="Os termos não são sinônimos: escolha o mais próximo do seu espaço.">
            <Select id="d-fmt" options={["Exposição XR", "Instalação imersiva", "Free-roaming", "Experiência independente"]} />
          </Field>
        </div>
      </Dialog>
    </main>
  );
}
