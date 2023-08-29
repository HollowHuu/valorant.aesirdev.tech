import NextAuth, { NextAuthOptions } from 'next-auth'
// import GoogleProvider from 'next-auth/providers/google'
import DiscordProvider from 'next-auth/providers/discord'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';

const discordScopes = ['identify', 'email'].join(' ')

const Account = clientPromise.then((client) => client.db().collection('accounts'));


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
    jwt({ token, account, user, profile }) {
      if (account) {
        token.accessToken = account.access_token
        token.id = account.providerAccountId
        token.valorant = account.valorant
        token.tokens = account.tokens
      }
      return token
    },
    session({ session, token, }) {

      // Fetch User from DB


      session.user.id = token.id;
      session.user.valorant = token.valorant;
      session.user.tokens = token.tokens;

      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
}


export default NextAuth(authOptions)