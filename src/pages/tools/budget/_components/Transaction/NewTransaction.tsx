import type { Budget } from "@adenpun2000/budget";
import { Component, For, Show, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { saveData, saveDataBudget } from "../states";

type TransactOptions = Parameters<Budget["transact"]>[0];
export const NewTransaction: Component = () => {
    const DEFAULT: TransactOptions = {
        amount: 0,
        categoryId: "",
        description: "",
        type: "outflow",
    };

    // @ts-ignore
    globalThis.DEF = DEFAULT;

    const [store, setStore] = createStore<TransactOptions>(DEFAULT);

    return (
        <div style={{ display: "flex" }}>
            <input
                type="text"
                placeholder="Enter description..."
                onChange={(e) => setStore("description", e.target.value)}
            />
            <select onChange={(e) => setStore("type", e.target.value as any)}>
                <option value="outflow">Outflow</option>
                <option value="inflow">Inflow</option>
            </select>
            <Show when={store.type === "outflow"}>
                <select
                    value={
                        store.type === "outflow" ? store.categoryId : undefined
                    }
                    onChange={(e) =>
                        setStore("categoryId" as any, e.target.value)
                    }
                >
                    <For each={saveData.categories}>
                        {(v) => {
                            return (
                                <optgroup label={v.name}>
                                    <For each={v.categories}>
                                        {(v) => {
                                            return (
                                                <option value={v.id}>
                                                    {v.name}
                                                </option>
                                            );
                                        }}
                                    </For>
                                </optgroup>
                            );
                        }}
                    </For>
                </select>
            </Show>
            <input
                type="number"
                value={store.amount}
                onChange={(e) => setStore("amount", parseFloat(e.target.value))}
                placeholder="Enter amount..."
            />
            <button
                class="material-symbols-outlined"
                onClick={() => {
                    if (store.type === "inflow")
                        saveDataBudget.transact({
                            amount: store.amount,
                            description: store.description,
                            type: store.type,
                        });
                    else if (store.type === "outflow")
                        saveDataBudget.transact({
                            amount: store.amount,
                            categoryId: store.categoryId,
                            description: store.description,
                            type: store.type,
                        });
                    setStore(DEFAULT);
                }}
            >
                add_circle
            </button>
        </div>
    );
};
