// nextjs and react imports
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import pino from 'pino'
import axios from 'axios'

// next-auth and react imports
import { signIn, signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'


// misc imports
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const logger = pino()


export default function Settings() {
  // variables
  const { data: session, status } = useSession()
  const [valorant, setValorant] = useState("")
  
  const { theme, setTheme } = useTheme();

  // functions
  function connectAccount() {
    // Using oauth to connect valorant account

    // Send request to backend to get oauth link
    axios.get('/api/oauth/authorize')
    .then(function (response) {
      logger.info({response})
      // Redirect user to oauth link
      window.location.href = response.data.url
    })
  }

  function disconnectAccount() {
    // To be implemented
    alert("Not implemented yet.")
  }

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
      console.log(valorant)


      // Valorant logic
      if (valorant) {
        // If valorant account is found, display it

        document.getElementById("val")!.innerHTML = "Valorant Account: " + valorant

        // Make button to remove valorant account
        document.getElementById("val-b")!.innerHTML = "Remove Valorant Account"
        document.getElementById("val-b")!.className = "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex flex-col items-center"
        document.getElementById("val-b")!.onclick = () => disconnectAccount();
      } else {
        // If valorant account is not found, display a message
        document.getElementById("val")!.innerHTML = "No Valorant account found."
        document.getElementById("val-b")!.innerHTML = "Add Valorant Account"
        document.getElementById("val-b")!.className = "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex flex-col items-center"
        document.getElementById("val-b")!.onclick = () => connectAccount();
      }

    }
    
    

  }, [session, status, valorant])

  if (session) {
    return (
      <div className={theme}>
      <div className='min-h-screen'>
        <div className=''>
          {/* Round image and center everything */}
          <br />
          <div className=''>
            <Image width={200} height={200} src={session.user?.image as string} className='rounded-full mx-auto' alt='Profile picture'></Image>
          </div>

          <br />
          
        </div>
        <div>
          {/* Display profile settings in a box */}
          <div className='bg-black dark:bg-gray-100 rounded-xl p-4 mx-10 text-white dark:text-black'>
            <h1 className='text-2xl font-bold'>Profile Settings</h1>
            <br />
            
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <h1 className='text-xl font-bold text-white dark:text-black'>name</h1>
                <p className='text-lg font-medium text-gray-300 dark:text-gray-700'>{session.user?.name}</p>
                

                <br />

                <h1 className='text-xl font-bold text-white dark:text-black'>ID</h1>
                <p className='text-lg font-medium text-gray-300 dark:text-gray-700'>{session.user?.id}</p>
                
                <br />

                <h1 className='text-xl font-bold text-white dark:text-black'>Email</h1>
                <p className='text-lg font-medium text-gray-300 dark:text-gray-700'>{session.user?.email}</p>

                <br />

                <h1 className='text-xl font-bold text-white dark:text-black'>Valorant</h1>
                <p id="val" className='text-lg font-medium text-gray-300 dark:text-gray-700'></p>
                <button id="val-b"></button>

                <br />


              </div>
              
            </div>
            <Link
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex w-1/6 items-center mx-auto justify-center my-2'
            href={"/api/auth/signout"}
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}>
            Sign Out
          </Link>
          </div>
        </div>
        </div>
        </div>
    )
  }
  return (
    <div className='min-h-screen mx-auto text-center'>
        <h1>Access Denied<br />You must be signed in to view this page</h1>
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
                Sign In
            </Link>
        </p>
      </div>
    )
}
