import { CartItems } from '@/types/globalTypes';
import { User } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebaseConfig';
import {
  deleteCartItemsLocalStorage,
  getCartItemsLocalStorage,
  setCartItemsLocalStorage,
} from '@/utilities/localstorage';

export const updateCartItemsInFirestore = async (
  currentUser: User,
  newCartItems: CartItems
) => {
  const userRef = doc(db, 'users', currentUser.email);
  await updateDoc(userRef, {
    cartItems: newCartItems,
  });
};

export const updateCartItemsInLocalStorage = (newCartItems: CartItems) => {
  setCartItemsLocalStorage(newCartItems);
};

export const deleteCartItem = (
  cartItems: CartItems,
  itemKey: string,
  currentUser: User | null
) => {
  const newCartItems = { ...cartItems };
  delete newCartItems[itemKey];

  if (currentUser) {
    updateCartItemsInFirestore(currentUser, newCartItems);
  } else {
    updateCartItemsInLocalStorage(newCartItems);
  }

  return newCartItems;
};
