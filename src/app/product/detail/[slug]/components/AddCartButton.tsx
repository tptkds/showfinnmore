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
  return (
    <>
      <button
        onClick={handleClick}
        aria-label="장바구니에 담기"
        className="mt-4 w-full lg:w-1/2  bg-zinc-900 dark:hover:bg-zinc-200 dark:bg-white dark:disabled:bg-zinc-400 p-4 text-white dark:text-black  rounded hover:bg-zinc-700 transition disabled:bg-zinc-400"
      >
        장바구니에 담기
      </button>
    </>
  );
};
export default AddCartButton;
