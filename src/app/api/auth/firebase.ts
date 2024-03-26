import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export const createUserOnFireBase = async (
  email: FormDataEntryValue,
  password: FormDataEntryValue
) => {
  const res = await createUserWithEmailAndPassword(
    auth,
    email.toString(),
    password.toString()
  )
    .then((userCredential) => userCredential.user)
    .catch((error) => error);

  return res;
};

export const signInUserWithEmailAndPass = async (
  email: FormDataEntryValue,
  password: FormDataEntryValue
) => {
  signInWithEmailAndPassword(auth, email.toString(), password.toString())
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const checkAuthStateChanged = () => {};

export const firebaseSignIn = async (email: string, password: string) => {
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
        name: user.email,
        email: user.email,
        displayName: user.displayName,
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
