import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import mdx from "@astrojs/mdx";
import { readFileSync } from "fs";

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
                    page.startsWith("https://adenpun.ml/redirect/")
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
