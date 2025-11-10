// GL Inventory – PWA SW v5
const CACHE = 'gl-inventory-pwa-v5';

const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest?v=5',
  './icons/icon-72.png?v=5',
  './icons/icon-96.png?v=5',
  './icons/icon-128.png?v=5',
  './icons/icon-144.png?v=5',
  './icons/icon-152.png?v=5',
  './icons/icon-192.png?v=5',
  './icons/icon-384.png?v=5',
  './icons/icon-512.png?v=5',
  './icons/maskable-512.png?v=5'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(keys =>
        Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
      ),
      self.clients.claim()
    ])
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(cached => cached || fetch(event.request))
  );
});
