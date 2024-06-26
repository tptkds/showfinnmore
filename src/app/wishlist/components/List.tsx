'use client';

import { useAppSelector } from '@/hooks/useAppSelector';
import { CartItems, WishlistItems } from '@/types/globalTypes';
import React from 'react';
import CartProduct from './CartProduct';

const WishlistComponent: React.FC = () => {
  const wishlist: WishlistItems = useAppSelector(
    (state) => state.wishlist.wishlistItems,
  );
  const keysOfWishlist = [...Object.keys(wishlist)];
  const cartItems: CartItems = useAppSelector((state) => state.cart.cartItems);

  return keysOfWishlist.length !== 0 ? (
    <ul className="grid h-full grid-cols-2 gap-2 lg:grid-cols-4 ">
      {keysOfWishlist.map((key) => (
        <CartProduct
          key={key}
          product={wishlist[key]}
          wishlist={wishlist}
          cartItems={cartItems}
        />
      ))}
    </ul>
  ) : (
    <div className="flex w-full items-center justify-center">
      <p className="p-14  text-center ">There are no favorite items</p>
    </div>
  );
};
export default WishlistComponent;
