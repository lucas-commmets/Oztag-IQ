
const CACHE_NAME = 'oztagiq-v1';

const FILES_TO_CACHE = [
  '/Oztag-IQ/',
  '/Oztag-IQ/index.html',
  '/Oztag-IQ/style.css',
  '/Oztag-IQ/manifest.json',
  '/Oztag-IQ/icon-192.png',
  '/Oztag-IQ/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});


self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});