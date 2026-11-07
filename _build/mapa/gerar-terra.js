const topo = require('topojson-client'); const fs = require('fs');
const t = JSON.parse(fs.readFileSync('node_modules/world-atlas/land-50m.json'));
fs.writeFileSync('land.geojson', JSON.stringify(topo.feature(t, t.objects.land)));
