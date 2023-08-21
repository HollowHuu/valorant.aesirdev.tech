// nextjs and react imports
import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

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
    <div>
        <div className='min-h-screen'>
            <div className='text-center my-5'>
                <h1 className='text-2xl'>A guide on linking your Valorant account to your Discord</h1>
                <p className=''>To use Lunar, you need to link your Discord account to your Valorant account.</p>
                <p className=''>You can do this by going to the <Link href="/settings" className='text-indigo-400'>Settings</Link> page and clicking the <code>Add Valorant Account</code> button after logging in.</p>
                <p>Images detailing the process can be found below</p>

                <h1 className='text-2xl mt-10'>Step 1</h1>
                <p>Go to the <Link href="/settings" className='text-indigo-400'>Settings</Link> page, and click "Sign In"</p>
                <Image src='https://cdn.discordapp.com/attachments/702085428185923586/1143119979420590090/image.png' alt='image' height={500} width={500} className='mx-auto'/>
                
                <h1 className='text-2xl mt-10'>Step 2</h1>
                <p>Sign in with your Discord account</p>
                <Image src='https://cdn.discordapp.com/attachments/702085428185923586/1143120112019312650/image.png' alt='image' height={500} width={500} className='mx-auto'/>
                
                <h1 className='text-2xl mt-10'>Step 3</h1>
                <p>Click Authorize</p>
                <Image src='https://cdn.discordapp.com/attachments/702085428185923586/1143120142805516358/image.png' alt='image' height={500} width={500} className='mx-auto'/>

                <h1 className='text-2xl mt-10'>Step 4</h1>
                <p>Click the <code>Add Valorant Account</code> button</p>
                <Image src='https://cdn.discordapp.com/attachments/702085428185923586/1143114540867928126/image.png' alt='image' height={500} width={500} className='mx-auto'/>

                <h1 className='text-2xl mt-10'>Step 5</h1>
                <p>Enter your username and tagline, then click OK</p>
                <Image src='https://cdn.discordapp.com/attachments/702085428185923586/1143115184618078208/image.png' alt='image' height={500} width={500} className='mx-auto'/>

                <h1 className='text-2xl mt-10'>Step 6</h1>
                <p>Success! Now it should refresh and show you a long ID. If not make sure you entered the right account and you're playing on European servers.</p>
                <Image src='https://cdn.discordapp.com/attachments/702085428185923586/1143118606104789042/image.png' alt='image' height={500} width={500} className='mx-auto'/>
            </div>

        </div>
    </div>

  )
}
