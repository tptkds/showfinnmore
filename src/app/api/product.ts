import { Product } from '@/types/globalTypes';

export const dynamic = 'force-dynamic'; // defaults to auto
export const getProductList = async (): Promise<Product[]> => {
  const res = await fetch('https://fakestoreapi.com/products');
  const data = await res.json();
  return data;
};
