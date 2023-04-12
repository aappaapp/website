import type { Component } from "solid-js";
import { currentMonth, saveDataBudget } from "./states";

interface Props {}

export const Stats: Component<Props> = (props) => {
    const [getCurrentMonth] = currentMonth;
    return (
        <div>
            <div>Balance: {saveDataBudget.getBalance()}</div>
            <div>
                Ready to assign:{" "}
                {saveDataBudget.getAvailable(getCurrentMonth() ?? undefined)}
            </div>
        </div>
    );
};
