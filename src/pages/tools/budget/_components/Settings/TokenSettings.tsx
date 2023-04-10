import { Component, Show, createSignal } from "solid-js";
import { repo, token } from "../states";

interface Props {}

export const TokenSettings: Component<Props> = (props) => {
    const [getToken, setToken] = token;
    const [getRepo, setRepo] = repo;
    const [show, setShow] = createSignal(false);

    const getSecuredToken = () => (getToken() ?? "").replace(/./g, "*");

    return (
        <div>
            {"Token: "}
            <Show when={show()} fallback={<>{getSecuredToken()}</>}>
                <input
                    type="text"
                    value={getToken() ?? ""}
                    onChange={(v) => {
                        setToken((v.target as HTMLInputElement).value);
                    }}
                />
            </Show>
            <button onClick={() => setShow(!show())}>
                {show() ? "Hide" : "Show"}
            </button>
        </div>
    );
};
