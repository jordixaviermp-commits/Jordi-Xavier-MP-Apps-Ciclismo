// Genera pacing/ejemplo.gpx: una marcha sintética de ~190 km con tres puertos (no es una ruta real).
import { writeFileSync } from 'node:fs';
const N = 3800, TOTAL = 190000;
const bump = (x, c, w, h) => h * Math.exp(-(((x - c) / w) ** 2));
// altitud en función de los km: salida a 600 m, tres puertos grandes y repechos
const ele = (km) => 600 + bump(km, 38, 11, 1000) + bump(km, 100, 13, 1100) + bump(km, 152, 9, 750)
  + 25 * Math.sin(km / 3.1) + 18 * Math.sin(km / 1.3) * (km > 60 && km < 90 ? 1 : 0.3);
let lat = 42.57, lon = -0.55, s = '';
for (let i = 0; i <= N; i++) {
  const km = (i / N) * (TOTAL / 1000), a = (i / N) * Math.PI * 2;
  // trazado en lazo
  lat = 42.57 + 0.45 * Math.sin(a) * (0.6 + 0.4 * Math.cos(a * 2));
  lon = -0.55 + 0.75 * (1 - Math.cos(a)) / 2 - 0.3 * Math.sin(a * 3) * 0.2;
  s += `<trkpt lat="${lat.toFixed(6)}" lon="${lon.toFixed(6)}"><ele>${ele(km).toFixed(1)}</ele></trkpt>\n`;
}
writeFileSync(new URL('../pacing/ejemplo.gpx', import.meta.url),
  `<?xml version="1.0" encoding="UTF-8"?>\n<gpx version="1.1" creator="Pacing" xmlns="http://www.topografix.com/GPX/1/1">\n<trk><name>Gran fondo de ejemplo</name><trkseg>\n${s}</trkseg></trk></gpx>\n`);
