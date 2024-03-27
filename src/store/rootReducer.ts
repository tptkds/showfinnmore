import { productReducer } from '@/slices/productSlict';
import { combineReducers } from '@reduxjs/toolkit';

export default combineReducers({
  product: productReducer,
});
