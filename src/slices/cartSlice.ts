import { CartItems } from '@/types/globalTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  cartItems: CartItems;
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: {},
  } as CartState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItems>) => {
      state.cartItems = action.payload;
    },
    resetCartItems: (state) => {
      state.cartItems = {};
    },
  },
});
export const { setCartItems, resetCartItems } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
