// nextjs and react imports
import { useEffect } from 'react'

// next-auth and react imports
import { signIn, signOut, useSession } from 'next-auth/react'

// misc imports
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Search() {
  // variables
  const { data: session, status } = useSession()

  // useEffect
  useEffect(() => {
    if (status === 'loading') return

  }, [session, status])
  return (
    <>
      <div>
        <p>The search function is currently not implemented. It is currently a low priority feature.</p>
    </div>
    </>

  )
}
