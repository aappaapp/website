import { Component, For, createSignal } from "solid-js";
import { NewTransaction } from "../NewTransaction";
import { saveData, saveDataBudget } from "../../states";
import { TransactionListItem } from "./Item";
import { NewAccount } from "../NewAccount";

export const TransactionList: Component = () => {
    const [currentAccount, setCurrentAccount] = createSignal<string>("all");

    return (
        <>
            <select
                onChange={(e) => {
                    setCurrentAccount(e.target.value);
                }}
            >
                <option value="all">--All--</option>
                <For each={saveData.accounts}>
                    {(v) => {
                        return <option value={v.id}>{v.name}</option>;
                    }}
                </For>
            </select>
            {/* <NewAccount /> */}
            <NewTransaction account={currentAccount()} />
            <For
                each={saveDataBudget
                    .getTransactions(
                        currentAccount() === "all"
                            ? undefined
                            : currentAccount()
                    )
                    .sort((a, b) => b.date - a.date)}
            >
                {(v) => {
                    return <TransactionListItem {...v} />;
                }}
            </For>
        </>
    );
};
