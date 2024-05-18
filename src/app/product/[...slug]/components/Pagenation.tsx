'use client';
import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { CATEGORIES, ITEMS_PER_PAGE } from '@/constants/product';
import { Product, ProductProps } from '@/types/globalTypes';
import useRouterPush from '@/hooks/useRouterPush';
import filteredProductsByCategory from '@/utils/filteredProductsByCategory';
import useProduct from '@/hooks/useProduct';

const Pagenation: React.FC<ProductProps> = ({ category, page }) => {
  const { navigateToSelectedProductListPage } = useRouterPush();
  const { products } = useProduct();
  const productsInCategory: Product[] = filteredProductsByCategory(
    products,
    CATEGORIES[category],
  );
  const total: number = Math.ceil(productsInCategory.length / ITEMS_PER_PAGE);

  return (
    <ul className="flex justify-center ">
      <>
        <li className="p-2.5">
          <button
            name="newer"
            className="flex items-center disabled:opacity-20 "
            onClick={() =>
              navigateToSelectedProductListPage(category, page - 1)
            }
            disabled={page === 1}
            style={{ fontSize: '20px' }}
            aria-label="이전 페이지"
          >
            <FiChevronLeft />
          </button>
        </li>
        {Array.from({ length: total }, (_, index) => index + 1).map(
          (pageNumber) => (
            <li key={pageNumber} className="p-2.5">
              <button
                className="text-base text-black  disabled:text-zinc-300 dark:text-white dark:disabled:text-zinc-300"
                onClick={() =>
                  navigateToSelectedProductListPage(category, pageNumber)
                }
                disabled={pageNumber === page}
                aria-label={`${page} page`}
              >
                {pageNumber}
              </button>
            </li>
          ),
        )}
        <li className="p-2.5">
          <button
            name="older"
            className="flex items-center disabled:opacity-20"
            onClick={() =>
              navigateToSelectedProductListPage(category, page + 1)
            }
            disabled={page === total}
            style={{ fontSize: '20px' }}
            aria-label="다음 페이지"
          >
            <FiChevronRight />
          </button>
        </li>
      </>
    </ul>
  );
};

export default Pagenation;
