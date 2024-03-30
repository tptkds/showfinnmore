import { Product } from '@/types/globalTypes';

const getProductsInCategory = (
  products: Product[],
  category: string
): Product[] => {
  if (category === 'all') return products;
  const filteredProducts: Product[] = products.filter(
    (product) => product.category === category
  );
  return filteredProducts;
};

export default getProductsInCategory;
