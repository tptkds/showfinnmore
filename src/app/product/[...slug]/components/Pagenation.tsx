'use client';
import React from 'react';
import { useFilteredProductList } from '@/hooks/useFilteredProductList';
import { useRouter } from 'next/navigation';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { ITEMSPERPAGE } from '@/constants/product';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Product } from '@/types/globalTypes';

const Pagination: React.FC = () => {
  const curCategory = useAppSelector((state) => state.product.category);
  const curProductList: Product[] = useFilteredProductList();
  const currentPage: number = useAppSelector(
    (state) => state.product.currentPage
  );
  const router = useRouter();

  const totalPages: number = Math.ceil(curProductList.length / ITEMSPERPAGE);

  const movePage = (page: number): void => {
    router.push(`/product/${curCategory}/${page}`);
  };

  return (
    <ul className="flex justify-center ">
      <li className="p-2.5">
        <button
          name="newer"
          className="flex items-center disabled:opacity-20 "
          onClick={() => movePage(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ fontSize: '20px' }}
          aria-label="다음 페이지"
        >
          <FiChevronLeft />
        </button>
      </li>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <li key={page} className="p-2.5">
            <button
              className="disabled:text-zinc-300 text-black  text-base dark:text-white dark:disabled:text-zinc-300"
              onClick={() => movePage(page)}
              disabled={page === currentPage}
              aria-label={`${page} page`}
            >
              {page}
            </button>
          </li>
        )
      )}
      <li className="p-2.5">
        <button
          name="older"
          className="flex items-center disabled:opacity-20"
          onClick={() => movePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ fontSize: '20px' }}
          aria-label="이전 페이지"
        >
          <FiChevronRight />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
