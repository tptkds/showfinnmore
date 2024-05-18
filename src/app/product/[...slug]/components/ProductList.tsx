'use client';
import React, { useEffect, useState } from 'react';
import { Product as ProductType, ProductProps } from '@/types/globalTypes';
import useProduct from '@/hooks/useProduct';
import getProductsInPage from '@/utils/getProductsInPage';
import ProductListSkeleton from './productList/ProductListSkeleton';
import useStore from '@/hooks/useStore';
import Product from './productList/Product';

const ProductList: React.FC<ProductProps> = ({ category, page }) => {
  const { products } = useProduct();
  const { cartItems, wishlistItems } = useStore();

  const [productsInPage, setProductsInPage] = useState<ProductType[]>([]);

  useEffect(() => {
    if (products.length === 0) return;
    setProductsInPage(getProductsInPage(category, page, products));
  }, [products]);

  return (
    <>
      {productsInPage.length === 0 ? (
        <ProductListSkeleton />
      ) : (
        <ul className="grid h-full grid-cols-2 gap-4 lg:grid-cols-4 xl:gap-6 ">
          {productsInPage.map((product) => (
            <Product
              key={product.id}
              product={product}
              cartItems={cartItems}
              wishlistItems={wishlistItems}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default ProductList;
