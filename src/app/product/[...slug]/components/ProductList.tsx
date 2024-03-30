'use client';
import React, { useEffect } from 'react';
import { CategoryKey, Product } from '@/types/globalTypes';
import useProduct from '@/hooks/useProduct';
import getProductsInPage from '@/utils/getProductInPage';
import Products from './productList/Products';

interface ProductListProps {
  category: CategoryKey;
  page: number;
}
const ProductList: React.FC<ProductListProps> = ({ category, page }) => {
  const { products, category: prevCategory, page: prevPage } = useProduct();

  const productsInPage: Product[] = getProductsInPage(category, page, products);

  useEffect(() => {
    if (prevCategory === category && prevPage === page) return;
  }, [category, page]);

  return (
    <ul className="grid grid-cols-1 gap-8 h-full sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Products products={productsInPage} />
    </ul>
  );
};

export default ProductList;
