import clientPromise from "@/lib/mongodb"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    // handle Discord sign in

    // get the user's Discord ID from the request body
    const { data } = req.body
    console.log(data)

    res.send({
        content: data
    })
}