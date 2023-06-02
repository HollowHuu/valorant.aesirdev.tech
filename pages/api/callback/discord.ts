import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    // Handle Discord callback
    console.log(req.query)
    console.log(req.body)
}