import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@/lib/prisma';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image: string | null;
      emailVerified: Date | null;
    };
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name ?? null;
        token.email = user.email ?? null;
        token.picture = user.image ?? null;
      }
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name as string | null,
          email: token.email as string | null,
          image: token.picture as string | null,
          emailVerified: null,
        };
      }
      return session;
    },
  },
}); 