import Image from 'next/image'
import { Inter } from 'next/font/google'
import ValHeader from '../components/tsx/header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <ValHeader/>
      <div>
        <h1>Lunar</h1>
        <p>Welcome to Lunar. A closed network Valorant bot and Dashboard made for the Eclipse team.</p>
        <br/>
        <p>Currently in development, made by <code><a href="https://github.com/HollowHuu">HollowHuu</a></code></p>
    </div>
    </>

  )
}
