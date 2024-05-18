import { CATEGORIES, ITEMS_PER_PAGE } from '@/constants/product';
import { CategoryKey, Product } from '@/types/globalTypes';
import filteredProductsByCategory from '@/utils/filteredProductsByCategory';

const getProductsInPage = (
  category: CategoryKey,
  page: number,
  products: Product[],
) => {
  let filteredProducts: Product[] = products;
  filteredProducts = filteredProductsByCategory(products, CATEGORIES[category]);
  const total = filteredProducts.length;
  const startIndex = ITEMS_PER_PAGE * (page - 1);
  const endIndex = startIndex + ITEMS_PER_PAGE;
  if (endIndex <= total) {
    return filteredProducts.slice(startIndex, endIndex);
  } else {
    return filteredProducts.slice(startIndex);
  }
};

export default getProductsInPage;
