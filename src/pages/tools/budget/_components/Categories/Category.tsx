import type { Category as CategoryType } from "@adenpun2000/budget";
import { Component, createSignal } from "solid-js";
import { styled } from "solid-styled-components";
import { CategoryEditor } from "./CategoryEditor";
import { FlexSpan } from "../FlexSpan";

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
            <StyledCategory onClick={() => setShow(true)}>
                <FlexSpan
                    class="material-symbols-outlined handle"
                    style={{
                        "font-size": "24px",
                    }}
                >
                    drag_handle
                </FlexSpan>
                <FlexSpan flexGrow={1}>{props.name}</FlexSpan>
            </StyledCategory>
            <CategoryEditor
                onClose={() => setShow(false)}
                opened={show()}
                category={props}
            />
        </>
    );
};
