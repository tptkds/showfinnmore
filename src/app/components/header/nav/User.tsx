'use client';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { auth } from '../../../firebaseConfig';
import { useRouter } from 'next/navigation';
import { RiLoginBoxFill, RiLogoutBoxFill } from 'react-icons/ri';
import { getCartItemsLocalStorage } from '../../../../utils/localstorage';
import { CartItems } from '@/types/globalTypes';
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
    // dispatch(setCartItems(cartItems));
    // dispatch(setWishlist({}));
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
        className="fixed left-0 top-0 hidden h-full w-full transition-all"
        ref={modal}
        role="alertdialog"
        aria-modal="true"
      >
        <div className="search-modal-center absolute top-10  z-50 flex h-32 w-80 items-center justify-center overflow-y-auto bg-white shadow-lg  shadow-md dark:bg-zinc-900  dark:text-white">
          <p>정상적으로 로그아웃 되었습니다.</p>
        </div>
      </div>
    </>
  );
};
export default User;
