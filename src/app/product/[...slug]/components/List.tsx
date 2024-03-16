'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { CartItems, Product, Wishlist } from '@/types/globalTypes';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
  CATEGIRIES,
  CATEGIRIES_MATCH,
  ITEMSPERPAGE,
} from '@/constants/product';
import CartButton from './CartButton';
import WishlistButton from './WishlistButton';
import Link from 'next/link';

export default function List() {
  const curCategory: string = useAppSelector((state) => state.product.category);
  const cartItems: CartItems = useAppSelector(
    (state) => state.product.cartItems
  );
  const wishlist: Wishlist = useAppSelector((state) => state.product.wishlist);
  const productList: Product[] = useAppSelector(
    (state) => state.product.productList
  );
  const currentPage: number = useAppSelector(
    (state) => state.product.currentPage
  );
  const [curProductList, setCurProductList] = useState<Product[]>([]);
  useEffect(() => {
    if (curCategory === 'all') setCurProductList(productList);
    else {
      const cartegoryIndex: number = CATEGIRIES.findIndex(
        (category) => category === curCategory
      );
      const filteredData: Product[] = productList.filter((product) => {
        return product.category === CATEGIRIES_MATCH[cartegoryIndex];
      });
      setCurProductList(filteredData);
    }
  }, [curCategory, productList]);

  const startIndex: number = ITEMSPERPAGE * (currentPage - 1);
  const endIndex: number = startIndex + ITEMSPERPAGE;
  const curProducts: Product[] = curProductList.slice(startIndex, endIndex);

  return (
    <>
      <ul className="grid grid-cols-1 gap-8 h-full sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {curProducts.map((product) => {
          return (
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
                    style={{ width: '100%', height: 'auto', padding: '20%' }}
                    priority
                  />
                </Link>
              </div>

              <div>
                <Link href={`/product/detail/${product.id}`}>
                  {product.title}
                </Link>
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
          );
        })}
      </ul>
    </>
  );
}
