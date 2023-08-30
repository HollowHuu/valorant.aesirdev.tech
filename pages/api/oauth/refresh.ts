import clientPromise from "@/lib/mongodb"
import type { NextApiRequest, NextApiResponse } from "next"
import request from "request";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

// Defining secrets and IDs
const clientID = process.env.RIOT_CLIENT_ID
const clientSecret = process.env.RIOT_CLIENT_SECRET

const provider = "https://auth.riotgames.com"
const tokenURL = `${provider}/token`


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

        // Get refresh token from DB
        const Accounts = clientPromise.then((client) => client.db().collection('accounts'));
        const query = { providerAccountId: session.user.id }
        const options = {
            projection: { _id: 0 }
        }
        let account = await (await Accounts).findOne(query, options)


        if(!account?.tokens) {
            return res.status(400).send({
                success: false,
                error: "Bad request"
            })
        }

        let refresh_token = account.tokens.refreshToken

        console.log({clientID, clientSecret, refresh_token})

        // request attempt
        request.post({
            url: tokenURL,
            auth: {
                user: clientID,
                pass: clientSecret
            },
            form: {
                grant_type: "refresh_token",
                refresh_token: refresh_token,
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
                error: `Riot Error: ${response.statusMessage}`
            })

            const data = JSON.parse(body)
            console.log({data})
            const tokens = {
                refreshToken : data.refresh_token,
                accessToken : data.access_token,
                // Removed id_token because it's not needed
            }

            // Update tokens in DB
            Accounts.then(async (Accounts) => {
                await Accounts.updateOne(query, { $set: { tokens: tokens } })
            })

            res.status(200).send({
                success: true,
            })


        });
    } 

    else {
        res.status(405).send({
            success: false,
            error: "Method not allowed"
        })
    }


}