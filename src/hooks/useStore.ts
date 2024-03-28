import { resetCartItems, setCartItems } from '@/slices/cartSlice';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { CartItems, WishlistItems } from '@/types/globalTypes';
import getUserCartItemsFireStore from '@/_utils/getUserCartItemsFireStore';
import getUserWishlistItemsFireStore from '@/_utils/getUserWishlistItemsFireStore';
import { resetWishlistItems, setWishlistItems } from '@/slices/wishListSlice';
const useStore = () => {
  const dispatch = useAppDispatch();
  const resetStore = () => {
    dispatch(resetCartItems());
    dispatch(resetWishlistItems());
  };

  const initializeUserStore = async () => {
    const cartItems: CartItems = await getUserCartItemsFireStore();
    const wishlistItems: WishlistItems = await getUserWishlistItemsFireStore();
    dispatch(setCartItems(cartItems));
    dispatch(setWishlistItems(wishlistItems));
  };
  return { resetStore, initializeUserStore };
};

export default useStore;
