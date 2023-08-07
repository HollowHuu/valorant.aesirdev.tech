import { getSession } from "next-auth/react"
import clientPromise from "@/lib/mongodb"
import type { NextApiRequest, NextApiResponse } from "next"
import axios from 'axios';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import pino from 'pino'

const logger = pino()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const bot_key = req.headers.authorization
    if(bot_key !== process.env.BOT_KEY) {
        res.status(401).send({
            success: false,
            error: "Unauthorized"
        })
        return
    }

    if(req.method === 'POST') {  
        let body = JSON.parse(req.body)
        let id = body.id
        // Get valorant account from DB and return success
        let Account = clientPromise.then((client) => client.db().collection('accounts'));
        const query = { providerAccountId: id }
        const options = {
            projection: { _id: 0 }
        }

        let account = await (await Account).findOne(query, options)
        if(account?.puuid) {
            // Fetch data from API
            let profile = await axios.get(`https://api.henrikdev.xyz/valorant/v1/by-puuid/account/${account.puuid}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': process.env.HDEV_API_KEY,
                }
            })
            console.log(profile.data)

            res.status(200).send({
                success: true,
                puuid: account.puuid,
                gameName: profile.data.data.name,
                tagLine: profile.data.data.tag,
            })
        }
        else {
            res.status(200).send({
                success: true,
                puuid: null
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