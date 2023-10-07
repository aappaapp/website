import type { APIRoute } from "astro";

const comments: string[] = [];

export const GET: APIRoute = async ({ url }) => {
    const comment = url.searchParams.get("comment");
    const clear = url.searchParams.get("clear");
    if (clear != null) {
        comments.splice(0);
    }
    if (comment != null) {
        comments.unshift(comment);
    }
    return new Response(JSON.stringify(comments, null, 2));
};
