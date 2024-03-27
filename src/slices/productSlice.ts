import { Product } from '@/types/globalTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  productItems: Product[];
  currentCategory: string;
  currentProductListPage: number;
}

const initialProductState: ProductState = {
  productItems: [],
  currentCategory: 'all',
  currentProductListPage: 0,
};

const productSlice = createSlice({
  name: 'product',
  initialState: initialProductState,
  reducers: {
    setProductItems: (state, action: PayloadAction<Product[]>) => {
      state.productItems = action.payload;
    },
    setCurrentCategory: (state, action: PayloadAction<string>) => {
      state.currentCategory = action.payload;
    },
    setCurrentProductListPage: (state, action: PayloadAction<number>) => {
      state.currentProductListPage = action.payload;
    },
    resetProductState: (state) => initialProductState,
  },
});

export const {
  setProductItems,
  setCurrentCategory,
  setCurrentProductListPage,
  resetProductState,
} = productSlice.actions;
export const productReducer = productSlice.reducer;
