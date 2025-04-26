import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://adenpun.net",
  integrations: [sitemap()],
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 3000,
    allowedHosts: ["prevent-promoting-avi-messenger.trycloudflare.com"],
  },
});
