import type { Component } from "solid-js";
import { repo } from "../states";

interface Props {}

export const RepoSettings: Component<Props> = (props) => {
    const [getRepo, setRepo] = repo;

    return (
        <div>
            Repo:{" "}
            <input
                type="text"
                value={getRepo() ?? ""}
                placeholder="Enter your GitHub repository name..."
                onChange={(e) => setRepo(e.target.value)}
            />
        </div>
    );
};
