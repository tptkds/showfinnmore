// import { useMemo } from 'react';
// import { useAppSelector } from '@/hooks/useAppSelector';
// import { CATEGIRIES } from '@/constants/product';
// import { Product } from '@/types/globalTypes';

// export const useFilteredProductList = (): Product[] => {
//   const curCategory: string = useAppSelector(
//     (state) => state.product.currentCategory
//   );
//   const products: Product[] = useAppSelector((state) => state.product.products);

//   const filteredProductList: Product[] = useMemo(() => {
//     if (curCategory === 'all') {
//       return products;
//     } else {
//       const categoryIndex: number = CATEGIRIES.findIndex(
//         (category) => category === curCategory
//       );
//       return products.filter(
//         (product) => product.category === [categoryIndex]
//       );
//     }
//   }, [products, curCategory]);

//   return filteredProductList;
// };
