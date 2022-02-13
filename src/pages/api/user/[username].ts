import type { NextApiRequest, NextApiResponse } from 'next'
import { addUser, getAllUsernames } from '../../../models/User';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST") {
        const user = JSON.parse(req.body).user;
        const freeUsername = !(await getAllUsernames()).includes(user);
        if (freeUsername) {
            await addUser(user)
        }
        res.status(200).json({success: freeUsername, error: 'Username already in use! Please enter another.'});
    } else {
        res.status(404);
    }
}