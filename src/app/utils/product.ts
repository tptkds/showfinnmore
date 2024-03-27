import { Product } from '@/types/globalTypes';

export const getProductUrl = (slug: string): string => {
  switch (slug) {
    case 'all': {
      return 'https://fakestoreapi.com/products';
    }
    case 'electronics': {
      return 'https://fakestoreapi.com/products/category/electronics';
    }
    case 'jewelery': {
      return 'https://fakestoreapi.com/products/category/jewelery';
    }
    case 'men': {
      return "https://fakestoreapi.com/products/category/men's clothing";
    }
    case 'women': {
      return "https://fakestoreapi.com/products/category/women's clothing";
    }
    default:
      return 'https://fakestoreapi.com/products';
  }
};

export const getProducts = async (url: string): Promise<Product[]> => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};
