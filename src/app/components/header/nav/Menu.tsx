'use client';
import React, { useRef } from 'react';
import DarkModeToggleButton from './DarkModeToggleButton';
import Link from 'next/link';
import { CATEGORIES } from '@/constants/product';
import { GrMenu } from 'react-icons/gr';

const Menu: React.FC = () => {
  const menu = useRef<HTMLUListElement>(null);
  const toggleMenu = () => {
    if (menu.current?.classList.contains('hidden')) {
      menu.current?.classList.remove('hidden');
    } else {
      menu.current?.classList.add('hidden');
    }
  };
  const openMenu = () => {
    menu.current?.classList.remove('hidden');
  };
  const hiddenMenu = () => {
    menu.current?.classList.add('hidden');
  };
  return (
    <>
      <div className="h-full">
        <button
          type="button"
          className="ml-8 flex h-full items-center lg:m-0 lg:hidden "
          onClick={toggleMenu}
          onMouseOver={openMenu}
          onMouseLeave={hiddenMenu}
          style={{ fontSize: '20px' }}
          aria-label="메뉴"
        >
          <GrMenu />
        </button>
      </div>

      <ul
        className=" lg:min-w-220 absolute left-4 top-full hidden	 bg-zinc-100 bg-opacity-80 p-4 text-sm font-normal shadow-md dark:bg-black dark:bg-opacity-60 dark:text-white lg:static lg:flex lg:w-full lg:basis-5/6 lg:justify-between lg:bg-transparent lg:p-0   lg:shadow-none dark:lg:bg-transparent"
        ref={menu}
        onMouseOver={openMenu}
        onMouseLeave={hiddenMenu}
      >
        {[...Object.keys(CATEGORIES)].map((catrgory) => (
          <li key={catrgory} className="p-2 lg:p-0">
            <Link
              href={`/product/${catrgory}/1`}
              onClick={() => {
                toggleMenu();
              }}
            >
              {catrgory.replace(/\b\w/g, (match) => match.toUpperCase())}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex p-2 lg:basis-1/6 lg:p-0">
        <DarkModeToggleButton />
      </div>
    </>
  );
};
export default Menu;
