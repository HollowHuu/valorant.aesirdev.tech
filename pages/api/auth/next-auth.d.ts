import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      valorant: string;
      tokens: {
        refreshToken: string;
        accessToken: string;
        idToken: string;
      }
    } & DefaultSession['user'];
  }
}