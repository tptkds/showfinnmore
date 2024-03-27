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
    setWishlist: (state, action: PayloadAction<WishlistItems>) => {
      state.wishlistItems = action.payload;
    },
    resetWishlist: (state) => {
      state.wishlistItems = {};
    },
  },
});

export const { setWishlist, resetWishlist } = wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;
