import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { svelteSitemap } from "svelte-sitemap/vite";

export default defineConfig({ plugins: [tailwindcss(), sveltekit(), svelteSitemap({ domain: "https://adenpun.net" })] });
