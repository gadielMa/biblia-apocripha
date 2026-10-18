const CACHE = 'biblia-universal-v32';
const APP_SHELL = [
  './',
  './index.html',
  './icon.svg',
  './manifest.webmanifest',
  './assets/fonts/inter-roman-latin.woff2',
  './assets/fonts/inter-italic-latin.woff2',
  './assets/israel-juda/reino-dividido.png',
  './secciones/abraham-jesus.html',
  './secciones/adan-jesus.html',
  './secciones/animales-extintos.html',
  './secciones/arbol-genealogico.html',
  './secciones/arca-noe.html',
  './secciones/ascendidos.html',
  './secciones/biblia-grecia.html',
  './secciones/calendario-jubileos.html',
  './secciones/campanas.html',
  './secciones/cara-de-dios.html',
  './secciones/catalogo.html',
  './secciones/diablos.html',
  './secciones/enoc.html',
  './secciones/gnosticismo.html',
  './secciones/infiernos.html',
  './secciones/inscripcion-frankfurt.html',
  './secciones/israel-juda.html',
  './secciones/judea.html',
  './secciones/linea-tiempo.html',
  './secciones/lugares-perdidos.html',
  './secciones/mesias.html',
  './secciones/pedro-traidor.html',
  './secciones/nacimiento-jesus.html',
  './secciones/objetos.html',
  './secciones/oraciones.html',
  './secciones/profecias.html',
  './secciones/sabana-santa.html'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).then(async response => {
        if (response.ok) {
          const cache = await caches.open(CACHE);
          cache.put('./index.html', response.clone());
        }
        return response;
      }).catch(() => caches.match(event.request).then(hit => hit || caches.match('./index.html')))
    );
    return;
  }
  if (url.origin === self.location.origin && url.pathname.includes('/textos/')) {
    event.respondWith(
      fetch(event.request).then(async response => {
        if (response.ok) {
          const cache = await caches.open(CACHE);
          cache.put(event.request, response.clone());
        }
        return response;
      }).catch(() => caches.match(event.request))
    );
    return;
  }
  event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request)));
});
