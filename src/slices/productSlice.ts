import { Product } from '@/types/globalTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  products: Product[];
}

const initialProductState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState: initialProductState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export const productReducer = productSlice.reducer;
