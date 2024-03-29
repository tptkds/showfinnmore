import { resetCartItems, setCartItems } from '@/slices/cartSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { CartItems, WishlistItems } from '@/types/globalTypes';
import { resetWishlistItems, setWishlistItems } from '@/slices/wishListSlice';
import getUserCartItems from '@/_utils/getUserCartItems';
import getUserWishlistItems from '@/_utils/getUserWishlistItems';
import getCartItemsLocalStorage from '@/_utils/getCartItemsLocalStorage';

const useStore = () => {
  const dispatch = useAppDispatch();

  const resetStore = () => {
    dispatch(resetCartItems());
    dispatch(resetWishlistItems());
  };

  const initializeUserStore = async (email: string) => {
    const cartItems: CartItems = await getUserCartItems(email);
    const wishlistItems: WishlistItems = await getUserWishlistItems(email);
    dispatch(setCartItems(cartItems));
    dispatch(setWishlistItems(wishlistItems));
  };

  const initializeStore = async () => {
    const cartItems: CartItems = getCartItemsLocalStorage();
    dispatch(setCartItems(cartItems));
  };

  return { resetStore, initializeUserStore, initializeStore };
};

export default useStore;
