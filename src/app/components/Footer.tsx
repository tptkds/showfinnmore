import { FaGithub } from 'react-icons/fa';
import { SiVelog } from 'react-icons/si';
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className=" relative flex flex-col items-center bg-white   px-4 py-14 shadow-md  dark:bg-zinc-900 dark:text-white sm:px-12">
      <ul className="mb-4 flex text-lg">
        <li
          className="mr-4 "
          //data-tip="GitHub"
        >
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

        <li //data-tip="Blog" className="tooltip"
        >
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
      <ul>
        <li>
          <p>@2024 kimyougyoung</p>
        </li>
      </ul>
    </footer>
  );
};
export default Footer;
