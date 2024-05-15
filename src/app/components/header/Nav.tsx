import React from 'react';
import User from './nav/User';
import LogoLink from './nav/LogoLink';
import Menu from './nav/Menu';
import WishlistLink from './nav/WishlistLink';
import CartLink from './nav/CartLink';
import MyPage from './nav/MyPage';
const Nav: React.FC = () => {
  return (
    <nav className="flex relative min-width-313 items-center sm:m-4 header-bottom sticky h-16 shadow sm:rounded-xl bg-zinc-100	 bg-opacity-80 dark:bg-black dark:bg-opacity-60 dark:text-white">
      <div className="flex basis-1/3 order-1 justify-center  lg:justify-normal lg:order-0 lg:ml-8 lg:order-0">
        <h1 className="hidden sm:block lg:mr-2 font-normal flex items-center ">
          <LogoLink />
        </h1>
      </div>

      <div className="lg:flex-row-reverse flex basis-1/3 items-center order-0 h-full lg:order-1 lg:justify-evenly">
        <Menu />
      </div>

      <div className="flex mr-8 space-x-3 basis-1/3 justify-end items-center order-2 text-sm text-sm">
        <div className="">
          <MyPage />
        </div>
        <div className="">
          <WishlistLink />
        </div>
        <div className="">
          <CartLink />
        </div>
        <div>
          <User />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
