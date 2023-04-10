import { Component, For, onMount } from "solid-js";
import { NewCategoryGroup } from "./NewCategoryGroup";
import { saveData } from "../states";
import { CategoryGroup } from "./CategoryGroup";
import Sortable from "sortablejs";
import { arrayMoveMutable } from "array-move";
import { Budget } from "@adenpun2000/budget";

interface Props {}

export const CategoryList: Component<Props> = (props) => {
    return (
        <>
            <NewCategoryGroup />
            <div
                ref={(el) => {
                    Sortable.create(el, {
                        animation: 150,
                        group: "categoryGroup",
                        onEnd(event) {
                            arrayMoveMutable(
                                saveData.categories,
                                event.oldIndex ?? 0,
                                event.newIndex ?? 0
                            );
                        },
                    });
                }}
            >
                <For each={saveData.categories}>
                    {(v, i) => {
                        return <CategoryGroup {...v} />;
                    }}
                </For>
            </div>
        </>
    );
};
