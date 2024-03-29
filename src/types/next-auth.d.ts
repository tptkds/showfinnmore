import { User } from 'firebase/auth';
import { DefaultSession } from 'next-auth';
import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user: {
      name: string | null;
      email: string | null;
      id: string | null;
    };
  }
}
