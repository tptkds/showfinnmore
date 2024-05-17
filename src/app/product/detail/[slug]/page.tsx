'use client';
import React, { useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import { useAppSelector } from '@/hooks/useAppSelector';
import Modal from '@/app/components/Modal';
import CartModalContents from './components/CartModalContents';
import { toggleModal } from '../../../../utils/modal';
import { useAppDispatch } from '@/hooks/useAppDispatch';

import { CartItems, Product } from '@/types/globalTypes';
import {
  getCartItemsLocalStorage,
  addCartItemsLocalStorage,
} from '../../../../utils/localstorage';
import { Skeleton } from '@/components/ui/skeleton';

interface DetailProps {
  params: {
    slug: string;
  };
}

const Detail: React.FC<DetailProps> = ({ params }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [curItem, setCurItem] = useState<Product | undefined>();
  const currentUser = null;

  const products: Product[] = useAppSelector((state) => state.product.products);

  useLayoutEffect(() => {
    const slugAsNumber = Number(params.slug);
    const item = products.find((products) => products.id === slugAsNumber);
    setCurItem(item);

    window.scrollTo(0, 0);
  }, [products, params.slug]);

  const purchase = () => {
    if (!currentUser) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }

    alert('구매가 완료되었습니다. (구매 내역은 개발 중입니다...)');
  };

  const dispatch = useAppDispatch();

  const addToCart = () => {
    setIsModalOpen(!isModalOpen);
    if (curItem) {
      addCartItemsLocalStorage(curItem);
      const newCartItems: CartItems | undefined = getCartItemsLocalStorage();
    }
  };

  return (
    <>
      <div className=" mt-14 lg:mx-20 flex flex-col items-center md:flex-row md:space-x-12 bg-white dark:bg-zinc-900 px-10 py-8 border dark:border-none">
        <div className="relative w-3/4 md:w-1/2 aspect-square bg-white">
          {curItem ? (
            <Image
              src={curItem?.image}
              alt={curItem?.title}
              fill
              sizes="100vw"
              style={{ objectFit: 'contain', padding: '16px' }}
              priority
            />
          ) : (
            <Skeleton className="w-1/2 aspect-square rounded-xl" />
          )}
        </div>
        <div className=" flex flex-col md:w-1/2 h-full">
          <div className="space-y-4 md:space-y-8">
            <h2 className="text-base md:text-2xl font-bold">
              {curItem?.title}
            </h2>
            <p className="text-sm max-h-[260px] block overflow-hidden">
              {curItem?.description}
            </p>
            <strong className="block text-xl">
              {(Number(curItem?.price) * 1000).toLocaleString() + '원'}
            </strong>
          </div>
          <div className="md:mx-0 mt-8 float-right sticky md:static  w-full flex flex-col md:flex-row items-center md:space-x-2 text-sm ">
            <button
              onClick={addToCart}
              className=" w-full md:w-1/2 border bg-white dark:hover:bg-zinc-200 dark:bg-white dark:disabled:bg-zinc-400 p-4 text-black dark:text-black  rounded hover:bg-zinc-700 transition disabled:bg-zinc-400"
            >
              장바구니
            </button>
            <button
              onClick={purchase}
              className="my-2 md:my-0 order-first	md:order-last w-full md:w-1/2 bg-zinc-900 dark:hover:bg-zinc-200 dark:bg-white dark:disabled:bg-zinc-400 p-4 text-white dark:text-black  rounded hover:bg-zinc-700 transition disabled:bg-zinc-400"
            >
              바로 구매
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Detail;
