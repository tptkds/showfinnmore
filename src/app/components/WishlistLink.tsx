import Link from 'next/link';
import React from 'react';
import { FiHeart } from 'react-icons/fi';
import { PiHeartStraightFill } from 'react-icons/pi';

export default function WishlistLink() {
  return (
    <div
      className=" flex items-center "
      //data-tip="Wish List"
    >
      <Link href="/wishlist" className="flex items-center">
        <PiHeartStraightFill
          className=" xl:mr-2"
          style={{ fontSize: '20px' }}
        />
        <p className="hidden xl:block">Wish List</p>
      </Link>
    </div>
  );
}
