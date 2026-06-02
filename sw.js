const CACHE_NAME = 'oztagiq-v2';

const FILES_TO_CACHE = [
  '/Oztag-IQ/',
  '/Oztag-IQ/index.html',
  '/Oztag-IQ/style.css',
  '/Oztag-IQ/manifest.json',
  '/Oztag-IQ/icon-192.png',
  '/Oztag-IQ/icon-512.png'
];

// Install — cache files
self.addEventListener('install', event => {
  self.skipWaiting(); // activate immediately, don't wait
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

// Activate — delete OLD caches so nobody gets stale files
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim()) // take control of all open tabs immediately
  );
});

// Fetch — network first, fall back to cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Update cache with fresh copy
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request)) // offline fallback
  );
});
