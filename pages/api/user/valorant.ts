import { getSession } from "next-auth/react"
import clientPromise from "@/lib/mongodb"

import type { NextApiRequest, NextApiResponse } from "next"


let Account = clientPromise.then((client) => client.db().collection('accounts'));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    let session = await getSession({ req })
    
    if (session) {
        // Check METHOD
        if (req.method === 'DELETE') {
            // Delete valorant account from DB and return success
            (await Account).findOneAndUpdate({ _id: session.user.id }, { $unset: { puuid: "" } })
            res.send({
                success: true,
            })
        }
        if (req.method === 'POST') {
            // Add valorant account to DB and return success
            (await Account).findOneAndUpdate({ _id: session.user.id }, { $set: { puuid: req.body.puuid } })
            res.send({
                success: true,
            })
        }
    }
    else {
        res.status(401).send({
            success: false,
            error: "Unauthorized"
        })
    }
}