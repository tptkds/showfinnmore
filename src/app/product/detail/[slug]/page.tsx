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
      <div className=" flex flex-col items-center space-y-8 border bg-white px-10 dark:border-none dark:bg-zinc-900 md:flex-row md:space-x-12 md:space-y-0 md:py-8 lg:mx-20">
        <div className="relative aspect-square w-3/4 bg-white md:w-1/2">
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
            <Skeleton className="aspect-square w-1/2 rounded-xl" />
          )}
        </div>
        <div className=" flex h-full flex-col md:w-1/2">
          <div className="space-y-4 md:space-y-8">
            <h2 className="text-base font-bold md:text-2xl">
              {curItem?.title}
            </h2>
            <p className="block max-h-[260px] overflow-hidden text-sm">
              {curItem?.description}
            </p>
            <strong className="block text-xl">
              {(Number(curItem?.price) * 1000).toLocaleString() + '원'}
            </strong>
          </div>
          <div className="sticky float-right mt-8 flex w-full  flex-col items-center text-sm md:static md:mx-0 md:flex-row md:space-x-2 ">
            <button
              onClick={addToCart}
              className=" w-full rounded border bg-white p-4 text-black transition hover:bg-zinc-100 disabled:bg-zinc-400  dark:bg-white dark:text-black dark:hover:bg-zinc-200 md:w-1/2"
            >
              장바구니
            </button>
            <button
              onClick={purchase}
              className="order-first my-2 w-full	rounded bg-zinc-900 p-4 text-white transition hover:bg-zinc-700 disabled:bg-zinc-400 dark:bg-white dark:text-black dark:hover:bg-zinc-200  dark:disabled:bg-zinc-400 md:order-last md:my-0 md:w-1/2"
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
