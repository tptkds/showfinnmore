import { WishlistItems } from '@/types/globalTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
  wishlistItems: WishlistItems;
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlistItems: {},
  } as WishlistState,
  reducers: {
    setWishlistItems: (state, action: PayloadAction<WishlistItems>) => {
      state.wishlistItems = action.payload;
    },
    resetWishlistItems: (state) => {
      state.wishlistItems = {};
    },
  },
});

export const { setWishlistItems, resetWishlistItems } = wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;
