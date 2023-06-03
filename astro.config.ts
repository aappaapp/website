import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
const SITEMAP_EXCLUDE: string[] = [];
const SITE = "https://adenpun.ml/";

// https://astro.build/config
export default defineConfig({
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
        tailwind({ config: { applyBaseStyles: false } }),
    ],
    server: {
        port: 8080,
    },
    site: SITE,
});
