import NextAuth, { NextAuthOptions } from 'next-auth'
// import GoogleProvider from 'next-auth/providers/google'
import DiscordProvider from 'next-auth/providers/discord'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';

const discordScopes = ['identify', 'email'].join(' ')



export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
            authorization: {params: {scope: discordScopes}}
        }),
        // Implement Google auth
    ],
    theme: {
        colorScheme: 'auto',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt({ token, account, user }) {
          if (account) {
            token.accessToken = account.access_token
            token.id = account.providerAccountId
          }
          return token
        },
        session({ session, token, }) {
            // I skipped the line below coz it gave me a TypeError
            // session.accessToken = token.accessToken;
            session.user.id = token.id;
      
            return session;
          },
      },
      session: {
        strategy: 'jwt',
      },
}


export default NextAuth(authOptions)