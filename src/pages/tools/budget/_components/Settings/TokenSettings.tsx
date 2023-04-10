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
            <input
                type="text"
                value={show() ? getToken() ?? "" : getSecuredToken()}
                placeholder="Enter your GitHub token..."
                onChange={(v) => {
                    setToken((v.target as HTMLInputElement).value);
                }}
                readonly={!show()}
            />
            <button onClick={() => setShow(!show())}>
                {show() ? "Hide" : "Show and Edit"}
            </button>
        </div>
    );
};
