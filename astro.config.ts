import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  site: "https://adenpun.net",
  integrations: [tailwind(), sitemap()],
  adapter: node({
    mode: "standalone",
  }),
  server: {
    port: 3000,
  },
});
