import type { CollectionEntry } from "astro:content";
import { Component, createEffect, createSignal, For, onMount } from "solid-js";
import Article from "./Article";

type ArticleCollectionEntry = CollectionEntry<"articles">["data"] & {
    slug: string;
};

interface Props {
    articles: ArticleCollectionEntry[];
}

const ArticleList: Component<Props> = (props) => {
    const [articles, setArticles] = createSignal(props.articles);

    setArticles(
        props.articles.sort((a, b) => b.lastmod.getTime() - a.lastmod.getTime())
    );

    return (
        <>
            <For
                each={articles().sort(
                    (a, b) => b.publish.getTime() - a.publish.getTime()
                )}
            >
                {(article) => {
                    return (
                        <div>
                            <a href={`/articles/${article.slug}`}>
                                {article.title +
                                    " - " +
                                    new Intl.DateTimeFormat(["en-GB"]).format(
                                        article.publish
                                    )}
                            </a>
                        </div>
                    );
                }}
            </For>
        </>
    );
};

export default ArticleList;
