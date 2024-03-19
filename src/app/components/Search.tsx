'use client';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Product } from '@/types/globalTypes';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoCloseSharp } from 'react-icons/io5';
``;
function Search() {
  const productList = useAppSelector((state) => state.product.productList);
  const [searchText, setSearchText] = useState<string>('');
  const [searchedDatas, setSearchedData] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const modalBackground = useRef<HTMLDivElement | null>(null);
  const input = useRef<HTMLInputElement | null>(null);
  const searchData = (text: string) => {
    const datas: Product[] = productList.filter((item) => {
      return item.title.toLowerCase().includes(text.toLowerCase());
    });
    setSearchedData(datas ? datas : []);
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    setSearchText(e.target.value);
    if (e.target.value !== '') searchData(e.target.value);
    else {
      setSearchedData([]);
    }
  };

  const toggleModal = (e: any) => {
    e.preventDefault();
    if (e.target.name === 'searching') {
      modalBackground.current?.classList.remove('hidden');
      input.current?.focus();
    } else {
      modalBackground.current?.classList.add('hidden');
    }
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return;
  return (
    <>
      <div
        className="flex items-center relative w-full "
        role="search"
        //data-tip="Search"
      >
        <button
          name="searching"
          id="searching"
          className="p-4 "
          style={{ fontSize: '46px' }}
          onClick={toggleModal}
          aria-label="검색"
        >
          <FiSearch />
        </button>

        <div
          className="bg-black bg-opacity-30 w-full h-full fixed top-0 left-0 hidden dark:bg-white dark:bg-opacity-30"
          ref={modalBackground}
        >
          <div
            aria-modal="true"
            className="absolute top-10 search-modal-center  bg-white w-11/12 sm:w-8/12 xl:w-1/2 h-80svh overflow-y-auto dark:bg-zinc-900 "
          >
            <button
              name="downModal"
              className="absolute right-4 top-4 text-xl "
              onClick={toggleModal}
              aria-label="닫기"
            >
              <IoCloseSharp />
            </button>
            <input
              type="text"
              value={searchText}
              onChange={handleChange}
              placeholder="Search..."
              className="px-2 border-b border-solid border-black focus:outline-none dark:border-white w-full pb-2 dark:bg-white dark:text-black mt-4 pt-2"
              ref={input}
            />
            <ul className="mt-4 bg-white dark:bg-zinc-900 dark:text-white ">
              {searchedDatas.map((item) => (
                <li key={item.id} className="truncate px-4 py-2 ">
                  <Link
                    href={`/product/detail/${item.id}`}
                    onClick={() => {
                      modalBackground.current?.classList.add('hidden');
                      setSearchText('');
                      setSearchedData([]);
                    }}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
