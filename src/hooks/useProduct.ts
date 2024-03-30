import getAllProductsFakeStore from '@/_utils/getAllProductsFakeStore';
import { useAppDispatch } from './useAppDispatch';
import { Product } from '@/types/globalTypes';
import {
  setCurrentCategory,
  setCurrentPage,
  setProducts,
} from '@/slices/productSlice';
import { useAppSelector } from './useAppSelector';
import { CATEGORIES } from '@/constants/product';
import { AppDispatch } from '@/types/reduxTypes';

type CategoryKey = keyof typeof CATEGORIES;

const useProduct = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.products);
  const setProductsStore = async () => {
    const products: Product[] = await getAllProductsFakeStore();
    dispatch(setProducts(products));
  };

  const category = useAppSelector((state) => state.product.currentCategory);

  const page = useAppSelector((state) => state.product.currentPage);

  const handleRouteChangeForProduct = (
    nextCategory: CategoryKey,
    nextPage: number
  ) => {
    if (nextCategory !== category) {
      dispatch(setCurrentCategory(nextCategory));
    }
    dispatch(setCurrentPage(nextPage));
  };

  return {
    products,
    page,
    category,
    setProductsStore,
    handleRouteChangeForProduct,
  };
};

export default useProduct;
