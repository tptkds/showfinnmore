'use client';
import Link from 'next/link';
import React, { useContext, useRef } from 'react';
import { auth } from '../firebaseConfig';
import { AuthContext } from '../AuthProvider';
import { useRouter } from 'next/navigation';
import { RiLoginBoxFill, RiLogoutBoxFill } from 'react-icons/ri';
import { getCartItemsLocalStorage } from '@/utilities/localstorage';
import { CartItems } from '@/types/globalTypes';
import { setCartItems, setWishlist } from '@/slices/productSlict';
import { useAppDispatch } from '@/hooks/useAppDispatch';

export default function User() {
  const dispatch = useAppDispatch();
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const router = useRouter();
  const modal = useRef<HTMLDivElement | null>(null);
  const logout = () => {
    setCurrentUser(null);
    auth.signOut();

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
      {currentUser ? (
        <div
          className=" flex items-center "
          //data-tip="Logout"
        >
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
        <div
          className=" flex items-center "
          // data-tip="Login"
        >
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
}
