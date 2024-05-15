'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { PiHeartStraightFill } from 'react-icons/pi';

const WishlistLink: React.FC = () => {
  const { status } = useSession();

  return (
    <div
      className=" flex items-center "
      //data-tip="Wish List"
    >
      <Link
        href="/wishlist"
        className="flex items-center"
        onClick={(e) => {
          if (status == 'unauthenticated') {
            e.preventDefault();
            alert('로그인 후 이용 가능합니다.');
            return;
          }
        }}
      >
        <PiHeartStraightFill
          className=" xl:mr-2"
          style={{ fontSize: '20px' }}
        />
        <p className="hidden xl:block">Wish List</p>
      </Link>
    </div>
  );
};
export default WishlistLink;
