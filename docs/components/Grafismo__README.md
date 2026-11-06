Brand texture. Always inside a relative, overflow-hidden parent; always large and cropped.

```jsx
<div style={{position:"relative",overflow:"hidden",background:"var(--vers-indigo)",height:420}}>
  <Grafismo form="ondas" colour="var(--vers-lime)" opacity={0.9} size="72%" position="right center" assetBase="../../assets/Logos" />
</div>
```

- Families and functions follow brandbook p. 58: Glitch (`glitch`, `glitch-h`, `glitch-v`: background texture, dividing band, side column), Onda (`ondas`: visual separation, section marking, rhythm), Olho (`olho`: focal point, cover, iconographic presence), Marca (`mural`, `v`, `logotipo`: pattern, icon, watermark, texture).
- Palette colours only (p. 45); graphite is allowed as texture. On black, graphite or indigo grounds use `form="olho-invertido"` for the eye, so its polarity holds.
- Do not use a grafismo as a small decorative sticker, and never put two different forms on the same surface.
- The PNG files are reduced, never enlarged beyond their original size; above that, ask for the vector (p. 58).
