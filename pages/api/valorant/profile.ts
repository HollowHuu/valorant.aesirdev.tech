import { getSession } from "next-auth/react"
import clientPromise from "@/lib/mongodb"
import type { NextApiRequest, NextApiResponse } from "next"
import axios from 'axios';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import pino from 'pino'
import { request } from "http";

const logger = pino()

// Checking validity of tokens and returns puuid if valid
function verify(): boolean {
    axios.get('/api/user/verify').then(({data: body}) => {
        bodyJSON = body
        logger.info({bodyJSON})
    })
}

function getPuuid(): {puuid: string} {
    let bodyJSON: {
        success: boolean,
        puuid: string
    } = {
        success: false,
        puuid: ""
    }



    axios.get('/api/user/verify').then(({data: body}) => {
        bodyJSON = body
        logger.info({bodyJSON})
    }).catch((err) => {
        logger.error({err})
        if (err.response.status == 401) {
            if(refreshTokens()) {
                getPuuid()
            }
        }
    })
    if (bodyJSON.success == true) {
        return {
            puuid: bodyJSON.puuid,
        }
    }
}

function refreshTokens(): boolean {
    let bodyJSON: {
        success: boolean,
    } = {
        success: false
    }

    axios.get('/api/oauth/refresh').then(({data: body}) => {
        console.log('Running refreshTokens()')
        let bodyJSON = body
    })

    if (bodyJSON.success == true) {
        return true;
    } else {
        return false;
    }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions)
    // if(!session) {
    //     res.status(401).send({
    //         success: false,
    //         error: "Unauthorized"
    //     })
    //     return
    // }
    if(req.method === 'GET') {  

        // Validate tokens
        let puuid = getPuuid()


        // Get valorant account from DB and return success
        let Account = clientPromise.then((client) => client.db().collection('accounts'));
        const query = { providerAccountId: session?.user.id }
        const options = {
            projection: { _id: 0 }
        }

        let account = await (await Account).findOne(query, options)

        // Get tokens from DB, check validity and refresh if needed
        // then use tokens to get puuid and profile data
        // then use puuid to access the internal API and get rank data

        if(!account?.tokens) {
            return res.status(400).send({
                success: false,
                error: "Bad request"
            })
        }

        let tokens = account.tokens
        

        

        /*
        if(account?.puuid) {
            // Fetch data from API
            let profile = await axios.get(`https://api.henrikdev.xyz/valorant/v1/by-puuid/account/${account.puuid}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': process.env.HDEV_API_KEY,
                }
            })
            console.log(profile.data)
            // Fetch rank data from API
            let mmr = await axios.get(`https://api.henrikdev.xyz/valorant/v2/by-puuid/mmr/eu/${account.puuid}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': process.env.HDEV_API_KEY,
                }
            })
            console.log(mmr.data.data.current_data.images)

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
                    card: profile.data.data.card.wide,
                    currentTier: mmr.data.data.current_data.currenttier,
                    currentTierPatched: mmr.data.data.current_data.currenttierpatched,
                    currentRankImage: mmr.data.data.current_data.images.large,
                    
                })
            } else {
                res.status(200).send({
                    success: true,
                    puuid: account.puuid,
                    gameName: profile.data.data.name,
                    tagLine: profile.data.data.tag,
                    card: profile.data.data.card.wide,
                    currentTier: null,
                    currentTierPatched: "Unranked",
                    currentRankImage: mmr.data.data.current_data.images.large,
                })
            }
        }
        else {
            res.status(200).send({
                success: true,
                puuid: null
            })
        }
        */
    }
    else {
        res.status(405).send({
            success: false,
            error: "Method not allowed"
        })
    }


}