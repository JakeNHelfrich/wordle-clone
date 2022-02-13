import type { NextApiRequest, NextApiResponse } from 'next'
import { getPuzzle } from '../../../models/Puzzle';
import { getUser, addPuzzle, incrementCurrentPuzzle } from '../../../models/User';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {user: username} = req.query;

    if(req.method === "GET") {
        const user = await getUser(username as string);
        const puzzle = await getPuzzle(user?.current_puzzle!);
        res.status(200).json({puzzle});
    } else if (req.method === "POST") {
        const body = JSON.parse(req.body);
        await addPuzzle(username as string, body.puzzle);
        await incrementCurrentPuzzle(username as string);
        res.status(200).json({success: true});
    } else {
        res.status(404);
    }
}