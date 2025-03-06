import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import prisma from '@lib/db'; // Import your Prisma client
import { JWT } from 'next-auth/jwt';  // Import JWT type
import { Session, User } from 'next-auth';  // Import Session and User type from NextAuth

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'test@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and Password are required.');
        }

        // Query the database for the user
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error('Invalid email or password');
        }

        // Compare the password with the stored hash
        const isMatch = await bcrypt.compare(credentials.password, user.password);

        if (!isMatch) {
          throw new Error('Invalid email or password');
        }

        // Return user object on successful authentication
        return { id: String(user.id), email: user.email }; // Return a user object
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;  // Add user id to the token
        token.email = user.email;  // Add user email to the token
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && typeof token.id === 'string') {
        session.user.id = token.id;  // Add user id to the session
      }
      if (token && typeof token.email === 'string') {
        session.user.email = token.email;  // Add user email to the session
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt', // Use JWT for session strategy
  },
};

export default NextAuth(authOptions);
