import { defineConfig } from "vite";
import path from "node:path";
export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, "index.html"),
                redirect: path.resolve(__dirname, "redirect.html"),
                google: path.resolve(__dirname, "googled8bbdd240cc20c5d.html"),
            },
        },
    },
});
