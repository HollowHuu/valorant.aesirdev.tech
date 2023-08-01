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
    if(req.method === 'POST'){
        
        
       

        const [ username, tag ] = req.body.valorant.split('#')

        // Check if Valorant account exists on their API
        let data = await axios.get(`https://api.henrikdev.xyz/valorant/v1/account/${username}/${tag}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.HDEV_API_KEY,
            }
        })

        if(data.status == 200) {
            // Add valorant account to DB and return success
            let Account = clientPromise.then((client) => client.db().collection('accounts'));
            
            //Check if they already have a puuid in the DB
            const query = { providerAccountId: session.user.id }
            const options = {
                projection: { _id: 0 }
            }
            let account = await (await Account).findOne(query, options)
            console.log(session.user.id)
            if(account?.puuid) {
                // Replace the puuid
                
            } else {
                // Add the puuid
                console.log(data.data.data.puuid)
                await (await Account).findOneAndUpdate({ providerAccountId: session.user.id }, { $set: { puuid: data.data.data.puuid } })
            }

            res.status(200).send({
                success: true,
            })
            

        }
        else {
            // Return error
            res.status(400).send({
                success: false,
                error: "Valorant account not found"
            })
        }


    }
    else if(req.method === 'GET') {
        // Get valorant account from DB and return success
        let Account = clientPromise.then((client) => client.db().collection('accounts'));
        const query = { providerAccountId: session.user.id }
        const options = {
            projection: { _id: 0 }
        }

        let account = await (await Account).findOne(query, options)
        if(account?.puuid) {
            res.status(200).send({
                success: true,
                puuid: account.puuid
            })
        }
        else {
            res.status(200).send({
                success: true,
                puuid: null
            })
        }
    }

    else if(req.method === 'DELETE') {
        // Delete valorant account from DB and return success
        let Account = clientPromise.then((client) => client.db().collection('accounts'));
        await (await Account).findOneAndUpdate({ providerAccountId: session.user.id }, { $unset: { puuid: "" } })
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