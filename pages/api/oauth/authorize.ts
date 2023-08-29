import clientPromise from "@/lib/mongodb"
import type { NextApiRequest, NextApiResponse } from "next"
import axios from 'axios';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

// Defining secrets and IDs
const clientID = process.env.RIOT_CLIENT_ID

const baseURL = process.env.NEXTAUTH_URL
const appCallbackURL = `${baseURL}api/oauth/callback`

const provider = "https://auth.riotgames.com"
const authorizeURL = `${provider}/authorize`


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
        const link = `${authorizeURL}?redirect_uri=${appCallbackURL}&client_id=${clientID}&response_type=code&scope=openid`
        res.status(200).send({
            success: true,
            link: link
        })
    }

    else {
        res.status(405).send({
            success: false,
            error: "Method not allowed"
        })
    }


}