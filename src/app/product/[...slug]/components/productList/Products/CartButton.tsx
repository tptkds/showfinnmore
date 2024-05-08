'use client';
import React from 'react';
import { Product, CartItems } from '@/types/globalTypes';
import { PiShoppingBagFill, PiShoppingBagLight } from 'react-icons/pi';
import useStore from '@/hooks/useStore';

interface CartButtonProps {
  product: Product;
  cartItems: CartItems;
}

const CartButton: React.FC<CartButtonProps> = ({ product, cartItems }) => {
  const { toggleCartItem } = useStore();

  return (
    <button
      onClick={() => {
        toggleCartItem(product);
      }}
      aria-label="장바구니"
    >
      {cartItems[product.id] ? (
        <PiShoppingBagFill className="text-xl" />
      ) : (
        <PiShoppingBagLight className="text-xl" />
      )}
    </button>
  );
};

export default CartButton;
