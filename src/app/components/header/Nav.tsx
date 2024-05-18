import React from 'react';
import User from './nav/User';
import LogoLink from './nav/LogoLink';
import Menu from './nav/Menu';
import WishlistLink from './nav/WishlistLink';
import CartLink from './nav/CartLink';
import MyPage from './nav/MyPage';
const Nav: React.FC = () => {
  return (
    <nav className="min-width-313 header-bottom relative sticky flex h-16 items-center bg-zinc-100 bg-opacity-80 shadow dark:bg-black	 dark:bg-opacity-60 dark:text-white sm:m-4 sm:rounded-xl">
      <div className="lg:order-0 lg:order-0 order-1 flex  basis-1/3 justify-center lg:ml-8 lg:justify-normal">
        <h1 className="flex hidden items-center font-normal sm:block lg:mr-2 ">
          <LogoLink />
        </h1>
      </div>

      <div className="order-0 flex h-full basis-1/3 items-center lg:order-1 lg:flex-row-reverse lg:justify-evenly">
        <Menu />
      </div>

      <div className="order-2 mr-8 flex basis-1/3 items-center justify-end space-x-3 text-sm text-sm">
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
