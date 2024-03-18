import { FaGithub } from 'react-icons/fa';
import { SiVelog } from 'react-icons/si';
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className=" px-4 sm:px-12 py-14 relative bg-white bg-opacity-60  flex flex-col items-center  shadow-md dark:bg-zinc-900 dark:text-white">
      <ul className="flex text-lg mb-4">
        <li className="mr-4 tooltip" data-tip="GitHub">
          <Link
            href="https://github.com/tptkds/showfinnmore"
            rel="noopener noreferrer"
            target="_blank"
            style={{ fontSize: '28px' }}
            aria-label="Github"
          >
            <FaGithub />
          </Link>
        </li>

        <li data-tip="Blog" className="tooltip">
          <Link
            href="https://velog.io/@wlldone/posts"
            rel="noopener noreferrer"
            target="_blank"
            style={{ fontSize: '28px' }}
            aria-label="Blog"
          >
            <SiVelog />
          </Link>
        </li>
      </ul>
      <ul className="">
        <li>
          <p>@2024 kimyougyoung</p>
        </li>
      </ul>
    </footer>
  );
}
