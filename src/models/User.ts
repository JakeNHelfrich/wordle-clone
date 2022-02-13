import client from '../lib/PrismaClient';

export async function addUser(username: string) {
    await client.user.create({
        data: {
            username
        }
    })
};

export async function getUser(username: string) {
    return await client.user.findFirst({
        where: {
            username
        }
    })
}

export async function getAllUsernames() {
    const users = await client.user.findMany();
    return users.map((u) => u.username);
}

export async function addPuzzle(username: string, puzzle: Submission) {
    const user = await client.user.findFirst({where: {username}});
    const puzzleSubmission = await client.puzzleSubmission.findFirst({where: {word: puzzle.word, userId: user!.id}});
    if(!puzzleSubmission) {
        await client.puzzleSubmission.create({
            data: {
                userId: user?.id!,
                word: puzzle.word,
                numAttempts: puzzle.numAttempts,
                attempts: JSON.stringify(puzzle.attempts),
            }
        });
    }
}

export async function incrementCurrentPuzzle(username: string) {
    
    const user = await client.user.findFirst({where: {username}});
    await client.user.update({
        where: {
            id: user!.id,
        },
        data: {
            current_puzzle: user?.current_puzzle! + 1,
        }
    })

}