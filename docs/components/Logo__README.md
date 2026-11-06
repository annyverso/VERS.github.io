The brand signature. Use the logotipo wherever the brand signs; the Símbolo V where the full signature does not fit: app icon, social avatar, favicon, watermark, calibration marks (brandbook p. 44).

```jsx
<Logo colour="white" height={64} descriptor="Produtora de cultura imersiva" assetBase="../../assets/Logos" />
```

- **Colour by ground** (pp. 45, 51, 52): `black` (#191919) on white or a light palette colour is the preferred version; `white` on dark grounds; any of the five chromatic colours (`lime`, `orange`, `sky`, `lilac`, `indigo`) when it keeps at least 3:1 against the ground. Never graphite (texture only, p. 45), never an interface colour or anything outside the palette, never indigo on black or graphite (2.75:1, 1.75:1).
- **Descriptor lockup** (p. 46): Elgraine Bold Italic, in the logotipo's colour, under it and right-aligned, at 0.17 times the logotipo's height; the clear space covers the whole lockup. The component sets all of this. Below 59px of logotipo height the descriptor holds at 10px: from there down, set the descriptor apart instead of locking it up. Short descriptor *Produtora de cultura imersiva* on compact pieces; *Produtora e distribuidora de cultura imersiva* in institutional texts with room (pp. 4, 60). The tagline never locks up with the logotipo (p. 47).
- **Clear space** (p. 49): the height of the V on all four sides (0.2365 times the logotipo's width); half the V for the isolated symbol.
- **Minimum size** (p. 53): logotipo 80px wide on screen, 3cm in print; symbol 24px (16px only as the browser favicon), measured on the V's width.
- **Never** (p. 56): distort, rotate, apply more than one colour inside it, apply colours outside the palette, add patterns, gradients, a white outline or a shadow, or place it on a ground under 3:1. Rotation by 90°, reading top to bottom, is allowed only in administrative documents, as a border graphic or watermark (p. 66). As a grafismo the logotipo can be enlarged, cropped, tone on tone or translucent over an image, as texture only, with the signature legible elsewhere (p. 52).
- Set `assetBase` to the folder that holds the `logotipo-<colour>.png` and `simbolo-v-<colour>.png` files. Vector files for production are in the `Marca` asset group.
