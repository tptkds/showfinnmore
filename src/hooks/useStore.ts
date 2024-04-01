import { resetCartItems, setCartItems } from '@/slices/cartSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { CartItems, Product, WishlistItems } from '@/types/globalTypes';
import { resetWishlistItems, setWishlistItems } from '@/slices/wishListSlice';
import getUserCartItems from '@/_utils/getUserCartItems';
import getUserWishlistItems from '@/_utils/getUserWishlistItems';
import getCartItemsLocalStorage from '@/_utils/getCartItemsLocalStorage';
import { useAppSelector } from './useAppSelector';
import checkItemExistsById from '@/utils/checkItemExistsById';
import { useSession } from 'next-auth/react';
import setCartItemsFireStore from '@/_utils/setCartItemsFireStore';
import setWishlistItemsFireStore from '@/_utils/setWishlistItemsFireStore';
import setCartItemsLocalStorage from '@/_utils/setCartItemsLocalStorage copy';

const useStore = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const wishlistItems = useAppSelector((state) => state.wishlist.wishlistItems);

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

  const toggleCartItem = (product: Product) => {
    if (checkItemExistsById(product.id, cartItems)) {
      removeCartItem(product);
    } else {
      addCartItem(product);
    }
  };

  const addCartItem = (product: Product) => {
    const newCartItems: CartItems = {
      ...cartItems,
      [product.id]: { product: product, count: 1 },
    };
    dispatch(setCartItems(newCartItems));
    if (status === 'unauthenticated') {
      setCartItemsLocalStorage(newCartItems);
    } else {
      if (session?.user.email)
        setCartItemsFireStore(newCartItems, session?.user.email);
    }
  };

  const removeCartItem = (product: Product) => {
    const { [product.id]: removeItem, ...newCartItems } = cartItems;
    dispatch(setCartItems(newCartItems));
    if (status === 'unauthenticated') {
      setCartItemsLocalStorage(newCartItems);
    } else {
      if (session?.user.email)
        setCartItemsFireStore(newCartItems, session?.user.email);
    }
  };

  const incrementQuantity = (product: Product) => {
    const newCartItem = {
      product: product,
      count: cartItems[product.id].count + 1,
    };
    const newCartItems = { ...cartItems, [product.id]: newCartItem };
    if (status === 'unauthenticated') {
      setCartItemsLocalStorage(newCartItems);
    } else {
      if (session?.user.email)
        setCartItemsFireStore(newCartItems, session?.user.email);
    }
  };

  const decrementQuantity = (product: Product) => {
    const newCartItem = {
      product: product,
      count: cartItems[product.id].count - 1,
    };
    const newCartItems = { ...cartItems, [product.id]: newCartItem };
    if (status === 'unauthenticated') {
      setCartItemsLocalStorage(newCartItems);
    } else {
      if (session?.user.email)
        setCartItemsFireStore(newCartItems, session?.user.email);
    }
  };

  const changeQuantity = (product: Product, newCount: number) => {
    const newCartItem = {
      product: product,
      count: newCount,
    };
    const newCartItems = { ...cartItems, [product.id]: newCartItem };
    if (status === 'unauthenticated') {
      setCartItemsLocalStorage(newCartItems);
    } else {
      if (session?.user.email)
        setCartItemsFireStore(newCartItems, session?.user.email);
    }
  };

  const toggleWishlistItems = (product: Product) => {
    if (checkItemExistsById(product.id, wishlistItems)) {
      removeWishlistItem(product);
    } else {
      addWishlistItem(product);
    }
  };

  const addWishlistItem = (product: Product) => {
    const newWishlistItems: WishlistItems = {
      ...wishlistItems,
      [product.id]: product,
    };
    dispatch(setWishlistItems(newWishlistItems));
    if (session?.user.email)
      setWishlistItemsFireStore(newWishlistItems, session?.user.email);
  };

  const removeWishlistItem = (product: Product) => {
    const { [product.id]: removeItem, ...newWishlistItems } = wishlistItems;
    dispatch(setWishlistItems(newWishlistItems));
    if (session?.user.email)
      setWishlistItemsFireStore(newWishlistItems, session?.user.email);
  };

  return {
    resetStore,
    initializeUserStore,
    initializeStore,
    cartItems,
    wishlistItems,
    toggleCartItem,
    toggleWishlistItems,
    incrementQuantity,
    decrementQuantity,
    changeQuantity,
  };
};

export default useStore;
