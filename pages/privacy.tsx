// nextjs and react imports
import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// next-auth and react imports
import { signIn, signOut, useSession } from 'next-auth/react'

// misc imports
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function privacy() {
  // variables
  const { data: session, status } = useSession()

  // useEffect
  useEffect(() => {
    if (status === 'loading') return

  }, [session, status])
  return (
    <div>
        <div className='min-h-screen'>
            <div className='text-center mx-auto my-5 max-w-prose'>
                <h1 className='text-xl font-bold'>Privacy Policy for Lunar</h1>
                <p className=''>Last Updated: 24/08/2023</p>
                <br />
                <p>Thank you for using Lunar. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our web application.</p>
                <p className='font-bold mt-5'>1. Introduction</p>
                <p>Lunar is a web app designed to provide automatic role management and summarized profile statistics for Valorant players. As part of our services, we utilize the Riot Games API to collect and display Valorant profile stats and match history.</p>
                
                <p className='font-bold mt-5'>2. Information Collected:</p>
                <p>We collect the following user data to provide our services:</p>
                <p>Email: We collect your email address to create and manage your Lunar account, and to communicate important updates and notifications.</p>
                <p>Discord ID: Your Discord ID is collected to enable integration with Discord, specifically for automatic role management within your Discord server.</p>
                <p>Valorant Profile Stats and Match History: We use the Riot Games API to collect and display your Valorant profile statistics and match history. This includes information such as gameplay activity, rankings, and match outcomes.</p>
                    
                <p className='font-bold mt-5'>3. Use of Collected Information:</p>
                <p>We use the collected data for the following purposes:</p>
                <p>Providing Services: Your email and Discord ID are used to create and manage your Lunar account, and to enable automatic role management within your Discord server based on your Valorant profile.</p>
                <p>Displaying Statistics: We utilize the Riot Games API to retrieve and display your Valorant profile statistics and match history on our platform.</p>

                <p className='font-bold mt-5'>4. Data Sharing:</p>
                <p>We do not share any of the collected data with third parties. Your personal information, Valorant profile data, and match history remain confidential and are used solely for the purposes outlined in this Privacy Policy.</p>

                <p className='font-bold mt-5'>5. User Choices:</p>
                <p>You have the option to control the data shared through the Riot Games API by adjusting your privacy settings within your Riot Games account. You can also manage your Lunar account information and settings within the app.</p>

                <p className='font-bold mt-5'>6. Cookies and Tracking:</p>
                <p>Lunar may use cookies and similar tracking technologies to enhance your user experience and gather usage information. You can manage cookies through your browser settings.</p>

                <p className='font-bold mt-5'>7. Security Measures:</p>
                <p>We implement industry-standard security measures to protect your personal information. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>

                <p className='font-bold mt-5'>8. Changes to the Privacy Policy:</p>
                <p>We may update this Privacy Policy from time to time to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will notify users of any significant changes through the app or via email.</p>

                <p className='font-bold mt-5'>9. Contact Information:</p>
                <p>If you have any questions, concerns, or requests related to your privacy or this Privacy Policy, please contact us at <a href="mailto:hollowhuu@aesirdev.tech">HollowHuu@aesirdev.tech</a></p>                    

                    

            </div>
        </div>
    </div>

  )
}
