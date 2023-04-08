import { Component, For } from "solid-js";
import { NewCategoryGroupButton } from "./NewCategoryGroupButton";
import { saveData } from "./states";
import { CategoryGroup } from "./CategoryGroup";

interface Props {}

export const CategoryList: Component<Props> = (props) => {
    return (
        <>
            <NewCategoryGroupButton />
            <For each={saveData.categories}>
                {(v) => {
                    return <CategoryGroup {...v} />;
                }}
            </For>
        </>
    );
};
