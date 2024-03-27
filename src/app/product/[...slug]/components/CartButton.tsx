'use client';
import React, { useContext } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setCartItems } from '@/slices/productSlict';
import { Product, CartItems } from '@/types/globalTypes';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebaseConfig';
import { PiShoppingBagFill, PiShoppingBagLight } from 'react-icons/pi';
import {
  addCartItemsLocalStorage,
  deleteCartItemsLocalStorage,
} from '@/app/utils/localstorage';

interface CartButtonProps {
  product: Product;
  cartItems: CartItems;
}

const CartButton: React.FC<CartButtonProps> = ({ product, cartItems }) => {
  const currentUser = null;
  const dispatch = useAppDispatch();

  const toggleCartItem = async () => {
    const productID = product.id.toString();
    let newCartItems: CartItems = { ...cartItems };

    if (currentUser && currentUser.email) {
      if (newCartItems[productID]) {
        delete newCartItems[productID];
      } else {
        newCartItems[productID] = { product, count: 1 };
      }

      const userRef = doc(db, 'users', currentUser.email);
      await updateDoc(userRef, { cartItems: newCartItems });
    } else {
      if (newCartItems[productID]) {
        delete newCartItems[productID];
        deleteCartItemsLocalStorage([productID]);
      } else {
        newCartItems[productID] = { product, count: 1 };
        addCartItemsLocalStorage(product);
      }
    }

    dispatch(setCartItems(newCartItems));
  };

  return (
    <button
      onClick={toggleCartItem}
      aria-label="장바구니"
      //className="tooltip"
      // data-tip="장바구니 넣기"
    >
      {cartItems[product.id] ? (
        <PiShoppingBagFill style={{ fontSize: '28px' }} />
      ) : (
        <PiShoppingBagLight style={{ fontSize: '28px' }} />
      )}
    </button>
  );
};

export default CartButton;
