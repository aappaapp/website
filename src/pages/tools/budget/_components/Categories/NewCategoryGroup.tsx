import type { Component } from "solid-js";
import { saveDataBudget } from "../states";

interface Props {}

export const NewCategoryGroup: Component<Props> = (props) => {
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
                        saveDataBudget.addCategoryGroup(text?.value ?? "");
                        text.value = "";
                    }
                }}
            >
                add_circle
            </button>
        </div>
    );
};
