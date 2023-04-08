import type { Component } from "solid-js";
import { saveData } from "./states";
import { Budget } from "@adenpun2000/budget";

interface Props {}

export const NewCategoryGroupButton: Component<Props> = (props) => {
    let text: HTMLInputElement | undefined;

    return (
        <>
            <input type="text" ref={text} />
            <button
                onClick={() => {
                    let a = Budget.fromJSON(saveData);
                    a.addCategoryGroup(text?.value ?? "");
                }}
            >
                New Group
            </button>
        </>
    );
};
