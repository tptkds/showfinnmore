import { auth } from '@/app/firebaseConfig';
import { User, signInWithEmailAndPassword } from 'firebase/auth';
interface SignInResponse {
  user: User;
}
const signInFirebase = async (
  email: string,
  password: string,
): Promise<SignInResponse | null> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user: User = userCredential.user;
    if (user) {
      return {
        user,
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
