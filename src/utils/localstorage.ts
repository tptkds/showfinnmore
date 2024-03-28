import { CartItems, Product } from '@/types/globalTypes';

export const addCartItemsLocalStorage = (item: Product) => {
  const cartItems: CartItems | never[] = getCartItemsLocalStorage();
  const key: number = item.id;
  const product: Product = item;

  if (!cartItems || Object.keys(cartItems).length === 0) {
    const newCartItems = { [key]: { product: product, count: 1 } };
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  } else {
    let newCartItems = { ...cartItems };
    if (key in cartItems) {
      const curCount = cartItems[key].count;
      const nextCount = curCount + 1;
      newCartItems = {
        ...cartItems,
        [key]: { product: product, count: nextCount },
      };
    } else {
      newCartItems = {
        ...cartItems,
        [key]: { product: product, count: 1 },
      };
    }
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  }
};

export const setCartItemsLocalStorage = (cartItems: CartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const getCartItemsLocalStorage = (): CartItems => {
  if (typeof window === 'undefined') return {};
  const jsonString = localStorage.getItem('cartItems');
  if (jsonString) {
    const parsedData: CartItems = JSON.parse(jsonString);
    return parsedData;
  }
  return {};
};

export const deleteCartItemsLocalStorage = (keys: string[]) => {
  let newCartItems: CartItems = getCartItemsLocalStorage();
  keys.forEach((key) => {
    delete newCartItems[key];
  });
  localStorage.setItem('cartItems', JSON.stringify(newCartItems));
};
