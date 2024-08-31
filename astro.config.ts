import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  site: "https://adenpun.net",
  integrations: [tailwind(), sitemap()],
  adapter: netlify(),
  server: {
    port: 3000,
  },
});
