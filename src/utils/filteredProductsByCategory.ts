import { Product } from '@/types/globalTypes';

const filteredProductsByCategory = (products: Product[], category: string) => {
  if (category === 'all') return products;
  return products.filter((product) => product.category === category);
};

export default filteredProductsByCategory;
