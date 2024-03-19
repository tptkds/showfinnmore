import Link from 'next/link';
import React from 'react';
import { IoBagSharp } from 'react-icons/io5';

export default function CartLink() {
  return (
    <div
      className=" flex items-center "
      //data-tip="Cart"
    >
      <Link href="/cart" className="flex items-center">
        <IoBagSharp className="xl:mr-2" style={{ fontSize: '20px' }} />
        <p className="hidden xl:block">Cart</p>
      </Link>
    </div>
  );
}
