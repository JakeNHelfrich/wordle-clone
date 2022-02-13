export async function submitUser(username: string) {
    const res = await (await fetch(`/api/user/${username}`, {
        body: JSON.stringify({user: username}),
        method: "POST"
    })).json();

    return res;
}

export async function getPuzzleForUser(username: string) {
    const res = await( await fetch(`/api/puzzle/${username}`)).json();
    if (res.puzzle) {
        return res.puzzle;
    };
}

export async function submitPuzzleForUser(username: string, puzzleSubmission: Submission ) {
    const res = await (await fetch(`/api/puzzle/${username}`, {
        body: JSON.stringify({puzzle: puzzleSubmission}),
        method: "POST"
    })).json()

    return true;
}