import type { CategoryGroup as CategoryGroupType } from "@adenpun2000/budget";
import { arrayMoveMutable } from "array-move";
import { Component, For, Show, createSignal } from "solid-js";
import Sortable from "sortablejs";
import { saveDataBudget } from "../../states";
import { styled } from "solid-styled-components";
import { Category } from "./ItemGroupItem";
import { NewCategory } from "../NewCategory";

type Props = CategoryGroupType;

const StyledCategoryGroup = styled.div`
    background-color: #222222;
    display: block;
    padding: 10px;

    cursor: pointer;

    &:hover {
        background-color: #111111;
    }
`;

const StyledCategoryGroupTitle = styled.div`
    display: flex;
`;

const StyledList = styled.div`
    padding: 10px;
`;

export const CategoryGroup: Component<Props> = (props) => {
    const [show, setShow] = createSignal(false);

    return (
        <>
            <StyledCategoryGroup>
                <StyledCategoryGroupTitle>
                    <span
                        class="material-symbols-outlined handle"
                        style={{ "flex-grow": 0 }}
                    >
                        drag_handle
                    </span>
                    <span
                        class="material-symbols-outlined"
                        onClick={() => {
                            setShow(!show());
                        }}
                        style={{ "flex-grow": 0 }}
                    >
                        {show() ? "expand_more" : "chevron_right"}
                    </span>
                    <span style={{ "flex-grow": 1 }}>{props.name}</span>
                    <span
                        class="material-symbols-outlined"
                        onClick={() => {
                            let name = window.prompt("Name");
                            if (name !== null)
                                saveDataBudget.addCategory(props.id, name);
                        }}
                        style={{ "flex-grow": 0 }}
                    >
                        add_circle
                    </span>
                </StyledCategoryGroupTitle>
                <Show when={show()}>
                    <StyledList
                        ref={(el) => {
                            Sortable.create(el, {
                                animation: 150,
                                group: "category",
                                handle: ".handle",
                                onEnd(event) {
                                    arrayMoveMutable(
                                        saveDataBudget.getCategoryGroup(
                                            props.id
                                        )?.categories ?? [],
                                        event.oldIndex ?? 0,
                                        event.newIndex ?? 0
                                    );
                                },
                            });
                        }}
                    >
                        <NewCategory categoryGroup={props.id} />
                        <For each={props.categories}>
                            {(c) => {
                                return <Category {...c} />;
                            }}
                        </For>
                    </StyledList>
                </Show>
            </StyledCategoryGroup>
        </>
    );
};
