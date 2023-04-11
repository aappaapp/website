import { defineCollection, z } from "astro:content";

const articlesCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        lastmod: z.date(),
        publish: z.date(),
    }),
});

export const collections = {
    articles: articlesCollection,
};
