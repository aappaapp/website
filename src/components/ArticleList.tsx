import type { CollectionEntry } from "astro:content";
import { Component, createEffect, createSignal, For, onMount } from "solid-js";
import Article from "./Article";

interface Props {
    articles: CollectionEntry<"articles">[];
}

const ArticleList: Component<Props> = (props) => {
    const [articles, setArticles] = createSignal(props.articles);

    setArticles(
        props.articles.sort(
            (a, b) => a.data.lastmod.getTime() - b.data.lastmod.getTime()
        )
    );

    return (
        <>
            <For each={articles()}>
                {(article) => {
                    console.log(article);
                    return (
                        <Article
                            title={article.data.title}
                            href={article.slug}
                            lastmod={article.data.lastmod}
                        />
                    );
                }}
            </For>
        </>
    );
};

export default ArticleList;
