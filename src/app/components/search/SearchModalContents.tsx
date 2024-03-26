'use client';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ModalContentsProps, Product } from '@/types/globalTypes';
import { useRef, useState } from 'react';
import Link from 'next/link';
import CloseModalButton from '../modal/CloseModalButton';

const SearchModalContents: React.FC<ModalContentsProps> = ({ toggleModal }) => {
  const productList = useAppSelector((state) => state.product.productList);
  const [searchText, setSearchText] = useState<string>('');
  const [searchedData, setSearchedData] = useState<Product[]>([]);
  const input = useRef<HTMLInputElement | null>(null);

  const searchData = (text: string) => {
    const datas: Product[] = productList.filter((item) => {
      return item.title.toLowerCase().includes(text.toLowerCase());
    });
    setSearchedData(datas ? datas : []);
  };

  return (
    <div
      aria-modal="true"
      className="absolute top-10 search-modal-center  bg-white w-11/12 sm:w-8/12 xl:w-1/2 h-80svh overflow-y-auto dark:bg-zinc-900 "
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
        className="px-2 border-b border-solid border-black focus:outline-none dark:border-white w-full pb-2 dark:bg-white dark:text-black mt-4 pt-2"
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
