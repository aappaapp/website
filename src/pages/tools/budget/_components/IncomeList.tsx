import { Component, For } from "solid-js";
import { saveData } from "./states";

interface Props {}

export const IncomeList: Component<Props> = (props) => {
    const [getSaveData, setSaveData] = saveData;

    console.log(setSaveData);

    return (
        <>
            <button
                onClick={() => {
                    let a = getSaveData();
                    a.addCategoryGroup("A");
                    setSaveData(a);
                }}
            >
                Add
            </button>
            <For each={getSaveData().toJSON().categories}>
                {(v) => {
                    return <>{v.name}</>;
                }}
            </For>
        </>
    );
};
