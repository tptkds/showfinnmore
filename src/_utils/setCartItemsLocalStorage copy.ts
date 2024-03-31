import { CARTITEMS_KEY } from '@/constants/localStorageKeys';
import { CartItems } from '@/types/globalTypes';

const setCartItemsLocalStorage = (newCartItems: CartItems) => {
  try {
    localStorage.setItem(CARTITEMS_KEY, JSON.stringify(newCartItems));
  } catch (error) {
    console.error('setting error in setCartItemsLocalStorage:', error);
  }
};

export default setCartItemsLocalStorage;
