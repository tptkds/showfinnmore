'use client';
import Link from 'next/link';
import React, { useRef } from 'react';
import { auth } from '../../../firebaseConfig';
import { useRouter } from 'next/navigation';
import { RiLoginBoxFill, RiLogoutBoxFill } from 'react-icons/ri';
import { getCartItemsLocalStorage } from '@/app/utils/localstorage';
import { CartItems } from '@/types/globalTypes';
import { setCartItems, setWishlist } from '@/slices/productSlict';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { signOut, useSession } from 'next-auth/react';

const User: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status } = useSession();
  const router = useRouter();
  const modal = useRef<HTMLDivElement | null>(null);

  const logout = () => {
    signOut();

    const cartItems: CartItems = getCartItemsLocalStorage();
    dispatch(setCartItems(cartItems));
    dispatch(setWishlist({}));
    modal.current?.classList.remove('hidden');
    setTimeout(() => {
      modal.current?.classList.add('hidden');
    }, 1500);
    router.push('/');
  };
  return (
    <>
      {status === 'authenticated' ? (
        <div className=" flex items-center ">
          <button
            onClick={logout}
            className="flex items-center"
            aria-label="로그아웃"
          >
            <RiLogoutBoxFill className="xl:mr-2" style={{ fontSize: '20px' }} />
            <p className="hidden xl:block">Logout</p>
          </button>
        </div>
      ) : (
        <div className=" flex items-center ">
          <Link href="/account/login" className="flex items-center">
            <RiLoginBoxFill className="xl:mr-2" style={{ fontSize: '20px' }} />
            <p className="hidden xl:block">Login</p>
          </Link>
        </div>
      )}
      <div
        className="w-full h-full fixed top-0 left-0 hidden transition-all"
        ref={modal}
        role="alertdialog"
        aria-modal="true"
      >
        <div className="absolute z-50 top-10  shadow-md search-modal-center bg-white w-80 h-32 shadow-lg flex items-center justify-center  overflow-y-auto dark:text-white  dark:bg-zinc-900">
          <p>정상적으로 로그아웃 되었습니다.</p>
        </div>
      </div>
    </>
  );
};
export default User;
