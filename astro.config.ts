import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import compressor from "astro-compressor";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";
import redirects from "./src/data/redirect.json";

const SITEMAP_EXCLUDE: string[] = [];
const SITE = "https://adenpun.net/";

// https://astro.build/config
export default defineConfig({
    adapter: node({
        mode: "standalone",
    }),
    integrations: [
        svelte(),
        mdx(),
        tailwind({
            applyBaseStyles: true,
        }),
        sitemap({
            filter: (page) => {
                return !(
                    SITEMAP_EXCLUDE.includes(page) ||
                    page.startsWith(`${SITE}redirect/`)
                );
            },
        }),
        robotsTxt(),
        compressor(),
    ],
    output: "server",
    redirects,
    server: {
        port: 3000,
    },
    site: SITE,
});
