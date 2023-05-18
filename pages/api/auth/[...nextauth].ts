import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import DiscordProvider from 'next-auth/providers/discord'

export const authOptions: NextAuthOptions = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
        }),
        // Implement Google auth
    ],
    theme: {
        colorScheme: 'dark',
    },
    callbacks: {
         // Add JWT to session
         async jwt({ token}) {
            token.userrole = 'admin';
            return token;
         }
    }
}


export default NextAuth(authOptions)