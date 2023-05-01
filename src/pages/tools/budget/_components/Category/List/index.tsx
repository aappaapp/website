import { arrayMoveMutable } from "array-move";
import { Component, For } from "solid-js";
import Sortable from "sortablejs";
import { ReadyToAssign } from "../../ReadyToAssign";
import { saveData } from "../../states";
import { CategoryGroup } from "./ItemGroup";
import { NewCategoryGroup } from "../NewCategoryGroup";

interface Props {}

export const CategoryList: Component<Props> = (props) => {
    return (
        <>
            <ReadyToAssign />
            <NewCategoryGroup />
            <div
                ref={(el) => {
                    Sortable.create(el, {
                        animation: 150,
                        group: "categoryGroup",
                        handle: ".handle",
                        onEnd(event) {
                            arrayMoveMutable(
                                saveData.categoryGroups,
                                event.oldIndex ?? 0,
                                event.newIndex ?? 0
                            );
                        },
                    });
                }}
            >
                <For each={saveData.categoryGroups}>
                    {(v) => {
                        return <CategoryGroup {...v} />;
                    }}
                </For>
            </div>
        </>
    );
};
