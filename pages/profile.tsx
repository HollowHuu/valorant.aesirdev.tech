// nextjs and react imports
import Image from 'next/image'
import { useEffect } from 'react'
import Link from 'next/link'

// next-auth and react imports
import { signIn, signOut, useSession } from 'next-auth/react'

// misc imports
import { Inter } from 'next/font/google'
import ValHeader from '../components/common/Header'

const inter = Inter({ subsets: ['latin'] })

export default function Profile() {
  // variables
  const { data: session, status } = useSession()

  // useEffect
  useEffect(() => {
    if (status === 'loading') return

  }, [session, status])

  if (session) {
    return (
        <>
        <div>
          <h1>Profile</h1>
          <p>Welcome to your profile, {session.user?.name}!</p>
          <br/>
        </div>
        </>
    )
  }
  return (
    <>
        <h1>Access Denied</h1>
        <p>
            <Link
                href="/api/auth/signin"
                onClick={(e) => {
                    e.preventDefault();
                    signIn();
                }}
            >
                You must be signed in to view this page
            </Link>
        </p>
    </>
    )
}
