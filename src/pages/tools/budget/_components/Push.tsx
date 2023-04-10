import type { Component } from "solid-js";
import { writeFile } from "./github";
import { repo, saveData, token } from "./states";

interface Props {}

export const Push: Component<Props> = (props) => {
    const [getToken] = token;
    const [getRepo] = repo;

    return (
        <>
            <button
                onClick={() => {
                    writeFile(
                        getToken()!,
                        getRepo()!,
                        "budget.json",
                        JSON.stringify(saveData)
                    );
                }}
            >
                Push to GitHub
            </button>
        </>
    );
};
