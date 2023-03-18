import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
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
        solidJs(),
    ],
    site: "https://adenpun.ml/",
    server: {
        port: 8080,
    },
});
