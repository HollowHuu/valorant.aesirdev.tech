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


export default function Settings() {
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
      console.log(valorant)
      if (valorant) {
        // If valorant account is found, display it

        document.getElementById("val")!.innerHTML = "Valorant Account: " + valorant

        // Make button to remove valorant account
        document.getElementById("val-b")!.innerHTML = "Remove Valorant Account"
        document.getElementById("val-b")!.className = "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex flex-col items-center"
        document.getElementById("val-b")!.onclick = function() {
          // Remove valorant account from DB
          fetch('/api/user/verify', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },

          }).catch((error) => {
            console.error('Error:', error);
          }
          ).then((response) => {
            console.log(response)
          }
          )
        }
      } else {
        // If valorant account is not found, display a message
        document.getElementById("val")!.innerHTML = "No Valorant account found."
        document.getElementById("val-b")!.innerHTML = "Add Valorant Account"
        document.getElementById("val-b")!.className = "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex flex-col items-center"
        document.getElementById("val-b")!.onclick = function() {


          let val = prompt("Please enter your Valorant username and tagline (ex. HollowHuu#6969):")
          if (val) {
            axios.post('/api/user/verify', {
              valorant: val,
              session: session
            })
            .catch(function (error) {
              logger.error({error})
              // Alert user that something went wrong
              alert("Something went wrong. Please try again.")
            });
          }
        }
      }

    }
    
    

  }, [session, status, valorant])

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
                <p id="val" className='text-lg font-medium text-gray-600'></p>
                <button id="val-b"></button>

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
