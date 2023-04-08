import { Base64 } from "js-base64";
import type { Component } from "solid-js";
import { writeFile } from "./github";
import { repo, saveData, token } from "./states";

interface Props {}

export const Push: Component<Props> = (props) => {
    const [getToken, setToken] = token;
    const [getRepo, setRepo] = repo;

    return (
        <>
            
            <input
                type="password"
                id=""
                value={getToken() ?? ""}
                onChange={(v) => {
                    // @ts-ignore
                    setToken(v.target.value);
                }}
            />
            <button
                onClick={() => {
                    writeFile(
                        getToken()!,
                        getRepo()!,
                        "budget.json",
                        Base64.encode(JSON.stringify(saveData))
                    );
                }}
            >
                Push
            </button>
        </>
    );
};
