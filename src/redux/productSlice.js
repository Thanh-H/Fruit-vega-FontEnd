import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "products",
    initialState: {
        cart: {
            cartView: [],
            error: false,

        },
    },
    reducers: {
        //create CART
        createCartSuccess: (state, action) => {
            state.cart.cartView = [...state.cart.cartView, action.payload];
            console.log('check cart redux', state.cart.cartView)
        },
        createCartFailed: (state) => {
            state.cart.error = true;
        },


    }
})

export const {
    createCartSuccess,
    createCartFailed
} = productSlice.actions;

export default productSlice.reducer;