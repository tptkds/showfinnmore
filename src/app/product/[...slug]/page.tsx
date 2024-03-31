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
      <div className="mt-14 flex flex-col justify-center w-full items-center">
        <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
      </div>

      <div className="flex flex-col mb-44">
        <ProductList category={category} page={page} />
      </div>
      <div className="mt-14">
        <Pagenation category={category} page={page} />
      </div>
    </>
  );
};
export default Product;
