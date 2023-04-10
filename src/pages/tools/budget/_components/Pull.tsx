import { Component, createSignal } from "solid-js";
import { readFile } from "../../../../utils/github";
import { repo, saveData, token } from "./states";
import { Modal } from "@/components/Modal";

interface Props {}

export const Pull: Component<Props> = (props) => {
    const [getToken] = token;
    const [getRepo] = repo;
    const [opened, setOpened] = createSignal(true);

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
                    alert("Done!");
                }}
            >
                Pull from GitHub
            </button>
        </>
    );
};
