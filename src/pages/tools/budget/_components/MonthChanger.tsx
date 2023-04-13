import { NextMonth, PreviousMonth } from "@adenpun2000/budget";
import type { Component } from "solid-js";
import { currentMonth } from "./states";

interface Props {}

export const MonthChanger: Component<Props> = (props) => {
    const [month, setMonth] = currentMonth;
    return (
        <div style={{ "align-items": "center", display: "flex" }}>
            <button
                class="material-symbols-outlined"
                onClick={() => {
                    setMonth(PreviousMonth(month()!));
                }}
            >
                navigate_before
            </button>
            <span>{month()}</span>
            <button
                class="material-symbols-outlined"
                onClick={() => {
                    setMonth(NextMonth(month()!));
                }}
            >
                navigate_next
            </button>
        </div>
    );
};
