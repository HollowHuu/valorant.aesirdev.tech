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

}


export default NextAuth(authOptions)