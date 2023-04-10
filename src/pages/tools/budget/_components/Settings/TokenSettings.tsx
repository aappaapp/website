import { Component, createSignal } from "solid-js";
import { token } from "../states";

interface Props {}

export const TokenSettings: Component<Props> = (props) => {
    const [getToken, setToken] = token;
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
