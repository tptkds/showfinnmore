import { useMemo } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { CategoryKey, Product } from '@/types/globalTypes';
import { CATEGORIES } from '@/constants/product';

export const useFilteredProductList = (): Product[] => {
  const curCategory: CategoryKey = useAppSelector(
    (state) => state.product.currentCategory
  );
  const products: Product[] = useAppSelector((state) => state.product.products);

  const filteredProductList: Product[] = useMemo(() => {
    if (curCategory === 'all') {
      return products;
    } else {
      return products.filter(
        (product) => product.category === CATEGORIES[curCategory]
      );
    }
  }, [products, curCategory]);

  return filteredProductList;
};
