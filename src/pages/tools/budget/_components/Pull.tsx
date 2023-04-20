import { readFile } from "@/utils/github";
import { Component, createSignal } from "solid-js";
import { repo, token } from "./states";

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
                    localStorage.setItem("save", JSON.stringify(a));
                    alert("Done!");
                    location.reload();
                }}
            >
                Pull from GitHub
            </button>
        </>
    );
};
