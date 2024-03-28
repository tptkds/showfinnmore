'use client';
import React from 'react';
import Image from 'next/image';
import { CartItems, Product, Wishlist } from '@/types/globalTypes';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ITEMSPERPAGE } from '@/constants/product';
import CartButton from './CartButton';
import WishlistButton from './WishlistButton';
import Link from 'next/link';
import { useFilteredProductList } from '@/hooks/useFilteredProductList';

const List: React.FC = () => {
  const cartItems: CartItems = useAppSelector((state) => state.cart.cartItems);
  const wishlist: Wishlist = useAppSelector((state) => state.product.wishlist);
  const currentPage: number = useAppSelector(
    (state) => state.product.currentPage
  );
  const curProductList: Product[] = useFilteredProductList();

  const startIndex: number = ITEMSPERPAGE * (currentPage - 1);
  const endIndex: number = startIndex + ITEMSPERPAGE;
  const curProducts: Product[] = curProductList.slice(startIndex, endIndex);

  return (
    <ul className="grid grid-cols-1 gap-8 h-full sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {curProducts.map((product) => (
        <li key={product.id} className="h-full">
          <div className="h-4/5">
            <Link
              href={`/product/detail/${product.id}`}
              className="flex items-center w-full h-full relative"
            >
              <Image
                src={product.image}
                alt={product.title}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: '100%',
                  height: 'auto',
                  padding: '20%',
                }}
                priority
              />
            </Link>
          </div>
          <div>
            <Link href={`/product/detail/${product.id}`}>{product.title}</Link>
            <p className="my-2">${product.price}</p>
          </div>
          <div className="flex">
            <div className="mr-2">
              <WishlistButton product={product} wishlist={wishlist} />
            </div>
            <div>
              <CartButton product={product} cartItems={cartItems} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default List;
