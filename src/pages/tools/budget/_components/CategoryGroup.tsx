import type { CategoryGroup as CategoryGroupType } from "@adenpun2000/budget";
import { Component, For } from "solid-js";

type Props = CategoryGroupType;

export const CategoryGroup: Component<Props> = (props) => {
    return (
        <>
            <div>{props.name}</div>
            <For each={props.categories}>
                {(c) => {
                    return <>{c.name}</>;
                }}
            </For>
        </>
    );
};
