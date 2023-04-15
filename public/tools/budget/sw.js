self.addEventListener("install", (e) => {
    e.waitUntil(
        (async () => {
            const cache = await caches.open("budget");
            await cache.addAll([
                "/tools/budget/income/index.html",
                "/tools/budget/settings/index.html",
                "/tools/budget/transactions/index.html",
                "/tools/budget/budget.webmanifest",
                "/tools/budget/index.html",
                "/favicon.ico",
            ]);
        })()
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        (async () => {
            const r = await caches.match(e.request);
            if (typeof r !== "undefined") return r;
            const response = await fetch(e.request);
            const cache = await caches.open("budget");
            cache.put(e.request, response.clone());
            return response;
        })()
    );
});
