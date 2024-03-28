import { auth } from '@/app/firebaseConfig';
import { registerUserProps } from '@/types/globalTypes';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import initializeUserDataFireStore from './initializeUserDataFireStore';
import updateDisplayNameFirebase from './updateDisplayNameFirebase';
import { FirebaseError } from 'firebase/app';
import { FirebaseAuthError } from '@/error/firebaseAuthError';

const signUpFirebase = async ({
  email,
  password,
  displayName,
}: registerUserProps): Promise<string> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    if (displayName !== '') await updateDisplayNameFirebase(user, displayName);
    await initializeUserDataFireStore({ email });
    return 'success';
  } catch (error) {
    if (error instanceof Error) {
      const firebaseError = error as FirebaseError;
      const code = firebaseError.code;
      const message = firebaseError.code;
      throw new FirebaseAuthError(code, message);
    } else {
      console.error('signUpFirebase Error:', error);
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  }
};

export default signUpFirebase;
