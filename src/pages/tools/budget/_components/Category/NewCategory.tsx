import type { Component } from "solid-js";
import { saveDataBudget } from "../states";

interface Props {
    categoryGroup: string;
}

export const NewCategory: Component<Props> = (props) => {
    let text: HTMLInputElement | undefined;

    return (
        <div
            style={{
                display: "flex",
            }}
        >
            <input type="text" placeholder="Enter the name..." ref={text} />
            <button
                class="material-symbols-outlined"
                onClick={() => {
                    if (typeof text?.value !== "undefined") {
                        saveDataBudget.addCategory(
                            props.categoryGroup,
                            text?.value ?? ""
                        );
                        text.value = "";
                    }
                }}
            >
                add_circle
            </button>
        </div>
    );
};
