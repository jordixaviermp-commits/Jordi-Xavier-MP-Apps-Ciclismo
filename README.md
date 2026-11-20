# Jordi-Xavier-MP-Apps-Ciclismo
Apps de ciclismo.

## Pacing (`pacing/`)
App web instalable para repartir el esfuerzo en una marcha: subes un track (.gpx o .fit), indicas tu FTP y tu peso, eliges el objetivo (*Terminarla*, *Buen tiempo*, *A tope*) y obtienes:

- vatios recomendados por tramo (puertos, llano, rompepiernas y descensos), con IF, duración y velocidad estimada;
- perfil de altimetría interactivo y mapa, enlazados (desliza el dedo y ves vatios, pendiente y velocidad en ese punto);
- plan de nutrición (hidratos, líquido y sodio según el objetivo y el calor), con las tomas colocadas lejos de las bajadas;
- texto de estrategia generado a partir de los datos de la ruta.

Todo se calcula en el navegador y se guarda en el dispositivo. Solo sale a la red la previsión de Open-Meteo (si pones fecha) y los mosaicos del mapa de OpenStreetMap.

| Parte | Qué es |
|---|---|
| `pacing/js/track.js` | Lectura de GPX/FIT, suavizado de altitud, subidas y modelo físico (potencia ↔ velocidad) |
| `pacing/js/pacing.js` | Tramos, reparto de potencia por IF objetivo, nutrición, frescura y texto |
| `pacing/js/app.js` | Interfaz (inicio, ruta, mapa) |
| `scripts/gran-fondo-ejemplo.mjs` | Genera la ruta de ejemplo (sintética, ~200 km con tres puertos) |

**Límites conocidos:** los vatios salen de un modelo físico propio (masa, CdA, rodadura) y de reglas de reparto, no de datos medidos; el TSS y la frescura son estimaciones. CTL y ATL se introducen a mano: aún no hay conexión con Strava.

## Probar
```bash
node --test tests/*.test.mjs        # reglas del motor
cd pacing && python3 -m http.server 8000   # http://localhost:8000
```
