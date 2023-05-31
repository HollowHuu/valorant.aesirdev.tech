// nextjs and react imports
import Image from 'next/image'
import { useEffect } from 'react'

// next-auth and react imports
import { signIn, signOut, useSession } from 'next-auth/react'

// misc imports
import { Inter } from 'next/font/google'
import ValHeader from '../components/common/Header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  // variables
  const { data: session, status } = useSession()

  // useEffect
  useEffect(() => {
    if (status === 'loading') return

  }, [session, status])
  return (
    <>
      <div>
        <h1>Lunar</h1>
        <p>Welcome to Lunar. A closed network Valorant bot and Dashboard made for the Eclipse team.</p>
        <br/>
        <p>Currently in development, made by <code><a href="https://github.com/HollowHuu">HollowHuu</a></code></p>
    </div>
    </>

  )
}
