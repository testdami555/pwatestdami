var urls = ["/","favicon.png","logo.png","index.css"];

self.addEventListener("install", function(event) {    
    event.waitUntil(caches.open("myAppCache").then(function(cache) {
        return cache.addAll(urls);
    }));
});

//Ejemplo con Stale while revalidate.
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                var fetchPromise = fetch(event.request).then(
                    function(networkResponse) {
                        caches.open("myAppCache").then(function(cache) {                       
                            cache.put(event.request, networkResponse.clone());
                            return networkResponse;
                        });
                    });
                return response || fetchPromise;
            })
        );
    });