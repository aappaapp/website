/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    darkMode: "class",
    plugins: [],
    theme: {
        extend: {
            colors: {},
            fontFamily: { sans: ["Noto Sans TC"] },
        },
    },
};
