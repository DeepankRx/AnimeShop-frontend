import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './userSlice';
import { cartSlice } from './cartSlice';
import { productsSlice } from './productSlice';
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    cart: cartSlice.reducer,
    products: productsSlice.reducer,
  }
});
