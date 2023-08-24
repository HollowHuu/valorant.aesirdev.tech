// nextjs and react imports
import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// next-auth and react imports
import { signIn, signOut, useSession } from 'next-auth/react'

// misc imports
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function tos() {
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
                <h1 className='text-xl font-bold'>Terms of Service ("TOS")</h1>
                <p className=''>Last Updated: 24/08/2023</p>
                <br />
                <p>These Terms of Service ("TOS") govern your use of Lunar. By using Lunar, you agree to abide by these terms. If you do not agree with these terms, please refrain from using the App.</p>
                
                <p className='font-bold mt-5'>1. Acceptable Use</p>
                <p>You agree to use Lunar solely for its intended purpose of providing automatic role management and summarized profile statistics for Valorant players. You agree not to use the App for any unlawful or unauthorized purposes.</p>
                
                <p className='font-bold mt-5'>2. User Accounts:</p>
                <p>To use certain features of Lunar, you may need to create a user account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to provide accurate and up-to-date information.</p>
                    
                <p className='font-bold mt-5'>3. Intellectual Property:</p>
                <p>Lunar and its content, including but not limited to text, graphics, logos, and software, are protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works based on our content without explicit permission.</p>

                <p className='font-bold mt-5'>4. Privacy:</p>
                <p>Your use of Lunar is also governed by our Privacy Policy, which outlines how we collect, use, and safeguard your personal information. By using Lunar, you consent to the practices described in the Privacy Policy.</p>

                <p className='font-bold mt-5'>5. Disclaimer of Warranty:</p>
                <p>Lunar is provided "as is" without warranties of any kind, whether expressed or implied. We do not guarantee the accuracy, completeness, or reliability of the App's content or functionality.</p>

                <p className='font-bold mt-5'>6. Limitation of Liability:</p>
                <p>To the extent permitted by law, we shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of Lunar.</p>

                <p className='font-bold mt-5'>7. Indemnification:</p>
                <p>You agree to indemnify and hold us harmless from any claims, losses, liabilities, damages, costs, or expenses resulting from your use of Lunar or your violation of these TOS.</p>

                <p className='font-bold mt-5'>8. Modifications:</p>
                <p>We reserve the right to modify or discontinue Lunar at any time without notice. We may also revise these TOS from time to time. Your continued use of the App after such changes constitutes your acceptance of the revised terms.</p>

                <p className='font-bold mt-5'>9. Termination:</p>
                <p>We reserve the right to terminate your access to Lunar if you violate these TOS or engage in activities that we deem inappropriate or harmful.</p>                    
                
                <p className='font-bold mt-5'>10. Governing Law:</p>
                <p>These TOS shall be governed by and construed in accordance with the laws of Denmark. Any disputes arising under or in connection with these TOS shall be subject to the exclusive jurisdiction of the courts of Denmark.</p>

                <p className='font-bold mt-5'>11. Contact Information:</p>
                <p>If you have any questions, concerns, or requests related to these TOS, please contact us at <a href="mailto:hollowhuu@aesirdev.tech">HollowHuu@aesirdev.tech</a></p>
                    

            </div>
        </div>
    </div>

  )
}
