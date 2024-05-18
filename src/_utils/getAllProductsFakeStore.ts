import { Product } from '@/types/globalTypes';

export const getAllProductsFakeStore = async (): Promise<Product[]> => {
  try {
    const res = await fetch('https://fakestoreapi.com/products');

    if (!res.ok) {
      throw new Error(
        `FakeStoreAPI Server responded with ${res.status}: ${res.statusText}`,
      );
    }

    const products = await res.json();
    return products;
  } catch (error) {
    console.error('Failed to fetch product list:', error);
    return [];
  }
};

export default getAllProductsFakeStore;
