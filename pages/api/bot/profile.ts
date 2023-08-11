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

    const bot_key = req.headers['authorization'] || req.headers['Authorization']
    if(bot_key !== process.env.BOT_KEY) {
        res.status(401).send({
            success: false,
            error: "Unauthorized"
        })
        return
    }

    if(req.method === 'POST') {
        let id = req.body.user_id
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

            if(profile.status !== 200) {
                res.status(500).send({
                    success: false,
                    error: "Internal server error"
                })
                return
            }

            // Fetch rank data from API
            let mmr = await axios.get(`https://api.henrikdev.xyz/valorant/v2/by-puuid/mmr/eu/${account.puuid}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': process.env.HDEV_API_KEY,
                }
            })

            if(mmr.status !== 200) {
                res.status(500).send({
                    success: false,
                    error: "Internal server error"
                })
                return
            }

            console.log(mmr.data.data.current_data.currenttier)

            if(mmr.data.data.current_data.currenttier && mmr.data.data.current_data.currenttierpatched) {
                res.status(200).send({
                    success: true,
                    puuid: account.puuid,
                    gameName: profile.data.data.name,
                    tagLine: profile.data.data.tag,
                    currentTier: mmr.data.data.current_data.currenttier,
                    curerntTierPatched: mmr.data.data.current_data.currenttierpatched,
                })
            } else {
                res.status(200).send({
                    success: true,
                    puuid: account.puuid,
                    gameName: profile.data.data.name,
                    tagLine: profile.data.data.tag,
                    currentTier: null,
                    curerntTierPatched: "Unranked",
                })
            }


        }
        else {
            res.status(201).send({
                success: false,
                error: "No account found"
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