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

// 'use client';

// import {
//   CATEGIRIES,
//   CATEGIRIES_MATCH,
//   ITEMSPERPAGE,
// } from '@/constants/product';
// import { useAppSelector } from '@/hooks/useAppSelector';
// import { Product } from '@/types/globalTypes';
// import { useRouter } from 'next/navigation';
// import { useMemo } from 'react';
// import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// export default function Pagenation() {
//   const curCategory = useAppSelector((state) => state.product.category);
//   let productList: Product[] = useAppSelector(
//     (state) => state.product.productList
//   );

//   const currentPage: number = useAppSelector(
//     (state) => state.product.currentPage
//   );
//   const curProductList: Product[] = useMemo(() => {
//     if (productList.length === 0) {
//       return [];
//     }
//     if (curCategory === 'all') {
//       return productList;
//     } else {
//       const cartegoryIndex: number = CATEGIRIES.findIndex(
//         (v) => v === curCategory
//       );
//       const filteredData: Product[] = productList.filter((item) => {
//         return item.category === CATEGIRIES_MATCH[cartegoryIndex];
//       });
//       return filteredData;
//     }
//   }, [productList, curCategory]);

//   const totalItems: number = curProductList.length;
//   const totalPages: number = Math.ceil(totalItems / ITEMSPERPAGE);

//   const router = useRouter();

//   const movePage = (e: React.MouseEvent<HTMLButtonElement>) => {
//     const target = e.target as HTMLButtonElement;
//     const name: string = target.name;

//     let nextPage: string | number = '';
//     if (name === 'newer') {
//       nextPage = Number(currentPage) - 1;
//     } else if (name === 'older') {
//       nextPage = Number(currentPage) + 1;
//     } else {
//       nextPage = Number(name);
//     }

//     router.push(`/product/${curCategory}/${nextPage}`);
//   };

//   return (
//     <ul className="flex justify-center ">
//       <li className="p-2.5">
//         <button
//           name="newer"
//           className="flex items-center disabled:opacity-20 "
//           onClick={movePage}
//           disabled={currentPage === 1}
//           style={{ fontSize: '20px' }}
//         >
//           <FiChevronLeft />
//         </button>
//       </li>
//       {Array.from({ length: totalPages }, (_, index) => index + 1).map(
//         (page) => (
//           <li key={page} className="p-2.5">
//             <button
//               className="disabled:text-zinc-300  text-black   text-base disabled:text-zinc-500"
//               name={page.toString()}
//               onClick={movePage}
//               disabled={page === currentPage}
//             >
//               {page}
//             </button>
//           </li>
//         )
//       )}
//       <li className="p-2.5">
//         <button
//           name="older"
//           className="flex items-center disabled:opacity-20"
//           onClick={movePage}
//           disabled={currentPage === totalPages}
//           style={{ fontSize: '20px' }}
//         >
//           <FiChevronRight />
//         </button>
//       </li>
//     </ul>
//   );
// }

// import { useMemo } from 'react';
// import { useRouter } from 'next/navigation';
// import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
// import {
//   CATEGIRIES,
//   CATEGIRIES_MATCH,
//   ITEMSPERPAGE,
// } from '@/constants/product';
// import { useAppSelector } from '@/hooks/useAppSelector';
// import { Product } from '@/types/globalTypes';

// export default function Pagination() {
//   const curCategory = useAppSelector((state) => state.product.category);
//   const productList: Product[] = useAppSelector(
//     (state) => state.product.productList
//   );
//   const currentPage: number = useAppSelector(
//     (state) => state.product.currentPage
//   );

//   const curProductList: Product[] = useMemo(() => {
//     if (productList.length === 0) {
//       return [];
//     }
//     if (curCategory === 'all') {
//       return productList;
//     } else {
//       const cartegoryIndex: number = CATEGIRIES.findIndex(
//         (v) => v === curCategory
//       );
//       const filteredData: Product[] = productList.filter(
//         (item) => item.category === CATEGIRIES_MATCH[cartegoryIndex]
//       );
//       return filteredData;
//     }
//   }, [productList, curCategory]);

//   const totalItems: number = curProductList.length;
//   const totalPages: number = Math.ceil(totalItems / ITEMSPERPAGE);

//   const router = useRouter();

//   const movePage = (page: number) => {
//     router.push(`/product/${curCategory}/${page}`);
//   };
