import { Component, createSignal, For } from "solid-js";
// import data from "@/data/"
import * as Astro from "astro";

const BlogList: Component = () => {
    // createSignal();
    return (
        <For each={items} fallback={<div>No items</div>}>
            {(item, index) => <div>{item}</div>}
        </For>
    );
};

export default BlogList;
