import getUserDataFireStore from '@/_utils/getUserDataFireStore';
import { CartItems } from '@/types/globalTypes';
import { DocumentData } from 'firebase/firestore';

const getUserCartItems = async (email: string) => {
  try {
    const userSnapShot: DocumentData = await getUserDataFireStore(email);
    const cartItems: CartItems = userSnapShot.cartItems;
    return cartItems;
  } catch (error) {
    console.error('getUserCartItemsFireStore Error: ', error);
    throw new Error(`failed to get user's cart items`);
  }
};
export default getUserCartItems;
