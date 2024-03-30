import { CategoryKey, Product } from '@/types/globalTypes';

const getFilteredProducts = (products: Product[], category: string) => {
  return products.filter((product) => product.category === category);
};

export default getFilteredProducts;
