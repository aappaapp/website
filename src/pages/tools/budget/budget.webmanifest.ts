export async function get() {
    return {
        body: JSON.stringify({
            name: "Budget",
            short_name: "Budget",
            description: "a useless personal finances library thing",
            icons: [
                {
                    src: "/favicon.ico",
                    sizes: "256x256",
                    type: "image/png",
                },
            ],
            start_url: "/tools/budget/index.html",
            display: "standalone",
            theme_color: "#000000",
            background_color: "#111111",
        }),
    };
}
