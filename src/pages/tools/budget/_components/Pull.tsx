import type { BudgetType } from "@adenpun2000/budget";
import type { Component } from "solid-js";
import { readFile } from "./github";
import { repo, saveData, token } from "./states";

interface Props {}

export const Pull: Component<Props> = (props) => {
    const [getToken] = token;
    const [getRepo] = repo;

    return (
        <>
            <button
                onClick={async () => {
                    const a: any = JSON.parse(
                        await readFile(getToken()!, getRepo()!, "budget.json")
                    );
                    Object.keys(a).forEach((v) => {
                        (saveData as any)[v] = a[v];
                    });
                }}
            >
                Pull from GitHub
            </button>
        </>
    );
};
