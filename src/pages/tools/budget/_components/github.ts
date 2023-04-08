import axios from "axios";

export function writeFile(
    token: string,
    repo: string,
    path: string,
    data: string
) {
    axios
        .get("https://api.github.com/repos/" + repo + "/contents/" + path, {
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: "Bearer " + token,
                "X-GitHub-Api-Version": "2022-11-28",
            },
        })
        .then((r) => {
            axios.put(
                "https://api.github.com/repos/" + repo + "/contents/" + path,
                {
                    content: data,
                    message: Date.now().toString(),
                    sha: r.data.sha,
                },
                {
                    headers: {
                        Accept: "application/vnd.github+json",
                        Authorization: "Bearer " + token,
                        "X-GitHub-Api-Version": "2022-11-28",
                    },
                }
            );
        })
        .catch((r) => {
            if (r.response.status === 404)
                axios.put(
                    "https://api.github.com/repos/" +
                        repo +
                        "/contents/" +
                        path,
                    {
                        content: data,
                        message: Date.now().toString(),
                    },
                    {
                        headers: {
                            Accept: "application/vnd.github+json",
                            Authorization: "Bearer " + token,
                            "X-GitHub-Api-Version": "2022-11-28",
                        },
                    }
                );
        });
}
