// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import User from '@/components/schemas/user';
import dbConnect from '@/components/DB/connection';

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = req.body
  const { email, password } = data;

  dbConnect().then(() => {
    console.log("Connected to database");
  }).catch((err) => {
    console.log("Error connecting to database");
    console.log(err);
  })

  User.create(data)

  res.status(201).json({ message: 'Created User!' })
}
