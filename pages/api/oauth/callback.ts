import clientPromise from "@/lib/mongodb"
import type { NextApiRequest, NextApiResponse } from "next"
import axios from 'axios';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { URLPattern } from "next/server";

const clientSecret = process.env.RIOT_CLIENT_SECRET

const clientID = process.env.RIOT_CLIENT_ID

const baseURL = process.env.NEXTAUTH_URL
const appCallbackURL = `${baseURL}api/oauth/callback`

const provider = "https://auth.riotgames.com"
const authorizeURL = `${provider}/authorize`
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
    
    let accessCode = req.body.code;
    accessCode = decodeURI(accessCode)

    console.log({accessCode, code: req.body.code})

    if(accessCode == undefined || accessCode == null) return res.status(400).send({
        success: false,
        error: "Bad request"
    })

    axios.post(tokenURL, {
        auth: {
            user: clientID,
            pass: clientSecret
        },
        form: {
            grant_type: "authorization_code",
            code: accessCode,
            redirect_uri: appCallbackURL
        }
    }).then((response) => {
        if(response.status != 200) return res.status(500).send({
            success: false,
            error: response.data.error
        })
        const data = JSON.parse(response.data)
        console.log({data})
    }).catch((error) => {
        console.log(error)
        return res.status(500).send({
            success: false,
            error: "Internal server error"
        })
    })
}