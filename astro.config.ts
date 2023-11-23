import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import compressor from "astro-compressor";
import robotsTxt from "astro-robots-txt";
import { type AstroUserConfig, defineConfig } from "astro/config";
import redirectData from "./src/data/redirect.json";

const redirects: AstroUserConfig["redirects"] = {};
for (const key in redirectData) {
    redirects[key] = {
        destination: redirectData[key as keyof typeof redirectData],
        status: 307,
    };
}

console.log(redirects);

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
            applyBaseStyles: false,
        }),
        sitemap({
            filter: (page) => {
                return !SITEMAP_EXCLUDE.includes(page);
            },
        }),
        robotsTxt(),
        compressor(),
    ],
    output: "server",
    redirects,
    prefetch: {
        prefetchAll: true,
    },
    server: {
        headers: {
            "Cross-Origin-Opener-Policy": "same-origin",
            "Cross-Origin-Embedder-Policy": "require-corp",
        },
        port: 3000,
    },
    site: SITE,
});
