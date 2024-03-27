import { cartReducer } from '@/slices/cartSlice';
import { productReducer } from '@/slices/productSlice';
import { wishlistReducer } from '@/slices/wishListSlice';
import { combineReducers } from '@reduxjs/toolkit';

export default combineReducers({
  product: productReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
});
