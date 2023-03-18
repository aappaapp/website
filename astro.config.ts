import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

const SITEMAP_EXCLUDE: string[] = [];

// https://astro.build/config
export default defineConfig({
    integrations: [
        sitemap({
            filter: (page) => {
                return !(
                    SITEMAP_EXCLUDE.includes(page) ||
                    page.startsWith("https://adenpun.ml/redirect/")
                );
            },
        }),
    ],
    site: "https://adenpun.ml/",
    server: {
        port: 8080,
    },
});
