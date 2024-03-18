'use client';
import CartButton from '@/app/product/[...slug]/components/CartButton';
import WishlistButton from '@/app/product/[...slug]/components/WishlistButton';
import { useAppSelector } from '@/hooks/useAppSelector';
import { CartItems, Wishlist } from '@/types/globalTypes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function WishlistComponent() {
  const wishlist: Wishlist = useAppSelector((state) => state.product.wishlist);
  const keysOfWishlist = [...Object.keys(wishlist)];
  const cartItems: CartItems = useAppSelector(
    (state) => state.product.cartItems
  );

  return keysOfWishlist.length !== 0 ? (
    <ul className="grid grid-cols-1 gap-8 h-full sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {keysOfWishlist.map((key) => {
        return (
          <li className="h-full" key={key}>
            <div className="h-4/5">
              <Link
                href={`/product/${key}`}
                className="flex items-center w-full h-full"
              >
                <Image
                  src={wishlist[key].image}
                  alt={wishlist[key].title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto', padding: '20%' }}
                  priority
                />
              </Link>
            </div>
            <div>
              <Link href={`/product/detail/${key}`}>{wishlist[key].title}</Link>
              <p className="my-2">${wishlist[key].price}</p>
            </div>

            <div className="flex">
              <div className="mr-2">
                <WishlistButton product={wishlist[key]} wishlist={wishlist} />
              </div>
              <div>
                <CartButton product={wishlist[key]} cartItems={cartItems} />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  ) : (
    <div className="flex justify-center items-center w-full">
      <p className="text-center  p-14 ">There are no favorite items</p>
    </div>
  );
}
