import getAllProductsFakeStore from '@/_utils/getAllProductsFakeStore';
import { useAppDispatch } from './useAppDispatch';
import { Categories, Product } from '@/types/globalTypes';
import {
  setCurrentCategory,
  setCurrentPage,
  setProducts,
} from '@/slices/productSlice';
import { useAppSelector } from './useAppSelector';
import { useMemo, useState } from 'react';
import getProductsInCategory from '@/_utils/getProductsInCategory';
import { CATEGORIES, ITEMS_PER_PAGE } from '@/constants/product';
import { AppDispatch } from '@/types/reduxTypes';
import useRouterPush from './useRouterPush';
import { current } from '@reduxjs/toolkit';

const useProduct = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const { navigateToSelectedProductListPage } = useRouterPush();

  /*Product*/
  const products = useAppSelector((state) => state.product.products);

  const currentCategory = useAppSelector(
    (state) => state.product.currentCategory
  );

  const getCurrentProducts = () => {
    const total = productsInCategory.length;
    const startIndex = ITEMS_PER_PAGE * (currentPage - 1);
    const endIndex =
      startIndex + ITEMS_PER_PAGE - 1 <= total
        ? startIndex + ITEMS_PER_PAGE
        : total % ITEMS_PER_PAGE;
    const currentProducts = productsInCategory.slice(
      startIndex,
      startIndex + endIndex
    );
    return currentProducts;
  };

  /*Category*/

  const productsInCategory = useMemo(() => {
    return getProductsInCategory(products, currentCategory);
  }, [products, currentCategory]);

  const setProductsStore = async () => {
    const products: Product[] = await getAllProductsFakeStore();
    dispatch(setProducts(products));
  };

  const setCategory = (category: keyof Categories) => {
    if (category === currentCategory) return;
    const originalCategoryName = CATEGORIES[category];
    dispatch(setCurrentCategory(originalCategoryName));
  };

  /*Page*/
  const currentPage = useAppSelector(
    (state) => state.product.currentProductListPage
  );

  const currentTotalPage = useMemo(() => {
    return Math.ceil(productsInCategory.length / ITEMS_PER_PAGE);
  }, [productsInCategory]);

  const incrementPageNumber = () => {
    if (currentPage + 1 > currentTotalPage) return;
    navigateToSelectedProductListPage(currentCategory, currentPage + 1);
  };

  const decrementPageNumber = () => {
    if (currentPage - 1 < 1) return;
    navigateToSelectedProductListPage(currentCategory, currentPage - 1);
  };

  const setPageNumber = (pageNumber: number, shouldNavigate: boolean) => {
    dispatch(setCurrentPage(pageNumber));
    if (shouldNavigate)
      navigateToSelectedProductListPage(currentCategory, pageNumber);
  };

  return {
    setProductsStore,
    getCurrentProducts,
    setCategory,
    currentPage,
    currentTotalPage,
    incrementPageNumber,
    decrementPageNumber,
    setPageNumber,
  };
};

export default useProduct;
