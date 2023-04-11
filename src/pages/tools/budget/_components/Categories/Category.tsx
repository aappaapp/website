import type { Category as CategoryType } from "@adenpun2000/budget";
import { Component, createSignal } from "solid-js";
import { styled } from "solid-styled-components";
import { CategoryEditor } from "./CategoryEditor";

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
                <span
                    class="material-symbols-outlined handle"
                    style={{
                        flex: "0 0 auto",
                        "font-size": "24px",
                    }}
                >
                    drag_handle
                </span>
                {props.name}
            </StyledCategory>
            <CategoryEditor
                onClose={() => setShow(false)}
                opened={show()}
                category={props}
            />
        </>
    );
};