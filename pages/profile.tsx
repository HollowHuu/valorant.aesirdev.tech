// nextjs and react imports
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import pino from 'pino'
import axios from 'axios'

// next-auth and react imports
import { signIn, signOut, useSession } from 'next-auth/react'


// misc imports
import { Inter } from 'next/font/google'
import ValHeader from '../components/common/Header'

const inter = Inter({ subsets: ['latin'] })

const logger = pino()


export default function Profile() {
  // variables
  const { data: session, status } = useSession()
  const [valorant, setValorant] = useState("")
  

  // useEffect
  useEffect(() => {
    if (status === 'loading') return

    if (session && status === 'authenticated') {
      // Check DB for user valorant account
      axios.get('/api/user/verify')
      .then(function (response) {
        logger.info({response})
        if (response.data.success == true) {
          setValorant(response.data.puuid)
        }
      })
      
      
    }
    
    

  }, [session, status, valorant])

  if (session) {
    return (
        <>
        <div>
          {/* Round image and center everything */}
          <br />
          <div className=''>
            
          </div>
        </div>
        </>
    )
  }
  return (
    <>
        <h1>Access Denied</h1>
        <br />
        <p>
            <Link
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
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
