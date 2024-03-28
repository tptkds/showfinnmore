import { resetCartItems } from '@/slices/cartSlice';
import { resetWishlist } from '@/slices/wishListSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
const useStore = () => {
  const dispatch = useAppDispatch();
  const resetStore = () => {
    dispatch(resetCartItems());
    dispatch(resetWishlist());
  };
  return { resetStore };
};

export default useStore;
