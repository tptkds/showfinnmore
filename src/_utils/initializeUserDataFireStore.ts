import { db } from '@/app/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
const initializeUserDataFireStore = async ({ email }: { email: string }) => {
  try {
    setDoc(doc(db, 'users', email), {
      wishlist: {},
      cartItems: {},
    });
    return 'success';
  } catch (error) {
    return 'error';
  }
};

export default initializeUserDataFireStore;
