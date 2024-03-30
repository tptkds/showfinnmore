'use client';
import { useEffect } from 'react';
import Pagenation from './components/Pagenation';
import ProductList from './components/ProductList';
import useProduct from '@/hooks/useProduct';
import { Categories } from '@/types/globalTypes';
interface ProductProps {
  params: {
    slug: string;
  };
}
const Product: React.FC<ProductProps> = ({ params }) => {
  const { setCategory, setPageNumber } = useProduct();
  useEffect(() => {
    const category = params.slug[0] as keyof Categories;
    const page: number = Number(params.slug[1]);
    setCategory(category);
    setPageNumber(page, false);
  }, []);
  return (
    <>
      <div className="mt-14 flex flex-col justify-center w-full items-center"></div>
      <div className="flex flex-col mb-44">
        <ProductList />
      </div>
      <div className="mt-14">
        <Pagenation />
      </div>
    </>
  );
};
export default Product;
