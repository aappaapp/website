import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
    appType: "mpa",
    build: {
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, "index.html"),
                redirect: path.resolve(__dirname, "redirect.html"),
            },
        },
    },
});
