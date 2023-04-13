import type { Category as CategoryType } from "@adenpun2000/budget";
import { Component, createSignal } from "solid-js";
import { styled } from "solid-styled-components";
import { CategoryEditor } from "./CategoryEditor";
import { FlexSpan } from "../FlexSpan";
import { saveDataBudget } from "../states";

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
                <FlexSpan class="material-symbols-outlined handle">
                    drag_handle
                </FlexSpan>
                <FlexSpan flexGrow={1} onClick={() => setShow(true)}>
                    {props.name}
                </FlexSpan>
                <FlexSpan
                    class="material-symbols-outlined handle"
                    onClick={() => saveDataBudget.deleteCategory(props.id)}
                >
                    delete
                </FlexSpan>
            </StyledCategory>
            <CategoryEditor
                onClose={() => setShow(false)}
                opened={show()}
                category={props}
            />
        </>
    );
};
