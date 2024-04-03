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
      removeCartItem(product.id);
    } else {
      addCartItem(product);
    }
  };

  const updateCartItems = (cartItems: CartItems) => {
    dispatch(setCartItems(cartItems));
    if (status === 'unauthenticated') {
      setCartItemsLocalStorage(cartItems);
    } else {
      if (session?.user.email)
        setCartItemsFireStore(cartItems, session?.user.email);
    }
  };

  const addCartItem = (product: Product) => {
    const newCartItems: CartItems = {
      ...cartItems,
      [product.id]: { product: product, count: 1, isChecked: true },
    };
    updateCartItems(newCartItems);
  };

  const removeCartItems = (itemIds: string[] | number[]) => {
    let newCartItems = { ...cartItems };
    itemIds.forEach((itemId) => {
      delete newCartItems[Number(itemId)];
    });
    updateCartItems(newCartItems);
  };

  const removeCartItem = (itemId: string | number) => {
    const { [itemId]: removeItem, ...newCartItems } = cartItems;
    updateCartItems(newCartItems);
  };

  const incrementQuantity = (
    product: Product,
    count: number,
    isChecked: boolean
  ) => {
    if (count + 1 >= 10000) return;
    const newCartItem = {
      product: product,
      count: count + 1,
      isChecked: isChecked,
    };
    const newCartItems = { ...cartItems, [product.id]: newCartItem };
    updateCartItems(newCartItems);
  };

  const decrementQuantity = (
    product: Product,
    count: number,
    isChecked: boolean
  ) => {
    if (count - 1 < 1) return;
    const newCartItem = {
      product: product,
      count: count - 1,
      isChecked: isChecked,
    };
    const newCartItems = { ...cartItems, [product.id]: newCartItem };
    updateCartItems(newCartItems);
  };

  const changeQuantity = (
    product: Product,
    newCount: number,
    isChecked: boolean
  ) => {
    const newCartItem = {
      product: product,
      count: newCount,
      isChecked: isChecked,
    };
    const newCartItems = { ...cartItems, [product.id]: newCartItem };
    updateCartItems(newCartItems);
  };

  const toggleAllChecked = (cartItems: CartItems, isChecked: boolean) => {
    const newCartItems = JSON.parse(JSON.stringify(cartItems));
    Object.keys(newCartItems).forEach((itemId) => {
      newCartItems[itemId].isChecked = isChecked;
    });
    updateCartItems(newCartItems);
  };

  const toggleChecked = (cartItems: CartItems, itemId: number | string) => {
    const newCartItem = {
      product: cartItems[itemId].product,
      count: cartItems[itemId].count,
      isChecked: !cartItems[itemId].isChecked,
    };
    const newCartItems = { ...cartItems, [itemId]: newCartItem };

    updateCartItems(newCartItems);
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
    removeCartItem,
    removeCartItems,
    toggleAllChecked,
    toggleChecked,
  };
};

export default useStore;
