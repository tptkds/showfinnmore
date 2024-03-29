'use client';
import React, { useRef } from 'react';
import DarkModeToggleButton from './DarkModeToggleButton';
import Link from 'next/link';
import { CATEGIRIES } from '@/constants/product';
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
      <div
        className="h-full"
        //className="tooltip"
        //data-tip="Menu"
      >
        <button
          type="button"
          className="flex lg:hidden ml-8 lg:m-0 h-full items-center "
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
        className=" hidden text-sm dark:bg-opacity-60 bg-opacity-80 font-normal	 shadow-md absolute bg-zinc-100 dark:bg-black dark:lg:bg-transparent dark:text-white p-4 top-full left-4 lg:basis-5/6 lg:shadow-none lg:bg-transparent lg:static lg:p-0 lg:flex lg:justify-between   lg:w-full lg:min-w-220"
        ref={menu}
        onMouseOver={openMenu}
        onMouseLeave={hiddenMenu}
      >
        {CATEGIRIES.map((v) => (
          <li key={v} className="p-2 lg:p-0">
            <Link href={`/product/${v}/1`} onClick={toggleMenu}>
              {v.replace(/\b\w/g, (match) => match.toUpperCase())}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex p-2 lg:p-0 lg:basis-1/6">
        <DarkModeToggleButton />
      </div>
    </>
  );
};
export default Menu;
