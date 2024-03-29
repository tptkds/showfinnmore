import { resetCartItems, setCartItems } from '@/slices/cartSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { CartItems, WishlistItems } from '@/types/globalTypes';
import { resetWishlistItems, setWishlistItems } from '@/slices/wishListSlice';
import getUserCartItems from '@/utils/getUserCartItems';
import getUserWishlistItems from '@/utils/getUserWishlistItems';

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

  return { resetStore, initializeUserStore };
};

export default useStore;
