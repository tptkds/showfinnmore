'use client';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ModalContentsProps, Product } from '@/types/globalTypes';
import { useRef, useState } from 'react';
import Link from 'next/link';
import CloseModalButton from '../modal/CloseModalButton';

const SearchModalContents: React.FC<ModalContentsProps> = ({ toggleModal }) => {
  const products = useAppSelector((state) => state.product.products);
  const [searchText, setSearchText] = useState<string>('');
  const [searchedData, setSearchedData] = useState<Product[]>([]);
  const input = useRef<HTMLInputElement | null>(null);

  const searchData = (text: string) => {
    const datas: Product[] = products.filter((item) => {
      return item.title.toLowerCase().includes(text.toLowerCase());
    });
    setSearchedData(datas ? datas : []);
  };

  return (
    <div
      aria-modal="true"
      className="search-modal-center h-80svh absolute  top-10 w-11/12 overflow-y-auto bg-white dark:bg-zinc-900 sm:w-8/12 xl:w-1/2 "
    >
      <CloseModalButton toggleModal={toggleModal} />
      <input
        type="text"
        value={searchText}
        onChange={(e) => {
          e.preventDefault();
          setSearchText(e.target.value);
          if (e.target.value !== '') searchData(e.target.value);
          else {
            setSearchedData([]);
          }
        }}
        placeholder="Search..."
        className="mt-4 w-full border-b border-solid border-black px-2 pb-2 pt-2 focus:outline-none dark:border-white dark:bg-white dark:text-black"
        ref={input}
      />
      <ul className="mt-4 bg-white dark:bg-zinc-900 dark:text-white ">
        {searchedData.map((item) => (
          <li key={item.id} className="truncate px-4 py-2 ">
            <Link
              href={`/product/detail/${item.id}`}
              onClick={() => {
                toggleModal;
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
  );
};

export default SearchModalContents;
