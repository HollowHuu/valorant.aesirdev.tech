import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import Layout from '@/components/common/Layout'

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps }
}: AppProps<{ session: Session }>) {
  return(
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
