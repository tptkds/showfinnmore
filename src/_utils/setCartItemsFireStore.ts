import { db } from '@/app/firebaseConfig';
import { CartItems } from '@/types/globalTypes';
import { doc, DocumentReference, updateDoc } from 'firebase/firestore';

const setCartItemsFireStore = (newCartItems: CartItems, email: string) => {
  try {
    const userDocumentReference: DocumentReference = doc(db, 'users', email);
    updateDoc(userDocumentReference, { cartItems: newCartItems });
  } catch (error) {
    console.error('setting error in setCartItemsFireStore:', error);
  }
};

export default setCartItemsFireStore;
