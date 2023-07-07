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
          {/* Round image and center everything */}
          <br />
          <div className=''>
            <Image width={200} height={200} src={session.user?.image as string} className='rounded-full mx-auto' alt='Profile picture'></Image>
          </div>

          <br />
          <Link
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex flex-col items-center'
            href={"/api/auth/signout"}
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}>
            Sign Out
          </Link>
        </div>
        <br />
        <div>
          {/* Display profile settings in a box */}
          <div className='bg-gray-100 rounded-xl p-4 mx-10'>
            <h1 className='text-2xl font-bold text-black'>Profile Settings</h1>
            <br />
            
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <h1 className='text-xl font-bold text-black'>name</h1>
                <p className='text-lg font-medium text-gray-600'>{session.user?.name}</p>
                

                <br />

                <h1 className='text-xl font-bold text-black'>ID</h1>
                <p className='text-lg font-medium text-gray-600'>{session.user?.id}</p>
                
                <br />

                <h1 className='text-xl font-bold text-black'>Email</h1>
                <p className='text-lg font-medium text-gray-600'>{session.user?.email}</p>

                <br />

                <h1 className='text-xl font-bold text-black'>Valorant</h1>
                <p className='text-lg font-medium text-gray-600'>Waiting for app approval.</p>

                <br />


              </div>
            </div>
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
