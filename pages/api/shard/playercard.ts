import clientPromise from "@/lib/mongodb"
import type { NextApiRequest, NextApiResponse } from "next"
import request from 'request';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

/*
    This API endpoint is used to get a user's banner card through Valorant's internal API.
*/

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

        // We assume that the PUUID is already verified and valid
        // The same with the access token


        // Get accessToken from DB
        const Accounts = clientPromise.then((client) => client.db().collection('accounts'));
        const query = { providerAccountId: session.user.id }
        const options = {
            projection: { _id: 0 }
        }
        let account = await (await Accounts).findOne(query, options)
        if(!account?.tokens) {
            console.log("Missing tokens")
            return res.status(400).send({
                success: false,
                error: "Missing tokens"
            })
        }

        const accessToken = account.tokens.accessToken


        const puuid = req.headers['puuid'] || req.query.puuid
        if(!puuid) {
            console.log("Missing puuid")
            return res.status(400).send({
                success: false,
                error: "Missing puuid"
            })
        }

        const API = 'https://pd.eu.a.pvp.net'
        const endpoint = '/personalization/v2/players'
        
        // Make request to internal API
        request.get({
            url: `${API}${endpoint}/${puuid}/playerloadout`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }, function (error, response, body) {
            if(error) {
                console.log(error)
                return res.status(500).send({
                    success: false,
                    error: error
                })
            }
            if(response.statusCode != 200) return res.status(401).send({
                success: false,
                error: `Riot: ${response.statusMessage}`
            })

            let data = JSON.parse(body)
            res.status(200).send({
                success: true,
                data: data
            })
        })

    }
    else {
        res.status(405).send({
            success: false,
            error: "Method not allowed"
        })
    }


}