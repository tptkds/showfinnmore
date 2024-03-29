import { CARTITEMS_KEY } from '@/constants/localStorageKeys';
import { CartItems } from '@/types/globalTypes';

const getCartItemsLocalStorage = (): CartItems => {
  const jsonData = localStorage.getItem(CARTITEMS_KEY);
  if (!jsonData) return {};

  try {
    const cartItems: CartItems = JSON.parse(jsonData);
    return cartItems;
  } catch (error) {
    console.error('Parsing error in getCartItemsLocalStorage:', error);
    return {};
  }
};

export default getCartItemsLocalStorage;
