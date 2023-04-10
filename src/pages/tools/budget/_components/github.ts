import axios from "axios";
import { Base64 } from "js-base64";

export function writeFile(
    token: string,
    repo: string,
    path: string,
    data: string
): void {
    axios
        .get(`https://api.github.com/repos/${repo}/contents/${path}`, {
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${token}`,
                "X-GitHub-Api-Version": "2022-11-28",
            },
        })
        .then((r) => {
            axios.put(
                `https://api.github.com/repos/${repo}/contents/${path}`,
                {
                    content: Base64.encode(data),
                    message: Date.now().toString(),
                    sha: r.data.sha,
                },
                {
                    headers: {
                        Accept: "application/vnd.github+json",
                        Authorization: `Bearer ${token}`,
                        "X-GitHub-Api-Version": "2022-11-28",
                    },
                }
            );
        })
        .catch((r) => {
            if (r.response.status === 404)
                axios.put(
                    `https://api.github.com/repos/${repo}/contents/${path}`,
                    {
                        content: Base64.encode(data),
                        message: Date.now().toString(),
                    },
                    {
                        headers: {
                            Accept: "application/vnd.github+json",
                            Authorization: `Bearer ${token}`,
                            "X-GitHub-Api-Version": "2022-11-28",
                        },
                    }
                );
        });
}

export function readFile(token: string, repo: string, path: string) {
    return new Promise<string>((resolve) => {
        axios
            .get(`https://api.github.com/repos/${repo}/contents/${path}`, {
                headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: `Bearer ${token}`,
                    "X-GitHub-Api-Version": "2022-11-28",
                },
            })
            .then((r) => {
                resolve(Base64.decode(r.data.content));
            });
    });
}
