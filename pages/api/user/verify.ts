import clientPromise from "@/lib/mongodb"
import type { NextApiRequest, NextApiResponse } from "next"
import request from 'request';
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
            await request.get({
                uri: 'https://europe.api.riotgames.com/riot/account/v1/accounts/me',
                headers: {
                    Authorization: `Bearer ${account.tokens.accessToken}`
                }
            }, function (error, response, body) {
                if(error) {
                    console.log({error})
                    return res.status(500).send({
                        success: false,
                        error: error
                    })
                }
                // const data = JSON.parse(body)
                if(response.statusCode != 200) return res.status(401).send({
                    success: false,
                    error: `Riot: ${response.statusMessage}`
                })

                let user = JSON.parse(body)
                
                console.log({body})
                res.status(200).send({
                    success: true,
                    puuid: user.puuid
                })
            })

            
        }
        else {
            res.status(201).send({
                success: false,
                error: "No valorant account linked",
            })
        }
    }
    else {
        res.status(405).send({
            success: false,
            error: "Method not allowed"
        })
    }


}