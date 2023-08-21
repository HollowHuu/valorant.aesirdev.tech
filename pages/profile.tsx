// nextjs and react imports
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import pino from 'pino'
import axios from 'axios'
import { useTheme } from 'next-themes'
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
  const [rankImage, setRankImage] = useState("https://cdn.discordapp.com/attachments/702085428185923586/1142002562854309898/image.png")
  const [banner, setBanner] = useState("https://cdn.discordapp.com/attachments/702085428185923586/1142002562854309898/image.png")

  // Mounted
  const [mounted, setMounted] = useState(false);
  
  // Theme
  const { theme, setTheme } = useTheme();

  // useEffect
  useEffect(() => {
    setMounted(true);
    if (status === 'loading') return

    if (session && status === 'authenticated') {
      // Check DB for user valorant account
      axios.get('/api/user/verify')
      .then(function (response) {
        if (response.data.success == true) {
          setValorant(response.data.puuid)
        }
      })
      if(valorant != "") {
        // Display stats acquired from profile api
        axios.get('/api/valorant/profile')
        .then(function (response) {
          // Display username and tagline
          if(response.data.success == false) {
            return;
          }
          document.getElementById("user")!.innerHTML = response.data.gameName + "#" + response.data.tagLine


          setRankImage(response.data.currentRankImage)
          setBanner(response.data.card)
        })
        .catch(function (error) {
          logger.error(error)
        })
      }
      
      
    }
    
    

  }, [session, status, valorant, rankImage])

  if(!mounted) return null;

  if (session) {
    return (
        <html className={theme}>
        <div className='my-5 min-h-screen'>
          {/* Display the Unranked Valorant Icon and then the username */}
          <div className='flex flex-row justify-center items-center'>
            <div className='flex flex-col justify-center items-center mx-auto'>
              <Image id='rank' src={rankImage} width={250} height={250} alt='image' />
            </div>
          </div>
          <div className='text-center my-auto text-xl justify-center align-center relative'>
            <center><Image src={banner} alt='' className='drop-shadow-xl' width={452} height={128}></Image></center>
            <p id="user" className='text-3xl text-indigo-400 dark:text-violet-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'></p>
          </div>
        </div>
        </html>
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
