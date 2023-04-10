import type { Component } from "solid-js";
import { saveData } from "../states";
import { Budget } from "@adenpun2000/budget";

interface Props {}

export const NewCategoryGroup: Component<Props> = (props) => {
    let text: HTMLInputElement | undefined;

    return (
        <>
            <input type="text" placeholder="Enter the name..." ref={text} />
            <button
                onClick={() => {
                    if (typeof text?.value !== "undefined") {
                        let a = Budget.fromJSON(saveData);
                        a.addCategoryGroup(text?.value ?? "");
                        text.value = "";
                    }
                }}
            >
                New Group
            </button>
        </>
    );
};
