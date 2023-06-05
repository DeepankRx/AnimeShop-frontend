import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  isUpdated: false,
  location: {},
  orderHistory: []
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
    },
    setUpdated: (state) => {
      state.isUpdated = !state.isUpdated;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setOrderHistory: (state, action) => {
      state.orderHistory = action.payload;
    }
  }
});

export const userActions = userSlice.actions;
