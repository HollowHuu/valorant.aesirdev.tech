// nextjs and react imports
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'

// next-auth and react imports
import { signIn, signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
// misc imports
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  // variables
  const { data: session, status } = useSession()
  const { theme, setTheme } = useTheme()
  
  const [mounted, setMounted] = useState(false);

  // useEffect
  useEffect(() => {
    setMounted(true);
    if (status === 'loading') return

  }, [session, status])

  if(!mounted) return null;
  return (
    <html className={theme}>
      {/* Div takes 100% view */}
      <div className='min-h-screen'>
        <h1 className='text-purple-500 text-4xl text-center my-5 '>Welcome to Lunar</h1>
        {/* make a text box with an image on the right of it */}
        <div className='flex flex-row justify-center items-center '>
          <div className='flex flex-col justify-center text-center items-center mx-auto max-w-3xl'>
            <p className='text-xl'>Lunar is a Discord role system with Dashboard.</p> 
            <p className='text-l'>Lunar is made to be an automatic role system for small Discord servers.
            <br />Using the Valorant API, it will fetch profile and rank data about you, which it will use to automatically assign rank roles on Discord.
            The Dashboard does currently not do much standalone <br />(unless, you would be interested in using my API)</p>
          </div>
          <div className='flex flex-col justify-center items-center mx-auto'>
            <Image src='https://cdn.discordapp.com/attachments/774650675593609268/1136331735265722408/Bot_logo_witout_back.png' width={250} height={250} alt='image' />
          </div>
          
        </div>
        <div className='flex flex-row justify-center items-center'>
        <div className='flex flex-col justify-center items-center mx-auto'>
            <Image src='https://cdn.discordapp.com/attachments/702085428185923586/1142002562854309898/image.png' height={250} width={300} alt='image' />
          </div>
          <div className='flex flex-col justify-center items-center mx-auto max-w-3xl'>
            <p className='text-xl'>How to use Lunar</p>
            <p className='text-l'>Lunar is a Discord bot that will automatically assign roles to you based on your Valorant rank.
            <br />To use Lunar, you need to link your Discord account to your Valorant account.
            <br />You can do this by going to the <Link href="/settings" className='text-indigo-400'>Settings</Link> page and clicking the <code>Link Account</code> button after logging in.
            <br />After linking your account, you can use the <code>/profile</code> command to see your rank and level.
            <br />To use the auto role system, you need to make roles with the names <code>Iron</code>, <code>Bronze</code>, <code>Silver</code>, <code>Gold</code>, <code>Platinum</code>, <code>Diamond</code>, <code>Immortal</code> and <code>Radiant</code>.
            <br />Automation is currently not available, but will be added soon.
            </p>
          </div>

        </div>

        <br/>
    </div>
    </html>

  )
}
