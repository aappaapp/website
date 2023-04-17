self.importScripts("./cache.js");

self.addEventListener("install", (event) => {
    const contentToCache = [
        "/tools/budget/income/index.html",
        "/tools/budget/settings/index.html",
        "/tools/budget/transactions/index.html",
        "/tools/budget/budget.webmanifest",
        "/tools/budget/index.html",
        "/favicon.ico",
    ];

    self.skipWaiting();

    event.waitUntil(
        (async () => {
            try {
                const cache = await caches.open(self.cacheName);

                await Promise.all(
                    self.contentToCache.map(async (url) => {
                        let controller;

                        try {
                            controller = new AbortController();
                            const { signal } = controller;
                            const req = new Request(url, { cache: "reload" });
                            const res = await fetch(req, { signal });

                            if (res && res.status === 200)
                                await cache.put(req, res.clone());
                        } catch (e) {
                            controller.abort();
                        }
                    })
                );
            } catch {}
        })()
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        (async () => {
            try {
                const response = await fetch(e.request);
                const cache = await caches.open(self.cacheName);
                cache.put(e.request, response.clone());
                return response;
            } catch {
                const r = await caches.match(e.request);
                if (typeof r !== "undefined") return r;
            }
        })()
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            const cacheNames = await caches.keys();

            await Promise.all(
                cacheNames.map(async (cacheName) => {
                    if (cacheName !== self.cacheName) {
                        await caches.delete(cacheName);
                    }
                })
            );
        })()
    );
});
