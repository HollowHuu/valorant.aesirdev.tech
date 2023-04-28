import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <head>
        <title>Lunar</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <h1>Lunar</h1>
      <p>Welcome to Lunar. A closed network Valorant bot and Dashboard made for the Eclipse team.</p>
      <br/>
      <p>Currently in development, made by <a href="https://github.com/HollowHuu">HollowHuu</a></p>
    </div>
  )
}
