// nextjs and react imports
import Image from 'next/image'
import { useEffect } from 'react'

// next-auth and react imports
import { signIn, signOut, useSession } from 'next-auth/react'

// misc imports
import { Inter } from 'next/font/google'

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
        <h1 className='text-purple-500 text-xl text-center'>Lunar</h1>
        <p>Welcome to Lunar. A Discord role system with Dashboard, for those who&aposd rather spend their time playing the game.
          <br/>
          This is totally free and is run out of my own pocket. Ads (non-intrusive) will possibly be added to the dashboard if the costs get out of control.
        </p>
        <br/>
        <p>Currently in development, made by <code><a href="https://github.com/HollowHuu" className='text-sky-500'>HollowHuu</a></code></p>
    </div>
    </>

  )
}
