import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setCartItems } from '@/slices/productSlict';
import { CartItems, Product } from '@/types/globalTypes';
import {
  getCartItemsLocalStorage,
  addCartItemsLocalStorage,
} from '@/utilities/localstorage';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';

interface AddCartButtonProps {
  item: Product;
}

const AddCartButton: React.FC<AddCartButtonProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const modal = useRef<HTMLDivElement | null>(null);
  const modalBackground = useRef<HTMLDivElement | null>(null);

  const handleClick = (e: any) => {
    e.preventDefault();
    if (e.target.name === 'goCart') {
      router.push('/cart');
    } else if (e.target.name === 'continueShopping') {
      modal.current?.classList.add('hidden');
      modalBackground.current?.classList.add('hidden');
    } else {
      addCartItemsLocalStorage(item);
      const newCartItems: CartItems | undefined = getCartItemsLocalStorage();
      if (newCartItems !== undefined) dispatch(setCartItems(newCartItems));
      else dispatch(setCartItems({}));
      modal.current?.classList.remove('hidden');
      modalBackground.current?.classList.remove('hidden');
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        aria-label="장바구니에 담기"
        className="mt-4 w-full lg:w-1/2  bg-zinc-900 dark:hover:bg-zinc-200 dark:bg-white dark:disabled:bg-zinc-400 p-4 text-white dark:text-black  rounded hover:bg-zinc-700 transition disabled:bg-zinc-400"
      >
        장바구니에 담기
      </button>
      <div
        className="absolute dark:bg-black flex flex-col modal-center shadow-md items-center pt-8 z-30 rounded-box hidden w-96 "
        ref={modal}
        aria-modal="true"
        role="alertdialog"
      >
        <p className=" mb-4">상품이 장바구니에 담겼어요.</p>
        <div className="flex flex-row w-full">
          <button
            aria-label="장바구니로 이동"
            name="goCart"
            onClick={handleClick}
            className="mr-8  bg-zinc-900 dark:hover:bg-zinc-200 dark:bg-white w-1/2 dark:disabled:bg-zinc-400 py-2 px-4 text-white dark:text-black rounded hover:bg-zinc-700 transition disabled:bg-zinc-400"
          >
            장바구니로 이동
          </button>
          <button
            aria-label="계속 쇼핑하기"
            name="continueShopping"
            onClick={handleClick}
            className="w-1/2 bg-zinc-900 dark:hover:bg-zinc-200 dark:bg-white dark:disabled:bg-zinc-400 py-2 px-4 text-white dark:text-black  rounded hover:bg-zinc-700 transition disabled:bg-zinc-400"
          >
            계속 쇼핑하기
          </button>
        </div>
      </div>
      <div
        className="bg-black bg-opacity-30 w-full h-full fixed top-0 left-0 hidden z-20 absolute"
        ref={modalBackground}
      ></div>
    </>
  );
};
export default AddCartButton;
