'use client';
import React from 'react';
import ProductList from './components/ProductList';
import Pagenation from './components/Pagenation';
import { CategoryKey } from '@/types/globalTypes';

interface ProductProps {
  params: {
    slug: string;
  };
}
const Product: React.FC<ProductProps> = ({ params }) => {
  const category: CategoryKey = params.slug[0] as CategoryKey;
  const page: number = Number(params.slug[1]);

  return (
    <>
      <div className="mb-4 mt-14 flex w-full flex-col items-center justify-center">
        <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
      </div>

      <div className="mb-12 flex flex-col">
        <ProductList category={category} page={page} />
      </div>
      <div className="mt-14">
        <Pagenation category={category} page={page} />
      </div>
    </>
  );
};
export default Product;
