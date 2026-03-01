const CACHE_NAME = 'projectfolk-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/data.js',
    '/scenario_bg.jpg',
    '/tiles/media__1772161251695.jpg',
    '/tiles/media__1772161251826.jpg',
    '/tiles/media__1772161251891.jpg',
    '/tiles/media__1772161251933.jpg',
    '/tiles/media__1772161251948.jpg',
];

// Instalação: faz cache dos assets principais
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

// Ativação: remove caches antigos
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

// Fetch: serve do cache, cai no network se não encontrar
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
});
