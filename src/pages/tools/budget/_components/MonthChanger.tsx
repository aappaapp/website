import { NextMonth, PreviousMonth } from "@adenpun2000/budget";
import type { Component } from "solid-js";
import { currentMonth, getCurrentMonth } from "./states";

interface Props {}

export const MonthChanger: Component<Props> = (props) => {
    const [_, setMonth] = currentMonth;
    return (
        <div style={{ "align-items": "center", display: "flex" }}>
            <button
                class="material-symbols-outlined"
                onClick={() => {
                    setMonth(PreviousMonth(getCurrentMonth()!));
                }}
            >
                navigate_before
            </button>
            <span>{getCurrentMonth()}</span>
            <button
                class="material-symbols-outlined"
                onClick={() => {
                    setMonth(NextMonth(getCurrentMonth()!));
                }}
            >
                navigate_next
            </button>
        </div>
    );
};
