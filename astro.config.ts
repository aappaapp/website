import mdx from "@astrojs/mdx";
import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";
import { defineConfig } from "astro/config";
import redirects from "./src/data/redirect.json";

const SITEMAP_EXCLUDE: string[] = [];
const SITE = "https://adenpun.ml/";

// https://astro.build/config
export default defineConfig({
    adapter: netlify(),
    experimental: {
        redirects: true,
    },
    integrations: [
        compress({
            image: false,
        }),
        mdx(),
        sitemap({
            filter: (page) => {
                return !(
                    SITEMAP_EXCLUDE.includes(page) ||
                    page.startsWith(`${SITE}redirect/`)
                );
            },
        }),
        svelte(),
        tailwind({
            config: {
                applyBaseStyles: false,
            },
        }),
    ],
    output: "hybrid",
    redirects,
    server: {
        port: 8080,
    },
    site: SITE,
});
