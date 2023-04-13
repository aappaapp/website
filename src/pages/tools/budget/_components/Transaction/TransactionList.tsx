import { Component, For } from "solid-js";
import { NewTransaction } from "./NewTransaction";
import { saveData } from "../states";
import { Transaction } from "./Transaction";

export const TransactionList: Component = () => {
    return (
        <>
            <NewTransaction />
            <For each={saveData.transactions.sort((a, b) => b.date - a.date)}>
                {(v) => {
                    return <Transaction {...v} />;
                }}
            </For>
        </>
    );
};
