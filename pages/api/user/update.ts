import { getSession } from "next-auth/react"
import clientPromise from "@/lib/mongodb"

import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";


// let Account = clientPromise.then((client) => client.db().collection('accounts'));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    let session = await getServerSession(req, res, authOptions)
    
    if (session) {
        console.log("There is indeed a session")

        // Check METHOD
        if (req.method === 'DELETE') {
            // Delete valorant account from DB and return success
            // (await Account).findOneAndUpdate({ _id: session.user.id }, { $unset: { puuid: "" } })
            res.status(200).send({
                success: true,
            })
        }
        else if (req.method === 'POST') {
            // Add valorant account to DB and return success
            // (await Account).findOneAndUpdate({ _id: session.user.id }, { $set: { puuid: req.body.puuid } })
            res.status(200).send({
                success: true,
            })
        }
        else {
            res.status(405).send({
                success: false,
                error: "Method not allowed"
            })
        }
        
    }
    else {
        console.log("There was no session")
        res.status(401).send({
            success: false,
            error: "Unauthorized"
        })
    }
}