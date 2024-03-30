'use client';
import React from 'react';
import Image from 'next/image';
import { CartItems, Product, WishlistItems } from '@/types/globalTypes';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ITEMS_PER_PAGE } from '@/constants/product';

import Link from 'next/link';

import WishlistButton from './productList/WishlistButton';
import CartButton from './productList/CartButton';
import { useFilteredProductList } from '@/hooks/useFilteredProductList';

const ProductList: React.FC = () => {
  const cartItems: CartItems = useAppSelector((state) => state.cart.cartItems);
  const wishlist: WishlistItems = useAppSelector(
    (state) => state.wishlist.wishlistItems
  );
  const currentPage: number = useAppSelector(
    (state) => state.product.currentPage
  );

  const curProductList: Product[] = useFilteredProductList();
  console.log(curProductList);

  const startIndex: number = ITEMS_PER_PAGE * (currentPage - 1);
  const endIndex: number = startIndex + ITEMS_PER_PAGE;
  const curProducts: Product[] = curProductList.slice(startIndex, endIndex);
  console.log(curProducts);
  return (
    <ul className="grid grid-cols-1 gap-8 h-full sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {curProductList.map((product) => (
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

export default ProductList;
