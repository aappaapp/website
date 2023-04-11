import type { Component } from "solid-js";
import { styled } from "solid-styled-components";

interface Props {
    title: string;
    href: string;
    lastmod: Date;
    // children: any;
}

// const StyledAnchor = styled.a`
//     display: block;
//     padding: 10px;

//     &:hover {
//         background-color: #333333;
//     }
// `;

const Article: Component<Props> = (props) => {
    console.log(props.title);
    return (
        <a href={props.href}>
            <article>
                {props.title}
                {/* {} */}
            </article>
        </a>
    );
};

export default Article;
