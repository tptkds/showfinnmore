'use client';
import React, { useEffect, useState } from 'react';
import { Product, ProductProps } from '@/types/globalTypes';
import useProduct from '@/hooks/useProduct';
import getProductsInPage from '@/utils/getProductsInPage';
import Products from './productList/Products';
import ProductListSkeleton from './productList/ProductListSkeleton';

const ProductList: React.FC<ProductProps> = ({ category, page }) => {
  const { products } = useProduct();
  const [productsInPage, setProductsInPage] = useState<Product[]>([]);

  useEffect(() => {
    if (products.length === 0) return;
    setProductsInPage(getProductsInPage(category, page, products));
  }, [products]);

  return (
    <>
      {productsInPage.length === 0 ? (
        <ProductListSkeleton />
      ) : (
        <ul className="grid grid-cols-1 gap-8 h-full sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Products products={productsInPage} />
        </ul>
      )}
    </>
  );
};

export default ProductList;
