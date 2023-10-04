import clientPromise from "@/lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
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

    // Get valorant account from HDEV API using username and tagline
    // We'll get the username and tagline from the body of a POST request

    if(req.method === 'POST') {
        // Read username and tagline from body
        const { username, tagline } = req.body
        if(!username || !tagline) {
            res.status(400).send({
                success: false,
                error: "Missing username or tagline"
            })
            return
        }

        // Fetch data from API
        let profile = await axios.get(`https://api.henrikdev.xyz/valorant/v1/account/${username}/${tagline}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.HDEV_API_KEY,
            }
        })

        console.log({profile: profile.data.data})

        if(profile.status !== 200) {
            console.log(profile)
            res.status(500).send({
                success: false,
                error: "Internal server error"
            })
            return
        }

        // Add the puuid to the user's account
        let Account = clientPromise.then((client) => client.db().collection('accounts'));
        const query = { providerAccountId: session?.user.id }
        const options = {
            projection: { _id: 0 }
        }

        let acc = await (await Account).findOne(query, options)
        if(!acc) {
            res.status(500).send({
                success: false,
                error: "Internal server error"
            })
            return
        }

        // Check if the account already has a puuid
        if(acc.puuid) {
            res.status(400).send({
                success: false,
                error: "Account already has a puuid"
            })
            return
        }  

        console.log({puuid: profile.data.data.puuid})

        // Update the account with the puuid
        const update = {
            $set: {
                puuid: profile.data.data.puuid
            }
        }

        await (await Account).updateOne(query, update)

        res.status(200).send({
            success: true,
            puuid: profile.data.data.puuid
        })
    }

}