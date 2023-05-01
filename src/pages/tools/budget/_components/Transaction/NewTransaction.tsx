import type {
    Budget,
    TransactOptions,
    Transaction,
    z,
} from "@adenpun2000/budget";
import { Component, For, Show, createSignal } from "solid-js";
import { createMutable, createStore } from "solid-js/store";
import { saveData, saveDataBudget } from "../states";

interface Props {
    account: string;
}

export const NewTransaction: Component<Props> = (props) => {
    const DEFAULT: () => z.infer<typeof TransactOptions> = () => ({
        account: props.account,
        amount: 0,
        categoryId: "",
        description: "",
        type: "outflow",
    });

    // @ts-ignore
    globalThis.DEF = DEFAULT;

    const store = createMutable<z.infer<typeof TransactOptions>>(DEFAULT());

    return (
        <div style={{ display: "flex" }}>
            <input
                onChange={(e) => (store.description = e.target.value)}
                placeholder="Enter description..."
                type="text"
            />
            <select onChange={(e) => (store.type = e.target.value as any)}>
                <option value="outflow">Outflow</option>
                <option value="inflow">Inflow</option>
            </select>
            <Show when={store.type === "outflow"}>
                <select
                    onChange={(e) =>
                        store.type === "outflow"
                            ? (store.categoryId = e.target.value)
                            : undefined
                    }
                    value={
                        store.type === "outflow" ? store.categoryId : undefined
                    }
                >
                    <For each={saveData.categoryGroups}>
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
                onChange={(e) => (store.amount = parseFloat(e.target.value))}
                placeholder="Enter amount..."
                type="number"
                value={store.amount}
            />
            <button
                class="material-symbols-outlined"
                onClick={() => {
                    if (store.type === "inflow")
                        saveDataBudget.transact({
                            account: props.account,
                            amount: store.amount,
                            description: store.description,
                            type: store.type,
                        });
                    else if (store.type === "outflow")
                        saveDataBudget.transact({
                            account: props.account,
                            amount: store.amount,
                            categoryId: store.categoryId,
                            description: store.description,
                            type: store.type,
                        });
                }}
            >
                add_circle
            </button>
        </div>
    );
};
