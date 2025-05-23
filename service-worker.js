const CACHE_NAME = 'horas-extras-v1';
const urlsToCache = [
  '/calculadora-horas-extras/',
  '/calculadora-horas-extras/index.html',
  '/calculadora-horas-extras/manifest.json',
  '/calculadora-horas-extras/icon-manifest-192x192.png',
  '/calculadora-horas-extras/icon-manifest-512x512.png'
];

// Instala o Service Worker e faz cache dos arquivos essenciais
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Ativa o Service Worker e remove caches antigos, se houver
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) =>
          key !== CACHE_NAME ? caches.delete(key) : null
        )
      )
    )
  );
});

// Intercepta requisições e tenta responder pelo cache primeiro
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
