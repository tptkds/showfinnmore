import React from 'react';
import User from './nav/User';
import LogoLink from './nav/LogoLink';
import Menu from './nav/Menu';
import WishlistLink from './nav/WishlistLink';
import CartLink from './nav/CartLink';
import MyPage from './nav/MyPage';
const Nav: React.FC = () => {
  return (
    <nav className="flex relative min-width-313 items-center m-4 header-bottom sticky h-16 shadow rounded-xl bg-zinc-100	 bg-opacity-80 dark:bg-black dark:bg-opacity-60 dark:text-white">
      <div className="flex basis-1/3 order-1 justify-center  lg:justify-normal lg:order-0 lg:ml-8 lg:order-0">
        <h1 className="lg:mr-2 font-normal flex items-center ">
          <LogoLink />
        </h1>
      </div>

      <div className="lg:flex-row-reverse flex basis-1/3 items-center order-0 h-full lg:order-1 lg:justify-evenly">
        <Menu />
      </div>

      <div className="flex basis-1/3 justify-end items-center order-2 text-sm">
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
};

export default Nav;
