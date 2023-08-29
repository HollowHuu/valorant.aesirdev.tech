// nextjs and react imports
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import pino from 'pino'
import request from 'request'
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
  const [tokens, setTokens] = useState({refreshToken: "", accessToken: "", idToken: ""})
  const [rankImage, setRankImage] = useState("https://cdn.discordapp.com/attachments/702085428185923586/1142002562854309898/image.png")
  const [banner, setBanner] = useState("https://i.gifer.com/YCZH.gif")
  // Mounted
  const [mounted, setMounted] = useState(false);
  
  // Theme
  const { theme, setTheme } = useTheme();

  // useEffect
  useEffect(() => {
    setMounted(true);

    

    if (status === 'loading') return
    if (session && status === 'authenticated') {
      // Check DB for Valorant tokens
      console.log({tokens})
      if(tokens.accessToken == "") {
        fetch('/api/user/verify').then(res => res.json()).then(data => {
          if(data.error) {
            console.log(data.error)
            setTokens({refreshToken: "", accessToken: "", idToken: ""})
          } else {
            console.log(data)
            setTokens({refreshToken: data.refreshToken, accessToken: data.accessToken, idToken: data.idToken})
          }
        })
      }



      if(tokens.accessToken != "")  {
        // Get Valorant ID
        fetch('https://auth.riotgames.com/userinfo', {
          headers: {
            "Authorization": `Bearer ${tokens.accessToken}`,
            // Disable CORS
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(res => res.json())
        .then(data => {
          logger.info(data)
        })
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
