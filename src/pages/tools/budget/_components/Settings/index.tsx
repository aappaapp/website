import type { Component } from "solid-js";
import { repo, token } from "../states";
import { TokenSettings } from "./TokenSettings";
import { RepoSettings } from "./RepoSettings";
interface Props {}

export const Settings: Component<Props> = (props) => {
    return (
        <>
            <RepoSettings />
            <TokenSettings />
        </>
    );
};
