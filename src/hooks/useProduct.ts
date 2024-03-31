import getAllProductsFakeStore from '@/_utils/getAllProductsFakeStore';
import { useAppDispatch } from './useAppDispatch';
import { Product } from '@/types/globalTypes';
import { setProducts } from '@/slices/productSlice';
import { useAppSelector } from './useAppSelector';
import { AppDispatch } from '@/types/reduxTypes';

const useProduct = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.products);
  const setProductsStore = async () => {
    const products: Product[] = await getAllProductsFakeStore();
    dispatch(setProducts(products));
  };

  return {
    products,
    setProductsStore,
  };
};

export default useProduct;
