import type { CategoryGroup as CategoryGroupType } from "@adenpun2000/budget";
import { arrayMoveMutable } from "array-move";
import { Component, For, Show, createSignal } from "solid-js";
import Sortable from "sortablejs";
import { saveDataBudget } from "../states";
import { styled } from "solid-styled-components";

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

export const CategoryGroup: Component<Props> = (props) => {
    const [show, setShow] = createSignal(false);
    const [showAdd, setShowAdd] = createSignal(false);

    return (
        <>
            <StyledCategoryGroup>
                <div
                    onClick={() => {
                        setShow(!show());
                    }}
                    onMouseEnter={() => {
                        setShowAdd(true);
                    }}
                    onMouseLeave={() => {
                        setShowAdd(false);
                    }}
                >
                    {props.name}
                    {showAdd() ? (
                        <span
                            class="material-symbols-outlined"
                            onClick={() => {
                                let name = window.prompt("Name");
                                if (name !== null)
                                    saveDataBudget.addCategory(props.id, name);
                            }}
                        >
                            add_circle
                        </span>
                    ) : undefined}
                </div>
                <Show when={show()}>
                    <div
                        ref={(el) => {
                            Sortable.create(el, {
                                animation: 150,
                                group: "category",
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
                        <For each={props.categories}>
                            {(c) => {
                                return <div>{c.name}</div>;
                            }}
                        </For>
                    </div>
                </Show>
            </StyledCategoryGroup>
        </>
    );
};
