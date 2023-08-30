import clientPromise from "@/lib/mongodb"
import type { NextApiRequest, NextApiResponse } from "next"
import axios from 'axios';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions)  
    if(!session) {
        res.status(401).send({
            success: false,
            error: "Unauthorized"
        })
        return
    }  
    if(req.method === 'GET') {
        // Get valorant account from DB and return success
        let Account = clientPromise.then((client) => client.db().collection('accounts'));
        const query = { providerAccountId: session.user.id }
        const options = {
            projection: { _id: 0 }
        }

        let account = await (await Account).findOne(query, options)
        if(account?.tokens) {

            // Get puuid from API
            let data = await fetch('https://auth.riotgames.com/userinfo', {
                headers: {
                    Authorization: `Bearer ${account.tokens.accessToken}`
                }
            })

            let user = await data.json()
            
            console.log({status: data.statusText, user})

            if(data.status != 200) res.status(401).send({
                success: false,
                error: `Riot Error: ${data.statusText}`
            })

            // Get puuid from API
            
        }
        else {
            res.status(201).send({
                success: false,
                error: "No valorant account linked",
            })
        }
    }

    else if(req.method === 'DELETE') {
        // Delete valorant account from DB and return success
    }

    else {
        res.status(405).send({
            success: false,
            error: "Method not allowed"
        })
    }


}