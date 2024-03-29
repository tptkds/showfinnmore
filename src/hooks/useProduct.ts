import getAllProductsFakeStore from '@/_utils/getAllProductsFakeStore';
import { useAppDispatch } from './useAppDispatch';
import { Product } from '@/types/globalTypes';
import { setProducts } from '@/slices/productSlice';

const useProduct = () => {
  const dispatch = useAppDispatch();
  const setProductsStore = async () => {
    const products: Product[] = await getAllProductsFakeStore();
    dispatch(setProducts(products));
  };
  return { setProductsStore };
};

export default useProduct;
