import type { Component } from "solid-js";

interface Props {
    title: string;
    href: string;
    lastmod: Date;
    // children: any;
}

const Article: Component<Props> = (props) => {
    return (
        <a href={props.href}>
            <article>
                {props.title + " "}-{" "}
                {new Intl.DateTimeFormat(["en-GB"]).format(props.lastmod)}
            </article>
        </a>
    );
};

export default Article;
