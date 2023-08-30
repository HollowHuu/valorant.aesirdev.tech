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
  const [banner, setBanner] = useState("https://i.gifer.com/YCZH.gif")
  // Mounted
  const [mounted, setMounted] = useState(false);
  
  // Theme
  const { theme, setTheme } = useTheme();

  function getPuuid() {
    axios.get('/api/user/verify').then(({data: body}) => {
      let bodyJSON = body
      logger.info({bodyJSON})
      if (body.success == true) {
        setValorant(bodyJSON.puuid)
      }
    }).catch((err) => {
      logger.error({err})
      if (err.response.status == 401) {
        refreshTokens()
      }
    })
  }

  function refreshTokens() {
    axios.get('/api/oauth/refresh').then(({data: body}) => {
      console.log('Running refreshTokens()')
      let bodyJSON = body
      if (bodyJSON.success == true) {
        getPuuid()
      } else {
        window.alert("An error occoured.")
      }
    })
  }

  // useEffect
  useEffect(() => {
    setMounted(true);

    if (status === 'loading') return
    if (session && status === 'authenticated') {
      // Check DB for Valorant tokens
      if(valorant == "") {
        fetch('/api/user/verify').then(res => res.json()).then(data => {
          if(data.error) {
            console.log(data.error)
          } else {
            console.log(data)
            setValorant(data.puuid)
          }
        })
      }

      
      if(valorant != "") {
        // Set up back end to read internal API  
      }
      
    }
    


  }, [session, status, valorant, rankImage, banner])

  if(!mounted) return null;

  if (session) {
    return (
        
      <div className={theme} >
        <div className='min-h-screen'>        
        <div className='relative'>
          <div className='absolute inset-0'></div>
          <img src={banner} alt="Banner" className='w-full' />
          <div className='absolute bottom-0 w-full h-full gradient'></div>
        </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 dark:text-white light:text-black text-3xl">
            {session.user.name}
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
