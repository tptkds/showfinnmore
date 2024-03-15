'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Product } from '@/types/globalTypes';

import AddCartButton from './components/AddCartButton';
import { scrollToTop } from '@/utilities/app';

export default function Detail({ params }: { params: { slug: number } }) {
  const [curItem, setCurItem] = useState<Product>();
  const productList: Product[] = useAppSelector(
    (state) => state.product.productList
  );

  useEffect(() => {
    const item: Product | undefined = productList.find(
      (item) => item.id == params.slug
    );
    setCurItem(item);
  }, [productList, params.slug]);

  if (!curItem) {
    return;
  }
  return (
    <div
      className="h-full flex p-20 justify-center w800-max-padding text-sm sm-max-textsize-12"
      onLoad={() => scrollToTop()}
    >
      <div className="  w-3/6 flex justify-center items-start h-80svh">
        <div className="relative w-4/6 h-4/6">
          <Image
            src={curItem?.image}
            alt={curItem?.title}
            fill
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
      </div>
      <div className="w-3/6 h-full text-sm sm-max-textsize-12">
        <p>{curItem.title}</p>
        <p className="py-2.5">{curItem.description}</p>
        <p>${curItem.price}</p>
        <div className="flex flex-col mt-16">
          <button>BUY NOW</button>
          <AddCartButton item={curItem} />
        </div>
      </div>
    </div>
  );
}
