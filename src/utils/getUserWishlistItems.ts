import { DocumentData } from 'firebase/firestore';
import getUserDataFireStore from '../_utils/getUserDataFireStore';
import { WishlistItems } from '@/types/globalTypes';

const getUserWishlistItems = async (email: string) => {
  try {
    const userSnapShot: DocumentData = await getUserDataFireStore(email);
    const wishlistItems: WishlistItems = userSnapShot.wishlistItems;
    return wishlistItems;
  } catch (error) {
    console.error('getUserWishlistItemsFireStore Error: ', error);
    throw new Error(`failed to get user's wishlist items`);
  }
};
export default getUserWishlistItems;
