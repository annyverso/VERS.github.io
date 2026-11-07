"""Gera assets/mapa/terra.png (máscara de terra, projeção equiretangular 4096x2048) a partir do Natural Earth.
Dados: Natural Earth, domínio público, pacote npm `world-atlas` (land-50m).
Uso (na pasta _build/mapa):  npm i world-atlas@2.0.2 topojson-client@3.1.0 && node gerar-terra.js && python3 gerar-terra.py
Polígonos que cruzam o antimeridiano são desembrulhados e desenhados com deslocamento de ±360°; os que envolvem um polo fecham pelo polo."""
import json
from PIL import Image, ImageDraw
g = json.load(open("land.geojson"))
feats = g["features"] if g["type"] == "FeatureCollection" else [g]
W, H = 4096, 2048
im = Image.new("L", (W, H), 0); d = ImageDraw.Draw(im)
def unwrap(ring):
    out = [list(ring[0])]
    for c in ring[1:]:
        lon, prev = c[0], out[-1][0]
        while lon - prev > 180: lon -= 360
        while lon - prev < -180: lon += 360
        out.append([lon, c[1]])
    return out
def draw(ring, fill):
    r = unwrap(ring)
    if abs(r[-1][0] - r[0][0]) > 180:
        pole = -90 if sum(p[1] for p in r) / len(r) < 0 else 90
        r += [[r[-1][0], pole], [r[0][0], pole]]
    for off in (-360, 0, 360):
        d.polygon([((x + off + 180) / 360 * W, (90 - y) / 180 * H) for x, y in r], fill=fill)
for f in feats:
    geom = f["geometry"]; polys = geom["coordinates"] if geom["type"] == "MultiPolygon" else [geom["coordinates"]]
    for poly in polys:
        for i, ring in enumerate(poly): draw(ring, 255 if i == 0 else 0)
im.save("../../assets/mapa/terra.png", optimize=True)
