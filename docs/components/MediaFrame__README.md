Every photograph in a VERS layout goes through `MediaFrame`: it guarantees the protection gradient.

```jsx
<MediaFrame src="../../assets/photos/vr-sunset-wide.jpg" ratio="21 / 9" credit="Acervo: VERS"
  overlay={<><Eyebrow tone="lime">Circuito Sesc de Artes</Eyebrow><h2>Barretos, 2026</h2></>} />
```

Photographs run big. Do not use this component below ~320px wide.

Credit photographs from Circuito Sesc de Artes, Barretos 2026, as *Acervo: VERS*, without the photographer's name. Use only photographs in which every identifiable person wears a headset or is on the VERS team, such as the mediators in aprons at the Circuitos Sesc.
