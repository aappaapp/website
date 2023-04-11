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
