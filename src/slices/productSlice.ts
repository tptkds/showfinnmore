import { CategoryKey, Product } from '@/types/globalTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  products: Product[];
  currentCategory: CategoryKey;
  currentPage: number;
}

const initialProductState: ProductState = {
  products: [],
  currentCategory: 'all',
  currentPage: 0,
};

const productSlice = createSlice({
  name: 'product',
  initialState: initialProductState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setCurrentCategory: (state, action: PayloadAction<CategoryKey>) => {
      state.currentCategory = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    resetProductState: () => initialProductState,
  },
});

export const {
  setProducts,
  setCurrentCategory,
  setCurrentPage,
  resetProductState,
} = productSlice.actions;
export const productReducer = productSlice.reducer;
