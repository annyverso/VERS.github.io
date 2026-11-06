# UI kit: vers.com.br

An interactive recreation of the VERS website, composed entirely from this design system's components. Open `index.html`.

> **This is not a reproduction of an existing site.** No website, codebase or Figma file was supplied. Every screen here is derived from the approved brandbook copy, the Grafismos system and the supplied photography. Treat it as a proposal for how the brand behaves on the web, not as a record of what exists.

## Screens

| Screen | File | What it shows |
|---|---|---|
| Início | `SiteHome.jsx` | Full-bleed photo hero with protection gradients, the tagline composed in two weights and an inverted lime *olho*; núcleo de marca; the three verbs on indigo; three works; histórico on black; partner marks; a lime closing call. |
| VERS Apresenta | `SiteApresenta.jsx` | Indigo hero over a tiled *mural*; format filter tabs; catalogue grid; "Solicitar catálogo" dialog with a form. |
| Obra | `SiteObra.jsx` | Photo hero with format stamps; description plus the **ficha técnica** the operational register needs; a photo pair on black; a dictionary pull-quote; related works. |
| Contato | `SiteContato.jsx` | Frente selector, full enquiry form, direct channels by frente, trilingual note. |

`SiteData.js` holds the shared copy and image map so screens stay small. The shell (`index.html`) wires `SiteHeader`, `SiteFooter`, routing and `Toast`.

## Interactions worth clicking

- Header links switch screens; the active link carries a lime rule.
- **VERS Apresenta** → format tabs filter the grid; **Solicitar catálogo** opens a `Dialog`; sending it fires a `Toast`.
- Any work card opens the **Obra** screen.
- **Contato** → the frente radios, the full form, and a confirmation `Toast` on submit.

## Components used

`SiteHeader` · `SiteFooter` · `Section` · `Button` · `Eyebrow` · `Rule` · `Tag` · `Tabs` · `Stat` · `Grafismo` · `WorkCard` · `MediaFrame` · `QuoteBlock` · `Dialog` · `Toast` · `Field` · `Input` · `Textarea` · `Select` · `Checkbox` · `Radio`

## Rules this kit demonstrates

- One dominant ground per section, alternating; never two identical grounds in a row.
- Photography full-bleed, always behind a protection gradient when type sits on it.
- Grafismos large, cropped and bleeding, never a small decorative sticker.
- Square corners throughout; the only shadow in the kit is on the dialog and the toast.
- Copy is the brandbook's approved copy, in the brandbook's vocabulary: Produzir, Distribuir, Materializar; the tagline composed as on brandbook p. 6 (Nebulica Medium, then Nebulica Black, sentence case, no full stop); calls without vision verbs (p. 76).
