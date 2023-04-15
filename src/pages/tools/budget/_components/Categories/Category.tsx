import type { Category as CategoryType } from "@adenpun2000/budget";
import { Component, createSignal } from "solid-js";
import { styled } from "solid-styled-components";
import { CategoryEditor } from "./CategoryEditor";
import { getCurrentMonth, saveDataBudget } from "../states";

type Props = CategoryType;

const StyledCategory = styled.div`
    background-color: #222222;
    display: flex;
    padding: 10px;

    cursor: pointer;

    &:hover {
        background-color: #111111;
    }
`;

export const Category: Component<Props> = (props) => {
    const [show, setShow] = createSignal(false);
    return (
        <>
            <StyledCategory>
                <span
                    class="material-symbols-outlined handle"
                    style={{ "flex-grow": 0 }}
                >
                    drag_handle
                </span>
                <span onClick={() => setShow(true)} style={{ "flex-grow": 1 }}>
                    {props.name}
                </span>
                <span onClick={() => setShow(true)} style={{ "flex-grow": 0 }}>
                    {saveDataBudget.getAvailable(props.id, getCurrentMonth())}
                </span>
                <span
                    class="material-symbols-outlined handle"
                    onClick={() => saveDataBudget.deleteCategory(props.id)}
                    style={{ "flex-grow": 0 }}
                >
                    delete
                </span>
            </StyledCategory>
            <CategoryEditor
                category={props}
                onClose={() => setShow(false)}
                opened={show()}
            />
        </>
    );
};
