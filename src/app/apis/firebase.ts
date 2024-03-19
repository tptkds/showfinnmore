import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';

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

export const getUserOnFireBase = async (
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
