import client from '../lib/PrismaClient';

export async function getPuzzle(id: number) {
    return await client.puzzle.findFirst({
        where: {
            number: id,
        },
        select: {
            word: true,
            number: true,
        }
    });
}