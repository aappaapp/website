/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    darkMode: "class",
    plugins: [],
    theme: {
        extend: {
            animation:{
                marquee:"marquee 10s linear infinite"
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(100%)' },
                }
            },
            colors: {},
            fontFamily: { sans: ["Noto Sans TC"] },
        },
    },
};
