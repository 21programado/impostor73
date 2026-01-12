const CACHE_NAME = "impostor-v3";
const FILES_TO_CACHE = [
  "/el-impostor/",
  "/el-impostor/index.html",
  "/el-impostor/manifest.json",
  "/el-impostor/icon-192.png",
  "/el-impostor/icon-512.png"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(r => r || fetch(event.request))
  );
});
