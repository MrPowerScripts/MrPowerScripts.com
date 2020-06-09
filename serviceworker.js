//https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook

const cacheName = 'serviceCache'

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(
        []
      );
    })
  );
});

self.addEventListener('activate', function(event) {
  var cacheKeeplist = ['serviceCache'];

  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (cacheKeeplist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') { return }

  if (
    event.request.url.includes('amazon-adsystem') ||
    event.request.url.includes('browser-sync') ||
    event.request.url.includes('media-amazon') ||
    event.request.url.includes('cloudflare-static') ||
    event.request.url.includes('google-analytics') ) {
    return false;
  }

  event.respondWith(
    caches.open(cacheName).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
