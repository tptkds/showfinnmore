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
      //  if (newCartItems !== undefined) dispatch(setCartItems(newCartItems));
      // else dispatch(setCartItems({}));
    }
  };

  return (
    <>
      <div className="mt-14 mx-20 flex space-x-12 bg-white dark:bg-zinc-900 px-10 py-8 border">
        <div className="relative w-1/2 aspect-square bg-white">
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
        <div className="w-1/2 space-y-8">
          <h2 className="text-2xl font-bold">{curItem?.title}</h2>
          <p className="text-sm max-h-[260px] block overflow-hidden">
            {curItem?.description}
          </p>
          <strong className="block text-xl">
            {(Number(curItem?.price) * 1000).toLocaleString() + '원'}
          </strong>
          <div className="flex flex-row space-x-2 mt-4 text-sm sm:mt-16 items-center">
            <button
              onClick={addToCart}
              className="mt-4 w-full border bg-white dark:hover:bg-zinc-200 dark:bg-white dark:disabled:bg-zinc-400 p-4 text-black dark:text-black  rounded hover:bg-zinc-700 transition disabled:bg-zinc-400"
            >
              장바구니에 담기
            </button>
            <button
              onClick={purchase}
              className="mt-4 w-full bg-zinc-900 dark:hover:bg-zinc-200 dark:bg-white dark:disabled:bg-zinc-400 p-4 text-white dark:text-black  rounded hover:bg-zinc-700 transition disabled:bg-zinc-400"
            >
              바로 구매하기
            </button>
          </div>
        </div>
      </div>
      {/* <div className="mt-14 flex flex-col justify-center w-full items-center">
        <div className="flex p-20 justify-center w800-max-padding  sm-max-textsize-12">
          <div className="w-3/6 flex justify-center items-start bg-white items-center mx-4 ">
            <div className="relative w-full md:w-2/3 lg:w-1/2 aspect-square h-full">
              {curItem ? (
                <Image
                  src={curItem?.image}
                  alt={curItem?.title}
                  fill
                  sizes="100vw"
                  style={{ objectFit: 'contain' }}
                  priority
                />
              ) : (
                <div className="skeleton w-full h-full"></div>
              )}
            </div>
          </div>
          <div
            className="w-3/6 h-full  sm-max-textsize-12"
            style={{ padding: '1%' }}
          >
            <p>{curItem?.title}</p>
            <p className="py-2.5">{curItem?.description}</p>
            <p>{(Number(curItem?.price) * 1000).toLocaleString()}원</p>
            <div className="flex flex-col mt-4 text-sm sm:mt-16 items-center">
              <button
                aria-label="바로 구매하기"
                onClick={purchase}
                className="mt-4 w-full lg:w-1/2 bg-zinc-900 dark:hover:bg-zinc-200 dark:bg-white dark:disabled:bg-zinc-400 p-4 text-white dark:text-black  rounded hover:bg-zinc-700 transition disabled:bg-zinc-400"
              >
                바로 구매하기
              </button>
              <button
                aria-label="장바구니에 담기"
                onClick={addToCart}
                className="mt-4 w-full lg:w-1/2  bg-zinc-900 dark:hover:bg-zinc-200 dark:bg-white dark:disabled:bg-zinc-400 p-4 text-white dark:text-black  rounded hover:bg-zinc-700 transition disabled:bg-zinc-400"
              >
                장바구니에 담기
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isModalOpen={isModalOpen}
        toggleModal={() => toggleModal(isModalOpen, setIsModalOpen)}
      >
        <CartModalContents
          toggleModal={() => toggleModal(isModalOpen, setIsModalOpen)}
        />
      </Modal> */}
    </>
  );
};
export default Detail;
