import {
  DocumentReference,
  DocumentSnapshot,
  getDoc,
} from 'firebase/firestore';

import { db } from '@/app/firebaseConfig';
import { doc } from 'firebase/firestore';

const getUserDataFireStore = async (email: string) => {
  try {
    const userDocumentReference: DocumentReference = doc(db, 'users', email);
    if (!userDocumentReference)
      throw new Error('Failed to get user document reference');

    const userSnapShot: DocumentSnapshot = await getDoc(userDocumentReference);

    if (!userSnapShot.exists()) {
      throw new Error(`UserSnapshot isn't exists`);
    }

    return userSnapShot.data();
  } catch (error) {
    console.error('Failed to get user snapshot:', error);
    throw new Error('Failed to get user snapshot');
  }
};
export default getUserDataFireStore;
