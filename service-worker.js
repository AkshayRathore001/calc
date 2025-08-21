self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("tubewell-cache").then(cache => {
      return cache.addAll(["./tubewell.html", "./manifest.json"]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
