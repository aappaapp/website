<script lang="ts">
    import type { CollectionEntry } from "astro:content";

    type ArticleCollectionEntry = CollectionEntry<"articles">["data"] & {
        slug: string;
    };

    export let articles: ArticleCollectionEntry[];

    $: sortedArticles = articles.sort(
        (a, b) => b.publish.getTime() - a.publish.getTime()
    );
</script>

{#each sortedArticles as article}
    <div>
        <a href={`/articles/${article.slug}`}>
            {article.title +
                " - " +
                new Intl.DateTimeFormat(["en-GB"]).format(article.publish)}
        </a>
    </div>
{/each}
