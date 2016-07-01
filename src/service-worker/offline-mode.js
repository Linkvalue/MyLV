/* global caches, self, fetch */

const cacheName = 'cracra'

self.addEventListener('install', (e) => e.waitUntil(caches.open(cacheName)))

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then((cacheResponse) => {
        return fetch(e.request.clone())
          .then(function (response) {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return cacheResponse || response
            }

            caches.open(cacheName)
              .then((cache) => cache.put(e.request, response.clone()))

            return response
          })
      })
  )
})
