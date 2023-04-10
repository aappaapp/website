import {
    Budget,
    CategoryGroup as CategoryGroupType,
} from "@adenpun2000/budget";
import { Component, For, Show } from "solid-js";
import Sortable from "sortablejs";
import { arrayMoveMutable } from "array-move";
import { saveData } from "../states";

type Props = CategoryGroupType;

export const CategoryGroup: Component<Props> = (props) => {
    return (
        <>
            <div
                class="category-group"
                ref={(el) => {
                    Sortable.create(el, {
                        animation: 150,
                        onEnd(event) {
                            arrayMoveMutable(
                                Budget.fromJSON(saveData).getCategoryGroup(
                                    props.id
                                )?.categories ?? [],
                                event.oldIndex ?? 0,
                                event.newIndex ?? 0
                            );
                        },
                    });
                }}
            >
                {props.name}
                <Show when={true}>
                    <For each={props.categories}>
                        {(c) => {
                            return <div>{c.name}</div>;
                        }}
                    </For>
                </Show>
            </div>
        </>
    );
};
