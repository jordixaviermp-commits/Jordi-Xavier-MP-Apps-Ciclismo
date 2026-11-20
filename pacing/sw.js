// Service worker: permite instalar la app y abrirla sin cobertura. Primero la red, y si no hay, la copia guardada.
const CACHE = 'pacing-v1';
const SHELL = ['./', 'index.html', 'css/pacing.css', 'js/app.js', 'js/pacing.js', 'js/track.js', 'manifest.webmanifest', 'icon.svg',
  'vendor/leaflet-1.9.4/leaflet.js', 'vendor/leaflet-1.9.4/leaflet.css', 'ejemplo.gpx'];
self.addEventListener('install', (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', (e) => e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then((res) => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); }
    return res;
  }).catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match('index.html'))));
});
