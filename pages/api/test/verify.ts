import clientPromise from "@/lib/mongodb"
import type { NextApiRequest, NextApiResponse } from "next"
import request from "request";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    if(process.env.BOT_KEY != req.headers.authorization) {
        res.status(401).send({
            success: false,
            error: "Unauthorized"
        })
        return
    }

    if(req.method === 'GET') {
        // Get valorant account from DB and return success
        let Account = clientPromise.then((client) => client.db().collection('accounts'));
        const query = { providerAccountId: '605442511997108224' }
        const options = {
            projection: { _id: 0 }
        }

        let account = await (await Account).findOne(query, options)
        if(account?.tokens) {

            // Get puuid from API
            await request.get({
                uri: 'https://europe.api.riotgames.com/riot/account/v1/accounts/me',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Riot-Token': 'RGAPI-0ab1ac93-3eb2-45e8-8139-8311e468f2f3',
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
                console.log({response})
                if(response.statusCode != 200) return res.status(401).send({
                    success: false,
                    error: `Riot Error: ${response.statusMessage}`
                })
                
                console.log({body})
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