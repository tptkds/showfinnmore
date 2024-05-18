import { db } from '@/app/firebaseConfig';
import { WishlistItems } from '@/types/globalTypes';
import { doc, DocumentReference, updateDoc } from 'firebase/firestore';

const setWishlistItemsFireStore = (
  newWishlistItems: WishlistItems,
  email: string,
) => {
  try {
    const userDocumentReference: DocumentReference = doc(db, 'users', email);
    updateDoc(userDocumentReference, { wishlistItems: newWishlistItems });
  } catch (error) {
    console.error('setting error in setWishlistItemsFireStore:', error);
  }
};

export default setWishlistItemsFireStore;
