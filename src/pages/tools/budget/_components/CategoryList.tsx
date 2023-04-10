import { Component, For } from "solid-js";
import { NewCategoryGroup } from "./NewCategoryGroup";
import { saveData } from "./states";
import { CategoryGroup } from "./CategoryGroup";

interface Props {}

export const CategoryList: Component<Props> = (props) => {
    return (
        <>
            <NewCategoryGroup />
            <For each={saveData.categories}>
                {(v) => {
                    return <CategoryGroup {...v} />;
                }}
            </For>
        </>
    );
};
