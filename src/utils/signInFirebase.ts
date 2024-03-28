import { auth } from '@/app/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const signInFirebase = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    if (user) {
      return {
        id: user.uid,
        name: user.displayName,
        email: user.email,
      };
    }
    return null;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Authentication error:', error.message);
      throw error;
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

export default signInFirebase;
