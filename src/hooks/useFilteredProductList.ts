import { useMemo } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { CATEGIRIES, CATEGIRIES_MATCH } from '@/constants/product';
import { Product } from '@/types/globalTypes';

export const useFilteredProductList = (): Product[] => {
  const curCategory: string = useAppSelector(
    (state) => state.product.currentCategory
  );
  const productList: Product[] = useAppSelector(
    (state) => state.product.productItems
  );

  const filteredProductList: Product[] = useMemo(() => {
    if (curCategory === 'all') {
      return productList;
    } else {
      const categoryIndex: number = CATEGIRIES.findIndex(
        (category) => category === curCategory
      );
      return productList.filter(
        (product) => product.category === CATEGIRIES_MATCH[categoryIndex]
      );
    }
  }, [productList, curCategory]);

  return filteredProductList;
};
