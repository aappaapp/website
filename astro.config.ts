import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import { defineConfig } from "astro/config";

const SITEMAP_EXCLUDE: string[] = [];
const SITE = "https://adenpun.ml/";

// https://astro.build/config
export default defineConfig({
    integrations: [
        // @ts-ignore
        mdx(),
        sitemap({
            filter: (page) => {
                return !(
                    SITEMAP_EXCLUDE.includes(page) ||
                    page.startsWith(`${SITE}redirect/`)
                );
            },
        }),
        solidJs(),
    ],
    site: SITE,
    server: {
        port: 8080,
    },
});
