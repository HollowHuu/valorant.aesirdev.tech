import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <p>Welcome to Lunar. A closed network Valorant bot and Dashboard made for the Eclipse team.</p>
      <br/>
      <p>Currently in development, made by <a href="https://github.com/HollowHuu"></a>HollowHuu</p>
    </div>
  )
}
