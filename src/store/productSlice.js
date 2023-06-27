import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
}

export const productsSlice = createSlice({
    name: 'productsSlice',
    initialState: initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
    }
})

export const { setProducts } = productsSlice.actions;