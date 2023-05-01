import type { Component } from "solid-js";
import { saveDataBudget } from "../states";

export const NewAccount: Component = () => {
    let name: HTMLInputElement | undefined;
    return (
        <div style={{ display: "flex" }}>
            <input
                placeholder="Enter new account name..."
                ref={name}
                type="text"
            />
            <button
                onClick={() => {
                    if (typeof name?.value !== "undefined")
                        saveDataBudget.addAccount(name.value);
                }}
            >
                New Account
            </button>
        </div>
    );
};
