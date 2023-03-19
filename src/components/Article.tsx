import type { Component } from "solid-js";

interface Props {
    title: string;
    href: string;
    lastmod: Date;
    // children: any;
}

const Article: Component<Props> = (props) => {
    return (
        <article>
            <a href={props.href}>
                {props.title} -{" "}
                {new Intl.DateTimeFormat(["en-GB"]).format(props.lastmod)}
            </a>
        </article>
    );
};

export default Article;
