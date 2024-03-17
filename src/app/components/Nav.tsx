import React from 'react';
import Search from './Search';
import User from './User';
import LogoLink from './LogoLink';
import Menu from './Menu';
import WishlistLink from './WishlistLink';
import CartLink from './CartLink';
import MyPage from './MyPage';

export default function Nav() {
  return (
    <nav className="flex relative min-width-313 items-center m-4 header-bottom sticky h-16 shadow-lg rounded-xl bg-zinc-100	 bg-opacity-80 dark:bg-black dark:bg-opacity-60 dark:text-white">
      <div className="flex basis-1/3 order-1 justify-center  lg:justify-normal lg:order-0 lg:ml-8 lg:order-0">
        <h1 className="lg:mr-2 font-normal flex items-center ">
          <LogoLink />
        </h1>
      </div>

      <div className="flex basis-1/3 items-center order-0  lg:order-1 lg:justify-evenly">
        <Menu />
      </div>

      <div className="flex basis-1/3 justify-end items-center order-2">
        <div className="mr-2 sm:mr-4">
          <MyPage />
        </div>
        <div className="mr-2 sm:mr-4">
          <WishlistLink />
        </div>
        <div className="mr-2 sm:mr-4">
          <CartLink />
        </div>
        <div className="mr-8">
          <User />
        </div>
      </div>
    </nav>
  );
}
