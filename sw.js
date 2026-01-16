const CACHE_NAME = 'impostor-v3';
const ASSETS = [
  'index.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Usamos map para ver cuál falla individualmente en la consola
      return Promise.all(
        ASSETS.map(url => {
          return cache.add(url).catch(err => console.error('Fallo al cargar:', url, err));
        })
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
