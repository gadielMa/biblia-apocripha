const CACHE = 'biblia-universal-v80';
const APP_SHELL = [
  './',
  './index.html',
  './seccion.html',
  './section-page.css',
  './scripts/section-page.mjs',
  './icon.svg',
  './manifest.webmanifest'
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
          cache.put(event.request, response.clone());
        }
        return response;
      }).catch(() => caches.match(event.request).then(hit => hit || caches.match('./index.html')))
    );
    return;
  }
  const isSectionResource = url.origin === self.location.origin && (
    url.pathname.includes('/secciones/') ||
    url.pathname.includes('/assets/piedras-ica/') ||
    url.pathname.includes('/assets/nefilim/') ||
    url.pathname.includes('/assets/paralelismos/') ||
    url.pathname.includes('/assets/objetos-seres/') ||
    url.pathname.endsWith('/scripts/section-page.mjs') ||
    url.pathname.endsWith('/timeline-page.mjs') ||
    url.pathname.endsWith('/genealogy-page.mjs') ||
    url.pathname.endsWith('/catalog-page.mjs') ||
    url.pathname.endsWith('/dragones-page.mjs') ||
    url.pathname.endsWith('/Bel-y-el-Dragon.txt') ||
    url.pathname.endsWith('/daniel-mata-dragon.jpg') ||
    url.pathname.endsWith('/data.json')
  );
  if (isSectionResource) {
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
