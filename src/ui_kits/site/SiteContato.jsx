import React from "react";
import { Section } from "../../components/layout/Section.jsx";
import { Button } from "../../components/core/Button.jsx";
import { Eyebrow } from "../../components/core/Eyebrow.jsx";
import { Rule } from "../../components/core/Rule.jsx";
import { Field } from "../../components/forms/Field.jsx";
import { Input } from "../../components/forms/Input.jsx";
import { Textarea } from "../../components/forms/Textarea.jsx";
import { Select } from "../../components/forms/Select.jsx";
import { Checkbox } from "../../components/forms/Checkbox.jsx";
import { Radio } from "../../components/forms/Radio.jsx";
import { Grafismo } from "../../components/brand/Grafismo.jsx";

const CANAIS = [
  ["Comissionamento", "Criação e produção de obra autoral em XR", "novosprojetos@vers.com.br"],
  ["VERS Apresenta", "Distribuição curatorial e licenciamento", "apresenta@vers.com.br"],
  ["Operação", "Implantação e operação de exposições XR", "operacao@vers.com.br"],
  ["Imprensa", "Releases, imagens e entrevistas", "imprensa@vers.com.br"]
];

/** vers.com.br — contato. One form, three registers of enquiry. */
export function SiteContato({ G, onSubmit }) {
  const [frente, setFrente] = React.useState("comissionamento");
  const [sent, setSent] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    onSubmit && onSubmit();
  };

  return (
    <main>
      <section className="vers-dark" style={{ position: "relative", background: "var(--vers-black)", overflow: "hidden", padding: "var(--space-10) var(--gutter-page) var(--space-8)" }}>
        <Grafismo form="ondas" colour="rgba(255,255,255,.13)" repeat size="auto 100%" position="right center" assetBase={G} />
        <div style={{ position: "relative", maxWidth: "var(--container-wide)", margin: "0 auto", display: "grid", gap: "var(--space-4)" }}>
          <Eyebrow rule tone="lime">Contato</Eyebrow>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(42px,5vw,76px)", lineHeight: 0.94, letterSpacing: "-0.035em", textTransform: "uppercase", color: "var(--vers-white)", margin: 0, maxWidth: "15ch" }}>Vamos dar presença à sua obra</h1>
        </div>
      </section>

      <Section ground="paper" width="var(--container-wide)">
        <div style={{ display: "grid", gridTemplateColumns: "minmax(320px,1.15fr) minmax(280px,1fr)", gap: "var(--space-9)", alignItems: "start" }}>
          <form onSubmit={submit} style={{ display: "grid", gap: "var(--space-5)" }}>
            <fieldset style={{ border: 0, padding: 0, margin: 0, display: "grid", gap: 12 }}>
              <legend style={{ fontFamily: "var(--font-ui)", fontSize: "var(--size-eyebrow)", fontWeight: 500, letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--text-secondary)", padding: 0, marginBottom: 4 }}>Frente</legend>
              <div style={{ display: "flex", gap: 26, flexWrap: "wrap" }}>
                {[["comissionamento", "Comissionamento"], ["apresenta", "VERS Apresenta"], ["operacao", "Operação"]].map(([v, l]) => (
                  <Radio key={v} id={"f-" + v} name="frente" value={v} checked={frente === v} onChange={(e) => setFrente(e.target.value)} label={l} />
                ))}
              </div>
            </fieldset>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-5)" }}>
              <Field label="Nome" htmlFor="c-nome" required><Input id="c-nome" placeholder="Beatriz Almeida" /></Field>
              <Field label="Instituição" htmlFor="c-org" required><Input id="c-org" placeholder="Sesc São Paulo" /></Field>
            </div>
            <Field label="E-mail institucional" htmlFor="c-mail" required><Input id="c-mail" type="email" placeholder="nome@instituicao.org.br" /></Field>
            <Field label="Formato pretendido" htmlFor="c-fmt" help="Experiência, instalação, exposição e free-roaming não são sinônimos.">
              <Select id="c-fmt" options={["Ainda avaliando", "Experiência independente", "Instalação imersiva", "Exposição XR", "Free-roaming"]} />
            </Field>
            <Field label="Sobre o projeto" htmlFor="c-msg"><Textarea id="c-msg" rows={5} placeholder="Conte sobre a instituição, a data pretendida e o espaço disponível." /></Field>
            <Checkbox id="c-news" label="Quero receber a seleção curatorial do VERS Apresenta" />
            <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
              <Button variant="primary" size="lg" as="button" type="submit">Enviar mensagem</Button>
              {sent && <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--vers-indigo)" }}>Mensagem enviada</span>}
            </div>
          </form>

          <aside style={{ display: "grid", gap: 0, alignContent: "start" }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: "var(--size-eyebrow)", fontWeight: 500, letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 18 }}>Canais diretos</div>
            {CANAIS.map(([t, d, m]) => (
              <div key={t} style={{ display: "grid", gap: 6, padding: "18px 0", borderTop: "1px solid var(--border-subtle)" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, letterSpacing: "-0.01em" }}>{t}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--size-body-s)", color: "var(--text-secondary)" }}>{d}</div>
                <a href={"mailto:" + m} style={{ fontFamily: "var(--font-ui)", fontSize: 13, letterSpacing: "0.04em" }}>{m}</a>
              </div>
            ))}
            <Rule tone="strong" weight="rule" style={{ marginTop: 24 }} />
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--size-body-s)", lineHeight: 1.55, color: "var(--text-secondary)", marginTop: 18 }}>
              Comunicação institucional em português, inglês ou francês, conforme a origem da produtora.
            </p>
          </aside>
        </div>
      </Section>
    </main>
  );
}
