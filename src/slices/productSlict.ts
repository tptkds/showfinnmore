import { CartItems, Product, Wishlist } from '@/types/globalTypes';
import { createSlice } from '@reduxjs/toolkit';

interface productState {
  productList: Product[];
  currentPage: number;
  category: string;
  cartItems: CartItems;
  wishlist: Wishlist;
}

export const productSlice = createSlice({
  name: 'productSlice',
  initialState: {
    productList: [],
    currentPage: 0,
    category: '',
    cartItems: {},
    wishlist: {},
    // purchaseList: [],
  } as productState,
  reducers: {
    setProductList: (state, action) => {
      state.productList = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    // setPurchaseItems: (state, action) => {
    //   state.purchaseList = action.payload;
    // },
  },
});

export const {
  setProductList,
  setCurrentPage,
  setCategory,
  setCartItems,
  setWishlist,
  // setPurchaseItems,
} = productSlice.actions;
export const productReducer = productSlice.reducer;
