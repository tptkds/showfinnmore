'use client';
import React, { useRef } from 'react';
import DarkModeToggleButton from './DarkModeToggleButton';
import Link from 'next/link';
import { CATEGORIES } from '@/constants/product';
import { GrMenu } from 'react-icons/gr';
import { RiCloseLargeLine } from 'react-icons/ri';

const Menu: React.FC = () => {
  const menu = useRef<HTMLUListElement>(null);

  const openMenu = () => {
    menu.current?.classList.remove('-translate-x-full');
    menu.current?.classList.add('block', 'translate-x-0');
  };

  const hiddenMenu = () => {
    menu.current?.classList.remove('block', 'translate-x-0');
    menu.current?.classList.add('-translate-x-full');
  };

  return (
    <>
      <div className="h-full">
        <button
          type="button"
          className="ml-8 flex h-full items-center lg:m-0 lg:hidden"
          onClick={openMenu}
          style={{ fontSize: '20px' }}
          aria-label="메뉴"
        >
          <GrMenu />
        </button>
      </div>

      <ul
        className="fixed left-0 top-0  h-svh min-w-[240px] -translate-x-full transform bg-white bg-zinc-100 p-4 pt-12 text-sm font-normal shadow-md transition-transform duration-300 dark:bg-black dark:text-white  lg:static lg:flex lg:h-auto lg:w-full lg:basis-5/6 lg:-translate-x-0 lg:justify-between lg:bg-transparent lg:bg-opacity-80 lg:p-0 lg:pt-0 lg:shadow-none dark:lg:bg-transparent"
        ref={menu}
      >
        <button
          className="absolute right-4 top-4 text-xl lg:hidden"
          onClick={hiddenMenu}
        >
          <RiCloseLargeLine />
        </button>
        {Object.keys(CATEGORIES).map((category) => (
          <li key={category} className="p-2 lg:p-0">
            <Link
              href={`/product/${category}/1`}
              onClick={() => {
                hiddenMenu();
              }}
            >
              {category.replace(/\b\w/g, (match) => match.toUpperCase())}
            </Link>
          </li>
        ))}
        <div className="flex hidden p-2 lg:basis-1/6 lg:p-0">
          <DarkModeToggleButton />
        </div>
      </ul>
      <div className="flex hidden p-2 lg:block lg:basis-1/6 lg:p-0">
        <DarkModeToggleButton />
      </div>
    </>
  );
};

export default Menu;
