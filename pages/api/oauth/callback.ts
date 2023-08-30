import clientPromise from "@/lib/mongodb"
import type { NextApiRequest, NextApiResponse } from "next"
import axios from 'axios';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import request from "request";

const clientSecret = process.env.RIOT_CLIENT_SECRET
const clientID = process.env.RIOT_CLIENT_ID
const baseURL = process.env.NEXTAUTH_URL
const appCallbackURL = `${baseURL}api/oauth/callback`
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
    
    const { code } = req.query;


    let accessCode = req.body.code;
    if (code && typeof code == "string") {
        accessCode = decodeURI(code);
    }

    console.log({accessCode, code: code})

    if(accessCode == undefined || accessCode == null) return res.status(400).send({
        success: false,
        error: "Bad request"
    })

    console.log({clientID, clientSecret})

    // request attempt
    request.post({
        url: tokenURL,
        auth: {
            user: clientID,
            pass: clientSecret
        },
        form: {
            grant_type: "authorization_code",
            code: accessCode,
            redirect_uri: appCallbackURL
            
        }
    }, function (error, response, body) {
        if(error) {
            console.log(error)
            return res.status(500).send({
                success: false,
                error: error
            })
        }
        const data = JSON.parse(body)
        console.log({data})
        if(data.error) return res.status(500).send({
            success: false,
            error: data.error
        })

        const tokens = {
            refreshToken : data.refresh_token,
            accessToken : data.access_token,
            idToken : data.id_token,
        }

        clientPromise.then((client) => client.db().collection('accounts')).then(async (Account) => {
            const query = { providerAccountId: session.user.id }
            const options = {
                projection: { _id: 0 }
            }
            let account = await (await Account).findOne(query, options)
            if(account) {
                await (await Account).findOneAndUpdate({ providerAccountId: session.user.id }, { $set: { tokens: tokens } })
            } else {
                await (await Account).insertOne({ providerAccountId: session.user.id, tokens: tokens })
            }
        })
        

        // Testing the accessToken
        // Get puuid from API
        request.get('https://europe.api.riotgames.com/riot/account/v1/accounts/me', {
            headers: {
                "Authorization": `${tokens.accessToken}`
            }
        }, function (error, response, body) {
            if(error) {
                console.log({error})
                return
            }
            if(response.statusCode != 200) return console.log(`Riot Error: ${response.statusMessage}`)
            const data = JSON.parse(body)
            console.log({data})
        })


        // Return user to the homepage after redirecting to the callback URL
        res.redirect('/settings')

    })
    

    /*
    // Axios attempt NOT WORKING
    axios.post(tokenURL, {
        Authorization: {
            user: clientID,
            pass: clientSecret
        },
        FormData: {
            grant_type: "authorization_code",
            code: accessCode,
            redirect_uri: appCallbackURL
        }
    }).then((response) => {
        const data = JSON.parse(response.data)
        if(response.status != 200) return res.status(500).send({
            success: false,
            error: data.error
        })
        
        console.log({data})
    }).catch((error) => {
        console.log(error.response.data.error)
        return res.status(500).send({
            success: false,
            error: error.response.data.error
        })
    })
    */
}