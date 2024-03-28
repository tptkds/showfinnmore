import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { FirebaseError } from 'firebase/app';
import { FirebaseAuthError } from '@/error/firebaseAuthError';
import signInFirebase from '@/_utils/signInFirebase';

const authOptions: NextAuthOptions = NextAuth({
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    CredentialsProvider({
      name: 'showfinnmore',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;
        try {
          const user = await signInFirebase(
            credentials.email,
            credentials.password
          );
          if (user) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
            };
          }
          return null;
        } catch (error) {
          if (error instanceof Error) {
            const firebaseError = error as FirebaseError;
            const errorCode = firebaseError.code;
            const message = firebaseError.message;

            throw new FirebaseAuthError(errorCode, message);
          } else {
            throw new Error('알 수 없는 에러가 발생했습니다.');
          }
        }
      },
    }),
  ],
  pages: {
    signIn: '/account/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
});

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
